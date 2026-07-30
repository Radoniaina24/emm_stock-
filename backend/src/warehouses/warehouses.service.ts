import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWarehouseDto } from './dto/create-warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto.js';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWarehouseDto) {
    return this.prisma.warehouse.create({ data: dto });
  }

  async findAll() {
    return this.prisma.warehouse.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: { _count: { select: { zones: true, stocks: true } } },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');
    return warehouse;
  }

  async update(id: string, dto: UpdateWarehouseDto) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');

    return this.prisma.warehouse.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: { _count: { select: { zones: true, stocks: true, entries: true, exits: true } } },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');

    if (warehouse._count.zones > 0 || warehouse._count.stocks > 0 ||
        warehouse._count.entries > 0 || warehouse._count.exits > 0) {
      throw new BadRequestException(
        'Impossible de supprimer un entrepôt avec des zones, stocks, entrées ou sorties associés'
      );
    }

    await this.prisma.warehouse.delete({ where: { id } });
  }
}
