import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as usersApi from "@/api/users"

export const usersKeys = {
  list: ["users", "list"] as const,
  nextEmployeeCode: ["users", "next-employee-code"] as const,
}

export function useNextEmployeeCodeQuery() {
  return useQuery({
    queryKey: usersKeys.nextEmployeeCode,
    queryFn: () => usersApi.getNextEmployeeCode(),
  })
}

export function useUsersQuery() {
  return useQuery({
    queryKey: usersKeys.list,
    queryFn: () => usersApi.getUsers(),
  })
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: import("@/types/auth").CreateUserPayload) =>
      usersApi.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list })
    },
  })
}
