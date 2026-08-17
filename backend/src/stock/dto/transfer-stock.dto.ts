import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TransferLineDto {
  @ApiProperty({ description: 'Identifiant du produit' })
  @IsNumber()
  productId: number;

  @ApiPropertyOptional({ description: 'Zone source (optionnelle)' })
  @IsOptional()
  @IsString()
  fromZoneId?: string;

  @ApiPropertyOptional({ description: 'Zone destination (optionnelle)' })
  @IsOptional()
  @IsString()
  toZoneId?: string;

  @ApiProperty({ description: 'Quantité à transférer (>= 0)' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: 'LOT-2025-014' })
  @IsOptional()
  @IsString()
  lotNumber?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsString()
  expiryDate?: string;

  @ApiPropertyOptional({
    example: 12.5,
    description: 'Coût unitaire (optionnel)',
  })
  @IsOptional()
  @IsNumber()
  unitCost?: number;
}

export class TransferStockDto {
  @ApiProperty({ description: 'Entrepôt source' })
  @IsString()
  fromWarehouseId: string;

  @ApiProperty({ description: 'Entrepôt destination' })
  @IsString()
  toWarehouseId: string;

  @ApiProperty({ type: [TransferLineDto], description: 'Lignes à transférer' })
  @ValidateNested({ each: true })
  @Type(() => TransferLineDto)
  lines: TransferLineDto[];
}
