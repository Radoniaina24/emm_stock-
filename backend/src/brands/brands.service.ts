import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';

const LOGOS_DIR = join(process.cwd(), 'uploads', 'brands');
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE = 2 * 1024 * 1024;

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 180);
  }

  private async uniqueSlug(base: string, ignoreId?: number): Promise<string> {
    const slug = this.slugify(base) || 'marque';
    let candidate = slug;
    let counter = 2;
    for (;;) {
      const existing = await this.prisma.brand.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      if (!existing || existing.id === ignoreId) return candidate;
      candidate = `${slug}-${counter}`;
      counter += 1;
    }
  }

  async create(dto: CreateBrandDto) {
    const slug = await this.uniqueSlug(dto.slug?.trim() || dto.name);
    return this.prisma.brand.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description ?? null,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
      },
      include: this.detailInclude(),
    });
  }

  async findAll() {
    return this.prisma.brand.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: this.detailInclude(),
    });
  }

  async findOne(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: this.detailInclude(),
    });
    if (!brand) throw new NotFoundException('Marque introuvable');
    return brand;
  }

  async update(id: number, dto: UpdateBrandDto) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Marque introuvable');

    let slug: string | undefined;
    if (dto.slug !== undefined) {
      slug = dto.slug.trim() || (await this.uniqueSlug(dto.name ?? '', id));
    } else if (dto.name !== undefined && dto.name !== brand.name) {
      slug = await this.uniqueSlug(dto.name, id);
    }

    if (slug !== undefined) {
      const conflict = await this.prisma.brand.findUnique({
        where: { slug },
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException(
          'Ce slug est déjà utilisé par une autre marque',
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (slug !== undefined) data.slug = slug;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;

    return this.prisma.brand.update({
      where: { id },
      data,
      include: this.detailInclude(),
    });
  }

  async remove(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!brand) throw new NotFoundException('Marque introuvable');

    if (brand._count.products > 0) {
      throw new BadRequestException(
        'Impossible de supprimer une marque associée à des produits',
      );
    }

    this.removeLogoFile(brand.logoUrl);
    await this.prisma.brand.delete({ where: { id } });
  }

  async uploadLogo(id: number, file: Express.Multer.File) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Marque introuvable');
    if (!file) throw new BadRequestException('Aucun fichier fourni');
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('Formats acceptés : JPG, PNG, WebP');
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('Fichier trop volumineux (max 2 Mo)');
    }

    if (!existsSync(LOGOS_DIR)) {
      mkdirSync(LOGOS_DIR, { recursive: true });
    }

    const ext = this.extensionFor(file.mimetype);
    const filename = `${brand.slug}-${Date.now()}.${ext}`;
    writeFileSync(join(LOGOS_DIR, filename), file.buffer);

    const logoUrl = `/uploads/brands/${filename}`;
    this.removeLogoFile(brand.logoUrl);

    return this.prisma.brand.update({
      where: { id },
      data: { logoUrl },
      include: this.detailInclude(),
    });
  }

  async deleteLogo(id: number) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Marque introuvable');

    this.removeLogoFile(brand.logoUrl);

    return this.prisma.brand.update({
      where: { id },
      data: { logoUrl: null },
      include: this.detailInclude(),
    });
  }

  private extensionFor(mime: string): string {
    if (mime === 'image/png') return 'png';
    if (mime === 'image/webp') return 'webp';
    return 'jpg';
  }

  private removeLogoFile(logoPath: string | null | undefined) {
    if (!logoPath?.startsWith('/uploads/brands/')) return;
    const filename = logoPath.replace('/uploads/brands/', '');
    const full = join(LOGOS_DIR, filename);
    if (existsSync(full)) {
      try {
        unlinkSync(full);
      } catch {
        // ignore
      }
    }
  }

  private detailInclude() {
    return { _count: { select: { products: true } } };
  }
}
