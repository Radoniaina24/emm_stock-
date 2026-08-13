import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as psApi from "@/api/product-suppliers"

export const productSuppliersKeys = {
  list: (query?: Record<string, unknown>) => ["product-suppliers", "list", query ?? {}] as const,
  detail: (id: string) => ["product-suppliers", id] as const,
}

export function useProductSuppliersQuery(query?: { productId?: number; supplierId?: string }) {
  return useQuery({
    queryKey: productSuppliersKeys.list(query),
    queryFn: () => psApi.getProductSuppliers(query),
  })
}

export function useProductSupplierQuery(id: string) {
  return useQuery({
    queryKey: productSuppliersKeys.detail(id),
    queryFn: () => psApi.getProductSupplier(id),
    enabled: !!id,
  })
}

export function useCreateProductSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: psApi.CreateProductSupplierPayload) =>
      psApi.createProductSupplier(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-suppliers"] })
    },
  })
}

export function useUpdateProductSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: psApi.UpdateProductSupplierPayload }) =>
      psApi.updateProductSupplier(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-suppliers"] })
    },
  })
}

export function useDeleteProductSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => psApi.deleteProductSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-suppliers"] })
    },
  })
}
