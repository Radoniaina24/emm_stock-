import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import * as locationsApi from "@/api/locations"
import type { CreateLocationPayload, LocationQuery, UpdateLocationPayload } from "@/api/locations"

export const locationsKeys = {
  all: ["locations"] as const,
  list: (query?: LocationQuery) => ["locations", "list", query ?? {}] as const,
}

export function useLocationsQuery(query?: LocationQuery) {
  return useQuery({
    queryKey: locationsKeys.list(query),
    queryFn: () => locationsApi.getLocations(query),
  })
}

export function useCreateLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLocationPayload) => locationsApi.createLocation(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: locationsKeys.all })
    },
  })
}

export function useUpdateLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateLocationPayload }) =>
      locationsApi.updateLocation(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: locationsKeys.all })
    },
  })
}

export function useDeleteLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => locationsApi.deleteLocation(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: locationsKeys.all })
    },
  })
}
