import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types/users";
import { updateUser } from "../../api/users";
import { userKeys } from "../../const/queryKeys";

interface UpdateUserPayload {
  userId: string;
  data: Partial<User>;
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ userId, data }: UpdateUserPayload) => updateUser({ userId, data }),
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData<User[]>(userKeys.all, (users) =>
        users?.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
      );
      queryClient.setQueryData(userKeys.detail(updatedUser._id as string), updatedUser);

      await queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
