import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolePermissionsService } from './role-permissions.service.js';
import { SyncRolePermissionsDto } from './dto/sync-role-permissions.dto.js';

@ApiTags('role-permissions')
@ApiCookieAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('roles/:roleId/permissions')
export class RolePermissionsController {
  constructor(private readonly service: RolePermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Permissions du rôle' })
  @ApiOkResponse({ description: 'Permissions du rôle' })
  find(@Param('roleId') roleId: string) {
    return this.service.find(roleId);
  }

  @Put()
  @ApiOperation({ summary: 'Synchroniser les permissions du rôle' })
  @ApiOkResponse({ description: 'Permissions synchronisées' })
  sync(
    @Param('roleId') roleId: string,
    @Body() dto: SyncRolePermissionsDto,
  ) {
    return this.service.sync(roleId, dto.permissionIds);
  }
}
