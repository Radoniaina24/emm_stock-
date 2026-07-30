import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as warehousesApi from "@/api/warehouses"

export const warehousesKeys = {
  list: ["warehouses", "list"] as const,
  detail: (id: string) => ["warehouses", id] as const,
}

export function useWarehousesQuery() {
  return useQuery({
    queryKey: warehousesKeys.list,
    queryFn: () => warehousesApi.getWarehouses(),
  })
}

export function useWarehouseQuery(id: string) {
  return useQuery({
    queryKey: warehousesKeys.detail(id),
    queryFn: () => warehousesApi.getWarehouse(id),
    enabled: !!id,
  })
}

export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: warehousesApi.CreateWarehousePayload) =>
      warehousesApi.createWarehouse(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: warehousesKeys.list }) },
  })
}

export function useUpdateWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: warehousesApi.UpdateWarehousePayload }) =>
      warehousesApi.updateWarehouse(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: warehousesKeys.list }) },
  })
}

export function useDeleteWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => warehousesApi.deleteWarehouse(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: warehousesKeys.list }) },
  })
}
