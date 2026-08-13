import { api } from "@/lib/api"

export type ProductSupplier = {
  id: string
  productId: number
  supplierId: string
  supplierSku: string | null
  price: string
  minQty: string
  leadTimeDays: number | null
  isPreferred: boolean
  createdAt: string
  updatedAt: string
  product: { id: number; name: string; sku: string }
  supplier: { id: string; name: string }
}

export type CreateProductSupplierPayload = {
  productId: number
  supplierId: string
  supplierSku?: string
  price: number
  minQty?: number
  leadTimeDays?: number
  isPreferred?: boolean
}

export type UpdateProductSupplierPayload = Partial<{
  supplierSku: string
  price: number
  minQty: number
  leadTimeDays: number
  isPreferred: boolean
}>

export function getProductSuppliers(query?: {
  productId?: number
  supplierId?: string
}) {
  const params = new URLSearchParams()
  if (query?.productId !== undefined) params.set("productId", String(query.productId))
  if (query?.supplierId) params.set("supplierId", query.supplierId)
  const qs = params.toString()
  return api<ProductSupplier[]>(`/product-suppliers${qs ? `?${qs}` : ""}`)
}

export function getProductSupplier(id: string) {
  return api<ProductSupplier>(`/product-suppliers/${id}`)
}

export function createProductSupplier(payload: CreateProductSupplierPayload) {
  return api<ProductSupplier>("/product-suppliers", { method: "POST", body: payload })
}

export function updateProductSupplier(id: string, payload: UpdateProductSupplierPayload) {
  return api<ProductSupplier>(`/product-suppliers/${id}`, { method: "PATCH", body: payload })
}

export function deleteProductSupplier(id: string) {
  return api<void>(`/product-suppliers/${id}`, { method: "DELETE" })
}
