import { useQuery } from "@tanstack/react-query";
import { getPayPalClientId } from "../api/orders";
import { paypalKeys } from "../const/queryKeys";

export const useGetPayPalClientId = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [paypalKeys.clientId()],
    queryFn: getPayPalClientId,
  });

  return {
    paypal: data as { clientId: string } | undefined,
    isLoading,
    isError,
    error,
  };
};
