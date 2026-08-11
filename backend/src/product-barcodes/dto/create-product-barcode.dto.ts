import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const BARCODE_TYPES = [
  'EAN8',
  'EAN13',
  'EAN14',
  'UPC_A',
  'UPC_E',
  'CODE128',
  'CODE39',
  'ITF14',
  'GS1_128',
  'QR',
  'OTHER',
] as const;

export type BarcodeType = (typeof BARCODE_TYPES)[number];

export class CreateProductBarcodeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty({ message: 'Le produit est obligatoire' })
  productId: number;

  @ApiProperty({ example: '3614272812344' })
  @IsString()
  @MinLength(4, { message: 'Le code doit contenir au moins 4 caractères' })
  @MaxLength(100, { message: 'Le code est trop long' })
  code: string;

  @ApiPropertyOptional({ enum: BARCODE_TYPES, example: 'EAN13' })
  @IsOptional()
  @IsIn(BARCODE_TYPES, { message: 'Type de code-barres invalide' })
  type?: BarcodeType;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}