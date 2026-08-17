import { ApiProperty } from '@nestjs/swagger';

export class StockLevelProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty({ nullable: true })
  image?: { id: number; url: string; alt: string | null } | null;
}

export class StockLevelResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  warehouseId: string;

  @ApiProperty({ nullable: true })
  zoneId: string | null;

  @ApiProperty({ description: 'Quantité physique disponible' })
  quantityOnHand: string;

  @ApiProperty({ description: 'Quantité réservée (non disponible)' })
  quantityReserved: string;

  @ApiProperty({ description: 'True si sous le seuil de réapprovisionnement' })
  isLowStock: boolean;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  product: StockLevelProductDto;

  @ApiProperty()
  warehouse: { id: string; name: string };

  @ApiProperty({ nullable: true })
  zone: { id: string; name: string } | null;

  @ApiProperty({ nullable: true })
  reorderRule: { minQty: string; maxQty: string } | null;
}
