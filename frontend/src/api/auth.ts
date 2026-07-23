import { api } from "@/lib/api"
import type { LoginPayload, RegisterPayload, User } from "@/types/auth"

export function login(payload: LoginPayload) {
  return api<User>("/auth/login", {
    method: "POST",
    body: payload,
  })
}

export function register(payload: RegisterPayload) {
  return api<User>("/auth/register", {
    method: "POST",
    body: payload,
  })
}

export function logout() {
  return api<{ message: string }>("/auth/logout", {
    method: "POST",
  })
}

export function getMe() {
  return api<User>("/auth/me")
}
