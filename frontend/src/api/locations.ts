import { api } from "@/lib/api"

export type Location = {
  id: string
  name: string
  code: string | null
  description: string | null
  isActive: boolean
  warehouseId: string
  parentId: string | null
  parent: { id: string; name: string } | null
  childrenCount: number
  stockLevelsCount: number
  createdAt: string
  updatedAt: string
}

export type LocationQuery = {
  warehouseId?: string
  parentId?: string | null
  search?: string
}

export type CreateLocationPayload = {
  name: string
  code?: string
  description?: string
  warehouseId: string
  parentId?: string | null
  isActive?: boolean
}

export type UpdateLocationPayload = Partial<CreateLocationPayload>

export function getLocations(query?: LocationQuery) {
  const params = new URLSearchParams()
  if (query?.warehouseId) params.set("warehouseId", query.warehouseId)
  if (query?.parentId !== undefined) params.set("parentId", query.parentId ?? "null")
  if (query?.search) params.set("search", query.search)
  const qs = params.toString()
  return api<Location[]>(`/locations${qs ? `?${qs}` : ""}`)
}

export function createLocation(payload: CreateLocationPayload) {
  return api<Location>("/locations", { method: "POST", body: payload })
}

export function updateLocation(id: string, payload: UpdateLocationPayload) {
  return api<Location>(`/locations/${id}`, { method: "PATCH", body: payload })
}

export function deleteLocation(id: string) {
  return api<{ id: string; deleted: boolean }>(`/locations/${id}`, { method: "DELETE" })
}
