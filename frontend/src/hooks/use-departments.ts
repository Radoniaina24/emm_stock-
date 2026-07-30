import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as departmentsApi from "@/api/departments"

export const departmentsKeys = {
  list: ["departments", "list"] as const,
  detail: (id: string) => ["departments", id] as const,
}

export function useDepartmentsQuery() {
  return useQuery({
    queryKey: departmentsKeys.list,
    queryFn: () => departmentsApi.getDepartments(),
  })
}

export function useDepartmentQuery(id: string) {
  return useQuery({
    queryKey: departmentsKeys.detail(id),
    queryFn: () => departmentsApi.getDepartment(id),
    enabled: !!id,
  })
}

export function useCreateDepartmentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: departmentsApi.CreateDepartmentPayload) =>
      departmentsApi.createDepartment(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: departmentsKeys.list }) },
  })
}

export function useUpdateDepartmentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: departmentsApi.UpdateDepartmentPayload }) =>
      departmentsApi.updateDepartment(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: departmentsKeys.list }) },
  })
}

export function useDeleteDepartmentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => departmentsApi.deleteDepartment(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: departmentsKeys.list }) },
  })
}
