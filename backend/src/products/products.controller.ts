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
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@ApiTags('products')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un produit' })
  @ApiOkResponse({ description: 'Produit créé' })
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des produits' })
  @ApiOkResponse({ description: 'Liste des produits' })
  findAll() {
    return this.products.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un produit" })
  @ApiOkResponse({ description: 'Produit trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier un produit" })
  @ApiOkResponse({ description: 'Produit modifié' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer un produit" })
  @ApiOkResponse({ description: 'Produit supprimé' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.products.remove(id);
  }
}