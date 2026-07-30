import { api } from "@/lib/api"

export type Department = {
  id: string
  name: string
  code: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateDepartmentPayload = {
  name: string
  code: string
  description?: string
  isActive?: boolean
}

export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>

export function createDepartment(payload: CreateDepartmentPayload) {
  return api<Department>("/departments", { method: "POST", body: payload })
}

export function getDepartments() {
  return api<Department[]>("/departments")
}

export function getDepartment(id: string) {
  return api<Department>(`/departments/${id}`)
}

export function updateDepartment(id: string, payload: UpdateDepartmentPayload) {
  return api<Department>(`/departments/${id}`, { method: "PATCH", body: payload })
}

export function deleteDepartment(id: string) {
  return api<void>(`/departments/${id}`, { method: "DELETE" })
}
