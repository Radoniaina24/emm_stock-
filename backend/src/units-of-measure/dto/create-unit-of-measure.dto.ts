import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUnitOfMeasureDto {
  @ApiProperty({ example: 'Kilogramme' })
  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  @MaxLength(100, { message: 'Le nom est trop long' })
  name: string;

  @ApiProperty({ example: 'KG' })
  @IsString()
  @MinLength(1, { message: 'Le code doit contenir au moins 1 caractère' })
  @MaxLength(20, { message: 'Le code est trop long' })
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Le code doit être en majuscules, chiffres et sans espaces',
  })
  code: string;

  @ApiPropertyOptional({ example: 'kg' })
  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'Le symbole est trop long' })
  symbol?: string;

  @ApiPropertyOptional({ example: 'Unité de masse' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}