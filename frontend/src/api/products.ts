import type { Product } from "../types/product";
import { api } from "./axios";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/api/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/api/products/${id}`);
  return response.data;
};
