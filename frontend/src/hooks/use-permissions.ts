import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as permissionsApi from "@/api/permissions"

export const permissionsKeys = {
  list: ["permissions", "list"] as const,
}

export function usePermissionsQuery() {
  return useQuery({
    queryKey: permissionsKeys.list,
    queryFn: () => permissionsApi.getPermissions(),
  })
}

export function useCreatePermissionMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: permissionsApi.CreatePermissionPayload) => permissionsApi.createPermission(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: permissionsKeys.list }) },
  })
}

export function useUpdatePermissionMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: permissionsApi.UpdatePermissionPayload }) =>
      permissionsApi.updatePermission(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: permissionsKeys.list }) },
  })
}

export function useDeletePermissionMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => permissionsApi.deletePermission(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: permissionsKeys.list }) },
  })
}
