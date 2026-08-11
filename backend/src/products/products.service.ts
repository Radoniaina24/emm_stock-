import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { UpdateProductImageDto } from './dto/update-product-image.dto.js';

const IMAGES_DIR = join(process.cwd(), 'uploads', 'products');
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE = 2 * 1024 * 1024;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private detailInclude() {
    return {
      category: { select: { id: true, name: true, slug: true } },
      brand: { select: { id: true, name: true, slug: true } },
      unit: { select: { id: true, name: true, code: true, symbol: true } },
      images: {
        where: { isPrimary: true },
        take: 1,
        select: { id: true, url: true, alt: true },
      },
      _count: { select: { images: true, barcodes: true } },
    };
  }

  private withImage<T extends { images?: Array<{ isPrimary?: boolean; id: number; url: string; alt: string | null }> }>(
    item: T,
  ) {
    const { images, ...rest } = item;
    const image = images?.find((i) => i.isPrimary) ?? images?.[0] ?? null;
    return { ...rest, image };
  }

  private async uniqueSlug(base: string, ignoreId?: number): Promise<string> {
    const slug = this.slugify(base) || 'produit';
    let candidate = slug;
    let counter = 2;
    for (;;) {
      const existing = await this.prisma.product.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      if (!existing || existing.id === ignoreId) return candidate;
      candidate = `${slug}-${counter}`;
      counter += 1;
    }
  }

  private async assertSkuAvailable(sku: string, ignoreId?: number): Promise<void> {
    const existing = await this.prisma.product.findUnique({
      where: { sku },
      select: { id: true },
    });
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException(`Le SKU "${sku}" est déjà utilisé`);
    }
  }

  private async assertReferentials(dto: CreateProductDto | UpdateProductDto) {
    const checks: Array<[number | null | undefined, 'brand' | 'category' | 'unit', string]> = [
      [dto.brandId, 'brand', 'La marque sélectionnée n\'existe pas'],
      [dto.categoryId, 'category', 'La catégorie sélectionnée n\'existe pas'],
      [dto.unitId, 'unit', "L'unité de mesure sélectionnée n'existe pas"],
    ];

    for (const [id, model, message] of checks) {
      if (id == null) continue;
      const exists = await this.prisma[model].findUnique({
        where: { id },
        select: { id: true },
      });
      if (!exists) throw new BadRequestException(message);
    }
  }

  async create(dto: CreateProductDto) {
    const sku = dto.sku.trim().toUpperCase();
    const slug = await this.uniqueSlug(dto.slug?.trim() || dto.name);
    await this.assertSkuAvailable(sku);
    await this.assertReferentials(dto);

    return this.withImage(
      await this.prisma.product.create({
        data: {
          sku,
          name: dto.name,
          slug,
          description: dto.description ?? null,
          brandId: dto.brandId ?? null,
          categoryId: dto.categoryId ?? null,
          unitId: dto.unitId,
          isActive: dto.isActive ?? true,
        },
        include: this.detailInclude(),
      }),
    );
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      orderBy: { name: 'asc' },
      include: this.detailInclude(),
    });
    return products.map((product) => this.withImage(product));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        ...this.detailInclude(),
        images: {
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            url: true,
            storageKey: true,
            alt: true,
            isPrimary: true,
            sortOrder: true,
          },
        },
        barcodes: {
          orderBy: [{ isPrimary: 'desc' }, { id: 'asc' }],
          select: {
            id: true,
            code: true,
            type: true,
            isPrimary: true,
            createdAt: true,
          },
        },
      },
    });
    if (!product) throw new NotFoundException('Produit introuvable');
    return this.withImage(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produit introuvable');

    let sku: string | undefined;
    if (dto.sku !== undefined) {
      sku = dto.sku.trim().toUpperCase();
      if (sku !== product.sku) await this.assertSkuAvailable(sku, id);
    }

    let slug: string | undefined;
    if (dto.slug !== undefined) {
      slug = dto.slug.trim()
        ? await this.uniqueSlug(dto.slug.trim(), id)
        : await this.uniqueSlug(dto.name ?? product.name, id);
    } else if (dto.name !== undefined && dto.name !== product.name) {
      slug = await this.uniqueSlug(dto.name, id);
    }

    if (dto.brandId !== undefined || dto.categoryId !== undefined || dto.unitId !== undefined) {
      await this.assertReferentials(dto);
    }

    const data: Record<string, unknown> = {};
    if (dto.sku !== undefined) data.sku = sku;
    if (dto.name !== undefined) data.name = dto.name;
    if (slug !== undefined) data.slug = slug;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.brandId !== undefined) data.brandId = dto.brandId;
    if (dto.categoryId !== undefined) data.categoryId = dto.categoryId;
    if (dto.unitId !== undefined) data.unitId = dto.unitId;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

    return this.withImage(
      await this.prisma.product.update({
        where: { id },
        data,
        include: this.detailInclude(),
      }),
    );
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { images: true, barcodes: true } } },
    });
    if (!product) throw new NotFoundException('Produit introuvable');

    const operations: Prisma.PrismaPromise<unknown>[] = [];
    if (product._count.barcodes > 0) {
      operations.push(
        this.prisma.productBarcode.deleteMany({ where: { productId: id } }),
      );
    }
    if (product._count.images > 0) {
      operations.push(
        this.prisma.productImage.deleteMany({ where: { productId: id } }),
      );
    }
    operations.push(this.prisma.product.delete({ where: { id } }));

    await this.prisma.$transaction(operations);
  }

  async uploadImage(productId: number, file: Express.Multer.File) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produit introuvable');
    if (!file) throw new BadRequestException('Aucun fichier fourni');
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('Formats acceptés : JPG, PNG, WebP');
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('Fichier trop volumineux (max 2 Mo)');
    }

    if (!existsSync(IMAGES_DIR)) {
      mkdirSync(IMAGES_DIR, { recursive: true });
    }

    const ext = this.extensionFor(file.mimetype);
    const filename = `${product.sku}-${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
    writeFileSync(join(IMAGES_DIR, filename), file.buffer);

    const last = await this.prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });
    const hasPrimary = await this.prisma.productImage.findFirst({
      where: { productId, isPrimary: true },
      select: { id: true },
    });

    return this.prisma.productImage.create({
      data: {
        productId,
        url: `/uploads/products/${filename}`,
        storageKey: filename,
        provider: 'LOCAL',
        isPrimary: !hasPrimary,
        sortOrder: (last?.sortOrder ?? 0) + 1,
      },
    });
  }

  async updateImage(imageId: number, dto: UpdateProductImageDto) {
    const image = await this.prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundException('Image introuvable');

    const data: Record<string, unknown> = {};
    if (dto.alt !== undefined) data.alt = dto.alt;
    if (dto.isPrimary !== undefined) data.isPrimary = dto.isPrimary;

    if (dto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: { productId: image.productId, isPrimary: true, NOT: { id: imageId } },
        data: { isPrimary: false },
      });
    }

    return this.prisma.productImage.update({
      where: { id: imageId },
      data,
    });
  }

  async deleteImage(imageId: number) {
    const image = await this.prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundException('Image introuvable');

    this.removeImageFile(image.url, image.storageKey);
    await this.prisma.productImage.delete({ where: { id: imageId } });

    if (image.isPrimary) {
      const next = await this.prisma.productImage.findFirst({
        where: { productId: image.productId },
        orderBy: { sortOrder: 'asc' },
        select: { id: true },
      });
      if (next) {
        await this.prisma.productImage.update({
          where: { id: next.id },
          data: { isPrimary: true },
        });
      }
    }
  }

  private extensionFor(mime: string): string {
    if (mime === 'image/png') return 'png';
    if (mime === 'image/webp') return 'webp';
    return 'jpg';
  }

  private removeImageFile(url: string, storageKey: string | null | undefined) {
    const filename = storageKey?.startsWith('/')
      ? storageKey.replace(/^\//, '')
      : storageKey ?? url.replace('/uploads/products/', '');
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return;
    const full = join(IMAGES_DIR, filename);
    if (existsSync(full)) {
      try {
        unlinkSync(full);
      } catch {
        // ignore
      }
    }
  }

  private slugify(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 220);
  }
}