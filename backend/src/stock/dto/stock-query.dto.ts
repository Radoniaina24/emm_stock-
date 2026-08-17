import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class StockQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId?: number;

  @IsOptional()
  @IsString()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  zoneId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  brandId?: number;

  /** "true" pour ne retourner que les niveaux sous le seuil de réapprovisionnement. */
  @IsOptional()
  @IsString()
  lowStock?: string;

  /** "true" pour ne retourner que les produits actifs. */
  @IsOptional()
  @IsString()
  onlyActive?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn([
    'updatedAt',
    'quantityOnHand',
    'productName',
    'productSku',
    'warehouseName',
  ])
  sortBy?:
    | 'updatedAt'
    | 'quantityOnHand'
    | 'productName'
    | 'productSku'
    | 'warehouseName';
}
