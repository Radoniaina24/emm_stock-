import { api } from "@/lib/api"

export type ProductOption = {
  id: string
  reference: string
  name: string
  isActive: boolean
  unit: { symbol: string | null; code: string }
}

export function getProductsOptions() {
  return api<ProductOption[]>("/products")
}