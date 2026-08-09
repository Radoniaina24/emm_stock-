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
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UnitsOfMeasureService } from './units-of-measure.service.js';
import { CreateUnitOfMeasureDto } from './dto/create-unit-of-measure.dto.js';
import { UpdateUnitOfMeasureDto } from './dto/update-unit-of-measure.dto.js';

@ApiTags('units-of-measure')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('units-of-measure')
export class UnitsOfMeasureController {
  constructor(private readonly units: UnitsOfMeasureService) {}

  @Post()
  @ApiOperation({ summary: "Créer une unité de mesure" })
  @ApiOkResponse({ description: 'Unité de mesure créée' })
  create(@Body() dto: CreateUnitOfMeasureDto) {
    return this.units.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des unités de mesure' })
  @ApiOkResponse({ description: 'Liste des unités de mesure' })
  findAll() {
    return this.units.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'une unité de mesure" })
  @ApiOkResponse({ description: 'Unité de mesure trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.units.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier une unité de mesure" })
  @ApiOkResponse({ description: 'Unité de mesure modifiée' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUnitOfMeasureDto,
  ) {
    return this.units.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une unité de mesure" })
  @ApiOkResponse({ description: 'Unité de mesure supprimée' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.units.remove(id);
  }
}