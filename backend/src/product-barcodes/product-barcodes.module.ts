import { Module } from '@nestjs/common';
import { ProductBarcodesController } from './product-barcodes.controller.js';
import { ProductBarcodesService } from './product-barcodes.service.js';

@Module({
  controllers: [ProductBarcodesController],
  providers: [ProductBarcodesService],
})
export class ProductBarcodesModule {}
