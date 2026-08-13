import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdjustStockDto, StockAdjustmentType } from './dto/adjust-stock.dto.js';
import { StockQueryDto } from './dto/stock-query.dto.js';

type RuleInfo = { minQty: Prisma.Decimal; maxQty: Prisma.Decimal } | null;

export type SerializedStockLevel = {
  id: string;
  productId: number;
  warehouseId: string;
  zoneId: string | null;
  quantityOnHand: string;
  quantityReserved: string;
  isLowStock: boolean;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    sku: string;
    image: { id: number; url: string; alt: string | null } | null;
  };
  warehouse: { id: string; name: string };
  zone: { id: string; name: string } | null;
  reorderRule: { minQty: string; maxQty: string } | null;
};

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  private include() {
    return {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          images: {
            where: { isPrimary: true },
            take: 1,
            select: { id: true, url: true, alt: true },
          },
        },
      },
      warehouse: { select: { id: true, name: true } },
      zone: { select: { id: true, name: true } },
    } as const;
  }

  private ruleKey(productId: number, warehouseId: string) {
    return `${productId}|${warehouseId}`;
  }

  private async loadRulesMap() {
    const rules = await this.prisma.reorderRule.findMany({
      where: { isActive: true },
      select: { productId: true, warehouseId: true, minQty: true, maxQty: true },
    });
    const map = new Map<string, RuleInfo>();
    for (const r of rules) {
      map.set(this.ruleKey(r.productId, r.warehouseId), {
        minQty: r.minQty,
        maxQty: r.maxQty,
      });
    }
    return map;
  }

  private serialize(level: any, rule: RuleInfo): SerializedStockLevel {
    const onHand = level.quantityOnHand as Prisma.Decimal;
    const isLow = rule ? onHand.lte(rule.minQty) : false;
    const image = level.product?.images?.[0] ?? null;

    return {
      id: level.id,
      productId: level.productId,
      warehouseId: level.warehouseId,
      zoneId: level.zoneId,
      quantityOnHand: onHand.toString(),
      quantityReserved: (level.quantityReserved as Prisma.Decimal).toString(),
      isLowStock: isLow,
      updatedAt: level.updatedAt.toISOString(),
      product: level.product
        ? {
            id: level.product.id,
            name: level.product.name,
            sku: level.product.sku,
            image,
          }
        : (null as any),
      warehouse: level.warehouse,
      zone: level.zone,
      reorderRule: rule
        ? { minQty: rule.minQty.toString(), maxQty: rule.maxQty.toString() }
        : null,
    };
  }

  async findAll(query: StockQueryDto) {
    const where: Prisma.StockLevelWhereInput = {};

    if (query.productId !== undefined) where.productId = query.productId;
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.zoneId) where.zoneId = query.zoneId;
    if (query.search) {
      where.product = {
        OR: [
          { name: { contains: query.search } },
          { sku: { contains: query.search } },
        ],
      };
    }

    const [levels, rulesMap] = await Promise.all([
      this.prisma.stockLevel.findMany({
        where,
        include: this.include(),
        orderBy: [{ updatedAt: 'desc' }],
      }),
      this.loadRulesMap(),
    ]);

    let data = levels.map((l) =>
      this.serialize(l, rulesMap.get(this.ruleKey(l.productId, l.warehouseId)) ?? null),
    );

    if (query.lowStock === 'true') {
      data = data.filter((l) => l.isLowStock);
    }
    return data;
  }

  async summary() {
    const [count, sums, levels, rules] = await Promise.all([
      this.prisma.stockLevel.count(),
      this.prisma.stockLevel.aggregate({
        _sum: { quantityOnHand: true, quantityReserved: true },
      }),
      this.prisma.stockLevel.findMany({
        select: { productId: true, warehouseId: true, quantityOnHand: true },
      }),
      this.prisma.reorderRule.findMany({
        where: { isActive: true },
        select: { productId: true, warehouseId: true, minQty: true },
      }),
    ]);

    const ruleMap = new Map<string, Prisma.Decimal>();
    for (const r of rules) {
      ruleMap.set(this.ruleKey(r.productId, r.warehouseId), r.minQty);
    }

    let lowStock = 0;
    let outOfStock = 0;
    for (const l of levels) {
      const onHand = l.quantityOnHand as Prisma.Decimal;
      if (onHand.isZero()) outOfStock += 1;
      const min = ruleMap.get(this.ruleKey(l.productId, l.warehouseId));
      if (min && onHand.lte(min)) lowStock += 1;
    }

    return {
      totalLevels: count,
      totalOnHand: sums._sum.quantityOnHand?.toString() ?? '0',
      totalReserved: sums._sum.quantityReserved?.toString() ?? '0',
      lowStockCount: lowStock,
      outOfStockCount: outOfStock,
    };
  }

  async findOne(id: string) {
    const level = await this.prisma.stockLevel.findUnique({
      where: { id },
      include: this.include(),
    });

    if (!level) throw new NotFoundException('Niveau de stock introuvable');

    const rules = await this.prisma.reorderRule.findMany({
      where: { productId: level.productId, warehouseId: level.warehouseId, isActive: true },
      select: { id: true, warehouseId: true, minQty: true, maxQty: true },
    });
    const rule = rules[0]
      ? { minQty: rules[0].minQty, maxQty: rules[0].maxQty }
      : null;

    const recentMoves = await this.prisma.stockMove.findMany({
      where: { productId: level.productId, warehouseId: level.warehouseId },
      orderBy: { date: 'desc' },
      take: 20,
      select: {
        id: true,
        type: true,
        quantity: true,
        lotNumber: true,
        expiryDate: true,
        date: true,
        user: { select: { id: true, username: true } },
      },
    });

    const serialized = this.serialize(level, rule);

    return {
      ...serialized,
      reorderRules: rules.map((r) => ({
        id: r.id,
        warehouseId: r.warehouseId,
        minQty: r.minQty.toString(),
        maxQty: r.maxQty.toString(),
      })),
      recentMoves: recentMoves.map((m) => ({
        id: m.id,
        type: m.type,
        quantity: (m.quantity as Prisma.Decimal).toString(),
        lotNumber: m.lotNumber,
        expiryDate: m.expiryDate ? m.expiryDate.toISOString() : null,
        date: m.date.toISOString(),
        user: m.user,
      })),
    };
  }

  async adjust(id: string, dto: AdjustStockDto, userId: string) {
    const level = await this.prisma.stockLevel.findUnique({ where: { id } });
    if (!level) throw new NotFoundException('Niveau de stock introuvable');

    const current = level.quantityOnHand as Prisma.Decimal;
    const qty = new Prisma.Decimal(dto.quantity);
    let newQty: Prisma.Decimal;
    let delta: Prisma.Decimal;

    switch (dto.type) {
      case StockAdjustmentType.SET:
        newQty = qty;
        delta = qty.minus(current);
        break;
      case StockAdjustmentType.INCREMENT:
        newQty = current.plus(qty);
        delta = qty;
        break;
      case StockAdjustmentType.DECREMENT:
      default:
        newQty = current.minus(qty);
        delta = qty.negated();
        break;
    }

    if (newQty.lessThan(0)) {
      throw new BadRequestException(
        'La quantité en stock ne peut pas devenir négative',
      );
    }

    await this.prisma.$transaction([
      this.prisma.stockLevel.update({
        where: { id },
        data: { quantityOnHand: newQty },
      }),
      this.prisma.stockMove.create({
        data: {
          productId: level.productId,
          warehouseId: level.warehouseId,
          userId,
          type: 'INVENTORY_ADJUSTMENT',
          quantity: delta,
          unitCost:
            dto.unitCost !== undefined ? new Prisma.Decimal(dto.unitCost) : null,
          lotNumber: dto.lotNumber?.trim() || null,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
          sourceType: 'stock_adjustment',
          sourceId: level.id,
          date: new Date(),
        },
      }),
    ]);

    const updated = await this.prisma.stockLevel.findUnique({
      where: { id },
      include: this.include(),
    });

    return this.serialize(
      updated,
      (await this.loadRulesMap()).get(
        this.ruleKey(updated.productId, updated.warehouseId),
      ) ?? null,
    );
  }
}
