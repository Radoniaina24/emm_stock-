import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as suppliersApi from "@/api/suppliers"

export const suppliersKeys = {
  list: ["suppliers", "list"] as const,
  detail: (id: string) => ["suppliers", id] as const,
}

export function useSuppliersQuery() {
  return useQuery({
    queryKey: suppliersKeys.list,
    queryFn: () => suppliersApi.getSuppliers(),
  })
}

export function useSupplierQuery(id: string) {
  return useQuery({
    queryKey: suppliersKeys.detail(id),
    queryFn: () => suppliersApi.getSupplier(id),
    enabled: !!id,
  })
}

export function useCreateSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: suppliersApi.CreateSupplierPayload) =>
      suppliersApi.createSupplier(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suppliersKeys.list })
    },
  })
}

export function useUpdateSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: suppliersApi.UpdateSupplierPayload }) =>
      suppliersApi.updateSupplier(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suppliersKeys.list })
    },
  })
}

export function useDeleteSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => suppliersApi.deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suppliersKeys.list })
    },
  })
}
