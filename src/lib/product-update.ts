import type { Product } from "./products";

/** Undefined galleries mean a metadata-only edit, never an instruction to erase photos. */
export function prepareProductUpdate(product: Product): Partial<Product> {
  const { revision: _revision, ...fields } = product as Product & { revision?: string };
  const update = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined),
  ) as Partial<Product>;
  if (product.images === undefined) delete update.image;
  return update;
}
