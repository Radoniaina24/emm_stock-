import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto.js';
import { ReorderRuleResponseDto } from './reorder-rule.response.js';

export class PaginatedReorderRulesDto {
  @ApiProperty({ type: [ReorderRuleResponseDto] })
  items: ReorderRuleResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
