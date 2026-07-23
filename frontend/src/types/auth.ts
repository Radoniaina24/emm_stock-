export type User = {
  id: string
  name: string
  email: string
  role: string
  phone?: string | null
  department?: string | null
  avatar?: string | null
  createdAt?: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
  phone?: string
  department?: string
}

export function getUserInitials(user: Pick<User, "name">): string {
  return user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}
