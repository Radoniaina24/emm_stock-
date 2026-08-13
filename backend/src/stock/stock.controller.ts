import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { StockService } from './stock.service.js';
import { StockQueryDto } from './dto/stock-query.dto.js';
import { AdjustStockDto } from './dto/adjust-stock.dto.js';

@ApiTags('stock')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stock: StockService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Indicateurs globaux du stock' })
  summary() {
    return this.stock.summary();
  }

  @Get()
  @ApiOperation({ summary: "Liste des niveaux de stock" })
  findAll(@Query() query: StockQueryDto) {
    return this.stock.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un niveau de stock" })
  findOne(@Param('id') id: string) {
    return this.stock.findOne(id);
  }

  @Post(':id/adjust')
  @ApiOperation({ summary: 'Ajuster le stock (inventaire)' })
  adjust(
    @Param('id') id: string,
    @Body() dto: AdjustStockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.stock.adjust(id, dto, userId);
  }
}
