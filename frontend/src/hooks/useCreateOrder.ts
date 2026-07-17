import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/orders";
import type { Order } from "../types/orders";

export const useCreateOrderMutation = () => {
  const mutation = useMutation({
    mutationFn: (order: Order) => createOrder(order),
  });

  return {
    createOrder: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
