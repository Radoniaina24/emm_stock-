import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/** Valeurs autorisées pour le tri. */
export type SortOrder = 'asc' | 'desc';

/**
 * DTO de base pour la pagination. À étendre (via `extends`) par les query DTO
 * métier qui souhaitent exposer les paramètres page/limit/tri.
 */
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sortOrder?: SortOrder = 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  take: number;
}

/** Calcule skip/take à partir d'une query de pagination. */
export function resolvePagination(query: PaginationQueryDto): PaginationParams {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(500, Math.max(1, query.limit ?? 20));
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
}

/** Construit les métadonnées de pagination renvoyées au client. */
export function buildMeta(
  total: number,
  params: PaginationParams,
): PaginationMeta {
  return {
    page: params.page,
    limit: params.limit,
    total,
    totalPages: Math.ceil(total / params.limit),
  };
}
