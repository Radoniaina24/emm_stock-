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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.role.findUnique({
            where: { code: dto.code },
        });
        if (existing)
            throw new common_1.ConflictException('Ce code rôle existe déjà');
        return this.prisma.role.create({ data: dto });
    }
    async findAll() {
        return this.prisma.role.findMany({
            include: { rolePermissions: { include: { permission: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: { rolePermissions: { include: { permission: true } } },
        });
        if (!role)
            throw new common_1.NotFoundException('Rôle introuvable');
        return role;
    }
    async update(id, dto) {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException('Rôle introuvable');
        if (dto.code && dto.code !== role.code) {
            const existing = await this.prisma.role.findUnique({
                where: { code: dto.code },
            });
            if (existing)
                throw new common_1.ConflictException('Ce code rôle existe déjà');
        }
        return this.prisma.role.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException('Rôle introuvable');
        if (role.isSystem)
            throw new common_1.BadRequestException('Impossible de supprimer un rôle système');
        await this.prisma.role.delete({ where: { id } });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map