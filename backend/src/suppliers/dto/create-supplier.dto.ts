import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: 'SARL Bara Import' })
  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  @MaxLength(100, { message: 'Le nom est trop long' })
  name: string;

  @ApiPropertyOptional({ example: 'contact@bara-import.mg' })
  @IsOptional()
  @IsEmail({}, { message: 'Adresse e-mail invalide' })
  email?: string;

  @ApiPropertyOptional({ example: '+261 34 12 345 67' })
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'Le numéro de téléphone est trop long' })
  phone?: string;

  @ApiPropertyOptional({ example: 'Zone Industrielle, Antananarivo' })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: "L'adresse est trop longue" })
  address?: string;

  @ApiPropertyOptional({ example: 'Jean Rakoto' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Le nom du contact est trop long' })
  contact?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
