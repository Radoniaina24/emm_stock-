"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const fs_1 = require("fs");
const path_1 = require("path");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const employee_code_js_1 = require("./employee-code.js");
const user_mapper_js_1 = require("./user.mapper.js");
const AVATARS_DIR = (0, path_1.join)(process.cwd(), 'uploads', 'avatars');
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingEmail)
            throw new common_1.ConflictException('Cet email est déjà utilisé');
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existingUsername)
            throw new common_1.ConflictException('Ce nom d\'utilisateur est déjà utilisé');
        let employeeCode = dto.employeeCode?.trim() ?? '';
        if (employeeCode) {
            const existingCode = await this.prisma.userProfile.findUnique({
                where: { employeeCode },
            });
            if (existingCode)
                throw new common_1.ConflictException('Ce matricule est déjà utilisé');
        }
        else {
            for (let attempt = 0; attempt < 10; attempt++) {
                employeeCode = await (0, employee_code_js_1.generateEmployeeCode)(this.prisma);
                const taken = await this.prisma.userProfile.findUnique({
                    where: { employeeCode },
                });
                if (!taken)
                    break;
            }
        }
        const role = await this.prisma.role.findUnique({ where: { id: dto.roleId } });
        if (!role)
            throw new common_1.BadRequestException('Rôle introuvable');
        const department = await this.prisma.department.findUnique({ where: { id: dto.departmentId } });
        if (!department)
            throw new common_1.BadRequestException('Département introuvable');
        const jobTitle = await this.prisma.jobTitle.findUnique({ where: { id: dto.jobTitleId } });
        if (!jobTitle)
            throw new common_1.BadRequestException('Poste introuvable');
        if (dto.warehouseId) {
            const warehouse = await this.prisma.warehouse.findUnique({ where: { id: dto.warehouseId } });
            if (!warehouse)
                throw new common_1.BadRequestException('Entrepôt introuvable');
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: hashed,
                roleId: dto.roleId,
                profile: {
                    create: {
                        employeeCode,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        displayName: `${dto.firstName} ${dto.lastName}`,
                        departmentId: dto.departmentId,
                        jobTitleId: dto.jobTitleId,
                        warehouseId: dto.warehouseId ?? null,
                    },
                },
            },
            select: user_mapper_js_1.userWithProfileSelect,
        });
        return (0, user_mapper_js_1.toAuthUserDto)(user);
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: user_mapper_js_1.userWithProfileSelect,
            orderBy: { createdAt: 'desc' },
        });
        return users.map((u) => (0, user_mapper_js_1.toAuthUserDto)(u));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: user_mapper_js_1.userWithProfileSelect,
        });
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable');
        return (0, user_mapper_js_1.toAuthUserDto)(user);
    }
    async nextEmployeeCode() {
        return { employeeCode: await (0, employee_code_js_1.generateEmployeeCode)(this.prisma) };
    }
    async remove(id, currentUserId) {
        if (id === currentUserId) {
            throw new common_1.BadRequestException('Vous ne pouvez pas supprimer votre propre compte');
        }
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: { select: { profilePhoto: true } },
                role: { select: { code: true, isSystem: true } },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable');
        if (user.role?.code === 'SUPER_ADMIN') {
            throw new common_1.BadRequestException('Impossible de supprimer un super administrateur');
        }
        const [{ _count: entries }, { _count: exits }, { _count: inventories }] = await Promise.all([
            this.prisma.entry.count({ where: { userId: id } }),
            this.prisma.exit.count({ where: { userId: id } }),
            this.prisma.inventory.count({ where: { userId: id } }),
        ]);
        if (entries > 0 || exits > 0 || inventories > 0) {
            const details = [
                entries > 0 ? `${entries} entrée(s)` : null,
                exits > 0 ? `${exits} sortie(s)` : null,
                inventories > 0 ? `${inventories} inventaire(s)` : null,
            ]
                .filter(Boolean)
                .join(', ');
            throw new common_1.ConflictException(`Impossible de supprimer cet utilisateur : il possède des opérations de stock liées (${details}). Désactivez-le plutôt.`);
        }
        this.removeAvatarFile(user.profile?.profilePhoto);
        await this.prisma.user.delete({ where: { id } });
        return { success: true, id };
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: user_mapper_js_1.userWithProfileSelect,
        });
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable');
        return (0, user_mapper_js_1.toAuthUserDto)(user);
    }
    async updateProfile(userId, dto) {
        const existing = await this.prisma.userProfile.findUnique({
            where: { userId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Profil introuvable');
        const emptyToNull = (value) => {
            if (value === undefined)
                return undefined;
            const trimmed = value.trim();
            return trimmed.length ? trimmed : null;
        };
        const required = (value, fallback) => {
            if (value === undefined)
                return undefined;
            const trimmed = value.trim();
            return trimmed.length ? trimmed : fallback;
        };
        const nextFirstName = required(dto.firstName, existing.firstName);
        const nextLastName = required(dto.lastName, existing.lastName);
        let displayName;
        if (dto.displayName !== undefined) {
            displayName =
                required(dto.displayName, existing.displayName) ?? existing.displayName;
        }
        else if (dto.firstName !== undefined || dto.lastName !== undefined) {
            displayName = `${nextFirstName} ${nextLastName}`.trim();
        }
        else {
            displayName = existing.displayName;
        }
        await this.prisma.userProfile.update({
            where: { userId },
            data: {
                firstName: nextFirstName,
                lastName: nextLastName,
                displayName,
                phone: emptyToNull(dto.phone),
                secondaryPhone: emptyToNull(dto.secondaryPhone),
                birthDate: dto.birthDate === undefined
                    ? undefined
                    : dto.birthDate.trim()
                        ? new Date(dto.birthDate)
                        : null,
                gender: emptyToNull(dto.gender),
                address: emptyToNull(dto.address),
                city: emptyToNull(dto.city),
                region: emptyToNull(dto.region),
                country: emptyToNull(dto.country),
                postalCode: emptyToNull(dto.postalCode),
                jobTitleId: emptyToNull(dto.jobTitle),
                departmentId: emptyToNull(dto.department),
                signature: emptyToNull(dto.signature),
            },
        });
        return this.getMe(userId);
    }
    async uploadAvatar(userId, file) {
        if (!file)
            throw new common_1.BadRequestException('Aucun fichier fourni');
        if (!ALLOWED_MIME.has(file.mimetype)) {
            throw new common_1.BadRequestException('Formats acceptés : JPG, PNG, WebP');
        }
        if (file.size > MAX_SIZE) {
            throw new common_1.BadRequestException('Fichier trop volumineux (max 2 Mo)');
        }
        if (!(0, fs_1.existsSync)(AVATARS_DIR)) {
            (0, fs_1.mkdirSync)(AVATARS_DIR, { recursive: true });
        }
        const profile = await this.prisma.userProfile.findUnique({
            where: { userId },
            select: { profilePhoto: true },
        });
        if (!profile)
            throw new common_1.NotFoundException('Profil introuvable');
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
            throw new common_1.NotFoundException('Profil introuvable');
        this.removeAvatarFile(profile.profilePhoto);
        await this.prisma.userProfile.update({
            where: { userId },
            data: { profilePhoto: null },
        });
        return this.getMe(userId);
    }
    removeAvatarFile(avatarPath) {
        if (!avatarPath?.startsWith('/uploads/avatars/'))
            return;
        const filename = avatarPath.replace('/uploads/avatars/', '');
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