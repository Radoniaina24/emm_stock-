import { PartialType } from '@nestjs/swagger';
import { CreateJobTitleDto } from './create-job-title.dto.js';

export class UpdateJobTitleDto extends PartialType(CreateJobTitleDto) {}
