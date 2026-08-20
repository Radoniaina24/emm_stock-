import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';
import { JobTitlesService } from './job-titles.service.js';
import { CreateJobTitleDto } from './dto/create-job-title.dto.js';
import { UpdateJobTitleDto } from './dto/update-job-title.dto.js';

@ApiTags('job-titles')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('job-titles')
export class JobTitlesController {
  constructor(private readonly jobTitles: JobTitlesService) {}

  @Post()
  @RequirePermission('job-titles.create')
  @ApiOperation({ summary: 'Créer un titre/fonction' })
  @ApiOkResponse({ description: 'Titre créé' })
  create(@Body() dto: CreateJobTitleDto) {
    return this.jobTitles.create(dto);
  }

  @Get()
  @RequirePermission('job-titles.view')
  @ApiOperation({ summary: 'Liste des titres/fonctions' })
  @ApiOkResponse({ description: 'Liste des titres' })
  findAll() {
    return this.jobTitles.findAll();
  }

  @Get(':id')
  @RequirePermission('job-titles.view')
  @ApiOperation({ summary: "Détail d'un titre" })
  @ApiOkResponse({ description: 'Titre trouvé' })
  findOne(@Param('id') id: string) {
    return this.jobTitles.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('job-titles.update')
  @ApiOperation({ summary: 'Modifier un titre' })
  @ApiOkResponse({ description: 'Titre modifié' })
  update(@Param('id') id: string, @Body() dto: UpdateJobTitleDto) {
    return this.jobTitles.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('job-titles.delete')
  @ApiOperation({ summary: 'Supprimer un titre' })
  @ApiOkResponse({ description: 'Titre supprimé' })
  remove(@Param('id') id: string) {
    return this.jobTitles.remove(id);
  }
}
