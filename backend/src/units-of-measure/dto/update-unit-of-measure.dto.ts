import { PartialType } from '@nestjs/swagger';
import { CreateUnitOfMeasureDto } from './create-unit-of-measure.dto.js';

export class UpdateUnitOfMeasureDto extends PartialType(
  CreateUnitOfMeasureDto,
) {}
