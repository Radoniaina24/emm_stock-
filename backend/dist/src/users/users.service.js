"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const user_mapper_js_1 = require("./user.mapper.js");
const AVATARS_DIR = (0, path_1.join)(process.cwd(), "uploads", "avatars");
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: user_mapper_js_1.userWithProfileSelect,
        });
        if (!user)
            throw new common_1.NotFoundException("Utilisateur introuvable");
        return (0, user_mapper_js_1.toAuthUserDto)(user);
    }
    async updateProfile(userId, dto) {
        const existing = await this.prisma.userProfile.findUnique({
            where: { userId },
        });
        if (!existing)
            throw new common_1.NotFoundException("Profil introuvable");
        await this.prisma.userProfile.update({
            where: { userId },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                displayName: dto.displayName,
                phone: dto.phone,
                secondaryPhone: dto.secondaryPhone,
                birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
                gender: dto.gender,
                address: dto.address,
                city: dto.city,
                region: dto.region,
                country: dto.country,
                postalCode: dto.postalCode,
                jobTitle: dto.jobTitle,
                department: dto.department,
                signature: dto.signature,
            },
        });
        return this.getMe(userId);
    }
    async uploadAvatar(userId, file) {
        if (!file)
            throw new common_1.BadRequestException("Aucun fichier fourni");
        if (!ALLOWED_MIME.has(file.mimetype)) {
            throw new common_1.BadRequestException("Formats acceptés : JPG, PNG, WebP");
        }
        if (file.size > MAX_SIZE) {
            throw new common_1.BadRequestException("Fichier trop volumineux (max 2 Mo)");
        }
        if (!(0, fs_1.existsSync)(AVATARS_DIR)) {
            (0, fs_1.mkdirSync)(AVATARS_DIR, { recursive: true });
        }
        const profile = await this.prisma.userProfile.findUnique({
            where: { userId },
            select: { profilePhoto: true },
        });
        if (!profile)
            throw new common_1.NotFoundException("Profil introuvable");
        const filename = `${userId}-${Date.now()}.jpg`;
        (0, fs_1.writeFileSync)((0, path_1.join)(AVATARS_DIR, filename), file.buffer);
        const avatarUrl = `/uploads/avatars/${filename}`;
        this.removeAvatarFile(profile.profilePhoto);
        await this.prisma.userProfile.update({
            where: { userId },
            data: { profilePhoto: avatarUrl },
        });
        return this.getMe(userId);
    }
    async deleteAvatar(userId) {
        const profile = await this.prisma.userProfile.findUnique({
            where: { userId },
            select: { profilePhoto: true },
        });
        if (!profile)
            throw new common_1.NotFoundException("Profil introuvable");
        this.removeAvatarFile(profile.profilePhoto);
        await this.prisma.userProfile.update({
            where: { userId },
            data: { profilePhoto: null },
        });
        return this.getMe(userId);
    }
    removeAvatarFile(avatarPath) {
        if (!avatarPath?.startsWith("/uploads/avatars/"))
            return;
        const filename = avatarPath.replace("/uploads/avatars/", "");
        const full = (0, path_1.join)(AVATARS_DIR, filename);
        if ((0, fs_1.existsSync)(full)) {
            try {
                (0, fs_1.unlinkSync)(full);
            }
            catch {
            }
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map