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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let PermissionsService = class PermissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.permission.findUnique({
            where: { code: dto.code },
        });
        if (existing)
            throw new common_1.ConflictException('Ce code permission existe déjà');
        return this.prisma.permission.create({ data: dto });
    }
    async findAll() {
        return this.prisma.permission.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const permission = await this.prisma.permission.findUnique({
            where: { id },
        });
        if (!permission)
            throw new common_1.NotFoundException('Permission introuvable');
        return permission;
    }
    async update(id, dto) {
        const permission = await this.prisma.permission.findUnique({
            where: { id },
        });
        if (!permission)
            throw new common_1.NotFoundException('Permission introuvable');
        if (dto.code && dto.code !== permission.code) {
            const existing = await this.prisma.permission.findUnique({
                where: { code: dto.code },
            });
            if (existing)
                throw new common_1.ConflictException('Ce code permission existe déjà');
        }
        return this.prisma.permission.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const permission = await this.prisma.permission.findUnique({
            where: { id },
        });
        if (!permission)
            throw new common_1.NotFoundException('Permission introuvable');
        await this.prisma.permission.delete({ where: { id } });
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map