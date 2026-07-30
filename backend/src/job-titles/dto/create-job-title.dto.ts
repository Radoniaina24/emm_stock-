import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateJobTitleDto {
  @ApiProperty({ example: 'Responsable comptable' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'COMPTABLE' })
  @IsString()
  @MinLength(2)
  code: string;

  @ApiPropertyOptional({ example: 'Gère la comptabilité de l\'entreprise' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
