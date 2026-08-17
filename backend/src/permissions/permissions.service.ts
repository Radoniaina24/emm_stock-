import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePermissionDto) {
    const existing = await this.prisma.permission.findUnique({
      where: { code: dto.code },
    });
    if (existing) throw new ConflictException('Ce code permission existe déjà');

    return this.prisma.permission.create({ data: dto });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) throw new NotFoundException('Permission introuvable');
    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) throw new NotFoundException('Permission introuvable');

    if (dto.code && dto.code !== permission.code) {
      const existing = await this.prisma.permission.findUnique({
        where: { code: dto.code },
      });
      if (existing)
        throw new ConflictException('Ce code permission existe déjà');
    }

    return this.prisma.permission.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) throw new NotFoundException('Permission introuvable');

    await this.prisma.permission.delete({ where: { id } });
  }
}
