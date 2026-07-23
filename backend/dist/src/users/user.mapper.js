"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWithProfileSelect = void 0;
exports.toAuthUserDto = toAuthUserDto;
exports.splitDisplayName = splitDisplayName;
function mapProfile(profile) {
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
    };
}
function toAuthUserDto(user) {
    const profile = user.profile ? mapProfile(user.profile) : null;
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
    };
}
function splitDisplayName(fullName) {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? "User";
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : firstName;
    return { firstName, lastName, displayName: fullName.trim() || firstName };
}
exports.userWithProfileSelect = {
    id: true,
    email: true,
    role: true,
    createdAt: true,
    profile: true,
};
//# sourceMappingURL=user.mapper.js.map