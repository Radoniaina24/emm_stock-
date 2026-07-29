import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(roleId: string) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Rôle introuvable');

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

  async sync(roleId: string, permissionIds: string[]) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Rôle introuvable');

    const permissionCount = await this.prisma.permission.count({
      where: { id: { in: permissionIds } },
    });
    if (permissionCount !== permissionIds.length) {
      throw new BadRequestException(
        'Certaines permissions fournies sont introuvables.',
      );
    }

    const existing = await this.prisma.rolePermission.findMany({
      where: { roleId },
      select: { permissionId: true },
    });
    const existingIds = new Set<string>(existing.map((r) => r.permissionId));
    const newIds = new Set<string>(permissionIds);

    const toAdd = permissionIds.filter((id) => !existingIds.has(id));
    const toRemove = Array.from(existingIds).filter(
      (id) => !newIds.has(id),
    );

    const operations: Promise<unknown>[] = [];

    if (toAdd.length > 0) {
      operations.push(
        this.prisma.rolePermission.createMany({
          data: toAdd.map((permissionId) => ({ roleId, permissionId })),
        }),
      );
    }

    if (toRemove.length > 0) {
      operations.push(
        this.prisma.rolePermission.deleteMany({
          where: { roleId, permissionId: { in: toRemove } },
        }),
      );
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
}
