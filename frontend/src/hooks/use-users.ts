import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as usersApi from "@/api/users"

export const usersKeys = {
  list: ["users", "list"] as const,
  nextEmployeeCode: ["users", "next-employee-code"] as const,
}

export function userKey(id: string) {
  return ["users", "detail", id] as const
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

export function useUserQuery(id: string | undefined) {
  return useQuery({
    queryKey: userKey(id ?? ""),
    queryFn: () => usersApi.getUser(id!),
    enabled: !!id,
  })
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: import("@/types/auth").CreateUserPayload) =>
      usersApi.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list })
      queryClient.invalidateQueries({ queryKey: usersKeys.nextEmployeeCode })
    },
  })
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list })
    },
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: import("@/types/auth").UpdateUserPayload }) =>
      usersApi.updateUser(id, payload),
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list })
      queryClient.invalidateQueries({ queryKey: userKey(id) })
    },
  })
}
