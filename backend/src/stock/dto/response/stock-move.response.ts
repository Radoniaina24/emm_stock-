import { ApiProperty } from '@nestjs/swagger';

export class StockMoveResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  warehouseId: string;

  @ApiProperty({ enum: ['ENTRY', 'EXIT', 'INVENTORY_ADJUSTMENT', 'TRANSFER'] })
  type: string;

  @ApiProperty({ description: 'Quantité signée (+ entrée, - sortie)' })
  quantity: string;

  @ApiProperty({ nullable: true, description: 'Coût unitaire (devise)' })
  unitCost: string | null;

  @ApiProperty({ nullable: true })
  lotNumber: string | null;

  @ApiProperty({ nullable: true })
  expiryDate: string | null;

  @ApiProperty({ description: 'Type du document d’origine' })
  sourceType: string;

  @ApiProperty({ description: 'Identifiant du document d’origine' })
  sourceId: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  user: { id: string; username: string };
}
