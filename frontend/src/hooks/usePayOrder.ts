import { useMutation } from "@tanstack/react-query";
import { payOrder } from "../api/orders";

interface PayOrderData {
  orderId: string;
  details: object;
}

export const usePayOrder = () => {
  const mutation = useMutation({
    mutationFn: ({ orderId, details }: PayOrderData) => payOrder({ orderId, details }),
  });

  return {
    payOrder: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
