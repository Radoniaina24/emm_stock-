import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as productsApi from "@/api/products"

export const productsKeys = {
  list: ["products", "list"] as const,
  detail: (id: number) => ["products", id] as const,
}

export function useProductsQuery() {
  return useQuery({
    queryKey: productsKeys.list,
    queryFn: () => productsApi.getProducts(),
  })
}

export function useProductsOptionsQuery() {
  return useQuery({
    queryKey: productsKeys.list,
    queryFn: () => productsApi.getProducts(),
  })
}

export function useProductQuery(id: number) {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: id > 0,
  })
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: productsApi.CreateProductPayload) => productsApi.createProduct(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: productsApi.UpdateProductPayload }) =>
      productsApi.updateProduct(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => productsApi.deleteProduct(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}