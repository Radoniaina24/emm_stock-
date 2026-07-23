type ProfileRecord = {
  firstName: string
  lastName: string
  displayName: string
  profilePhoto: string | null
  phone: string | null
  secondaryPhone: string | null
  birthDate: Date | null
  gender: string | null
  address: string | null
  city: string | null
  region: string | null
  country: string | null
  postalCode: string | null
  jobTitle: string | null
  department: string | null
  signature: string | null
}

export type UserProfileDto = {
  firstName: string
  lastName: string
  displayName: string
  profilePhoto: string | null
  phone: string | null
  secondaryPhone: string | null
  birthDate: string | null
  gender: string | null
  address: string | null
  city: string | null
  region: string | null
  country: string | null
  postalCode: string | null
  jobTitle: string | null
  department: string | null
  signature: string | null
}

export type AuthUserDto = {
  id: string
  email: string
  role: string
  createdAt?: Date
  name: string
  avatar: string | null
  phone: string | null
  department: string | null
  profile: UserProfileDto | null
}

type UserWithProfile = {
  id: string
  email: string
  role: string
  createdAt?: Date
  profile?: ProfileRecord | null
}

function mapProfile(profile: ProfileRecord): UserProfileDto {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    displayName: profile.displayName,
    profilePhoto: profile.profilePhoto,
    phone: profile.phone,
    secondaryPhone: profile.secondaryPhone,
    birthDate: profile.birthDate
      ? profile.birthDate.toISOString().slice(0, 10)
      : null,
    gender: profile.gender,
    address: profile.address,
    city: profile.city,
    region: profile.region,
    country: profile.country,
    postalCode: profile.postalCode,
    jobTitle: profile.jobTitle,
    department: profile.department,
    signature: profile.signature,
  }
}

export function toAuthUserDto(user: UserWithProfile): AuthUserDto {
  const profile = user.profile ? mapProfile(user.profile) : null
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    name: profile?.displayName ?? user.email,
    avatar: profile?.profilePhoto ?? null,
    phone: profile?.phone ?? null,
    department: profile?.department ?? null,
    profile,
  }
}

export function splitDisplayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0] ?? "User"
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : firstName
  return { firstName, lastName, displayName: fullName.trim() || firstName }
}

export const userWithProfileSelect = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  profile: true,
} as const
