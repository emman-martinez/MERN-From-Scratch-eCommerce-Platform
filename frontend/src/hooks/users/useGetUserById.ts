import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/users";
import { userKeys } from "../../const/queryKeys";

export const useGetUserById = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });

  return { data, error, isPending };
};
