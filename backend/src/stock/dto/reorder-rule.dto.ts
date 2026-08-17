import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReorderRuleDto {
  @ApiProperty({ description: 'Identifiant du produit' })
  @Type(() => Number)
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Identifiant de l’entrepôt' })
  @IsString()
  warehouseId: string;

  @ApiProperty({
    description: 'Seuil de réapprovisionnement (min)',
    example: 10,
  })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  minQty: number;

  @ApiProperty({ description: 'Stock maximum visé', example: 50 })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  maxQty: number;

  @ApiPropertyOptional({ description: 'Règle active ?', default: true })
  @IsOptional()
  isActive?: boolean;
}

export class UpdateReorderRuleDto {
  @ApiPropertyOptional({ description: 'Seuil de réapprovisionnement (min)' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  minQty?: number;

  @ApiPropertyOptional({ description: 'Stock maximum visé' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  maxQty?: number;

  @ApiPropertyOptional({ description: 'Règle active ?' })
  @IsOptional()
  isActive?: boolean;
}
