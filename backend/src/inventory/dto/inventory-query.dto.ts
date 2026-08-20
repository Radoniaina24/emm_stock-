import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class AddInventoryLineDto {
  @IsInt()
  productId: number;

  @IsPositive()
  quantityCounted: number;
}

export class InventoryQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  warehouseId?: string;

  /** Statut de l'inventaire : en_cours | valide | annule. */
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
