import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUnitOfMeasureDto } from './dto/create-unit-of-measure.dto.js';
import { UpdateUnitOfMeasureDto } from './dto/update-unit-of-measure.dto.js';

@Injectable()
export class UnitsOfMeasureService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeCode(code: string): string {
    return code.trim().toUpperCase();
  }

  private async assertCodeAvailable(
    code: string,
    ignoreId?: number,
  ): Promise<void> {
    const normalized = this.normalizeCode(code);
    const existing = await this.prisma.unitOfMeasure.findFirst({
      where: { code: { equals: normalized } },
      select: { id: true },
    });
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException(
        `Le code "${normalized}" est déjà utilisé par une autre unité`,
      );
    }
  }

  async create(dto: CreateUnitOfMeasureDto) {
    const code = this.normalizeCode(dto.code);
    await this.assertCodeAvailable(code);

    return this.prisma.unitOfMeasure.create({
      data: {
        name: dto.name.trim(),
        code,
        symbol: dto.symbol?.trim() || null,
        description: dto.description?.trim() || null,
        isActive: dto.isActive ?? true,
      },
      include: this.detailInclude(),
    });
  }

  async findAll() {
    return this.prisma.unitOfMeasure.findMany({
      orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
      include: this.detailInclude(),
    });
  }

  async findOne(id: number) {
    const unit = await this.prisma.unitOfMeasure.findUnique({
      where: { id },
      include: this.detailInclude(),
    });
    if (!unit) throw new NotFoundException('Unité de mesure introuvable');
    return unit;
  }

  async update(id: number, dto: UpdateUnitOfMeasureDto) {
    const unit = await this.prisma.unitOfMeasure.findUnique({
      where: { id },
    });
    if (!unit) throw new NotFoundException('Unité de mesure introuvable');

    if (dto.code !== undefined) {
      const code = this.normalizeCode(dto.code);
      if (code !== unit.code) {
        await this.assertCodeAvailable(code, id);
      }
      dto.code = code;
    }

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.code !== undefined) data.code = dto.code;
    if (dto.symbol !== undefined) data.symbol = dto.symbol?.trim() || null;
    if (dto.description !== undefined)
      data.description = dto.description?.trim() || null;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

    return this.prisma.unitOfMeasure.update({
      where: { id },
      data,
      include: this.detailInclude(),
    });
  }

  async remove(id: number) {
    const unit = await this.prisma.unitOfMeasure.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!unit) throw new NotFoundException('Unité de mesure introuvable');

    if (unit._count.products > 0) {
      throw new BadRequestException(
        'Impossible de supprimer une unité associée à des produits',
      );
    }

    await this.prisma.unitOfMeasure.delete({ where: { id } });
  }

  private detailInclude() {
    return { _count: { select: { products: true } } };
  }
}
