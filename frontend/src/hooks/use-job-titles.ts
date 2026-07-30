import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as jobTitlesApi from "@/api/job-titles"

export const jobTitlesKeys = {
  list: ["job-titles", "list"] as const,
  detail: (id: string) => ["job-titles", id] as const,
}

export function useJobTitlesQuery() {
  return useQuery({
    queryKey: jobTitlesKeys.list,
    queryFn: () => jobTitlesApi.getJobTitles(),
  })
}

export function useJobTitleQuery(id: string) {
  return useQuery({
    queryKey: jobTitlesKeys.detail(id),
    queryFn: () => jobTitlesApi.getJobTitle(id),
    enabled: !!id,
  })
}

export function useCreateJobTitleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: jobTitlesApi.CreateJobTitlePayload) =>
      jobTitlesApi.createJobTitle(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: jobTitlesKeys.list }) },
  })
}

export function useUpdateJobTitleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: jobTitlesApi.UpdateJobTitlePayload }) =>
      jobTitlesApi.updateJobTitle(id, payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: jobTitlesKeys.list }) },
  })
}

export function useDeleteJobTitleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => jobTitlesApi.deleteJobTitle(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: jobTitlesKeys.list }) },
  })
}
