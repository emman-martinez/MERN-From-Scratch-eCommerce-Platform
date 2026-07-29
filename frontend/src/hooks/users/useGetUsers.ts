import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../../const/queryKeys";
import { getUsers } from "../../api/users";

export const useGetUsers = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
  });

  return { data, error, isLoading, refetch };
};
