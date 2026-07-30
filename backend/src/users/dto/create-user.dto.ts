import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'jean.dupont' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, _ et .",
  })
  username: string;

  @ApiProperty({ example: 'jean.dupont@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule' })
  @Matches(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule' })
  @Matches(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Le mot de passe doit contenir au moins un caractère spécial',
  })
  password: string;

  @ApiProperty({ example: 'EMP001' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  employeeCode: string;

  @ApiProperty({ example: 'role-id' })
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ example: 'dept-id' })
  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({ example: 'job-title-id' })
  @IsString()
  @IsNotEmpty()
  jobTitleId: string;

  @ApiPropertyOptional({ example: 'warehouse-id' })
  @IsOptional()
  @IsString()
  warehouseId?: string;
}
