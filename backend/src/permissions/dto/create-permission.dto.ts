import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'users' })
  @IsString()
  @MinLength(2)
  module: string;

  @ApiProperty({ example: 'create' })
  @IsString()
  @MinLength(2)
  action: string;

  @ApiProperty({ example: 'users.create' })
  @IsString()
  @MinLength(2)
  code: string;

  @ApiPropertyOptional({ example: 'Créer un utilisateur' })
  @IsOptional()
  @IsString()
  description?: string;
}
