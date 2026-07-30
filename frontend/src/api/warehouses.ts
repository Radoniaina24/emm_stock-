import { api } from "@/lib/api"

export type Warehouse = {
  id: string
  name: string
  location: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateWarehousePayload = {
  name: string
  location?: string
  isActive?: boolean
}

export type UpdateWarehousePayload = Partial<CreateWarehousePayload>

export function createWarehouse(payload: CreateWarehousePayload) {
  return api<Warehouse>("/warehouses", { method: "POST", body: payload })
}

export function getWarehouses() {
  return api<Warehouse[]>("/warehouses")
}

export function getWarehouse(id: string) {
  return api<Warehouse>(`/warehouses/${id}`)
}

export function updateWarehouse(id: string, payload: UpdateWarehousePayload) {
  return api<Warehouse>(`/warehouses/${id}`, { method: "PATCH", body: payload })
}

export function deleteWarehouse(id: string) {
  return api<void>(`/warehouses/${id}`, { method: "DELETE" })
}
