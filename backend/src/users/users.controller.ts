import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiCreatedResponse({ description: 'Utilisateur créé' })
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste de tous les utilisateurs' })
  @ApiOkResponse({ description: 'Liste des utilisateurs' })
  findAll() {
    return this.users.findAll();
  }

  @Get('next-employee-code')
  @ApiOperation({
    summary: 'Prochain matricule disponible (format EMP-YYYY-NNNN)',
  })
  @ApiOkResponse({ description: 'Matricule suggéré' })
  nextEmployeeCode() {
    return this.users.nextEmployeeCode();
  }

  @Get('me')
  @ApiOperation({ summary: 'Profil complet (user + user_profiles)' })
  @ApiOkResponse({ description: 'Utilisateur authentifié avec profil' })
  @ApiUnauthorizedResponse({ description: 'Non authentifié' })
  getMe(@CurrentUser('id') userId: string) {
    return this.users.getMe(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un utilisateur" })
  @ApiOkResponse({ description: 'Utilisateur trouvé' })
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un utilisateur (tous les champs sauf le mot de passe)',
  })
  @ApiOkResponse({ description: 'Utilisateur modifié' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Patch('me/profile')
  @ApiOperation({ summary: 'Mettre à jour les informations personnelles' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: 'Profil mis à jour' })
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.users.updateProfile(userId, dto);
  }

  @Post('me/avatar')
  @ApiOperation({ summary: 'Uploader / remplacer la photo de profil' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image JPG, PNG ou WebP (max 2 Mo)',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Profil mis à jour avec la nouvelle photo' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadAvatar(
    @CurrentUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.users.uploadAvatar(userId, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiOkResponse({ description: 'Utilisateur supprimé' })
  remove(@Param('id') id: string, @CurrentUser('id') currentUserId: string) {
    return this.users.remove(id, currentUserId);
  }

  @Delete('me/avatar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer la photo de profil' })
  @ApiOkResponse({ description: 'Photo supprimée' })
  deleteAvatar(@CurrentUser('id') userId: string) {
    return this.users.deleteAvatar(userId);
  }
}
