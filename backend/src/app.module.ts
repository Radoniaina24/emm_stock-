import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { PermissionsModule } from './permissions/permissions.module.js';
import { RolePermissionsModule } from './role-permissions/role-permissions.module.js';
import { DepartmentsModule } from './departments/departments.module.js';
import { JobTitlesModule } from './job-titles/job-titles.module.js';
import { WarehousesModule } from './warehouses/warehouses.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { BrandsModule } from './brands/brands.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, RolesModule, PermissionsModule, RolePermissionsModule, DepartmentsModule, JobTitlesModule, WarehousesModule, CategoriesModule, BrandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
