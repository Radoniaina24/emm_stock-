import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';
import { ProductSuppliersService } from './product-suppliers.service.js';
import { CreateProductSupplierDto } from './dto/create-product-supplier.dto.js';
import { UpdateProductSupplierDto } from './dto/update-product-supplier.dto.js';
import { ProductSupplierQueryDto } from './dto/product-supplier-query.dto.js';

@ApiTags('product-suppliers')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('product-suppliers')
export class ProductSuppliersController {
  constructor(private readonly productSuppliers: ProductSuppliersService) {}

  @Get()
  @RequirePermission('product-suppliers.view')
  @ApiOperation({ summary: 'Liste des fournisseurs associés aux produits' })
  findAll(@Query() query: ProductSupplierQueryDto) {
    return this.productSuppliers.findAll(query);
  }

  @Get(':id')
  @RequirePermission('product-suppliers.view')
  @ApiOperation({ summary: "Détail d'un lien produit/fournisseur" })
  findOne(@Param('id') id: string) {
    return this.productSuppliers.findOne(id);
  }

  @Post()
  @RequirePermission('product-suppliers.create')
  @ApiOperation({ summary: 'Associer un fournisseur à un produit' })
  create(@Body() dto: CreateProductSupplierDto) {
    return this.productSuppliers.create(dto);
  }

  @Patch(':id')
  @RequirePermission('product-suppliers.update')
  @ApiOperation({ summary: 'Modifier un lien produit/fournisseur' })
  update(@Param('id') id: string, @Body() dto: UpdateProductSupplierDto) {
    return this.productSuppliers.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('product-suppliers.delete')
  @ApiOperation({ summary: 'Retirer un fournisseur d’un produit' })
  remove(@Param('id') id: string) {
    return this.productSuppliers.remove(id);
  }
}
