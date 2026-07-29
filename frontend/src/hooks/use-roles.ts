import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as rolesApi from "@/api/roles"

export const rolesKeys = {
  list: ["roles", "list"] as const,
  detail: (id: string) => ["roles", id] as const,
}

export function useRolesQuery() {
  return useQuery({
    queryKey: rolesKeys.list,
    queryFn: () => rolesApi.getRoles(),
  })
}

export function useRoleQuery(id: string) {
  return useQuery({
    queryKey: rolesKeys.detail(id),
    queryFn: () => rolesApi.getRole(id),
    enabled: !!id,
  })
}

export function useCreateRoleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: rolesApi.CreateRolePayload) => rolesApi.createRole(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: rolesKeys.list }) },
  })
}

export function useUpdateRoleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: rolesApi.UpdateRolePayload }) =>
      rolesApi.updateRole(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: rolesKeys.list }) },
  })
}

export function useDeleteRoleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => rolesApi.deleteRole(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: rolesKeys.list }) },
  })
}
