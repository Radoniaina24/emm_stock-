import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Mise à jour d'un lien produit↔fournisseur.
 * L'identité (productId / supplierId) est immuable : on ne peut pas
 * réaffecter un lien existant à un autre produit ou fournisseur.
 */
export class UpdateProductSupplierDto {
  @ApiPropertyOptional({ example: 'SAM-SSD-512' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'La référence fournisseur est trop longue' })
  supplierSku?: string;

  @ApiPropertyOptional({ example: 89.9 })
  @IsOptional()
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix ne peut être négatif' })
  price?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'La quantité minimale ne peut être négative' })
  minQty?: number;

  @ApiPropertyOptional({ example: 14 })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Le délai de livraison ne peut être négatif' })
  leadTimeDays?: number;

  @ApiPropertyOptional({ example: true, description: 'Définir comme fournisseur préféré' })
  @IsOptional()
  @IsBoolean()
  isPreferred?: boolean;
}
