import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdjustStockDto, StockAdjustmentType } from './dto/adjust-stock.dto.js';
import {
  CreateReorderRuleDto,
  UpdateReorderRuleDto,
} from './dto/reorder-rule.dto.js';
import { ReorderRuleQueryDto } from './dto/reorder-rule-query.dto.js';
import { StockQueryDto } from './dto/stock-query.dto.js';
import { StockMoveQueryDto } from './dto/stock-move-query.dto.js';
import { TransferStockDto, TransferLineDto } from './dto/transfer-stock.dto.js';
import {
  CreateReceptionDto,
  ReceptionQueryDto,
} from './dto/reception.dto.js';
import {
  buildMeta,
  Paginated,
  resolvePagination,
} from '../common/dto/pagination-query.dto.js';

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

export type SerializedStockMove = {
  id: string;
  productId: number;
  warehouseId: string;
  type: string;
  quantity: string;
  unitCost: string | null;
  lotNumber: string | null;
  expiryDate: string | null;
  sourceType: string;
  sourceId: string;
  date: string;
  user: { id: string; username: string };
  product: { id: number; name: string; sku: string };
  warehouse: { id: string; name: string };
};

export type SerializedReorderRule = {
  id: string;
  productId: number;
  warehouseId: string;
  minQty: string;
  maxQty: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SerializedReception = {
  id: string;
  reference: string;
  date: string;
  description: string | null;
  status: string;
  supplier: { id: string; name: string };
  warehouse: { id: string; name: string };
  lineCount: number;
  createdAt: string;
};

export type SerializedReceptionLine = {
  id: string;
  productId: number;
  product: { id: number; name: string; sku: string };
  quantity: string;
  unitCost: string;
  lotNumber: string | null;
  expiryDate: string | null;
};

export type SerializedReceptionDetail = SerializedReception & {
  user: { id: string; username: string };
  lines: SerializedReceptionLine[];
};

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  // ─────────────────────────────────────────────────────────────
  // Helpers de sérialisation
  // ─────────────────────────────────────────────────────────────

  private levelInclude() {
    return {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          isActive: true,
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
      select: {
        productId: true,
        warehouseId: true,
        minQty: true,
        maxQty: true,
      },
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

  private serializeLevel(level: any, rule: RuleInfo): SerializedStockLevel {
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

  private serializeMove(m: any): SerializedStockMove {
    return {
      id: m.id,
      productId: m.productId,
      warehouseId: m.warehouseId,
      type: m.type,
      quantity: (m.quantity as Prisma.Decimal).toString(),
      unitCost: m.unitCost ? (m.unitCost as Prisma.Decimal).toString() : null,
      lotNumber: m.lotNumber,
      expiryDate: m.expiryDate ? m.expiryDate.toISOString() : null,
      sourceType: m.sourceType,
      sourceId: m.sourceId,
      date: m.date.toISOString(),
      user: m.user,
      product: m.product,
      warehouse: m.warehouse,
    };
  }

  private serializeReorder(r: any): SerializedReorderRule {
    return {
      id: r.id,
      productId: r.productId,
      warehouseId: r.warehouseId,
      minQty: (r.minQty as Prisma.Decimal).toString(),
      maxQty: (r.maxQty as Prisma.Decimal).toString(),
      isActive: r.isActive,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Niveaux de stock
  // ─────────────────────────────────────────────────────────────

  async findAll(
    query: StockQueryDto,
  ): Promise<Paginated<SerializedStockLevel>> {
    const where: Prisma.StockLevelWhereInput = {};

    if (query.productId !== undefined) where.productId = query.productId;
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.zoneId) where.zoneId = query.zoneId;

    const productFilter: Prisma.ProductWhereInput = {};
    if (query.categoryId !== undefined)
      productFilter.categoryId = query.categoryId;
    if (query.brandId !== undefined) productFilter.brandId = query.brandId;
    if (query.onlyActive === 'true') productFilter.isActive = true;
    if (query.search) {
      productFilter.OR = [
        { name: { contains: query.search } },
        { sku: { contains: query.search } },
      ];
    }
    if (Object.keys(productFilter).length > 0) where.product = productFilter;

    const [levels, rulesMap] = await Promise.all([
      this.prisma.stockLevel.findMany({
        where,
        include: this.levelInclude(),
      }),
      this.loadRulesMap(),
    ]);

    let data = levels.map((l) =>
      this.serializeLevel(
        l,
        rulesMap.get(this.ruleKey(l.productId, l.warehouseId)) ?? null,
      ),
    );

    if (query.lowStock === 'true') {
      data = data.filter((l) => l.isLowStock);
    }

    data = this.sortLevels(data, query.sortBy, query.sortOrder);

    const params = resolvePagination(query);
    const total = data.length;
    const items = data.slice(params.skip, params.skip + params.limit);

    return { items, meta: buildMeta(total, params) };
  }

  private sortLevels(
    data: SerializedStockLevel[],
    sortBy?: StockQueryDto['sortBy'],
    sortOrder: 'asc' | 'desc' = 'desc',
  ): SerializedStockLevel[] {
    const dir = sortOrder === 'asc' ? 1 : -1;
    const cmp = (a: any, b: any): number => {
      switch (sortBy) {
        case 'quantityOnHand':
          return (
            (a.quantityOnHand.localeCompare(b.quantityOnHand, undefined, {
              numeric: true,
            }) as number) * dir
          );
        case 'productName':
          return a.product.name.localeCompare(b.product.name) * dir;
        case 'productSku':
          return a.product.sku.localeCompare(b.product.sku) * dir;
        case 'warehouseName':
          return a.warehouse.name.localeCompare(b.warehouse.name) * dir;
        case 'updatedAt':
        default:
          return (
            (new Date(a.updatedAt).getTime() -
              new Date(b.updatedAt).getTime()) *
            dir
          );
      }
    };
    return [...data].sort(cmp);
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
      include: this.levelInclude(),
    });
    if (!level) throw new NotFoundException('Niveau de stock introuvable');

    const rules = await this.prisma.reorderRule.findMany({
      where: { productId: level.productId, warehouseId: level.warehouseId },
      select: {
        id: true,
        warehouseId: true,
        minQty: true,
        maxQty: true,
        isActive: true,
      },
    });
    const activeRule = rules.find((r) => r.isActive) ?? null;
    const ruleInfo: RuleInfo = activeRule
      ? { minQty: activeRule.minQty, maxQty: activeRule.maxQty }
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
        product: { select: { id: true, name: true, sku: true } },
        warehouse: { select: { id: true, name: true } },
      },
    });

    const serialized = this.serializeLevel(level, ruleInfo);

    return {
      ...serialized,
      reorderRules: rules.map((r) => ({
        id: r.id,
        warehouseId: r.warehouseId,
        minQty: r.minQty.toString(),
        maxQty: r.maxQty.toString(),
        isActive: r.isActive,
      })),
      recentMoves: recentMoves.map((m) => this.serializeMove(m)),
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
            dto.unitCost !== undefined
              ? new Prisma.Decimal(dto.unitCost)
              : null,
          lotNumber: dto.lotNumber?.trim() || null,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
          sourceType: 'stock_adjustment',
          sourceId: level.id,
          date: new Date(),
        },
      }),
    ]);

    return this.findOne(id);
  }

  // ─────────────────────────────────────────────────────────────
  // Mouvements
  // ─────────────────────────────────────────────────────────────

  async findMoves(
    query: StockMoveQueryDto,
  ): Promise<Paginated<SerializedStockMove>> {
    const where: Prisma.StockMoveWhereInput = {};
    if (query.productId !== undefined) where.productId = query.productId;
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.type) where.type = query.type;
    if (query.lotNumber) where.lotNumber = { contains: query.lotNumber };

    if (query.dateFrom || query.dateTo) {
      where.date = {
        ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
        ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
      };
    }

    const total = await this.prisma.stockMove.count({ where });

    let orderBy: Prisma.StockMoveOrderByWithRelationInput = { date: 'desc' };
    if (query.sortBy === 'productId') orderBy = { productId: query.sortOrder };
    else if (query.sortBy === 'warehouseId')
      orderBy = { warehouseId: query.sortOrder };
    else if (query.sortBy === 'type') orderBy = { type: query.sortOrder };

    const params = resolvePagination(query);
    const moves = await this.prisma.stockMove.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.take,
      select: {
        id: true,
        productId: true,
        warehouseId: true,
        type: true,
        quantity: true,
        unitCost: true,
        lotNumber: true,
        expiryDate: true,
        sourceType: true,
        sourceId: true,
        date: true,
        user: { select: { id: true, username: true } },
        product: { select: { id: true, name: true, sku: true } },
        warehouse: { select: { id: true, name: true } },
      },
    });

    return {
      items: moves.map((m) => this.serializeMove(m)),
      meta: buildMeta(total, params),
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Règles de réapprovisionnement
  // ─────────────────────────────────────────────────────────────

  async findReorderRules(query: ReorderRuleQueryDto) {
    const where: Prisma.ReorderRuleWhereInput = {};
    if (query.productId !== undefined) where.productId = query.productId;
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.isActive !== undefined)
      where.isActive = query.isActive === 'true';

    const total = await this.prisma.reorderRule.count({ where });

    const orderBy: Prisma.ReorderRuleOrderByWithRelationInput = {
      productId: 'asc',
    };
    const params = resolvePagination(query);
    const rules = await this.prisma.reorderRule.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.take,
    });

    return {
      items: rules.map((r) => this.serializeReorder(r)),
      meta: buildMeta(total, params),
    };
  }

  async createReorderRule(dto: CreateReorderRuleDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Produit introuvable');

    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');

    const existing = await this.prisma.reorderRule.findUnique({
      where: {
        productId_warehouseId: {
          productId: dto.productId,
          warehouseId: dto.warehouseId,
        },
      },
    });
    if (existing)
      throw new ConflictException(
        'Une règle de réapprovisionnement existe déjà pour ce produit/entrepôt',
      );

    const created = await this.prisma.reorderRule.create({
      data: {
        productId: dto.productId,
        warehouseId: dto.warehouseId,
        minQty: new Prisma.Decimal(dto.minQty),
        maxQty: new Prisma.Decimal(dto.maxQty),
        isActive: dto.isActive ?? true,
      },
    });
    return this.serializeReorder(created);
  }

  async findReorderRule(id: string) {
    const rule = await this.prisma.reorderRule.findUnique({ where: { id } });
    if (!rule)
      throw new NotFoundException('Règle de réapprovisionnement introuvable');
    return this.serializeReorder(rule);
  }

  async updateReorderRule(id: string, dto: UpdateReorderRuleDto) {
    const rule = await this.prisma.reorderRule.findUnique({ where: { id } });
    if (!rule)
      throw new NotFoundException('Règle de réapprovisionnement introuvable');

    const updated = await this.prisma.reorderRule.update({
      where: { id },
      data: {
        ...(dto.minQty !== undefined
          ? { minQty: new Prisma.Decimal(dto.minQty) }
          : {}),
        ...(dto.maxQty !== undefined
          ? { maxQty: new Prisma.Decimal(dto.maxQty) }
          : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
      },
    });
    return this.serializeReorder(updated);
  }

  async deleteReorderRule(id: string) {
    const rule = await this.prisma.reorderRule.findUnique({ where: { id } });
    if (!rule)
      throw new NotFoundException('Règle de réapprovisionnement introuvable');
    await this.prisma.reorderRule.delete({ where: { id } });
    return { id, deleted: true };
  }

  // ─────────────────────────────────────────────────────────────
  // Réceptions (entrées de stock fournisseur)
  // ─────────────────────────────────────────────────────────────

  private stamp(): string {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  }

  async reception(dto: CreateReceptionDto, userId: string) {
    if (!dto.lines?.length) {
      throw new BadRequestException('La réception doit contenir au moins une ligne');
    }

    const productIds = [...new Set(dto.lines.map((l) => l.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });
    const knownProducts = new Set(products.map((p) => p.id));
    for (const id of productIds) {
      if (!knownProducts.has(Number(id)))
        throw new NotFoundException(`Produit ${id} introuvable`);
    }

    const supplier = await this.prisma.supplier.findUnique({
      where: { id: dto.supplierId },
    });
    if (!supplier) throw new NotFoundException('Fournisseur introuvable');

    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    if (!warehouse) throw new NotFoundException('Entrepôt introuvable');

    const entryId = randomUUID();
    const reference =
      dto.reference?.trim() ||
      `REC-${this.stamp()}-${entryId.slice(0, 4).toUpperCase()}`;
    const date = dto.date ? new Date(dto.date) : new Date();

    const tx: Prisma.PrismaPromise<unknown>[] = [
      this.prisma.entry.create({
        data: {
          id: entryId,
          reference,
          date,
          description: dto.description?.trim() || null,
          status: 'DONE',
          supplierId: dto.supplierId,
          userId,
          warehouseId: dto.warehouseId,
        },
      }),
    ];

    for (const line of dto.lines) {
      const qty = new Prisma.Decimal(line.quantity);
      const unitCost = new Prisma.Decimal(line.unitCost ?? 0);
      const lotNumber = line.lotNumber?.trim() || null;
      const expiryDate = line.expiryDate ? new Date(line.expiryDate) : null;

      const existing = await this.prisma.stockLevel.findFirst({
        where: {
          productId: line.productId,
          warehouseId: dto.warehouseId,
          zoneId: null,
        },
      });

      tx.push(
        existing
          ? this.prisma.stockLevel.update({
              where: { id: existing.id },
              data: { quantityOnHand: { increment: qty } },
            })
          : this.prisma.stockLevel.create({
              data: {
                id: randomUUID(),
                productId: line.productId,
                warehouseId: dto.warehouseId,
                zoneId: null,
                quantityOnHand: qty,
                quantityReserved: new Prisma.Decimal(0),
              },
            }),
      );

      tx.push(
        this.prisma.entryLine.create({
          data: {
            entryId,
            productId: line.productId,
            quantity: qty,
            unitCost,
            lotNumber,
            expiryDate,
          },
        }),
      );

      tx.push(
        this.prisma.stockMove.create({
          data: {
            productId: line.productId,
            warehouseId: dto.warehouseId,
            userId,
            type: 'ENTRY' as const,
            quantity: qty,
            unitCost,
            lotNumber,
            expiryDate,
            sourceType: 'entry',
            sourceId: entryId,
            date,
          },
        }),
      );
    }

    await this.prisma.$transaction(tx);
    return this.findReception(entryId);
  }

  async findReceptions(query: ReceptionQueryDto): Promise<
    Paginated<SerializedReception>
  > {
    const where: Prisma.EntryWhereInput = {};
    if (query.warehouseId) where.warehouseId = query.warehouseId;
    if (query.supplierId) where.supplierId = query.supplierId;
    if (query.status) where.status = query.status as Prisma.EntryWhereInput['status'];
    if (query.search) {
      where.OR = [
        { reference: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const total = await this.prisma.entry.count({ where });
    const params = resolvePagination(query);
    const entries = await this.prisma.entry.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: params.skip,
      take: params.take,
      include: {
        supplier: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        lines: { select: { id: true } },
      },
    });

    return {
      items: entries.map((e) => ({
        id: e.id,
        reference: e.reference,
        date: e.date.toISOString(),
        description: e.description,
        status: e.status,
        supplier: e.supplier,
        warehouse: e.warehouse,
        lineCount: e.lines.length,
        createdAt: e.createdAt.toISOString(),
      })),
      meta: buildMeta(total, params),
    };
  }

  async findReception(id: string): Promise<SerializedReceptionDetail> {
    const entry = await this.prisma.entry.findUnique({
      where: { id },
      include: {
        supplier: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        user: { select: { id: true, username: true } },
        lines: {
          include: {
            product: { select: { id: true, name: true, sku: true } },
          },
        },
      },
    });
    if (!entry) throw new NotFoundException('Réception introuvable');

    return {
      id: entry.id,
      reference: entry.reference,
      date: entry.date.toISOString(),
      description: entry.description,
      status: entry.status,
      supplier: entry.supplier,
      warehouse: entry.warehouse,
      user: entry.user,
      createdAt: entry.createdAt.toISOString(),
      lineCount: entry.lines.length,
      lines: entry.lines.map((l) => ({
        id: l.id,
        productId: l.productId,
        product: l.product,
        quantity: l.quantity.toString(),
        unitCost: l.unitCost.toString(),
        lotNumber: l.lotNumber,
        expiryDate: l.expiryDate ? l.expiryDate.toISOString() : null,
      })),
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Transferts entre entrepôts / zones
  // ─────────────────────────────────────────────────────────────

  async transfer(dto: TransferStockDto, userId: string) {
    if (dto.fromWarehouseId === dto.toWarehouseId) {
      const sameZones = dto.lines.every(
        (l) => (l.fromZoneId ?? null) === (l.toZoneId ?? null),
      );
      if (sameZones) {
        throw new BadRequestException(
          'L’entrepôt et la zone source doivent différer de la destination',
        );
      }
    }

    const transferId = randomUUID();
    const now = new Date();

    // Validation préalable des produits
    const productIds = [...new Set(dto.lines.map((l) => l.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });
    const knownProducts = new Set(products.map((p) => p.id));
    for (const id of productIds) {
      if (!knownProducts.has(id))
        throw new NotFoundException(`Produit ${id} introuvable`);
    }

    const sourceLevels = await this.prisma.stockLevel.findMany({
      where: {
        productId: { in: productIds },
        warehouseId: dto.fromWarehouseId,
      },
    });

    const results: Array<{
      productId: number;
      from: SerializedStockLevel;
      to: SerializedStockLevel;
    }> = [];

    for (const line of dto.lines) {
      const source = sourceLevels.find(
        (s) =>
          s.productId === line.productId &&
          (s.zoneId ?? null) === (line.fromZoneId ?? null),
      );
      if (!source) {
        throw new NotFoundException(
          `Stock source introuvable pour le produit ${line.productId}` +
            (line.fromZoneId ? ` (zone ${line.fromZoneId})` : ''),
        );
      }

      const onHand = source.quantityOnHand as Prisma.Decimal;
      const qty = new Prisma.Decimal(line.quantity);
      if (onHand.lessThan(qty)) {
        throw new BadRequestException(
          `Stock insuffisant pour le produit ${line.productId} : ${onHand.toString()} disponible(s)`,
        );
      }

      const dest = await this.prisma.stockLevel.findFirst({
        where: {
          productId: line.productId,
          warehouseId: dto.toWarehouseId,
          zoneId: line.toZoneId ?? null,
        },
      });

      const destOp = dest
        ? this.prisma.stockLevel.update({
            where: { id: dest.id },
            data: { quantityOnHand: { increment: qty } },
          })
        : this.prisma.stockLevel.create({
            data: {
              id: randomUUID(),
              productId: line.productId,
              warehouseId: dto.toWarehouseId,
              zoneId: line.toZoneId ?? null,
              quantityOnHand: qty,
              quantityReserved: new Prisma.Decimal(0),
            },
          });

      const moveData = (sign: 1 | -1) => ({
        productId: line.productId,
        warehouseId: sign === -1 ? dto.fromWarehouseId : dto.toWarehouseId,
        userId,
        type: 'TRANSFER' as const,
        quantity: sign === -1 ? qty.negated() : qty,
        unitCost:
          line.unitCost !== undefined
            ? new Prisma.Decimal(line.unitCost)
            : null,
        lotNumber: line.lotNumber?.trim() || null,
        expiryDate: line.expiryDate ? new Date(line.expiryDate) : null,
        sourceType: 'transfer',
        sourceId: transferId,
        date: now,
      });

      await this.prisma.$transaction([
        this.prisma.stockLevel.update({
          where: { id: source.id },
          data: { quantityOnHand: onHand.minus(qty) },
        }),
        destOp,
        this.prisma.stockMove.create({ data: moveData(-1) }),
        this.prisma.stockMove.create({ data: moveData(1) }),
      ]);

      // Rechargement des niveaux pour la réponse

      const [from, to] = await Promise.all([
        this.prisma.stockLevel.findUnique({
          where: { id: source.id },
          include: this.levelInclude(),
        }),
        this.prisma.stockLevel.findFirst({
          where: {
            productId: line.productId,
            warehouseId: dto.toWarehouseId,
            zoneId: line.toZoneId ?? null,
          },
          include: this.levelInclude(),
        }),
      ]);
      const rulesMap = await this.loadRulesMap();
      results.push({
        productId: line.productId,
        from: this.serializeLevel(
          from,
          rulesMap.get(this.ruleKey(from.productId, from.warehouseId)) ?? null,
        ),
        to: this.serializeLevel(
          to,
          rulesMap.get(this.ruleKey(to.productId, to.warehouseId)) ?? null,
        ),
      });
    }

    return { id: transferId, lines: results };
  }
}
