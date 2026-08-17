import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto.js';
import { StockMoveResponseDto } from './stock-move.response.js';

export class PaginatedStockMovesDto {
  @ApiProperty({ type: [StockMoveResponseDto] })
  items: StockMoveResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
