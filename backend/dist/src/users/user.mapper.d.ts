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
    department: {
        id: string;
        name: string;
        code: string;
    } | null;
    jobTitle: {
        id: string;
        name: string;
        code: string;
    } | null;
    warehouse: {
        id: string;
        name: string;
    } | null;
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
    department: {
        id: string;
        name: string;
        code: string;
    } | null;
    jobTitle: {
        id: string;
        name: string;
        code: string;
    } | null;
    warehouse: {
        id: string;
        name: string;
    } | null;
};
export type AuthUserDto = {
    id: string;
    email: string;
    username: string;
    status: string;
    role: {
        id: string;
        name: string;
        code: string;
    } | null;
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
    username: string;
    status: string;
    role: {
        id: string;
        name: string;
        code: string;
    } | null;
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
    readonly username: true;
    readonly status: true;
    readonly role: {
        readonly select: {
            readonly id: true;
            readonly name: true;
            readonly code: true;
        };
    };
    readonly createdAt: true;
    readonly profile: {
        readonly include: {
            readonly department: {
                readonly select: {
                    readonly id: true;
                    readonly name: true;
                    readonly code: true;
                };
            };
            readonly jobTitle: {
                readonly select: {
                    readonly id: true;
                    readonly name: true;
                    readonly code: true;
                };
            };
            readonly warehouse: {
                readonly select: {
                    readonly id: true;
                    readonly name: true;
                };
            };
        };
    };
};
export {};
