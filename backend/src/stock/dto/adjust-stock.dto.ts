import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum StockAdjustmentType {
  SET = 'SET',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export class AdjustStockDto {
  @ApiProperty({
    enum: StockAdjustmentType,
    example: StockAdjustmentType.INCREMENT,
    description: 'SET = fixe la quantité, INCREMENT = ajout, DECREMENT = retrait',
  })
  @IsEnum(StockAdjustmentType)
  type: StockAdjustmentType;

  @ApiProperty({ example: 10, description: 'Quantité concernée par l’ajustement (>= 0)' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: 'Inventaire physique du 13/08' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ example: 'LOT-2025-014' })
  @IsOptional()
  @IsString()
  lotNumber?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsString()
  expiryDate?: string;

  @ApiPropertyOptional({ example: 12.5, description: 'Coût unitaire (optionnel)' })
  @IsOptional()
  @IsNumber()
  unitCost?: number;
}
