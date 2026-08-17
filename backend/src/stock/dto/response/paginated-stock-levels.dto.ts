import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto.js';
import { StockLevelResponseDto } from './stock-level.response.js';

export class PaginatedStockLevelsDto {
  @ApiProperty({ type: [StockLevelResponseDto] })
  items: StockLevelResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
