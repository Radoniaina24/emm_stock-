import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as unitsApi from "@/api/units-of-measure"

export const unitsOfMeasureKeys = {
  list: ["units-of-measure", "list"] as const,
  detail: (id: number) => ["units-of-measure", id] as const,
}

export function useUnitsOfMeasureQuery() {
  return useQuery({
    queryKey: unitsOfMeasureKeys.list,
    queryFn: () => unitsApi.getUnitsOfMeasure(),
  })
}

export function useUnitOfMeasureQuery(id: number) {
  return useQuery({
    queryKey: unitsOfMeasureKeys.detail(id),
    queryFn: () => unitsApi.getUnitOfMeasure(id),
    enabled: id > 0,
  })
}

export function useCreateUnitOfMeasureMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: unitsApi.CreateUnitOfMeasurePayload) => unitsApi.createUnitOfMeasure(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: unitsOfMeasureKeys.list }) },
  })
}

export function useUpdateUnitOfMeasureMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: unitsApi.UpdateUnitOfMeasurePayload }) =>
      unitsApi.updateUnitOfMeasure(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: unitsOfMeasureKeys.list }) },
  })
}

export function useDeleteUnitOfMeasureMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => unitsApi.deleteUnitOfMeasure(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: unitsOfMeasureKeys.list }) },
  })
}