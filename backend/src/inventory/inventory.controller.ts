import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';
import { InventoryService } from './inventory.service.js';
import { CreateInventoryDto } from './dto/create-inventory.dto.js';
import { AddInventoryLineDto, InventoryQueryDto } from './dto/inventory-query.dto.js';

@ApiTags('inventories')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Post()
  @RequirePermission('inventories.create')
  @ApiOperation({ summary: 'Démarrer un inventaire (statut en_cours)' })
  @ApiOkResponse({ description: 'Inventaire créé' })
  create(@Body() dto: CreateInventoryDto, @CurrentUser('id') userId: string) {
    return this.inventory.create(dto, userId);
  }

  @Get()
  @RequirePermission('inventories.view')
  @ApiOperation({ summary: 'Liste des inventaires (paginé, filtrable)' })
  @ApiOkResponse({ description: 'Liste des inventaires' })
  findAll(@Query() query: InventoryQueryDto) {
    return this.inventory.findAll(query);
  }

  @Get(':id')
  @RequirePermission('inventories.view')
  @ApiOperation({ summary: "Détail d'un inventaire" })
  @ApiOkResponse({ description: 'Inventaire trouvé' })
  findOne(@Param('id') id: string) {
    return this.inventory.findOne(id);
  }

  @Post(':id/lines')
  @RequirePermission('inventories.update')
  @ApiOperation({ summary: 'Ajouter une ligne à un inventaire en cours' })
  @ApiOkResponse({ description: 'Ligne ajoutée' })
  addLine(
    @Param('id') id: string,
    @Body() dto: AddInventoryLineDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.inventory.addLine(id, dto);
  }

  @Delete(':id/lines/:lineId')
  @RequirePermission('inventories.update')
  @ApiOperation({ summary: 'Retirer une ligne d’un inventaire en cours' })
  @ApiOkResponse({ description: 'Ligne supprimée' })
  removeLine(@Param('id') id: string, @Param('lineId') lineId: string) {
    return this.inventory.removeLine(id, lineId);
  }

  @Post(':id/validate')
  @RequirePermission('inventories.validate')
  @ApiOperation({ summary: 'Valider un inventaire (ajuste le stock)' })
  @ApiOkResponse({ description: 'Inventaire validé' })
  validate(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.inventory.validate(id, userId);
  }

  @Post(':id/cancel')
  @RequirePermission('inventories.cancel')
  @ApiOperation({ summary: 'Annuler un inventaire en cours' })
  @ApiOkResponse({ description: 'Inventaire annulé' })
  cancel(@Param('id') id: string) {
    return this.inventory.cancel(id);
  }
}
