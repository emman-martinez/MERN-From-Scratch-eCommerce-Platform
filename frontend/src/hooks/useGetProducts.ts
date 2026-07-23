import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { productKeys } from "../const/queryKeys";

export const useGetProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
  });

  return { data, error, isLoading };
};
