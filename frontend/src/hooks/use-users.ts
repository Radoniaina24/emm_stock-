import { useQuery } from "@tanstack/react-query"
import * as usersApi from "@/api/users"

export const usersKeys = {
  list: ["users", "list"] as const,
}

export function useUsersQuery() {
  return useQuery({
    queryKey: usersKeys.list,
    queryFn: () => usersApi.getUsers(),
  })
}
