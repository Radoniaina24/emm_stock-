import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, StockLevel } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInventoryDto } from './dto/create-inventory.dto.js';
import { AddInventoryLineDto, InventoryQueryDto } from './dto/inventory-query.dto.js';
import { Paginated, buildMeta, resolvePagination } from '../common/dto/pagination-query.dto.js';

export type SerializedInventoryLine = {
  id: string;
  productId: number;
  productName: string;
  sku: string | null;
  quantityCounted: string;
  quantityExpected: string;
  difference: string;
};

export type SerializedInventory = {
  id: string;
  reference: string;
  date: string;
  status: string;
  description: string | null;
  warehouseId: string;
  warehouseName: string;
  userId: string;
  lines: SerializedInventoryLine[];
  createdAt: string;
  updatedAt: string;
};

const INVENTORY_STATUSES = new Set(['en_cours', 'valide', 'annule']);

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  private async nextReference(): Promise<string> {
    const count = await this.prisma.inventory.count();
    const year = new Date().getFullYear();
    return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  private serializeLine(line: {
    id: string;
    productId: number;
    quantityCounted: Prisma.Decimal;
    quantityExpected: Prisma.Decimal;
    product: { name: string; sku: string | null };
  }): SerializedInventoryLine {
    const counted = line.quantityCounted;
    const expected = line.quantityExpected;
    return {
      id: line.id,
      productId: line.productId,
      productName: line.product.name,
      sku: line.product.sku,
      quantityCounted: counted.toString(),
      quantityExpected: expected.toString(),
      difference: counted.minus(expected).toString(),
    };
  }

  private serialize(inv: {
    id: string;
    reference: string;
    date: Date;
    status: string;
    description: string | null;
    warehouseId: string;
    warehouse: { name: string } | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    lines: Array<{
      id: string;
      productId: number;
      quantityCounted: Prisma.Decimal;
      quantityExpected: Prisma.Decimal;
      product: { name: string; sku: string | null };
    }>;
  }): SerializedInventory {
    return {
      id: inv.id,
      reference: inv.reference,
      date: inv.date.toISOString(),
      status: inv.status,
      description: inv.description,
      warehouseId: inv.warehouseId,
      warehouseName: inv.warehouse?.name ?? '',
      userId: inv.userId,
      createdAt: inv.createdAt.toISOString(),
      updatedAt: inv.updatedAt.toISOString(),
      lines: inv.lines.map((l) => this.serializeLine(l)),
    };
  }

  async create(dto: CreateInventoryDto, userId: string) {
    const productIds = [...new Set(dto.lines.map((l) => l.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });
    const known = new Set(products.map((p) => p.id));
    for (const id of productIds) {
      if (!known.has(id))
        throw new NotFoundException(`Produit ${id} introuvable`);
    }

    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');

    const existingLevels = (await this.prisma.stockLevel.findMany({
      where: {
        productId: { in: productIds },
        warehouseId: dto.warehouseId,
        zoneId: null,
      },
    })) as StockLevel[];
    const levelByProduct = new Map(
      existingLevels.map((l) => [l.productId, l]),
    );

    const reference = await this.nextReference();
    const inventory = await this.prisma.inventory.create({
      data: {
        reference,
        description: dto.description?.trim() || null,
        status: 'en_cours',
        userId,
        warehouseId: dto.warehouseId,
        lines: {
          create: dto.lines.map((l) => ({
            productId: l.productId,
            quantityCounted: new Prisma.Decimal(l.quantityCounted),
            quantityExpected:
              levelByProduct.get(l.productId)?.quantityOnHand ??
              new Prisma.Decimal(0),
          })),
        },
      },
      include: {
        warehouse: { select: { name: true } },
        lines: {
          include: { product: { select: { name: true, sku: true } } },
        },
      },
    });
    return this.serialize(inventory);
  }

  async findAll(query: InventoryQueryDto): Promise<Paginated<SerializedInventory>> {
    const where: Prisma.InventoryWhereInput = {};
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.status && INVENTORY_STATUSES.has(query.status))
      where.status = query.status;
    if (query.search) {
      where.OR = [
        { reference: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const total = await this.prisma.inventory.count({ where });
    const params = resolvePagination(query);
    const rows = await this.prisma.inventory.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: params.skip,
      take: params.take,
      include: {
        warehouse: { select: { name: true } },
        _count: { select: { lines: true } },
      },
    });

    return {
      items: rows.map((r) => ({
        ...this.serialize({ ...r, lines: [] }),
        lines: [],
      })),
      meta: buildMeta(total, params),
    };
  }

  async findOne(id: string) {
    const inv = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        warehouse: { select: { name: true } },
        lines: {
          include: { product: { select: { name: true, sku: true } } },
        },
      },
    });
    if (!inv) throw new NotFoundException('Inventaire introuvable');
    return this.serialize(inv);
  }

  async addLine(id: string, dto: AddInventoryLineDto) {
    const inv = await this.prisma.inventory.findUnique({ where: { id } });
    if (!inv) throw new NotFoundException('Inventaire introuvable');
    if (inv.status !== 'en_cours')
      throw new BadRequestException(
        'Seul un inventaire en cours accepte des lignes',
      );

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true },
    });
    if (!product) throw new NotFoundException(`Produit ${dto.productId} introuvable`);

    const level = (await this.prisma.stockLevel.findFirst({
      where: {
        productId: dto.productId,
        warehouseId: inv.warehouseId,
        zoneId: null,
      },
    })) as StockLevel | null;

    await this.prisma.inventoryLine.create({
      data: {
        inventoryId: id,
        productId: dto.productId,
        quantityCounted: new Prisma.Decimal(dto.quantityCounted),
        quantityExpected: level?.quantityOnHand ?? new Prisma.Decimal(0),
      },
    });
    return this.findOne(id);
  }

  async removeLine(id: string, lineId: string) {
    const inv = await this.prisma.inventory.findUnique({ where: { id } });
    if (!inv) throw new NotFoundException('Inventaire introuvable');
    if (inv.status !== 'en_cours')
      throw new BadRequestException(
        'Seul un inventaire en cours peut être modifié',
      );

    const line = await this.prisma.inventoryLine.findFirst({
      where: { id: lineId, inventoryId: id },
    });
    if (!line) throw new NotFoundException('Ligne d’inventaire introuvable');

    await this.prisma.inventoryLine.delete({ where: { id: lineId } });
    return this.findOne(id);
  }

  /**
   * Valide un inventaire en cours : applique la différence comptée/attendue
   * au StockLevel (création ou ajustement incrémental/décrémentiel) et trace
   * un mouvement `INVENTORY_ADJUSTMENT` signé par ligne. L'inventaire passe
   * alors en statut `valide`.
   */
  async validate(id: string, userId: string) {
    const inv = await this.prisma.inventory.findUnique({
      where: { id },
      include: { lines: true },
    });
    if (!inv) throw new NotFoundException('Inventaire introuvable');
    if (inv.status !== 'en_cours')
      throw new BadRequestException('Seul un inventaire en cours peut être validé');

    const deltas = new Map<number, Prisma.Decimal>();
    for (const line of inv.lines) {
      const delta = (line.quantityCounted as Prisma.Decimal).minus(
        line.quantityExpected as Prisma.Decimal,
      );
      deltas.set(
        line.productId,
        (deltas.get(line.productId) ?? new Prisma.Decimal(0)).add(delta),
      );
    }

    const levels = (await this.prisma.stockLevel.findMany({
      where: {
        productId: { in: [...deltas.keys()] },
        warehouseId: inv.warehouseId,
        zoneId: null,
      },
    })) as StockLevel[];
    const levelByProduct = new Map(levels.map((l) => [l.productId, l]));

    const tx: Prisma.PrismaPromise<unknown>[] = [];
    for (const [productId, delta] of deltas) {
      const level = levelByProduct.get(productId);

      if (delta.greaterThan(new Prisma.Decimal(0))) {
        if (level) {
          tx.push(
            this.prisma.stockLevel.update({
              where: { id: level.id },
              data: { quantityOnHand: { increment: delta } },
            }),
          );
        } else {
          tx.push(
            this.prisma.stockLevel.create({
              data: {
                productId,
                warehouseId: inv.warehouseId,
                zoneId: null,
                quantityOnHand: delta,
                quantityReserved: new Prisma.Decimal(0),
              },
            }),
          );
        }
      } else if (delta.lessThan(new Prisma.Decimal(0))) {
        if (!level || (level.quantityOnHand as Prisma.Decimal).lessThan(delta.negated())) {
          throw new BadRequestException(
            `Stock insuffisant pour l'ajustement négatif du produit ${productId}`,
          );
        }
        tx.push(
          this.prisma.stockLevel.update({
            where: { id: level.id },
            data: { quantityOnHand: { decrement: delta.negated() } },
          }),
        );
      }

      tx.push(
        this.prisma.stockMove.create({
          data: {
            productId,
            warehouseId: inv.warehouseId,
            userId,
            type: 'INVENTORY_ADJUSTMENT',
            quantity: delta,
            sourceType: 'inventory',
            sourceId: inv.id,
            date: new Date(),
          },
        }),
      );
    }

    tx.push(
      this.prisma.inventory.update({
        where: { id: inv.id },
        data: { status: 'valide' },
      }),
    );

    await this.prisma.$transaction(tx);
    return this.findOne(id);
  }

  async cancel(id: string) {
    const inv = await this.prisma.inventory.findUnique({ where: { id } });
    if (!inv) throw new NotFoundException('Inventaire introuvable');
    if (inv.status !== 'en_cours')
      throw new BadRequestException('Seul un inventaire en cours peut être annulé');

    const updated = await this.prisma.inventory.update({
      where: { id },
      data: { status: 'annule' },
    });
    return this.findOne(updated.id);
  }
}
