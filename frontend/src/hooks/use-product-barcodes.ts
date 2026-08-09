import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as productBarcodesApi from "@/api/product-barcodes"

export const productBarcodesKeys = {
  list: ["product-barcodes", "list"] as const,
  detail: (id: number) => ["product-barcodes", id] as const,
}

export function useProductBarcodesQuery() {
  return useQuery({
    queryKey: productBarcodesKeys.list,
    queryFn: () => productBarcodesApi.getProductBarcodes(),
  })
}

export function useProductBarcodeQuery(id: number) {
  return useQuery({
    queryKey: productBarcodesKeys.detail(id),
    queryFn: () => productBarcodesApi.getProductBarcode(id),
    enabled: id > 0,
  })
}

export function useCreateProductBarcodeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: productBarcodesApi.CreateProductBarcodePayload) =>
      productBarcodesApi.createProductBarcode(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productBarcodesKeys.list })
    },
  })
}

export function useUpdateProductBarcodeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: productBarcodesApi.UpdateProductBarcodePayload }) =>
      productBarcodesApi.updateProductBarcode(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productBarcodesKeys.list })
    },
  })
}

export function useDeleteProductBarcodeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => productBarcodesApi.deleteProductBarcode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productBarcodesKeys.list })
    },
  })
}