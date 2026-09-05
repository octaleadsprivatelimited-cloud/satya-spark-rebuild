import type { CatalogProduct } from "./product-catalog";
const key = "satya-catalog-metadata-v1";

export function readCatalogCache(): CatalogProduct[] | null {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "null");
    if (!Array.isArray(value)) return null;
    if (
      !value.every(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          typeof item.description === "string" &&
          typeof item.category === "string" &&
          typeof item.brand === "string",
      )
    )
      return null;
    return value.map((item) => ({ ...item, image: "", images: undefined, pdf: undefined }));
  } catch {
    return null;
  }
}

export function writeCatalogCache(products: CatalogProduct[]) {
  try {
    // Store only lightweight public metadata. Never serialize image bytes here.
    localStorage.setItem(
      key,
      JSON.stringify(
        products.map(({ id, name, description, category, brand, featured, revision }) => ({
          id,
          name,
          description,
          category,
          brand,
          featured,
          revision,
        })),
      ),
    );
  } catch {
    /* Optional cache must not prevent catalogue rendering. */
  }
}
