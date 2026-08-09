import { api, resolveUploadUrl } from "@/lib/api"

export type Brand = {
  id: number
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  _count: { products: number }
}

export type CreateBrandPayload = {
  name: string
  slug?: string
  description?: string
  isActive?: boolean
  sortOrder?: number
}

export type UpdateBrandPayload = Partial<CreateBrandPayload>

export function createBrand(payload: CreateBrandPayload) {
  return api<Brand>("/brands", { method: "POST", body: payload })
}

export function getBrands() {
  return api<Brand[]>("/brands")
}

export function getBrand(id: number) {
  return api<Brand>(`/brands/${id}`)
}

export function updateBrand(id: number, payload: UpdateBrandPayload) {
  return api<Brand>(`/brands/${id}`, { method: "PATCH", body: payload })
}

export function deleteBrand(id: number) {
  return api<void>(`/brands/${id}`, { method: "DELETE" })
}

export function uploadBrandLogo(id: number, file: File) {
  const form = new FormData()
  form.append("file", file)
  return api<Brand>(`/brands/${id}/logo`, { method: "POST", body: form })
}

export function deleteBrandLogo(id: number) {
  return api<Brand>(`/brands/${id}/logo`, { method: "DELETE" })
}

export function brandLogoUrl(brand: Pick<Brand, "logoUrl">): string | null {
  return resolveUploadUrl(brand.logoUrl)
}