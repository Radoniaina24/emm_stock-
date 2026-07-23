type ProfileRecord = {
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
    jobTitle: string | null;
    department: string | null;
    signature: string | null;
};
export type UserProfileDto = {
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
    jobTitle: string | null;
    department: string | null;
    signature: string | null;
};
export type AuthUserDto = {
    id: string;
    email: string;
    role: string;
    createdAt?: Date;
    name: string;
    avatar: string | null;
    phone: string | null;
    department: string | null;
    profile: UserProfileDto | null;
};
type UserWithProfile = {
    id: string;
    email: string;
    role: string;
    createdAt?: Date;
    profile?: ProfileRecord | null;
};
export declare function toAuthUserDto(user: UserWithProfile): AuthUserDto;
export declare function splitDisplayName(fullName: string): {
    firstName: string;
    lastName: string;
    displayName: string;
};
export declare const userWithProfileSelect: {
    readonly id: true;
    readonly email: true;
    readonly role: true;
    readonly createdAt: true;
    readonly profile: true;
};
export {};
