import { api } from "@/lib/api"
import type { CreateUserPayload, UpdateProfilePayload, User } from "@/types/auth"

export function createUser(payload: CreateUserPayload) {
  return api<User>("/users", {
    method: "POST",
    body: payload,
  })
}

export function getNextEmployeeCode() {
  return api<{ employeeCode: string }>("/users/next-employee-code")
}

export function getUsers() {
  return api<User[]>("/users")
}

export function getMe() {
  return api<User>("/users/me")
}

export function updateProfile(payload: UpdateProfilePayload) {
  return api<User>("/users/me/profile", {
    method: "PATCH",
    body: payload,
  })
}

export function uploadAvatar(file: File) {
  const form = new FormData()
  form.append("file", file)
  return api<User>("/users/me/avatar", {
    method: "POST",
    body: form,
  })
}

export function deleteAvatar() {
  return api<User>("/users/me/avatar", {
    method: "DELETE",
  })
}

export function deleteUser(id: string) {
  return api<{ success: boolean; id: string }>(`/users/${id}`, {
    method: "DELETE",
  })
}
