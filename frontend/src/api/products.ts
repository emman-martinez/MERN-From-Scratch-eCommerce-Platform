import type { Product, ProductParams } from "../types/product";
import { api } from "./axios";
import { PRODUCTS_URL } from "../const";
import type { ProductData } from "../types/product";

export const getProducts = async ({ pageNumber }: ProductParams): Promise<ProductData> => {
  const response = await api.get<ProductData>(`${PRODUCTS_URL}/?pageNumber=${pageNumber}`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`${PRODUCTS_URL}/${id}`);
  return response.data;
};

export const createProduct = async (): Promise<Product> => {
  const response = await api.post<Product>(`${PRODUCTS_URL}`);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await api.put<Product>(`${PRODUCTS_URL}/${product._id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await api.delete<void>(`${PRODUCTS_URL}/${id}`);
  return response.data;
};

export const createProductReview = async (
  id: string,
  review: { rating: number; comment: string },
): Promise<void> => {
  const response = await api.post<void>(`${PRODUCTS_URL}/${id}/reviews`, review);
  return response.data;
};
