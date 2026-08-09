import { api } from "@/lib/api"

export type UnitOfMeasure = {
  id: number
  name: string
  code: string
  symbol: string | null
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: { products: number }
}

export type CreateUnitOfMeasurePayload = {
  name: string
  code: string
  symbol?: string
  description?: string
  isActive?: boolean
}

export type UpdateUnitOfMeasurePayload = Partial<CreateUnitOfMeasurePayload>

export function createUnitOfMeasure(payload: CreateUnitOfMeasurePayload) {
  return api<UnitOfMeasure>("/units-of-measure", { method: "POST", body: payload })
}

export function getUnitsOfMeasure() {
  return api<UnitOfMeasure[]>("/units-of-measure")
}

export function getUnitOfMeasure(id: number) {
  return api<UnitOfMeasure>(`/units-of-measure/${id}`)
}

export function updateUnitOfMeasure(id: number, payload: UpdateUnitOfMeasurePayload) {
  return api<UnitOfMeasure>(`/units-of-measure/${id}`, { method: "PATCH", body: payload })
}

export function deleteUnitOfMeasure(id: number) {
  return api<void>(`/units-of-measure/${id}`, { method: "DELETE" })
}