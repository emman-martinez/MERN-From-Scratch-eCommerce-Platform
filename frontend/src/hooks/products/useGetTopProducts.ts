import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../api/products";
import { productKeys } from "../../const/queryKeys";

export const useGetTopProducts = () => {
  const { data, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: productKeys.top(),
    queryFn: getTopProducts,
    gcTime: 5 * 1000,
  });
  return { data, error, isLoading, refetch, isSuccess };
};
