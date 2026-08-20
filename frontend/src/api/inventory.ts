import { api } from "@/lib/api"

export type InventoryStatus = "en_cours" | "valide" | "annule"

export type InventoryLine = {
  id: string
  productId: number
  productName: string
  sku: string | null
  quantityCounted: string
  quantityExpected: string
  difference: string
}

export type Inventory = {
  id: string
  reference: string
  date: string
  status: InventoryStatus
  description: string | null
  warehouseId: string
  warehouseName: string
  userId: string
  lines: InventoryLine[]
  createdAt: string
  updatedAt: string
}

export type PaginatedInventories = {
  items: Inventory[]
  meta: { page: number; limit: number; total: number; totalPages: number }
}

export type InventoryQuery = {
  page?: number
  limit?: number
  warehouseId?: string
  status?: InventoryStatus
  search?: string
}

export type CreateInventoryPayload = {
  warehouseId: string
  description?: string
  lines: { productId: number; quantityCounted: number }[]
}

export type AddInventoryLinePayload = {
  productId: number
  quantityCounted: number
}

function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return ""
  const usp = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue
    usp.append(key, String(value))
  }
  const s = usp.toString()
  return s ? `?${s}` : ""
}

export function getInventories(query?: InventoryQuery) {
  return api<PaginatedInventories>(`/inventories${buildQuery(query as any)}`)
}

export function getInventory(id: string) {
  return api<Inventory>(`/inventories/${id}`)
}

export function createInventory(payload: CreateInventoryPayload) {
  return api<Inventory>("/inventories", { method: "POST", body: payload })
}

export function addInventoryLine(id: string, payload: AddInventoryLinePayload) {
  return api<Inventory>(`/inventories/${id}/lines`, {
    method: "POST",
    body: payload,
  })
}

export function removeInventoryLine(id: string, lineId: string) {
  return api<Inventory>(`/inventories/${id}/lines/${lineId}`, {
    method: "DELETE",
  })
}

export function validateInventory(id: string) {
  return api<Inventory>(`/inventories/${id}/validate`, { method: "POST" })
}

export function cancelInventory(id: string) {
  return api<Inventory>(`/inventories/${id}/cancel`, { method: "POST" })
}
