import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/users";

export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });

  return {
    deleteUser: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
