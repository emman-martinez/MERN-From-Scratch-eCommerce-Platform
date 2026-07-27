import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/products";

export const useCreateProductMutation = () => {
  const mutation = useMutation({
    mutationFn: () => createProduct(),
  });

  return {
    createProduct: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
