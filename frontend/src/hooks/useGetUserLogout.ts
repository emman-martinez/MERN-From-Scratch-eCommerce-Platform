import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../api/users";

export const useUserLogoutMutation = () => {
  const mutation = useMutation({
    mutationFn: () => userLogout(),
  });

  return {
    logoutMutate: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
