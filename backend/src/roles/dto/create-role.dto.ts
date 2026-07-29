import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Administrateur' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @MinLength(2)
  code: string;

  @ApiPropertyOptional({ example: 'Accès complet à toutes les fonctionnalités' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
