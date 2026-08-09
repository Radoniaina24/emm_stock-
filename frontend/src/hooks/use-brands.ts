import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as brandsApi from "@/api/brands"

export const brandsKeys = {
  list: ["brands", "list"] as const,
  detail: (id: number) => ["brands", id] as const,
}

export function useBrandsQuery() {
  return useQuery({
    queryKey: brandsKeys.list,
    queryFn: () => brandsApi.getBrands(),
  })
}

export function useBrandQuery(id: number) {
  return useQuery({
    queryKey: brandsKeys.detail(id),
    queryFn: () => brandsApi.getBrand(id),
    enabled: id > 0,
  })
}

export function useCreateBrandMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: brandsApi.CreateBrandPayload) => brandsApi.createBrand(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: brandsKeys.list }) },
  })
}

export function useUpdateBrandMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: brandsApi.UpdateBrandPayload }) =>
      brandsApi.updateBrand(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: brandsKeys.list }) },
  })
}

export function useDeleteBrandMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => brandsApi.deleteBrand(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: brandsKeys.list }) },
  })
}

export function useUploadBrandLogoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => brandsApi.uploadBrandLogo(id, file),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: brandsKeys.list }) },
  })
}

export function useDeleteBrandLogoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => brandsApi.deleteBrandLogo(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: brandsKeys.list }) },
  })
}