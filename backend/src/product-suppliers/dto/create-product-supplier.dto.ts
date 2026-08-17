import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductSupplierDto {
  @ApiProperty({ example: 12, description: 'Identifiant du produit' })
  @IsInt({ message: 'L’identifiant produit doit être un entier' })
  @Min(1)
  productId: number;

  @ApiProperty({
    example: 'clx123abc',
    description: 'Identifiant du fournisseur',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le fournisseur est obligatoire' })
  supplierId: string;

  @ApiPropertyOptional({ example: 'SAM-SSD-512' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'La référence fournisseur est trop longue' })
  supplierSku?: string;

  @ApiProperty({ example: 89.9, description: 'Prix d’achat unitaire' })
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix ne peut être négatif' })
  price: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Quantité minimale de commande',
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'La quantité minimale ne peut être négative' })
  minQty?: number;

  @ApiPropertyOptional({
    example: 14,
    description: 'Délai de livraison (jours)',
  })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Le délai de livraison ne peut être négatif' })
  leadTimeDays?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Fournisseur préféré pour ce produit',
  })
  @IsOptional()
  @IsBoolean()
  isPreferred?: boolean;
}
