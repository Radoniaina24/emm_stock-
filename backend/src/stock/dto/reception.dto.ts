import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class ReceptionLineDto {
  @ApiProperty({ description: 'Identifiant du produit' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantité reçue (>= 0)' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  quantity: number;

  @ApiProperty({ description: 'Coût unitaire d’achat (>= 0)' })
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  unitCost: number;

  @ApiPropertyOptional({ example: 'LOT-2025-014' })
  @IsOptional()
  @IsString()
  lotNumber?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsString()
  expiryDate?: string;
}

export class CreateReceptionDto {
  @ApiProperty({ description: 'Entrepôt de réception' })
  @IsString()
  warehouseId: string;

  @ApiProperty({ description: 'Fournisseur d’origine' })
  @IsString()
  supplierId: string;

  @ApiPropertyOptional({
    description: 'Référence du bon de réception (générée automatiquement si absente)',
  })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({ description: 'Date de la réception (ISO 8601)' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Note / description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [ReceptionLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceptionLineDto)
  lines: ReceptionLineDto[];
}

export class ReceptionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filtrer par entrepôt' })
  @IsOptional()
  @IsString()
  warehouseId?: string;

  @ApiPropertyOptional({ description: 'Filtrer par fournisseur' })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiPropertyOptional({ description: 'Statut du document' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Recherche sur la référence / description' })
  @IsOptional()
  @IsString()
  search?: string;
}
