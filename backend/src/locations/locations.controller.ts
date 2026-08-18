import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { LocationsService } from './locations.service.js';
import { CreateLocationDto } from './dto/location.dto.js';
import { LocationQueryDto } from './dto/location.dto.js';
import { UpdateLocationDto } from './dto/location.dto.js';

@ApiTags('locations')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locations: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des emplacements (zones), filtrable par entrepôt / parent' })
  @ApiOkResponse({ description: 'Liste des emplacements' })
  findAll(@Query() query: LocationQueryDto) {
    return this.locations.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un emplacement" })
  findOne(@Param('id') id: string) {
    return this.locations.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un emplacement (zone / sous-emplacement)' })
  create(@Body() dto: CreateLocationDto) {
    return this.locations.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un emplacement' })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.locations.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un emplacement' })
  remove(@Param('id') id: string) {
    return this.locations.remove(id);
  }
}
