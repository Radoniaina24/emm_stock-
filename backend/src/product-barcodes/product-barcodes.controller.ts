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
import { ProductBarcodesService } from './product-barcodes.service.js';
import { CreateProductBarcodeDto } from './dto/create-product-barcode.dto.js';
import { UpdateProductBarcodeDto } from './dto/update-product-barcode.dto.js';

@ApiTags('product-barcodes')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('product-barcodes')
export class ProductBarcodesController {
  constructor(private readonly barcodes: ProductBarcodesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un code-barres' })
  @ApiOkResponse({ description: 'Code-barres créé' })
  create(@Body() dto: CreateProductBarcodeDto) {
    return this.barcodes.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des codes-barres' })
  @ApiOkResponse({ description: 'Liste des codes-barres' })
  findAll() {
    return this.barcodes.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un code-barres" })
  @ApiOkResponse({ description: 'Code-barres trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.barcodes.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un code-barres' })
  @ApiOkResponse({ description: 'Code-barres modifié' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductBarcodeDto,
  ) {
    return this.barcodes.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un code-barres' })
  @ApiOkResponse({ description: 'Code-barres supprimé' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.barcodes.remove(id);
  }
}
