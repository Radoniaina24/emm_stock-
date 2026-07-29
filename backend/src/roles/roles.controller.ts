import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { RolesService } from './roles.service.js';

@ApiTags('roles')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un rôle' })
  @ApiOkResponse({ description: 'Rôle créé' })
  create(@Body() dto: CreateRoleDto) {
    return this.roles.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des rôles' })
  @ApiOkResponse({ description: 'Liste des rôles' })
  findAll() {
    return this.roles.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un rôle' })
  @ApiOkResponse({ description: 'Rôle trouvé' })
  findOne(@Param('id') id: string) {
    return this.roles.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un rôle' })
  @ApiOkResponse({ description: 'Rôle modifié' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roles.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un rôle' })
  @ApiOkResponse({ description: 'Rôle supprimé' })
  remove(@Param('id') id: string) {
    return this.roles.remove(id);
  }
}
