import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as categoriesApi from "@/api/categories"

export const categoriesKeys = {
  list: ["categories", "list"] as const,
  detail: (id: number) => ["categories", id] as const,
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoriesKeys.list,
    queryFn: () => categoriesApi.getCategories(),
  })
}

export function useCategoryQuery(id: number) {
  return useQuery({
    queryKey: categoriesKeys.detail(id),
    queryFn: () => categoriesApi.getCategory(id),
    enabled: id > 0,
  })
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: categoriesApi.CreateCategoryPayload) =>
      categoriesApi.createCategory(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: categoriesKeys.list }) },
  })
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: categoriesApi.UpdateCategoryPayload }) =>
      categoriesApi.updateCategory(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: categoriesKeys.list }) },
  })
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => categoriesApi.deleteCategory(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: categoriesKeys.list }) },
  })
}