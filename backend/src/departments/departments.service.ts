import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    const existing = await this.prisma.department.findUnique({
      where: { code: dto.code },
    });
    if (existing)
      throw new ConflictException('Ce code département existe déjà');

    return this.prisma.department.create({ data: dto });
  }

  async findAll() {
    return this.prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Département introuvable');
    return department;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Département introuvable');

    if (dto.code && dto.code !== department.code) {
      const existing = await this.prisma.department.findUnique({
        where: { code: dto.code },
      });
      if (existing)
        throw new ConflictException('Ce code département existe déjà');
    }

    return this.prisma.department.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Département introuvable');

    await this.prisma.department.delete({ where: { id } });
  }
}
