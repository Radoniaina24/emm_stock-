import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export const PRODUCT_TYPES = ['STORABLE', 'CONSUMABLE', 'SERVICE'] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export const TRACKING_TYPES = ['NONE', 'LOT', 'SERIAL'] as const;
export type TrackingType = (typeof TRACKING_TYPES)[number];

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

  @ApiPropertyOptional({ example: 'Descriptif interne pour les achats' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  descriptionPurchase?: string;

  @ApiPropertyOptional({ example: 'Descriptif commercial pour la vente' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  descriptionSale?: string;

  @ApiPropertyOptional({ example: 'Notes internes réservées au personnel' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  internalNotes?: string;

  @ApiPropertyOptional({ enum: PRODUCT_TYPES, example: 'STORABLE' })
  @IsOptional()
  @IsIn(PRODUCT_TYPES, { message: 'Type de produit invalide' })
  type?: ProductType;

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

  @ApiProperty({ example: 1, description: 'Unité de stockage / référence' })
  @IsInt()
  @Min(1)
  unitId: number;

  @ApiPropertyOptional({ example: 2, description: 'Unité d’achat' })
  @IsOptional()
  @IsInt()
  @Min(1)
  purchaseUnitId?: number;

  @ApiPropertyOptional({ example: 3, description: 'Unité de vente' })
  @IsOptional()
  @IsInt()
  @Min(1)
  saleUnitId?: number;

  @ApiPropertyOptional({ example: 25.5, description: 'Coût d’achat unitaire' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  costPrice?: number;

  @ApiPropertyOptional({ example: 39.99, description: 'Prix de vente unitaire' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  salePrice?: number;

  @ApiPropertyOptional({ example: 20, description: 'Taux de TVA en %' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  taxRate?: number;

  @ApiPropertyOptional({ enum: TRACKING_TYPES, example: 'NONE' })
  @IsOptional()
  @IsIn(TRACKING_TYPES, { message: 'Type de traçabilité invalide' })
  tracking?: TrackingType;

  @ApiPropertyOptional({ example: false, description: 'Produit à date de péremption' })
  @IsOptional()
  @IsBoolean()
  hasExpiry?: boolean;

  @ApiPropertyOptional({ example: 365, description: 'Durée de conservation en jours' })
  @IsOptional()
  @IsInt()
  @Min(1)
  shelfLifeDays?: number;

  @ApiPropertyOptional({ example: 1.5, description: 'Poids en kg' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ example: 30, description: 'Longueur en cm' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  length?: number;

  @ApiPropertyOptional({ example: 20, description: 'Largeur en cm' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  width?: number;

  @ApiPropertyOptional({ example: 5, description: 'Hauteur en cm' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
