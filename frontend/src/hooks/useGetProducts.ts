import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { productKeys } from "../const/queryKeys";

export const useGetProducts = ({ pageNumber = 1 }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: productKeys.list(pageNumber),
    queryFn: () => getProducts({ pageNumber }),
  });

  return { data, error, isLoading, refetch };
};
