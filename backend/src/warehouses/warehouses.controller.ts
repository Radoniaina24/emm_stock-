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
import { WarehousesService } from './warehouses.service.js';
import { CreateWarehouseDto } from './dto/create-warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto.js';

@ApiTags('warehouses')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehouses: WarehousesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un entrepôt' })
  @ApiOkResponse({ description: 'Entrepôt créé' })
  create(@Body() dto: CreateWarehouseDto) {
    return this.warehouses.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des entrepôts' })
  @ApiOkResponse({ description: 'Liste des entrepôts' })
  findAll() {
    return this.warehouses.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un entrepôt" })
  @ApiOkResponse({ description: 'Entrepôt trouvé' })
  findOne(@Param('id') id: string) {
    return this.warehouses.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un entrepôt' })
  @ApiOkResponse({ description: 'Entrepôt modifié' })
  update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.warehouses.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un entrepôt' })
  @ApiOkResponse({ description: 'Entrepôt supprimé' })
  remove(@Param('id') id: string) {
    return this.warehouses.remove(id);
  }
}
