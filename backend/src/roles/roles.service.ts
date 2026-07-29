import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { code: dto.code },
    });
    if (existing) throw new ConflictException('Ce code rôle existe déjà');

    return this.prisma.role.create({ data: dto });
  }

  async findAll() {
    return this.prisma.role.findMany({
      include: { rolePermissions: { include: { permission: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllWithUserCount() {
    const roles = await this.prisma.role.findMany({
      include: {
        rolePermissions: { include: { permission: true } },
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return roles.map(({ _count, ...role }) => ({ ...role, userCount: _count.users }));
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { rolePermissions: { include: { permission: true } } },
    });
    if (!role) throw new NotFoundException('Rôle introuvable');
    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Rôle introuvable');

    if (dto.code && dto.code !== role.code) {
      const existing = await this.prisma.role.findUnique({
        where: { code: dto.code },
      });
      if (existing) throw new ConflictException('Ce code rôle existe déjà');
    }

    return this.prisma.role.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Rôle introuvable');
    if (role.isSystem) throw new BadRequestException('Impossible de supprimer un rôle système');

    await this.prisma.role.delete({ where: { id } });
  }
}
