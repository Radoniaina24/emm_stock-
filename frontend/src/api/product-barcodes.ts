import { api } from "@/lib/api"

export const BARCODE_TYPES = [
  "EAN8",
  "EAN13",
  "EAN14",
  "UPC_A",
  "UPC_E",
  "CODE128",
  "CODE39",
  "ITF14",
  "GS1_128",
  "QR",
  "OTHER",
] as const

export type BarcodeType = (typeof BARCODE_TYPES)[number]

export type ProductBarcode = {
  id: number
  productId: string
  code: string
  type: BarcodeType
  isPrimary: boolean
  createdAt: string
  updatedAt: string
  product: {
    id: string
    reference: string
    name: string
    unit: { symbol: string | null }
  }
}

export type CreateProductBarcodePayload = {
  productId: string
  code: string
  type?: BarcodeType
  isPrimary?: boolean
}

export type UpdateProductBarcodePayload = Partial<CreateProductBarcodePayload>

export function createProductBarcode(payload: CreateProductBarcodePayload) {
  return api<ProductBarcode>("/product-barcodes", { method: "POST", body: payload })
}

export function getProductBarcodes() {
  return api<ProductBarcode[]>("/product-barcodes")
}

export function getProductBarcode(id: number) {
  return api<ProductBarcode>(`/product-barcodes/${id}`)
}

export function updateProductBarcode(id: number, payload: UpdateProductBarcodePayload) {
  return api<ProductBarcode>(`/product-barcodes/${id}`, { method: "PATCH", body: payload })
}

export function deleteProductBarcode(id: number) {
  return api<void>(`/product-barcodes/${id}`, { method: "DELETE" })
}
