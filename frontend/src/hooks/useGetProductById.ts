import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { productKeys } from "../const/queryKeys";

export const useGetProductById = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });

  return { data, error, isLoading, refetch };
};
