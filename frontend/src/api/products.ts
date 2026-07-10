import type { Product } from "../types/product";
import { api } from "./axios";
import { PRODUCTS_URL } from "../const";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>(`${PRODUCTS_URL}`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`${PRODUCTS_URL}/${id}`);
  return response.data;
};
