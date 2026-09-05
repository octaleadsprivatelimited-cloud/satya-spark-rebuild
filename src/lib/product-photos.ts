import type { Product } from "./products";

export function getProductPhotos(product: Pick<Product, "image" | "images">): string[] {
  return [...new Set([product.image, ...(product.images ?? [])].filter(Boolean))];
}
