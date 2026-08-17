import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class ExitLineDto {
  @ApiProperty({ description: 'Identifiant du produit' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantité à sortir (>= 0)' })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ description: 'Prix unitaire de vente (>= 0)' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  unitPrice?: number;

  @ApiPropertyOptional({ example: 'LOT-2025-014' })
  @IsOptional()
  @IsString()
  lotNumber?: string;
}

export class CreateExitDto {
  @ApiProperty({ description: 'Entrepôt de sortie' })
  @IsString()
  warehouseId: string;

  @ApiPropertyOptional({
    description: 'Type de sortie (vente, consommation interne, retour, …)',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Référence du bon de sortie (générée automatiquement si absente)',
  })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({ description: 'Date de la sortie (ISO 8601)' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Note / description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [ExitLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExitLineDto)
  lines: ExitLineDto[];
}

export class ExitQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filtrer par entrepôt' })
  @IsOptional()
  @IsString()
  warehouseId?: string;

  @ApiPropertyOptional({ description: 'Filtrer par type de sortie' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Statut du document' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Recherche sur la référence / description' })
  @IsOptional()
  @IsString()
  search?: string;
}
