import { PartialType } from '@nestjs/swagger';
import { CreateProductBarcodeDto } from './create-product-barcode.dto.js';

export class UpdateProductBarcodeDto extends PartialType(
  CreateProductBarcodeDto,
) {}