import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Page courante (1-indexée)' })
  page: number;

  @ApiProperty({ description: 'Taille de la page' })
  limit: number;

  @ApiProperty({ description: 'Nombre total d’éléments' })
  total: number;

  @ApiProperty({ description: 'Nombre total de pages' })
  totalPages: number;
}
