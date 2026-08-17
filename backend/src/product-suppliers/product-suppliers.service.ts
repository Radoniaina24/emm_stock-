import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductSupplierDto } from './dto/create-product-supplier.dto.js';
import { UpdateProductSupplierDto } from './dto/update-product-supplier.dto.js';
import { ProductSupplierQueryDto } from './dto/product-supplier-query.dto.js';

export type SerializedProductSupplier = {
  id: string;
  productId: number;
  supplierId: string;
  supplierSku: string | null;
  price: string;
  minQty: string;
  leadTimeDays: number | null;
  isPreferred: boolean;
  createdAt: string;
  updatedAt: string;
  product: { id: number; name: string; sku: string };
  supplier: { id: string; name: string };
};

/** Générateur de cuid compatible Prisma (pas de dépendance externe). */
let _cuidCounter = 0;
function cuid(): string {
  const timestamp = Date.now().toString(36).padStart(8, '0');
  const random = Math.random().toString(36).substring(2, 12).padEnd(10, '0');
  const counter = (_cuidCounter = _cuidCounter + 1)
    .toString(36)
    .padStart(4, '0');
  return `c${timestamp}${random}${counter}`;
}

@Injectable()
export class ProductSuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  private include() {
    return {
      product: { select: { id: true, name: true, sku: true } },
      supplier: { select: { id: true, name: true } },
    };
  }

  private serialize(link: any): SerializedProductSupplier {
    return {
      id: link.id,
      productId: link.productId,
      supplierId: link.supplierId,
      supplierSku: link.supplierSku,
      price: (link.price as Prisma.Decimal).toString(),
      minQty: (link.minQty as Prisma.Decimal).toString(),
      leadTimeDays: link.leadTimeDays,
      isPreferred: link.isPreferred,
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
      product: link.product,
      supplier: link.supplier,
    };
  }

  async findAll(query: ProductSupplierQueryDto) {
    const where: Prisma.ProductSupplierWhereInput = {};
    if (query.productId !== undefined) where.productId = query.productId;
    if (query.supplierId) where.supplierId = query.supplierId;

    const links = await this.prisma.productSupplier.findMany({
      where,
      include: this.include(),
      orderBy: [{ isPreferred: 'desc' }, { price: 'asc' }],
    });
    return links.map((l) => this.serialize(l));
  }

  async findOne(id: string) {
    const link = await this.prisma.productSupplier.findUnique({
      where: { id },
      include: this.include(),
    });
    if (!link)
      throw new NotFoundException('Lien produit/fournisseur introuvable');
    return this.serialize(link);
  }

  async create(dto: CreateProductSupplierDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true },
    });
    if (!product) throw new NotFoundException('Produit introuvable');

    const supplier = await this.prisma.supplier.findUnique({
      where: { id: dto.supplierId },
      select: { id: true },
    });
    if (!supplier) throw new NotFoundException('Fournisseur introuvable');

    const existing = await this.prisma.productSupplier.findFirst({
      where: { productId: dto.productId, supplierId: dto.supplierId },
      select: { id: true },
    });
    if (existing) {
      throw new ConflictException(
        'Ce fournisseur est déjà associé à ce produit',
      );
    }

    const id = cuid();
    const isPreferred = dto.isPreferred ?? false;

    const data: Prisma.ProductSupplierCreateInput = {
      id,
      product: { connect: { id: dto.productId } },
      supplier: { connect: { id: dto.supplierId } },
      supplierSku: dto.supplierSku?.trim() || null,
      price: new Prisma.Decimal(dto.price),
      minQty:
        dto.minQty !== undefined
          ? new Prisma.Decimal(dto.minQty)
          : new Prisma.Decimal(1),
      leadTimeDays: dto.leadTimeDays ?? null,
      isPreferred,
    };

    const ops: Prisma.PrismaPromise<unknown>[] = [
      this.prisma.productSupplier.create({ data, include: this.include() }),
    ];

    // Un seul fournisseur préféré par produit : on désactive les autres.
    if (isPreferred) {
      ops.push(
        this.prisma.productSupplier.updateMany({
          where: { productId: dto.productId, id: { not: id } },
          data: { isPreferred: false },
        }),
      );
    }

    try {
      const [created] = await this.prisma.$transaction(ops);
      return this.serialize(created);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'Ce fournisseur est déjà associé à ce produit',
        );
      }
      throw e;
    }
  }

  async update(id: string, dto: UpdateProductSupplierDto) {
    const existing = await this.prisma.productSupplier.findUnique({
      where: { id },
      select: { id: true, productId: true },
    });
    if (!existing)
      throw new NotFoundException('Lien produit/fournisseur introuvable');

    const data: Prisma.ProductSupplierUpdateInput = {};
    if (dto.supplierSku !== undefined) {
      data.supplierSku = dto.supplierSku?.trim() || null;
    }
    if (dto.price !== undefined) data.price = new Prisma.Decimal(dto.price);
    if (dto.minQty !== undefined) data.minQty = new Prisma.Decimal(dto.minQty);
    if (dto.leadTimeDays !== undefined) data.leadTimeDays = dto.leadTimeDays;
    if (dto.isPreferred !== undefined) data.isPreferred = dto.isPreferred;

    const ops: Prisma.PrismaPromise<unknown>[] = [
      this.prisma.productSupplier.update({
        where: { id },
        data,
        include: this.include(),
      }),
    ];

    if (dto.isPreferred === true) {
      ops.push(
        this.prisma.productSupplier.updateMany({
          where: { productId: existing.productId, id: { not: id } },
          data: { isPreferred: false },
        }),
      );
    }

    const [updated] = await this.prisma.$transaction(ops);
    return this.serialize(updated);
  }

  async remove(id: string) {
    const existing = await this.prisma.productSupplier.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing)
      throw new NotFoundException('Lien produit/fournisseur introuvable');

    await this.prisma.productSupplier.delete({ where: { id } });
    return { id };
  }
}
