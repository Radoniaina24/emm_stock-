import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'SKU-ELEC-021' })
  @IsString()
  @IsNotEmpty({ message: 'Le SKU est obligatoire' })
  @MinLength(3, { message: 'Le SKU doit contenir au moins 3 caractères' })
  @MaxLength(100, { message: 'Le SKU est trop long' })
  @Matches(/^[A-Za-z0-9][A-Za-z0-9\-]*$/, {
    message: 'Le SKU ne peut contenir que des lettres, chiffres et tirets',
  })
  sku: string;

  @ApiProperty({ example: 'Tablette graphique' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  @MaxLength(200, { message: 'Le nom est trop long' })
  name: string;

  @ApiPropertyOptional({
    example: 'tablette-graphique',
    description: 'Généré automatiquement depuis le nom si absent',
  })
  @IsOptional()
  @IsString()
  @MaxLength(220)
  slug?: string;

  @ApiPropertyOptional({ example: 'Tablette à stylet professionnelle' })
  @IsOptional()
  @IsString()
  @MaxLength(5000, { message: 'La description est trop longue' })
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  brandId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  unitId: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}