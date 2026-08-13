import { api } from "@/lib/api"
import type { ProductType, TrackingType } from "@/api/products"

export type ImportProductRow = {
  sku: string
  name: string
  slug?: string
  description?: string
  type?: ProductType
  brandId?: number
  categoryId?: number
  unitId: number
  costPrice?: number
  salePrice?: number
  taxRate?: number
  tracking?: TrackingType
  hasExpiry?: boolean
  weight?: number
  length?: number
  width?: number
  height?: number
  isActive?: boolean
}

export type ImportReport = {
  total: number
  created: number
  updated: number
  errors: { row: number; sku: string | null; errors: string[] }[]
}

export function importProducts(rows: ImportProductRow[]) {
  return api<ImportReport>("/products/import", { method: "POST", body: { rows } })
}
