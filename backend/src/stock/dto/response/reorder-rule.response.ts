import { ApiProperty } from '@nestjs/swagger';

export class ReorderRuleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  warehouseId: string;

  @ApiProperty({ description: 'Seuil de réapprovisionnement (min)' })
  minQty: string;

  @ApiProperty({ description: 'Stock maximum visé' })
  maxQty: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
