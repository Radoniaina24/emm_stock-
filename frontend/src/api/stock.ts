import { api } from "@/lib/api"

export type StockLevelImage = { id: number; url: string; alt: string | null }

export type StockLevel = {
  id: string
  productId: number
  warehouseId: string
  zoneId: string | null
  quantityOnHand: string
  quantityReserved: string
  isLowStock: boolean
  updatedAt: string
  product: {
    id: number
    name: string
    sku: string
    image: StockLevelImage | null
  }
  warehouse: { id: string; name: string }
  zone: { id: string; name: string } | null
  reorderRule: { minQty: string; maxQty: string } | null
}

export type StockSummary = {
  totalLevels: number
  totalOnHand: string
  totalReserved: string
  lowStockCount: number
  outOfStockCount: number
}

export type StockMove = {
  id: string
  productId: number
  warehouseId: string
  type: string
  quantity: string
  unitCost: string | null
  lotNumber: string | null
  expiryDate: string | null
  sourceType: string
  sourceId: string
  date: string
  user: { id: string; username: string }
  product: { id: number; name: string; sku: string }
  warehouse: { id: string; name: string }
}

export type ReorderRule = {
  id: string
  productId: number
  warehouseId: string
  minQty: string
  maxQty: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type Paginated<T> = {
  items: T[]
  meta: { page: number; limit: number; total: number; totalPages: number }
}

export type StockQuery = {
  page?: number
  limit?: number
  productId?: number
  warehouseId?: string
  zoneId?: string
  categoryId?: number
  brandId?: number
  lowStock?: boolean
  onlyActive?: boolean
  search?: string
  sortBy?:
    | "updatedAt"
    | "quantityOnHand"
    | "productName"
    | "productSku"
    | "warehouseName"
  sortOrder?: "asc" | "desc"
}

export type StockMoveQuery = {
  page?: number
  limit?: number
  productId?: number
  warehouseId?: string
  type?: "ENTRY" | "EXIT" | "INVENTORY_ADJUSTMENT" | "TRANSFER"
  lotNumber?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: "date" | "productId" | "warehouseId" | "type"
  sortOrder?: "asc" | "desc"
}

export type ReorderRuleQuery = {
  page?: number
  limit?: number
  productId?: number
  warehouseId?: string
  isActive?: boolean
}

export type AdjustStockPayload = {
  type: "SET" | "INCREMENT" | "DECREMENT"
  quantity: number
  lotNumber?: string
  expiryDate?: string
  unitCost?: number
}

export type CreateReorderRulePayload = {
  productId: number
  warehouseId: string
  minQty: number
  maxQty: number
  isActive?: boolean
}

export type UpdateReorderRulePayload = Partial<CreateReorderRulePayload>

export type TransferLinePayload = {
  productId: number
  fromZoneId?: string
  toZoneId?: string
  quantity: number
  lotNumber?: string
  expiryDate?: string
  unitCost?: number
}

export type TransferStockPayload = {
  fromWarehouseId: string
  toWarehouseId: string
  lines: TransferLinePayload[]
}

export type ReceptionLine = {
  id: string
  productId: number
  product: { id: number; name: string; sku: string }
  quantity: string
  unitCost: string
  lotNumber: string | null
  expiryDate: string | null
}

export type Reception = {
  id: string
  reference: string
  date: string
  description: string | null
  status: string
  supplier: { id: string; name: string }
  warehouse: { id: string; name: string }
  lineCount: number
  createdAt: string
}

export type ReceptionDetail = Reception & {
  user: { id: string; username: string }
  lines: ReceptionLine[]
}

export type ReceptionInputLine = {
  productId: number
  quantity: number
  unitCost: number
  lotNumber?: string
  expiryDate?: string
}

export type ReceptionInput = {
  warehouseId: string
  supplierId: string
  reference?: string
  date?: string
  description?: string
  lines: ReceptionInputLine[]
}

export type ReceptionQuery = {
  page?: number
  limit?: number
  warehouseId?: string
  supplierId?: string
  status?: string
  search?: string
}

export type ExitLine = {
  id: string
  productId: number
  product: { id: number; name: string; sku: string }
  quantity: string
  unitPrice: string
  lotNumber: string | null
}

export type Exit = {
  id: string
  reference: string
  date: string
  type: string
  description: string | null
  status: string
  warehouse: { id: string; name: string }
  lineCount: number
  createdAt: string
}

export type ExitDetail = Exit & {
  user: { id: string; username: string }
  lines: ExitLine[]
}

export type ExitInputLine = {
  productId: number
  quantity: number
  unitPrice?: number
  lotNumber?: string
}

export type ExitInput = {
  warehouseId: string
  type?: string
  reference?: string
  date?: string
  description?: string
  lines: ExitInputLine[]
}

export type ExitQuery = {
  page?: number
  limit?: number
  warehouseId?: string
  type?: string
  status?: string
  search?: string
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

export function getStockLevels(query?: StockQuery) {
  return api<Paginated<StockLevel>>(`/stock${buildQuery(query as any)}`)
}

export function getStockSummary() {
  return api<StockSummary>("/stock/summary")
}

export function getStockLevel(id: string) {
  return api<StockLevel & {
    reorderRules: {
      id: string
      warehouseId: string
      minQty: string
      maxQty: string
      isActive: boolean
    }[]
    recentMoves: StockMove[]
  }>(`/stock/${id}`)
}

export function adjustStock(id: string, payload: AdjustStockPayload) {
  return api<StockLevel>(`/stock/${id}/adjust`, { method: "POST", body: payload })
}

export function getStockMoves(query?: StockMoveQuery) {
  return api<Paginated<StockMove>>(`/stock/moves${buildQuery(query as any)}`)
}

export function getReorderRules(query?: ReorderRuleQuery) {
  return api<Paginated<ReorderRule>>(
    `/stock/reorder-rules${buildQuery(query as any)}`,
  )
}

export function getReorderRule(id: string) {
  return api<ReorderRule>(`/stock/reorder-rules/${id}`)
}

export function createReorderRule(payload: CreateReorderRulePayload) {
  return api<ReorderRule>("/stock/reorder-rules", {
    method: "POST",
    body: payload,
  })
}

export function updateReorderRule(id: string, payload: UpdateReorderRulePayload) {
  return api<ReorderRule>(`/stock/reorder-rules/${id}`, {
    method: "PATCH",
    body: payload,
  })
}

export function deleteReorderRule(id: string) {
  return api<{ id: string; deleted: boolean }>(`/stock/reorder-rules/${id}`, {
    method: "DELETE",
  })
}

export function transferStock(payload: TransferStockPayload) {
  return api<{
    id: string
    lines: { productId: number; from: StockLevel; to: StockLevel }[]
  }>("/stock/transfers", { method: "POST", body: payload })
}

export function getReceptions(query?: ReceptionQuery) {
  return api<Paginated<Reception>>(`/stock/receptions${buildQuery(query as any)}`)
}

export function getReception(id: string) {
  return api<ReceptionDetail>(`/stock/receptions/${id}`)
}

export function createReception(payload: ReceptionInput) {
  return api<ReceptionDetail>("/stock/receptions", {
    method: "POST",
    body: payload,
  })
}

export function getExits(query?: ExitQuery) {
  return api<Paginated<Exit>>(`/stock/exits${buildQuery(query as any)}`)
}

export function getExit(id: string) {
  return api<ExitDetail>(`/stock/exits/${id}`)
}

export function createExit(payload: ExitInput) {
  return api<ExitDetail>("/stock/exits", {
    method: "POST",
    body: payload,
  })
}
