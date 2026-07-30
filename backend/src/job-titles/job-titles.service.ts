import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobTitleDto } from './dto/create-job-title.dto.js';
import { UpdateJobTitleDto } from './dto/update-job-title.dto.js';

@Injectable()
export class JobTitlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateJobTitleDto) {
    const existing = await this.prisma.jobTitle.findUnique({
      where: { code: dto.code },
    });
    if (existing) throw new ConflictException('Ce code titre existe déjà');

    return this.prisma.jobTitle.create({ data: dto });
  }

  async findAll() {
    return this.prisma.jobTitle.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const jobTitle = await this.prisma.jobTitle.findUnique({
      where: { id },
    });
    if (!jobTitle) throw new NotFoundException('Titre introuvable');
    return jobTitle;
  }

  async update(id: string, dto: UpdateJobTitleDto) {
    const jobTitle = await this.prisma.jobTitle.findUnique({
      where: { id },
    });
    if (!jobTitle) throw new NotFoundException('Titre introuvable');

    if (dto.code && dto.code !== jobTitle.code) {
      const existing = await this.prisma.jobTitle.findUnique({
        where: { code: dto.code },
      });
      if (existing) throw new ConflictException('Ce code titre existe déjà');
    }

    return this.prisma.jobTitle.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const jobTitle = await this.prisma.jobTitle.findUnique({
      where: { id },
    });
    if (!jobTitle) throw new NotFoundException('Titre introuvable');

    await this.prisma.jobTitle.delete({ where: { id } });
  }
}
