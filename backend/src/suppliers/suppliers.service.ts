import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  private detailInclude() {
    return {
      _count: { select: { entries: true, productSuppliers: true } },
    };
  }

  private async assertNameAvailable(name: string, ignoreId?: string) {
    const normalized = name.trim().toLowerCase();
    const existing = await this.prisma.supplier.findFirst({
      where: { name: { equals: normalized } },
      select: { id: true },
    });
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException(
        `Le fournisseur « ${name.trim()} » existe déjà`,
      );
    }
  }

  async create(dto: CreateSupplierDto) {
    await this.assertNameAvailable(dto.name);

    return this.prisma.supplier.create({
      data: {
        name: dto.name.trim(),
        email: dto.email?.trim() || null,
        phone: dto.phone?.trim() || null,
        address: dto.address?.trim() || null,
        contact: dto.contact?.trim() || null,
        isActive: dto.isActive ?? true,
      },
      include: this.detailInclude(),
    });
  }

  async findAll() {
    return this.prisma.supplier.findMany({
      orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
      include: this.detailInclude(),
    });
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: this.detailInclude(),
    });
    if (!supplier) throw new NotFoundException('Fournisseur introuvable');
    return supplier;
  }

  async update(id: string, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException('Fournisseur introuvable');

    if (dto.name !== undefined) {
      await this.assertNameAvailable(dto.name, id);
    }

    const data: Prisma.SupplierUpdateInput = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.email !== undefined) data.email = dto.email?.trim() || null;
    if (dto.phone !== undefined) data.phone = dto.phone?.trim() || null;
    if (dto.address !== undefined) data.address = dto.address?.trim() || null;
    if (dto.contact !== undefined) data.contact = dto.contact?.trim() || null;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

    return this.prisma.supplier.update({
      where: { id },
      data,
      include: this.detailInclude(),
    });
  }

  async remove(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        _count: { select: { entries: true, productSuppliers: true } },
      },
    });
    if (!supplier) throw new NotFoundException('Fournisseur introuvable');

    if (supplier._count.entries > 0) {
      throw new BadRequestException(
        'Impossible de supprimer un fournisseur ayant des réceptions enregistrées',
      );
    }

    await this.prisma.supplier.delete({ where: { id } });
  }
}
