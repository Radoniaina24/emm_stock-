import { api } from "@/lib/api"

export type JobTitle = {
  id: string
  name: string
  code: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateJobTitlePayload = {
  name: string
  code: string
  description?: string
  isActive?: boolean
}

export type UpdateJobTitlePayload = Partial<CreateJobTitlePayload>

export function createJobTitle(payload: CreateJobTitlePayload) {
  return api<JobTitle>("/job-titles", { method: "POST", body: payload })
}

export function getJobTitles() {
  return api<JobTitle[]>("/job-titles")
}

export function getJobTitle(id: string) {
  return api<JobTitle>(`/job-titles/${id}`)
}

export function updateJobTitle(id: string, payload: UpdateJobTitlePayload) {
  return api<JobTitle>(`/job-titles/${id}`, { method: "PATCH", body: payload })
}

export function deleteJobTitle(id: string) {
  return api<void>(`/job-titles/${id}`, { method: "DELETE" })
}
