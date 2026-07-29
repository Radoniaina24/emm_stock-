import { api } from "@/lib/api"
import type { Permission } from "./permissions"

export type RoleBrief = {
  id: string
  name: string
  code: string
}

export type RolePermissionsResponse = {
  role: RoleBrief
  permissions: Permission[]
  assignedPermissionIds: string[]
}

export function getRolePermissions(roleId: string) {
  return api<RolePermissionsResponse>(`/roles/${roleId}/permissions`)
}

export function syncRolePermissions(roleId: string, permissionIds: string[]) {
  return api<RolePermissionsResponse>(`/roles/${roleId}/permissions`, {
    method: "PUT",
    body: { permissionIds },
  })
}
