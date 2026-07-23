import { api } from "@/lib/api"
import type { UpdateProfilePayload, User } from "@/types/auth"

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
