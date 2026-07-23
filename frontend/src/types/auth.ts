export type UserProfile = {
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
  jobTitle?: string | null
  department?: string | null
  signature?: string | null
}

export type User = {
  id: string
  email: string
  role: string
  /** Raccourci = profile.displayName */
  name: string
  /** Raccourci = profile.profilePhoto */
  avatar?: string | null
  phone?: string | null
  department?: string | null
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

export type UpdateProfilePayload = Partial<
  Omit<UserProfile, "profilePhoto">
>

export function getUserInitials(user: Pick<User, "name"> & { profile?: UserProfile | null }): string {
  const label = user.profile?.displayName || user.name
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}
