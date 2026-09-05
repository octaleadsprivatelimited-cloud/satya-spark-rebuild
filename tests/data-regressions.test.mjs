import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true, ws: false } });
after(() => server.close());
const data = await server.ssrLoadModule("/src/lib/admin-data.ts");
const site = await server.ssrLoadModule("/src/lib/site.ts");
const serviceData = await server.ssrLoadModule("/src/lib/services-data.ts");

const catalog = await server.ssrLoadModule("/src/lib/product-catalog.ts");
const updates = await server.ssrLoadModule("/src/lib/product-update.ts");
const photoHelpers = await server.ssrLoadModule("/src/lib/product-photos.ts");

const catalogCache = await server.ssrLoadModule("/src/lib/catalog-cache.ts");

test("remote product photos and gallery survive normalization", () => {
  const raw = {
    name: "Custom product",
    description: "Test",
    category: "OTDR",
    brand: "Test",
    image: "https://cdn.example.com/product-custom.jpg",
    images: ["https://cdn.example.com/front.jpg", "", "https://cdn.example.com/back.jpg"],
  };
  const result = data.normalizeProduct("custom", raw);
  assert.equal(result.image, raw.image);
  assert.deepEqual(result.images, [raw.images[0], raw.images[2]]);
  assert.equal(raw.images.length, 3, "normalization must not mutate the source");
});

test("WhatsApp preserves punctuation and line breaks in customer input", () => {
  const message = "A&B #1 + spare parts\nHyderabad? 50%";
  assert.equal(new URL(site.whatsappLink(message)).searchParams.get("text"), message);
});

test("unavailable backend must not report inquiry delivery", async () => {
  await assert.rejects(
    data.submitInquiry({ name: "Test", phone: "1234567890", message: "Test" }),
    /Unable to send/,
  );
});

test("corrupt and partial company caches fall back safely", async () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => "{invalid" },
    });
    assert.equal((await data.getCompanyInfo()).phone, "+91 95428 40444");
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => JSON.stringify({ name: "Updated", phone: null }) },
    });
    const info = await data.getCompanyInfo();
    assert.equal(info.name, "Updated");
    assert.equal(info.phone, "+91 95428 40444");
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});

test("an intentionally empty service cache does not resurrect seed entries", () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => "[]" },
    });
    assert.deepEqual(serviceData.loadServices(), []);
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});

test("metadata-only edits omit both image fields, preserving the saved gallery", () => {
  const result = updates.prepareProductUpdate({
    id: "x",
    name: "Changed name",
    image: "cached-primary",
    images: undefined,
    revision: "server-version",
  });
  assert.equal(result.name, "Changed name");
  assert.equal("image" in result, false);
  assert.equal("images" in result, false);
  assert.equal("revision" in result, false);
});

test("intentional gallery edits retain every supplied photo", () => {
  const result = updates.prepareProductUpdate({
    id: "x",
    image: "a",
    images: ["a", "b", "c", "d", "e"],
  });
  assert.deepEqual(result.images, ["a", "b", "c", "d", "e"]);
  assert.equal(result.image, "a");
});

test("catalogue metadata fetch excludes image galleries and handles every page", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  try {
    globalThis.fetch = async (url) => {
      const request = new URL(url);
      requests.push(request);
      const id = request.searchParams.has("pageToken") ? "second" : "first";
      return {
        ok: true,
        json: async () => ({
          documents: [{ name: `products/${id}`, fields: { name: { stringValue: id } } }],
          ...(id === "first" ? { nextPageToken: "page-2" } : {}),
        }),
      };
    };
    await catalog.refreshCatalog(true);
    assert.equal(requests.length, 2);
    for (const request of requests) {
      const mask = request.searchParams.getAll("mask.fieldPaths");
      assert.ok(mask.includes("name"));
      assert.ok(!mask.includes("image") && !mask.includes("images") && !mask.includes("pdf"));
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("full product fetch preserves all saved gallery slots and brochure", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async (url) => {
      assert.equal(new URL(url).searchParams.has("mask.fieldPaths"), false);
      return {
        ok: true,
        json: async () => ({
          name: "products/test",
          fields: {
            image: { stringValue: "a" },
            images: {
              arrayValue: { values: ["a", "b", "c"].map((stringValue) => ({ stringValue })) },
            },
            pdf: { stringValue: "brochure.pdf" },
          },
        }),
      };
    };
    const product = await catalog.loadProductDetails("test");
    assert.deepEqual(product.images, ["a", "b", "c"]);
    assert.equal(product.pdf, "brochure.pdf");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("photo navigation includes the primary photo and every distinct uploaded photo", () => {
  assert.deepEqual(
    photoHelpers.getProductPhotos({ image: "primary", images: ["extra-1", "extra-2"] }),
    ["primary", "extra-1", "extra-2"],
  );
  assert.deepEqual(
    photoHelpers.getProductPhotos({
      image: "primary",
      images: ["primary", "extra-1", "", "extra-1"],
    }),
    ["primary", "extra-1"],
  );
});
test("single-photo records remain single-photo galleries without invented images", () => {
  assert.deepEqual(photoHelpers.getProductPhotos({ image: "primary" }), ["primary"]);
  assert.deepEqual(photoHelpers.getProductPhotos({ image: "", images: [] }), []);
});

test("gallery browsing shares requests while admin reads remain fresh", async () => {
  const originalFetch = globalThis.fetch;
  let requests = 0;
  try {
    globalThis.fetch = async () => {
      requests++;
      return {
        ok: true,
        json: async () => ({
          name: "products/gallery-cache-test",
          fields: { image: { stringValue: "photo" } },
        }),
      };
    };
    const product = { id: "gallery-cache-test", revision: "v1" };
    await Promise.all([catalog.loadProductGallery(product), catalog.loadProductGallery(product)]);
    assert.equal(requests, 1);
    await catalog.loadProductGallery(product);
    assert.equal(requests, 1);
    await catalog.loadProductGallery({ ...product, revision: "v2" });
    assert.equal(requests, 2);
    await catalog.loadProductDetails(product.id);
    await catalog.loadProductDetails(product.id);
    assert.equal(requests, 4, "each admin read must reach the server");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a missing primary photo falls back to an uploaded gallery photo", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async (url) => ({
      ok: true,
      json: async () => ({
        name: "products/fallback-photo-test",
        updateTime: "v1",
        fields: new URL(url).searchParams.has("mask.fieldPaths")
          ? {}
          : { images: { arrayValue: { values: [{ stringValue: "gallery-photo" }] } } },
      }),
    });
    assert.equal(
      await catalog.loadProductImage({ id: "fallback-photo-test", revision: "v1", image: "" }),
      "gallery-photo",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("catalogue cache excludes image bytes and survives corrupt browser storage", () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  let stored = null;
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => stored,
        setItem: (_, value) => {
          stored = value;
        },
      },
    });
    catalogCache.writeCatalogCache([
      {
        id: "x",
        name: "Product",
        description: "Description",
        category: "OTDR",
        brand: "INNO",
        image: "large-image-data",
        images: ["other-photo"],
        pdf: "large-pdf",
      },
    ]);
    assert.ok(
      !stored.includes("large-image-data") &&
        !stored.includes("other-photo") &&
        !stored.includes("large-pdf"),
    );
    assert.equal(catalogCache.readCatalogCache()[0].name, "Product");
    stored = "{bad-json";
    assert.equal(catalogCache.readCatalogCache(), null);
    stored = "[]";
    assert.deepEqual(catalogCache.readCatalogCache(), []);
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});
