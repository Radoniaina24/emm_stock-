import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLocationDto } from './dto/location.dto.js';
import { LocationQueryDto } from './dto/location.dto.js';
import { UpdateLocationDto } from './dto/location.dto.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: LocationQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.parentId !== undefined) where.parentId = query.parentId ?? null;
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    const zones = await this.prisma.zone.findMany({
      where,
      orderBy: [{ name: 'asc' }],
      include: {
        _count: { select: { children: true, stockLevels: true } },
        parent: { select: { id: true, name: true } },
      },
    });

    return zones.map((z) => ({
      id: z.id,
      name: z.name,
      code: z.code,
      description: z.description,
      isActive: z.isActive,
      warehouseId: z.warehouseId,
      parentId: z.parentId,
      parent: z.parent,
      childrenCount: z._count.children,
      stockLevelsCount: z._count.stockLevels,
      createdAt: z.createdAt,
      updatedAt: z.updatedAt,
    }));
  }

  async findOne(id: string) {
    const zone = await this.prisma.zone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundException('Emplacement introuvable');
    return zone;
  }

  async create(dto: CreateLocationDto) {
    if (dto.parentId) {
      const parent = await this.prisma.zone.findUnique({
        where: { id: dto.parentId },
      });
      if (!parent) throw new NotFoundException('Zone parent introuvable');
      if (parent.warehouseId !== dto.warehouseId) {
        throw new BadRequestException(
          "La zone parent doit appartenir au même entrepôt",
        );
      }
    }

    return this.prisma.zone.create({
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        warehouseId: dto.warehouseId,
        parentId: dto.parentId ?? null,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateLocationDto) {
    const zone = await this.prisma.zone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundException('Emplacement introuvable');

    if (dto.parentId) {
      const newParentId = dto.parentId
      if (newParentId === id) {
        throw new BadRequestException('Une zone ne peut pas être son propre parent');
      }
      const parent = await this.prisma.zone.findUnique({
        where: { id: newParentId },
      });
      if (!parent) throw new NotFoundException('Zone parent introuvable');
      if (parent.warehouseId !== zone.warehouseId) {
        throw new BadRequestException(
          "La zone parent doit appartenir au même entrepôt",
        );
      }

      const descendants = await this.prisma.zone.findMany({
        where: { warehouseId: zone.warehouseId },
        select: { id: true, parentId: true },
      });
      if (this.isDescendant(descendants, id, newParentId)) {
        throw new BadRequestException(
          "Impossible de déplacer une zone sous l'une de ses propres descendances",
        );
      }
    }

    return this.prisma.zone.update({
      where: { id },
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        parentId: dto.parentId,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: string) {
    const zone = await this.prisma.zone.findUnique({
      where: { id },
      include: { _count: { select: { children: true, stockLevels: true } } },
    });
    if (!zone) throw new NotFoundException('Emplacement introuvable');

    if (zone._count.children > 0) {
      throw new BadRequestException(
        "Supprimez d'abord les sous-emplacements de cette zone",
      );
    }
    if (zone._count.stockLevels > 0) {
      throw new BadRequestException(
        'Cet emplacement contient du stock ; impossible de le supprimer',
      );
    }

    await this.prisma.zone.delete({ where: { id } });
    return { id, deleted: true };
  }

  private isDescendant(
    nodes: { id: string; parentId: string | null }[],
    ancestorId: string,
    possibleDescendantId: string,
  ): boolean {
    let current: string | null = possibleDescendantId;
    const byId = new Map(nodes.map((n) => [n.id, n]));
    while (current) {
      if (current === ancestorId) return true;
      current = byId.get(current)?.parentId ?? null;
    }
    return false;
  }
}
