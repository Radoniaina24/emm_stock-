type ProfileRecord = {
  employeeCode: string;
  firstName: string;
  lastName: string;
  displayName: string;
  profilePhoto: string | null;
  phone: string | null;
  secondaryPhone: string | null;
  birthDate: Date | null;
  gender: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
  signature: string | null;
  department: { id: string; name: string; code: string } | null;
  jobTitle: { id: string; name: string; code: string } | null;
  warehouse: { id: string; name: string } | null;
};

export type UserProfileDto = {
  employeeCode: string;
  firstName: string;
  lastName: string;
  displayName: string;
  profilePhoto: string | null;
  phone: string | null;
  secondaryPhone: string | null;
  birthDate: string | null;
  gender: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
  signature: string | null;
  department: { id: string; name: string; code: string } | null;
  jobTitle: { id: string; name: string; code: string } | null;
  warehouse: { id: string; name: string } | null;
};

export type AuthUserDto = {
  id: string;
  email: string;
  username: string;
  status: string;
  role: { id: string; name: string; code: string } | null;
  createdAt?: Date;
  /** backward-compat: shorthands */
  name: string;
  avatar: string | null;
  phone: string | null;
  department: string | null;
  profile: UserProfileDto | null;
};

type UserWithProfile = {
  id: string;
  email: string;
  username: string;
  status: string;
  role: { id: string; name: string; code: string } | null;
  createdAt?: Date;
  profile?: ProfileRecord | null;
};

function mapProfile(profile: ProfileRecord): UserProfileDto {
  return {
    employeeCode: profile.employeeCode,
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
    signature: profile.signature,
    department: profile.department,
    jobTitle: profile.jobTitle,
    warehouse: profile.warehouse,
  };
}

export function toAuthUserDto(user: UserWithProfile): AuthUserDto {
  const profile = user.profile ? mapProfile(user.profile) : null;
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    status: user.status,
    role: user.role,
    createdAt: user.createdAt,
    name: profile?.displayName ?? user.email,
    avatar: profile?.profilePhoto ?? null,
    phone: profile?.phone ?? null,
    department: profile?.department?.name ?? null,
    profile,
  };
}

export function splitDisplayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? 'User';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : firstName;
  return { firstName, lastName, displayName: fullName.trim() || firstName };
}

export const userWithProfileSelect = {
  id: true,
  email: true,
  username: true,
  status: true,
  role: { select: { id: true, name: true, code: true } },
  createdAt: true,
  profile: {
    include: {
      department: { select: { id: true, name: true, code: true } },
      jobTitle: { select: { id: true, name: true, code: true } },
      warehouse: { select: { id: true, name: true } },
    },
  },
} as const;
