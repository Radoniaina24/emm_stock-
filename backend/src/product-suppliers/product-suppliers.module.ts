import { Module } from '@nestjs/common';
import { ProductSuppliersController } from './product-suppliers.controller.js';
import { ProductSuppliersService } from './product-suppliers.service.js';

@Module({
  controllers: [ProductSuppliersController],
  providers: [ProductSuppliersService],
})
export class ProductSuppliersModule {}
