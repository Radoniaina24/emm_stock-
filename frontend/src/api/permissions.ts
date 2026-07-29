import { api } from "@/lib/api"

export type Permission = {
  id: string
  module: string
  action: string
  code: string
  description: string | null
  createdAt: string
}

export type CreatePermissionPayload = {
  module: string
  action: string
  code: string
  description?: string
}

export type UpdatePermissionPayload = Partial<CreatePermissionPayload>

export function createPermission(payload: CreatePermissionPayload) {
  return api<Permission>("/permissions", { method: "POST", body: payload })
}

export function getPermissions() {
  return api<Permission[]>("/permissions")
}

export function getPermission(id: string) {
  return api<Permission>(`/permissions/${id}`)
}

export function updatePermission(id: string, payload: UpdatePermissionPayload) {
  return api<Permission>(`/permissions/${id}`, { method: "PATCH", body: payload })
}

export function deletePermission(id: string) {
  return api<void>(`/permissions/${id}`, { method: "DELETE" })
}
