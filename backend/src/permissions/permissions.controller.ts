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
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';
import { PermissionsService } from './permissions.service.js';

@ApiTags('permissions')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissions: PermissionsService) {}

  @Post()
  @RequirePermission('permissions.create')
  @ApiOperation({ summary: 'Créer une permission' })
  @ApiOkResponse({ description: 'Permission créée' })
  create(@Body() dto: CreatePermissionDto) {
    return this.permissions.create(dto);
  }

  @Get()
  @RequirePermission('permissions.view')
  @ApiOperation({ summary: 'Liste des permissions' })
  @ApiOkResponse({ description: 'Liste des permissions' })
  findAll() {
    return this.permissions.findAll();
  }

  @Get(':id')
  @RequirePermission('permissions.view')
  @ApiOperation({ summary: "Détail d'une permission" })
  @ApiOkResponse({ description: 'Permission trouvée' })
  findOne(@Param('id') id: string) {
    return this.permissions.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('permissions.update')
  @ApiOperation({ summary: 'Modifier une permission' })
  @ApiOkResponse({ description: 'Permission modifiée' })
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.permissions.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('permissions.delete')
  @ApiOperation({ summary: 'Supprimer une permission' })
  @ApiOkResponse({ description: 'Permission supprimée' })
  remove(@Param('id') id: string) {
    return this.permissions.remove(id);
  }
}
