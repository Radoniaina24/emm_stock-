import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import * as inventoryApi from "@/api/inventory"

export const inventoryKeys = {
  all: ["inventories"] as const,
  list: (query?: inventoryApi.InventoryQuery) =>
    ["inventories", "list", query ?? {}] as const,
  detail: (id: string) => ["inventories", "detail", id] as const,
}

export function useInventoriesQuery(query?: inventoryApi.InventoryQuery) {
  return useQuery({
    queryKey: inventoryKeys.list(query),
    queryFn: () => inventoryApi.getInventories(query),
  })
}

export function useInventoryQuery(id: string) {
  return useQuery({
    queryKey: inventoryKeys.detail(id),
    queryFn: () => inventoryApi.getInventory(id),
    enabled: Boolean(id),
  })
}

export function useCreateInventoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: inventoryApi.CreateInventoryPayload) =>
      inventoryApi.createInventory(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.all })
    },
  })
}

export function useAddInventoryLineMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: inventoryApi.AddInventoryLinePayload
    }) => inventoryApi.addInventoryLine(id, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(variables.id) })
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.list() })
    },
  })
}

export function useRemoveInventoryLineMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, lineId }: { id: string; lineId: string }) =>
      inventoryApi.removeInventoryLine(id, lineId),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(variables.id) })
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.list() })
    },
  })
}

export function useValidateInventoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => inventoryApi.validateInventory(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(id) })
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.list() })
    },
  })
}

export function useCancelInventoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => inventoryApi.cancelInventory(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(id) })
      void queryClient.invalidateQueries({ queryKey: inventoryKeys.list() })
    },
  })
}
