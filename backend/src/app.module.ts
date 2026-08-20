import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { LocationsModule } from './locations/locations.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { BrandsModule } from './brands/brands.module.js';
import { UnitsOfMeasureModule } from './units-of-measure/units-of-measure.module.js';
import { ProductBarcodesModule } from './product-barcodes/product-barcodes.module.js';
import { ProductsModule } from './products/products.module.js';
import { StockModule } from './stock/stock.module.js';
import { SuppliersModule } from './suppliers/suppliers.module.js';
import { ProductSuppliersModule } from './product-suppliers/product-suppliers.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';
import { PermissionsGuard } from './common/guards/permissions.guard.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    DepartmentsModule,
    JobTitlesModule,
    WarehousesModule,
    LocationsModule,
    CategoriesModule,
    BrandsModule,
    UnitsOfMeasureModule,
    ProductBarcodesModule,
    ProductsModule,
    StockModule,
    SuppliersModule,
    ProductSuppliersModule,
    InventoryModule,
  ],
  controllers: [AppController],
  // Gardes globales : authentification d'abord, puis autorisation (RBAC).
  // Cela applique le contrôle des permissions sur TOUS les modules, et plus
  // seulement sur `StockController`. Les routes publiques sont marquées
  // `@Public()` (auth, login, logout, swagger).
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class AppModule {}
