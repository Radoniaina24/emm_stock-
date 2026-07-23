import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class RegisterDto {
  @ApiProperty({ example: "Admin StockFlow" })
  @IsString()
  name: string

  @ApiProperty({ example: "admin@stockflow.app" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "admin123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string

  @ApiPropertyOptional({ example: "+261 34 00 000 00" })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiPropertyOptional({ example: "Direction des opérations" })
  @IsOptional()
  @IsString()
  department?: string
}
