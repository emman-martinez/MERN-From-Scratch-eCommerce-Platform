import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../api/users";
import type { UserLogin } from "../types/users";

export const useUserLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (credentials: UserLogin) => userLogin(credentials),
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
