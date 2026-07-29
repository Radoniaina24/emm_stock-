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
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let RolePermissionsService = class RolePermissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async find(roleId) {
        const role = await this.prisma.role.findUnique({ where: { id: roleId } });
        if (!role)
            throw new common_1.NotFoundException('Rôle introuvable');
        const [permissions, assignedRows] = await Promise.all([
            this.prisma.permission.findMany({
                orderBy: [{ module: 'asc' }, { action: 'asc' }],
            }),
            this.prisma.rolePermission.findMany({
                where: { roleId },
                select: { permissionId: true },
            }),
        ]);
        return {
            role: { id: role.id, name: role.name, code: role.code },
            permissions,
            assignedPermissionIds: assignedRows.map((r) => r.permissionId),
        };
    }
    async sync(roleId, permissionIds) {
        const role = await this.prisma.role.findUnique({ where: { id: roleId } });
        if (!role)
            throw new common_1.NotFoundException('Rôle introuvable');
        const permissionCount = await this.prisma.permission.count({
            where: { id: { in: permissionIds } },
        });
        if (permissionCount !== permissionIds.length) {
            throw new common_1.BadRequestException('Certaines permissions fournies sont introuvables.');
        }
        const existing = await this.prisma.rolePermission.findMany({
            where: { roleId },
            select: { permissionId: true },
        });
        const existingIds = new Set(existing.map((r) => r.permissionId));
        const newIds = new Set(permissionIds);
        const toAdd = permissionIds.filter((id) => !existingIds.has(id));
        const toRemove = Array.from(existingIds).filter((id) => !newIds.has(id));
        const operations = [];
        if (toAdd.length > 0) {
            operations.push(this.prisma.rolePermission.createMany({
                data: toAdd.map((permissionId) => ({ roleId, permissionId })),
            }));
        }
        if (toRemove.length > 0) {
            operations.push(this.prisma.rolePermission.deleteMany({
                where: { roleId, permissionId: { in: toRemove } },
            }));
        }
        if (operations.length > 0) {
            await this.prisma.$transaction(operations);
        }
        const permissions = await this.prisma.permission.findMany({
            orderBy: [{ module: 'asc' }, { action: 'asc' }],
        });
        const updatedAssigned = await this.prisma.rolePermission.findMany({
            where: { roleId },
            select: { permissionId: true },
        });
        return {
            role: { id: role.id, name: role.name, code: role.code },
            permissions,
            assignedPermissionIds: updatedAssigned.map((r) => r.permissionId),
        };
    }
};
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map