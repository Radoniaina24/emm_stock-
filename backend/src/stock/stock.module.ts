import { Module } from '@nestjs/common';
import { StockController } from './stock.controller.js';
import { StockService } from './stock.service.js';
import { PermissionsGuard } from '../common/guards/permissions.guard.js';

@Module({
  controllers: [StockController],
  providers: [StockService, PermissionsGuard],
})
export class StockModule {}
