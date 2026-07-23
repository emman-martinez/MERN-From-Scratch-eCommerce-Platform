import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders";
import { orderKeys } from "../const/queryKeys";

export const useGetOrders = () => {
  const { data, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: orderKeys.all,
    queryFn: getOrders,
    gcTime: 5 * 1000,
  });
  return { data, error, isLoading, refetch, isSuccess };
};
