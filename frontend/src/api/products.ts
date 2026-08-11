import { api, resolveUploadUrl } from "@/lib/api"
import type { BarcodeType } from "@/api/product-barcodes"

export function resolveImageUrl(image: { url: string } | null | undefined): string | null {
  return image ? resolveUploadUrl(image.url) : null
}

export type ProductType = "STORABLE" | "CONSUMABLE" | "SERVICE"
export type TrackingType = "NONE" | "LOT" | "SERIAL"

export type Product = {
  id: number
  sku: string
  name: string
  slug: string
  description: string | null
  descriptionPurchase: string | null
  descriptionSale: string | null
  internalNotes: string | null
  type: ProductType
  brandId: number | null
  categoryId: number | null
  unitId: number
  purchaseUnitId: number | null
  saleUnitId: number | null
  costPrice: string
  salePrice: string
  taxRate: string
  tracking: TrackingType
  hasExpiry: boolean
  shelfLifeDays: number | null
  weight: string | null
  length: string | null
  width: string | null
  height: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  category: { id: number; name: string; slug: string } | null
  brand: { id: number; name: string; slug: string } | null
  unit: { id: number; name: string; code: string; symbol: string | null }
  purchaseUnit: { id: number; name: string; code: string; symbol: string | null } | null
  saleUnit: { id: number; name: string; code: string; symbol: string | null } | null
  image: { id: number; url: string; alt: string } | null
  _count: { images: number; barcodes: number }
}

export type ProductImage = {
  id: number
  url: string
  storageKey: string | null
  alt: string | null
  isPrimary: boolean
  sortOrder: number
}

export type ProductDetail = Product & {
  images: ProductImage[]
  barcodes: { id: number; code: string; type: BarcodeType; isPrimary: boolean; createdAt: string }[]
}

export type ProductBarcodeSummary = ProductDetail["barcodes"][number]

export type CreateProductPayload = {
  sku: string
  name: string
  slug?: string
  description?: string
  descriptionPurchase?: string
  descriptionSale?: string
  internalNotes?: string
  type?: ProductType
  brandId?: number
  categoryId?: number
  unitId: number
  purchaseUnitId?: number
  saleUnitId?: number
  costPrice?: number
  salePrice?: number
  taxRate?: number
  tracking?: TrackingType
  hasExpiry?: boolean
  shelfLifeDays?: number
  weight?: number
  length?: number
  width?: number
  height?: number
  isActive?: boolean
}

export type UpdateProductPayload = Partial<CreateProductPayload>

export function createProduct(payload: CreateProductPayload) {
  return api<Product>("/products", { method: "POST", body: payload })
}

export function getProducts() {
  return api<Product[]>("/products")
}

export function getProduct(id: number) {
  return api<ProductDetail>(`/products/${id}`)
}

export function updateProduct(id: number, payload: UpdateProductPayload) {
  return api<Product>(`/products/${id}`, { method: "PATCH", body: payload })
}

export function deleteProduct(id: number) {
  return api<void>(`/products/${id}`, { method: "DELETE" })
}

export function uploadProductImage(productId: number, file: File) {
  const form = new FormData()
  form.append("file", file)
  return api<ProductImage>(`/products/${productId}/images`, { method: "POST", body: form })
}

export function updateProductImage(
  imageId: number,
  payload: { isPrimary?: boolean; alt?: string },
) {
  return api<ProductImage>(`/products/images/${imageId}`, { method: "PATCH", body: payload })
}

export function deleteProductImage(imageId: number) {
  return api<void>(`/products/images/${imageId}`, { method: "DELETE" })
}