import { api } from "@/lib/api"

export type Category = {
  id: number
  name: string
  slug: string
  description: string | null
  parentId: number | null
  parent: { id: number; name: string; slug: string } | null
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  _count: { children: number; products: number }
}

export type CreateCategoryPayload = {
  name: string
  slug?: string
  description?: string
  parentId?: number | null
  isActive?: boolean
  sortOrder?: number
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>

export function createCategory(payload: CreateCategoryPayload) {
  return api<Category>("/categories", { method: "POST", body: payload })
}

export function getCategories() {
  return api<Category[]>("/categories")
}

export function getCategory(id: number) {
  return api<Category>(`/categories/${id}`)
}

export function updateCategory(id: number, payload: UpdateCategoryPayload) {
  return api<Category>(`/categories/${id}`, { method: "PATCH", body: payload })
}

export function deleteCategory(id: number) {
  return api<void>(`/categories/${id}`, { method: "DELETE" })
}