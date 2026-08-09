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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { BrandsService } from './brands.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';

@ApiTags('brands')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly brands: BrandsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une marque' })
  @ApiOkResponse({ description: 'Marque créée' })
  create(@Body() dto: CreateBrandDto) {
    return this.brands.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des marques' })
  @ApiOkResponse({ description: 'Liste des marques' })
  findAll() {
    return this.brands.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’une marque' })
  @ApiOkResponse({ description: 'Marque trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brands.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une marque' })
  @ApiOkResponse({ description: 'Marque modifiée' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBrandDto,
  ) {
    return this.brands.update(id, dto);
  }

  @Post(':id/logo')
  @ApiOperation({ summary: 'Uploader / remplacer le logo de la marque' })
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
  @ApiOkResponse({ description: 'Logo mis à jour' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadLogo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.brands.uploadLogo(id, file);
  }

  @Delete(':id/logo')
  @ApiOperation({ summary: 'Supprimer le logo de la marque' })
  @ApiOkResponse({ description: 'Logo supprimé' })
  deleteLogo(@Param('id', ParseIntPipe) id: number) {
    return this.brands.deleteLogo(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une marque' })
  @ApiOkResponse({ description: 'Marque supprimée' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brands.remove(id);
  }
}