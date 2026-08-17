import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ImportProductRowDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['STORABLE', 'CONSUMABLE', 'SERVICE'])
  type?: 'STORABLE' | 'CONSUMABLE' | 'SERVICE';

  @IsOptional()
  @IsInt()
  brandId?: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsInt()
  unitId: number;

  @IsOptional()
  @IsNumber()
  costPrice?: number;

  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  taxRate?: number;

  @IsOptional()
  @IsEnum(['NONE', 'LOT', 'SERIAL'])
  tracking?: 'NONE' | 'LOT' | 'SERIAL';

  @IsOptional()
  @IsBoolean()
  hasExpiry?: boolean;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ImportProductsDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Aucune ligne à importer' })
  @ValidateNested({ each: true })
  @Type(() => ImportProductRowDto)
  rows: ImportProductRowDto[];
}
