export type UserProfile = {
  employeeCode: string
  firstName: string
  lastName: string
  displayName: string
  profilePhoto?: string | null
  phone?: string | null
  secondaryPhone?: string | null
  birthDate?: string | null
  gender?: string | null
  address?: string | null
  city?: string | null
  region?: string | null
  country?: string | null
  postalCode?: string | null
  jobTitle?: { id: string; name: string; code: string } | null
  department?: { id: string; name: string; code: string } | null
  warehouse?: { id: string; name: string } | null
  signature?: string | null
}

export type User = {
  id: string
  email: string
  username: string
  status: string
  role: { id: string; name: string; code: string } | null
  /** Raccourci = profile.displayName */
  name: string
  /** Raccourci = profile.profilePhoto */
  avatar?: string | null
  phone?: string | null
  createdAt?: string
  profile?: UserProfile | null
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

export type CreateUserPayload = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  employeeCode: string
  roleId: string
  departmentId: string
  jobTitleId: string
  warehouseId?: string
}

export type UpdateProfilePayload = Partial<
  Omit<UserProfile, "profilePhoto">
>

export function getUserInitials(user: Pick<User, "name"> & { profile?: UserProfile | null }): string {
  const label = getUserDisplayName(user)
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function getUserDisplayName(user: Pick<User, "name"> & { profile?: UserProfile | null }): string {
  const p = user.profile
  const fullName = [p?.firstName, p?.lastName].filter(Boolean).join(" ").trim()
  return fullName || p?.displayName || user.name || "Utilisateur"
}
