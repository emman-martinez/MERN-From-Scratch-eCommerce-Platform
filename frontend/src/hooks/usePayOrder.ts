import { useMutation } from "@tanstack/react-query";
import { payOrder } from "../api/orders";

interface PayOrderData {
  id: string;
  details: Record<string, unknown>;
}

export const usePayOrder = () => {
  const mutation = useMutation({
    mutationFn: (data: PayOrderData) => payOrder(data.id, data.details),
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
