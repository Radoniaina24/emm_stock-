import { Module } from '@nestjs/common';
import { UnitsOfMeasureController } from './units-of-measure.controller.js';
import { UnitsOfMeasureService } from './units-of-measure.service.js';

@Module({
  controllers: [UnitsOfMeasureController],
  providers: [UnitsOfMeasureService],
})
export class UnitsOfMeasureModule {}
