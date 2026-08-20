import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@ApiTags('categories')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Post()
  @RequirePermission('categories.create')
  @ApiOperation({ summary: 'Créer une catégorie' })
  @ApiOkResponse({ description: 'Catégorie créée' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categories.create(dto);
  }

  @Get()
  @RequirePermission('categories.view')
  @ApiOperation({ summary: 'Liste des catégories (hiérarchie incluse)' })
  @ApiOkResponse({ description: 'Liste des catégories' })
  findAll() {
    return this.categories.findAll();
  }

  @Get(':id')
  @RequirePermission('categories.view')
  @ApiOperation({ summary: "Détail d'une catégorie" })
  @ApiOkResponse({ description: 'Catégorie trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categories.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('categories.update')
  @ApiOperation({ summary: 'Modifier une catégorie' })
  @ApiOkResponse({ description: 'Catégorie modifiée' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categories.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('categories.delete')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiOkResponse({ description: 'Catégorie supprimée' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categories.remove(id);
  }
}
