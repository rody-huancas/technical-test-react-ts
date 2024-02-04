import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { User } from "../types";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      users: User[];
      nextCursor?: number;
    }>({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) || [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
