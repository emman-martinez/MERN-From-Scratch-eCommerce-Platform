import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../api/users";
import type { User } from "../types/users";

export const useUserRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: (userInfo: User) => userRegister(userInfo),
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
