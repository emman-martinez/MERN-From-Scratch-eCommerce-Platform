import type { Product } from "../types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products";
import { productKeys } from "../const/queryKeys";

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: Product) => updateProduct(product),
    onSuccess: async (updatedProduct) => {
      queryClient.setQueryData<Product[]>(productKeys.all, (products) =>
        products?.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)),
      );
      queryClient.setQueryData(productKeys.detail(updatedProduct._id), updatedProduct);

      await queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
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
