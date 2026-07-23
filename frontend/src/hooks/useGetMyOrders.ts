import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/orders";
import { orderKeys } from "../const/queryKeys";

export const useGetMyOrders = () => {
  const { data, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: orderKeys.all,
    queryFn: getMyOrders,
    gcTime: 5 * 1000,
  });
  return { data, error, isLoading, refetch, isSuccess };
};
