import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
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
    const slug = this.slugify(base) || 'categorie';
    let candidate = slug;
    let counter = 2;
    for (;;) {
      const existing = await this.prisma.category.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      if (!existing || existing.id === ignoreId) return candidate;
      candidate = `${slug}-${counter}`;
      counter += 1;
    }
  }

  private async assertParentValid(
    parentId: number | null | undefined,
    selfId?: number,
  ) {
    if (parentId == null) return;
    const parent = await this.prisma.category.findUnique({
      where: { id: parentId },
    });
    if (!parent)
      throw new BadRequestException("La catégorie parente n'existe pas");
    if (selfId !== undefined && parentId === selfId) {
      throw new BadRequestException(
        'Une catégorie ne peut pas être son propre parent',
      );
    }

    // Anti-cycle : remonter la chaîne de parents
    let cursor = parent;
    const seen = new Set<number>([parentId]);
    while (cursor.parentId) {
      cursor = await this.prisma.category.findUnique({
        where: { id: cursor.parentId },
      });
      if (!cursor) break;
      if (cursor.id === selfId) {
        throw new BadRequestException(
          'Cette hiérarchie créerait une boucle (catégorie en conflit)',
        );
      }
      if (seen.has(cursor.id)) break;
      seen.add(cursor.id);
    }
  }

  async create(dto: CreateCategoryDto) {
    await this.assertParentValid(dto.parentId);
    const slug = await this.uniqueSlug(dto.slug?.trim() || dto.name);

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description ?? null,
        parentId: dto.parentId ?? null,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
      },
      include: this.detailInclude(),
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: this.detailInclude(),
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: this.detailInclude(),
    });
    if (!category) throw new NotFoundException('Catégorie introuvable');
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Catégorie introuvable');

    await this.assertParentValid(dto.parentId, id);

    let slug: string | undefined;
    if (dto.slug !== undefined) {
      slug = dto.slug.trim() || (await this.uniqueSlug(dto.name ?? '', id));
    } else if (dto.name !== undefined && dto.name !== category.name) {
      slug = await this.uniqueSlug(dto.name, id);
    }

    if (slug !== undefined) {
      const conflict = await this.prisma.category.findUnique({
        where: { slug },
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException(
          'Ce slug est déjà utilisé par une autre catégorie',
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (slug !== undefined) data.slug = slug;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.parentId !== undefined) data.parentId = dto.parentId;
    if (dto.isActive !== undefined) {
      data.isActive = dto.isActive;
      if (!dto.isActive) {
        await this.prisma.category.updateMany({
          where: { parentId: id },
          data: { isActive: false },
        });
      }
    }
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;

    return this.prisma.category.update({
      where: { id },
      data,
      include: this.detailInclude(),
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { children: true, products: true } } },
    });
    if (!category) throw new NotFoundException('Catégorie introuvable');

    if (category._count.children > 0) {
      throw new BadRequestException(
        'Impossible de supprimer une catégorie qui possède des sous-catégories',
      );
    }
    if (category._count.products > 0) {
      throw new BadRequestException(
        'Impossible de supprimer une catégorie associée à des produits',
      );
    }

    await this.prisma.category.delete({ where: { id } });
  }

  private detailInclude() {
    return {
      parent: { select: { id: true, name: true, slug: true } },
      _count: { select: { children: true, products: true } },
    };
  }
}
