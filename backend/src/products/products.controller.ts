import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ImportProductsDto } from './dto/import-products.dto.js';
import { UpdateProductImageDto } from './dto/update-product-image.dto.js';

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

  @Post('import')
  @ApiOperation({ summary: 'Importer des produits (upsert par SKU)' })
  @ApiOkResponse({ description: 'Rapport d\'import' })
  importProducts(@Body() body: ImportProductsDto) {
    return this.products.importProducts(body.rows);
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

  @Post(':id/images')
  @ApiOperation({ summary: 'Ajouter une image au produit' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image JPG, PNG ou WebP (max 2 Mo)',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Image ajoutée' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.products.uploadImage(id, file);
  }

  @Patch('images/:imageId')
  @ApiOperation({ summary: "Modifier une image (principale, alt)" })
  @ApiOkResponse({ description: 'Image mise à jour' })
  updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() dto: UpdateProductImageDto,
  ) {
    return this.products.updateImage(imageId, dto);
  }

  @Delete('images/:imageId')
  @ApiOperation({ summary: 'Supprimer une image du produit' })
  @ApiOkResponse({ description: 'Image supprimée' })
  deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    return this.products.deleteImage(imageId);
  }
}