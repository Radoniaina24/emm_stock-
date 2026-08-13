import { api } from "@/lib/api"

export type Supplier = {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  contact: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: { entries: number; productSuppliers: number }
}

export type CreateSupplierPayload = {
  name: string
  email?: string
  phone?: string
  address?: string
  contact?: string
  isActive?: boolean
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload>

export function createSupplier(payload: CreateSupplierPayload) {
  return api<Supplier>("/suppliers", { method: "POST", body: payload })
}

export function getSuppliers() {
  return api<Supplier[]>("/suppliers")
}

export function getSupplier(id: string) {
  return api<Supplier>(`/suppliers/${id}`)
}

export function updateSupplier(id: string, payload: UpdateSupplierPayload) {
  return api<Supplier>(`/suppliers/${id}`, { method: "PATCH", body: payload })
}

export function deleteSupplier(id: string) {
  return api<void>(`/suppliers/${id}`, { method: "DELETE" })
}
