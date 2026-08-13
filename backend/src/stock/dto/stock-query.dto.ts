import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class StockQueryDto {
  @IsOptional()
  @Type(() => Number)
  productId?: number;

  @IsOptional()
  @IsString()
  warehouseId?: string;

  @IsOptional()
  @IsString()
  zoneId?: string;

  /** "true" pour ne retourner que les niveaux sous le seuil de réapprovisionnement. */
  @IsOptional()
  @IsString()
  lowStock?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
