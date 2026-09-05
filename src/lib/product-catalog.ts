import { useEffect, useSyncExternalStore } from "react";
import type { Product } from "./products";
import { readCatalogCache, writeCatalogCache } from "./catalog-cache";

const endpoint =
  "https://firestore.googleapis.com/v1/projects/satyapowertechnologys-293df/databases/(default)/documents/products";
type Value = { stringValue?: string; booleanValue?: boolean; arrayValue?: { values?: Value[] } };
type Document = { name: string; updateTime?: string; fields?: Record<string, Value> };
export type CatalogProduct = Product & { revision?: string };

export function decodeProduct(document: Document): CatalogProduct {
  const fields = document.fields ?? {};
  return {
    id: document.name.split("/").pop()!,
    name: fields.name?.stringValue ?? "",
    description: fields.description?.stringValue ?? "",
    category: (fields.category?.stringValue ?? "") as Product["category"],
    brand: (fields.brand?.stringValue ?? "") as Product["brand"],
    image: fields.image?.stringValue ?? "",
    images: fields.images?.arrayValue?.values
      ?.map((value) => value.stringValue ?? "")
      .filter(Boolean),
    pdf: fields.pdf?.stringValue,
    pdfName: fields.pdfName?.stringValue,
    featured: fields.featured?.booleanValue ?? false,
    revision: document.updateTime,
  };
}

async function request(url: URL) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), cache: "no-store" });
  if (!response.ok) throw new Error(`Product data could not be loaded (${response.status}).`);
  return response.json();
}

let state: { products: CatalogProduct[]; loading: boolean; error: string | null } = {
  products: readCatalogCache() ?? [],
  loading: true,
  error: null,
};
const listeners = new Set<() => void>();
let pending: Promise<void> | undefined;
let fetchedAt = 0;
const notify = () => listeners.forEach((listener) => listener());

export function refreshCatalog(force = false): Promise<void> {
  if (pending) return force ? pending.then(() => refreshCatalog(true)) : pending;
  if (!force && Date.now() - fetchedAt < 60000) return Promise.resolve();
  pending = (async () => {
    try {
      const products: CatalogProduct[] = [];
      let token = "";
      do {
        const url = new URL(endpoint);
        url.searchParams.set("pageSize", "1000");
        // Deliberately omit binary images and brochures. Fetch only visible thumbnails
        // and the selected product's complete gallery, rather than every gallery.
        for (const field of ["name", "description", "category", "brand", "featured"])
          url.searchParams.append("mask.fieldPaths", field);
        if (token) url.searchParams.set("pageToken", token);
        const page = await request(url);
        products.push(...(page.documents ?? []).map(decodeProduct));
        token = page.nextPageToken ?? "";
      } while (token);
      products.sort((a, b) => a.name.localeCompare(b.name));
      state = { products, loading: false, error: null };
      writeCatalogCache(products);
      fetchedAt = Date.now();
    } catch (error) {
      state = {
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : "Unable to load products.",
      };
    } finally {
      pending = undefined;
      notify();
    }
  })();
  return pending;
}

export function useCatalog() {
  const snapshot = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => state,
    () => state,
  );
  useEffect(() => {
    void refreshCatalog();
    const refresh = () => {
      void refreshCatalog();
    };
    window.addEventListener("focus", refresh);
    window.addEventListener("online", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("online", refresh);
    };
  }, []);
  return snapshot;
}

// IndexedDB retains image data without stripping galleries to fit localStorage.
let database: Promise<IDBDatabase | null> | undefined;
function imageDatabase() {
  if (!database)
    database = new Promise((resolve) => {
      if (typeof indexedDB === "undefined") return resolve(null);
      const open = indexedDB.open("satya-product-images", 1);
      open.onupgradeneeded = () => open.result.createObjectStore("images");
      open.onsuccess = () => resolve(open.result);
      open.onerror = () => resolve(null);
      open.onblocked = () => resolve(null);
    });
  return database;
}
async function cachedImage(id: string): Promise<{ revision: string; image: string } | undefined> {
  try {
    const db = await imageDatabase();
    if (!db) return;
    return await new Promise((resolve) => {
      const read = db.transaction("images").objectStore("images").get(id);
      read.onsuccess = () => resolve(read.result);
      read.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}
async function cacheImage(id: string, revision: string, image: string) {
  try {
    const db = await imageDatabase();
    if (!db) return;
    const tx = db.transaction("images", "readwrite");
    tx.objectStore("images").put({ revision, image }, id);
    tx.onerror = () => {
      /* Cache quota must not interrupt the image display. */
    };
  } catch {
    /* optional cache */
  }
}
const images = new Map<string, Promise<string>>();
export function loadProductImage(product: CatalogProduct): Promise<string> {
  if (product.image) return Promise.resolve(product.image);
  const key = `${product.id}:${product.revision ?? ""}`;
  let loading = images.get(key);
  if (!loading) {
    loading = (async () => {
      const cached = await cachedImage(product.id);
      if (cached && product.revision && cached.revision === product.revision) return cached.image;
      const url = new URL(`${endpoint}/${encodeURIComponent(product.id)}`);
      url.searchParams.append("mask.fieldPaths", "image");
      const document = (await request(url)) as Document;
      let image = document.fields?.image?.stringValue ?? "";
      if (!image) {
        const full = await loadProductDetails(product.id);
        image = full.images?.[0] ?? "";
      }
      void cacheImage(product.id, document.updateTime ?? "", image);
      return image;
    })().catch((error) => {
      images.delete(key);
      throw error;
    });
    images.set(key, loading);
  }
  return loading;
}

export async function loadProductDetails(id: string): Promise<CatalogProduct> {
  // Always fetch the full current server document before editing. Never use a
  // lightweight listing/localStorage record as the source for a gallery save.
  const document = await request(new URL(`${endpoint}/${encodeURIComponent(id)}`));
  return decodeProduct(document);
}

// Share complete galleries between card arrows and details for the same server
// revision. Admin editing continues to use the uncached loadProductDetails.
const galleries = new Map<string, Promise<CatalogProduct>>();
export function loadProductGallery(
  product: CatalogProduct,
  force = false,
): Promise<CatalogProduct> {
  const key = `${product.id}:${product.revision ?? ""}`;
  if (force) galleries.delete(key);
  let pending = galleries.get(key);
  if (!pending) {
    pending = loadProductDetails(product.id).catch((error) => {
      galleries.delete(key);
      throw error;
    });
    if (galleries.size >= 20) galleries.delete(galleries.keys().next().value!);
    galleries.set(key, pending);
  }
  return pending;
}
