import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductBarcodeDto } from './dto/create-product-barcode.dto.js';
import { UpdateProductBarcodeDto } from './dto/update-product-barcode.dto.js';

@Injectable()
export class ProductBarcodesService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeCode(code: string): string {
    return code.trim().replace(/\s+/g, '').toUpperCase();
  }

  private includeDetail() {
    return {
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          unit: { select: { symbol: true } },
        },
      },
    };
  }

  private async assertCodeAvailable(
    code: string,
    ignoreId?: number,
  ): Promise<void> {
    const normalized = this.normalizeCode(code);
    const existing = await this.prisma.productBarcode.findFirst({
      where: { code: { equals: normalized } },
      select: { id: true },
    });
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException(
        `Le code-barres "${normalized}" est déjà utilisé`,
      );
    }
  }

  private async assertProductExists(productId: number): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) throw new NotFoundException('Produit introuvable');
  }

  async create(dto: CreateProductBarcodeDto) {
    await this.assertProductExists(dto.productId);
    const code = this.normalizeCode(dto.code);
    await this.assertCodeAvailable(code);
    const isPrimary = dto.isPrimary ?? false;

    const ops: Prisma.PrismaPromise<unknown>[] = [];
    if (isPrimary) {
      ops.push(
        this.prisma.productBarcode.updateMany({
          where: { productId: dto.productId, isPrimary: true },
          data: { isPrimary: false },
        }),
      );
    }
    ops.push(
      this.prisma.productBarcode.create({
        data: {
          productId: dto.productId,
          code,
          type: dto.type ?? 'EAN13',
          isPrimary,
        },
        include: this.includeDetail(),
      }),
    );

    const results = await this.prisma.$transaction(ops);
    return results[results.length - 1];
  }

  async findAll() {
    return this.prisma.productBarcode.findMany({
      orderBy: [{ product: { name: 'asc' } }, { isPrimary: 'desc' }],
      include: this.includeDetail(),
    });
  }

  async findOne(id: number) {
    const barcode = await this.prisma.productBarcode.findUnique({
      where: { id },
      include: this.includeDetail(),
    });
    if (!barcode) throw new NotFoundException('Code-barres introuvable');
    return barcode;
  }

  async update(id: number, dto: UpdateProductBarcodeDto) {
    const barcode = await this.prisma.productBarcode.findUnique({
      where: { id },
    });
    if (!barcode) throw new NotFoundException('Code-barres introuvable');

    if (dto.productId !== undefined && dto.productId !== barcode.productId) {
      await this.assertProductExists(dto.productId);
    }
    if (dto.code !== undefined) {
      const code = this.normalizeCode(dto.code);
      if (code !== barcode.code) {
        await this.assertCodeAvailable(code, id);
      }
      dto.code = code;
    }

    const isPrimary = dto.isPrimary ?? barcode.isPrimary;
    const targetProductId = dto.productId ?? barcode.productId;

    const ops: Prisma.PrismaPromise<unknown>[] = [];
    if (isPrimary) {
      ops.push(
        this.prisma.productBarcode.updateMany({
          where: {
            productId: targetProductId,
            isPrimary: true,
            id: { not: id },
          },
          data: { isPrimary: false },
        }),
      );
    }

    const data: Record<string, unknown> = {};
    if (dto.productId !== undefined) data.productId = dto.productId;
    if (dto.code !== undefined) data.code = dto.code;
    if (dto.type !== undefined) data.type = dto.type;
    if (dto.isPrimary !== undefined) data.isPrimary = dto.isPrimary;

    ops.push(
      this.prisma.productBarcode.update({
        where: { id },
        data,
        include: this.includeDetail(),
      }),
    );

    const results = await this.prisma.$transaction(ops);
    return results[results.length - 1];
  }

  async remove(id: number) {
    const barcode = await this.prisma.productBarcode.findUnique({
      where: { id },
    });
    if (!barcode) throw new NotFoundException('Code-barres introuvable');
    await this.prisma.productBarcode.delete({ where: { id } });
  }
}
