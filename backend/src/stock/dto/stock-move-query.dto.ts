import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class StockMoveQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId?: number;

  @IsOptional()
  @IsString()
  warehouseId?: string;

  @IsOptional()
  @IsIn(['ENTRY', 'EXIT', 'INVENTORY_ADJUSTMENT', 'TRANSFER'])
  type?: 'ENTRY' | 'EXIT' | 'INVENTORY_ADJUSTMENT' | 'TRANSFER';

  @IsOptional()
  @IsString()
  lotNumber?: string;

  /** Date de début (ISO 8601), incluse. */
  @IsOptional()
  @IsString()
  dateFrom?: string;

  /** Date de fin (ISO 8601), incluse. */
  @IsOptional()
  @IsString()
  dateTo?: string;

  @IsOptional()
  @IsIn(['date', 'productId', 'warehouseId', 'type'])
  sortBy?: 'date' | 'productId' | 'warehouseId' | 'type';
}
