import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator"

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: "Admin" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string

  @ApiPropertyOptional({ example: "StockFlow" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string

  @ApiPropertyOptional({ example: "Admin StockFlow" })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  displayName?: string

  @ApiPropertyOptional({ example: "+261 34 00 000 00" })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  secondaryPhone?: string

  @ApiPropertyOptional({ example: "1990-01-15" })
  @IsOptional()
  @IsDateString()
  birthDate?: string

  @ApiPropertyOptional({ example: "Homme" })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  region?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  postalCode?: string

  @ApiPropertyOptional({ example: "Gestionnaire de stock" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string

  @ApiPropertyOptional({ example: "Opérations" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  department?: string

  @ApiPropertyOptional({ description: "Signature électronique (texte ou data URL)" })
  @IsOptional()
  @IsString()
  signature?: string
}
