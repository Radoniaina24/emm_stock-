import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Zone de réception' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'REC-01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: 'Entrée principale' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'clt0f3x000001' })
  @IsString()
  warehouseId: string;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  parentId?: string | null;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateLocationDto {
  @ApiPropertyOptional({ example: 'Zone de réception' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'REC-01' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: 'Entrée principale' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  parentId?: string | null;
}

export class LocationQueryDto {
  @ApiPropertyOptional({ example: 'clt0f3x000001' })
  @IsOptional()
  warehouseId?: string;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  parentId?: string | null;

  @ApiPropertyOptional({ example: 'réception' })
  @IsOptional()
  search?: string;
}
