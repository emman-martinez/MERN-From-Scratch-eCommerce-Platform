import type { Product } from "../types/product";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/products";

export const useUpdateProductMutation = () => {
  const mutation = useMutation({
    mutationFn: (product: Product) => updateProduct(product),
  });

  return {
    updateProduct: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
