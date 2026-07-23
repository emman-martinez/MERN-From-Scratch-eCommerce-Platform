import { useMutation } from "@tanstack/react-query";
import { deliverOrder } from "../api/orders";

export const useDeliverOrderMutation = () => {
  const mutation = useMutation({
    mutationFn: (orderId: string) => deliverOrder(orderId),
  });

  return {
    deliverOrder: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
