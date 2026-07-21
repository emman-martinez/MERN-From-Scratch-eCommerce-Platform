import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/orders";
import { orderKeys } from "../const/queryKeys";

export const useGetOrderById = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: Boolean(id),
    gcTime: 5 * 1000,
  });

  return { data, error, isLoading, refetch };
};
