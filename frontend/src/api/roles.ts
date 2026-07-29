import { api } from "@/lib/api"

export type Role = {
  id: string
  name: string
  code: string
  description: string | null
  isSystem: boolean
  isActive: boolean
  userCount: number
  createdAt: string
  updatedAt: string
  rolePermissions?: { permission: { id: string; module: string; action: string; code: string } }[]
}

export type CreateRolePayload = {
  name: string
  code: string
  description?: string
  isSystem?: boolean
  isActive?: boolean
}

export type UpdateRolePayload = Partial<CreateRolePayload>

export function createRole(payload: CreateRolePayload) {
  return api<Role>("/roles", { method: "POST", body: payload })
}

export function getRoles() {
  return api<Role[]>("/roles")
}

export function getRole(id: string) {
  return api<Role>(`/roles/${id}`)
}

export function updateRole(id: string, payload: UpdateRolePayload) {
  return api<Role>(`/roles/${id}`, { method: "PATCH", body: payload })
}

export function deleteRole(id: string) {
  return api<void>(`/roles/${id}`, { method: "DELETE" })
}
