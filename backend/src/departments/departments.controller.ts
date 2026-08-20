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
import { DepartmentsService } from './departments.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';

@ApiTags('departments')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departments: DepartmentsService) {}

  @Post()
  @RequirePermission('departments.create')
  @ApiOperation({ summary: 'Créer un département' })
  @ApiOkResponse({ description: 'Département créé' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.departments.create(dto);
  }

  @Get()
  @RequirePermission('departments.view')
  @ApiOperation({ summary: 'Liste des départements' })
  @ApiOkResponse({ description: 'Liste des départements' })
  findAll() {
    return this.departments.findAll();
  }

  @Get(':id')
  @RequirePermission('departments.view')
  @ApiOperation({ summary: "Détail d'un département" })
  @ApiOkResponse({ description: 'Département trouvé' })
  findOne(@Param('id') id: string) {
    return this.departments.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('departments.update')
  @ApiOperation({ summary: 'Modifier un département' })
  @ApiOkResponse({ description: 'Département modifié' })
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.departments.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('departments.delete')
  @ApiOperation({ summary: 'Supprimer un département' })
  @ApiOkResponse({ description: 'Département supprimé' })
  remove(@Param('id') id: string) {
    return this.departments.remove(id);
  }
}
