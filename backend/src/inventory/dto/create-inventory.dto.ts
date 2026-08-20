import { ArrayMinSize, IsArray, IsInt, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InventoryLineInputDto {
  @IsInt()
  productId: number;

  /** Quantité physiquement comptée lors de l'inventaire. */
  @IsPositive()
  quantityCounted: number;
}

export class CreateInventoryDto {
  @IsString()
  warehouseId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InventoryLineInputDto)
  lines: InventoryLineInputDto[];
}
