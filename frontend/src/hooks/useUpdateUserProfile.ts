import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../api/users";
import type { User } from "../types/users";

export const useUpdateUserProfile = () => {
  const mutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      updateUserProfile({ userId, data }),
  });

  return {
    updateUserProfile: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
