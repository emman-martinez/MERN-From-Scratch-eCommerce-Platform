import products from "../mockData/products";
import type { Product } from "../types/product";

export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["product", id] as const,
};

export async function fetchProducts(): Promise<Product[]> {
  return products;
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  return products.find((product) => product._id === id);
}
