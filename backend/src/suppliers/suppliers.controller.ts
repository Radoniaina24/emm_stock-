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
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { SuppliersService } from './suppliers.service.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';

@ApiTags('suppliers')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliers: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un fournisseur' })
  create(@Body() dto: CreateSupplierDto) {
    return this.suppliers.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des fournisseurs' })
  findAll() {
    return this.suppliers.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’un fournisseur' })
  findOne(@Param('id') id: string) {
    return this.suppliers.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un fournisseur' })
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.suppliers.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un fournisseur' })
  remove(@Param('id') id: string) {
    return this.suppliers.remove(id);
  }
}
