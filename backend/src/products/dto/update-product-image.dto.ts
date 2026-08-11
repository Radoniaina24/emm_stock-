import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductImageDto {
  @ApiPropertyOptional({ description: "Définir l'image comme principale" })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiPropertyOptional({ description: 'Texte alternatif de l’image' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  alt?: string;
}
