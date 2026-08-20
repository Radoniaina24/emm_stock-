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
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';
import { StockService } from './stock.service.js';
import { StockQueryDto } from './dto/stock-query.dto.js';
import { StockMoveQueryDto } from './dto/stock-move-query.dto.js';
import { ReorderRuleQueryDto } from './dto/reorder-rule-query.dto.js';
import { AdjustStockDto } from './dto/adjust-stock.dto.js';
import {
  CreateReorderRuleDto,
  UpdateReorderRuleDto,
} from './dto/reorder-rule.dto.js';
import { TransferStockDto } from './dto/transfer-stock.dto.js';
import {
  CreateReceptionDto,
  ReceptionQueryDto,
} from './dto/reception.dto.js';
import { CreateExitDto, ExitQueryDto } from './dto/exit.dto.js';
import { PaginatedStockLevelsDto } from './dto/response/paginated-stock-levels.dto.js';
import { PaginatedStockMovesDto } from './dto/response/paginated-stock-moves.dto.js';
import { PaginatedReorderRulesDto } from './dto/response/paginated-reorder-rules.dto.js';
import { ReorderRuleResponseDto } from './dto/response/reorder-rule.response.js';
import { StockLevelResponseDto } from './dto/response/stock-level.response.js';

@ApiTags('stock')
@ApiCookieAuth('token')
@Controller('stock')
export class StockController {
  constructor(private readonly stock: StockService) {}

  @Get('summary')
  @RequirePermission('stocks.view')
  @ApiOperation({ summary: 'Indicateurs globaux du stock' })
  summary() {
    return this.stock.summary();
  }

  @Get('moves')
  @RequirePermission('movements.view')
  @ApiOperation({
    summary: 'Historique des mouvements de stock (filtré et paginé)',
  })
  findMoves(@Query() query: StockMoveQueryDto) {
    return this.stock.findMoves(query);
  }

  @Get('reorder-rules')
  @RequirePermission('stocks.view')
  @ApiOperation({ summary: 'Règles de réapprovisionnement' })
  findReorderRules(@Query() query: ReorderRuleQueryDto) {
    return this.stock.findReorderRules(query);
  }

  @Post('reorder-rules')
  @RequirePermission('stocks.reorder')
  @ApiOperation({ summary: 'Créer une règle de réapprovisionnement' })
  createReorderRule(@Body() dto: CreateReorderRuleDto) {
    return this.stock.createReorderRule(dto);
  }

  @Post('transfers')
  @RequirePermission('stocks.transfer')
  @ApiOperation({ summary: 'Transférer du stock entre entrepôts / zones' })
  transfer(@Body() dto: TransferStockDto, @CurrentUser('id') userId: string) {
    return this.stock.transfer(dto, userId);
  }

  @Get('receptions')
  @RequirePermission('entries.view')
  @ApiOperation({ summary: 'Liste des réceptions (entrées de stock)' })
  findReceptions(@Query() query: ReceptionQueryDto) {
    return this.stock.findReceptions(query);
  }

  @Post('receptions')
  @RequirePermission('entries.create')
  @ApiOperation({ summary: 'Enregistrer une réception fournisseur (entrée de stock)' })
  reception(
    @Body() dto: CreateReceptionDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.stock.reception(dto, userId);
  }

  @Get('receptions/:id')
  @RequirePermission('entries.view')
  @ApiOperation({ summary: 'Détail d’une réception' })
  findReception(@Param('id') id: string) {
    return this.stock.findReception(id);
  }

  @Get('exits')
  @RequirePermission('exits.view')
  @ApiOperation({ summary: 'Liste des sorties de stock' })
  findExits(@Query() query: ExitQueryDto) {
    return this.stock.findExits(query);
  }

  @Post('exits')
  @RequirePermission('exits.create')
  @ApiOperation({ summary: 'Enregistrer une sortie de stock' })
  exit(@Body() dto: CreateExitDto, @CurrentUser('id') userId: string) {
    return this.stock.exit(dto, userId);
  }

  @Get('exits/:id')
  @RequirePermission('exits.view')
  @ApiOperation({ summary: 'Détail d’une sortie' })
  findExit(@Param('id') id: string) {
    return this.stock.findExit(id);
  }

  @Get()
  @RequirePermission('stocks.view')
  @ApiOperation({ summary: 'Niveaux de stock (paginé, filtrable, triable)' })
  findAll(@Query() query: StockQueryDto) {
    return this.stock.findAll(query);
  }

  @Get(':id')
  @RequirePermission('stocks.view')
  @ApiOperation({ summary: "Détail d'un niveau de stock" })
  findOne(@Param('id') id: string) {
    return this.stock.findOne(id);
  }

  @Post(':id/adjust')
  @RequirePermission('stocks.adjust')
  @ApiOperation({ summary: 'Ajuster le stock (inventaire)' })
  adjust(
    @Param('id') id: string,
    @Body() dto: AdjustStockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.stock.adjust(id, dto, userId);
  }

  @Get('reorder-rules/:id')
  @RequirePermission('stocks.view')
  @ApiOperation({ summary: 'Détail d’une règle de réapprovisionnement' })
  findReorderRule(@Param('id') id: string) {
    return this.stock.findReorderRule(id);
  }

  @Patch('reorder-rules/:id')
  @RequirePermission('stocks.reorder')
  @ApiOperation({ summary: 'Modifier une règle de réapprovisionnement' })
  updateReorderRule(
    @Param('id') id: string,
    @Body() dto: UpdateReorderRuleDto,
  ) {
    return this.stock.updateReorderRule(id, dto);
  }

  @Delete('reorder-rules/:id')
  @RequirePermission('stocks.reorder')
  @ApiOperation({ summary: 'Supprimer une règle de réapprovisionnement' })
  deleteReorderRule(@Param('id') id: string) {
    return this.stock.deleteReorderRule(id);
  }
}
