import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as rolePermissionsApi from "@/api/role-permissions"

export const rolePermissionsKeys = {
  detail: (roleId: string) => ["role-permissions", roleId] as const,
}

export function useRolePermissionsQuery(roleId: string) {
  return useQuery({
    queryKey: rolePermissionsKeys.detail(roleId),
    queryFn: () => rolePermissionsApi.getRolePermissions(roleId),
    enabled: !!roleId,
  })
}

export function useSyncRolePermissionsMutation(roleId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (permissionIds: string[]) =>
      rolePermissionsApi.syncRolePermissions(roleId, permissionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePermissionsKeys.detail(roleId) })
    },
  })
}
