"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitLineOrderByRelevanceFieldEnum = exports.ExitOrderByRelevanceFieldEnum = exports.EntryLineOrderByRelevanceFieldEnum = exports.EntryOrderByRelevanceFieldEnum = exports.SupplierOrderByRelevanceFieldEnum = exports.StockOrderByRelevanceFieldEnum = exports.ZoneOrderByRelevanceFieldEnum = exports.WarehouseOrderByRelevanceFieldEnum = exports.ProductOrderByRelevanceFieldEnum = exports.UnitOrderByRelevanceFieldEnum = exports.BrandOrderByRelevanceFieldEnum = exports.CategoryOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.SortOrder = exports.InventoryLineScalarFieldEnum = exports.InventoryScalarFieldEnum = exports.MovementScalarFieldEnum = exports.ExitLineScalarFieldEnum = exports.ExitScalarFieldEnum = exports.EntryLineScalarFieldEnum = exports.EntryScalarFieldEnum = exports.SupplierScalarFieldEnum = exports.StockScalarFieldEnum = exports.ZoneScalarFieldEnum = exports.WarehouseScalarFieldEnum = exports.ProductScalarFieldEnum = exports.UnitScalarFieldEnum = exports.BrandScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
exports.defineExtension = exports.InventoryLineOrderByRelevanceFieldEnum = exports.InventoryOrderByRelevanceFieldEnum = exports.MovementOrderByRelevanceFieldEnum = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Category: 'Category',
    Brand: 'Brand',
    Unit: 'Unit',
    Product: 'Product',
    Warehouse: 'Warehouse',
    Zone: 'Zone',
    Stock: 'Stock',
    Supplier: 'Supplier',
    Entry: 'Entry',
    EntryLine: 'EntryLine',
    Exit: 'Exit',
    ExitLine: 'ExitLine',
    Movement: 'Movement',
    Inventory: 'Inventory',
    InventoryLine: 'InventoryLine'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    avatar: 'avatar',
    department: 'department',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BrandScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UnitScalarFieldEnum = {
    id: 'id',
    name: 'name',
    abbrev: 'abbrev',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    reference: 'reference',
    name: 'name',
    description: 'description',
    price: 'price',
    stockMin: 'stockMin',
    stockMax: 'stockMax',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId',
    brandId: 'brandId',
    unitId: 'unitId'
};
exports.WarehouseScalarFieldEnum = {
    id: 'id',
    name: 'name',
    location: 'location',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ZoneScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    warehouseId: 'warehouseId'
};
exports.StockScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    productId: 'productId',
    warehouseId: 'warehouseId',
    zoneId: 'zoneId'
};
exports.SupplierScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    contact: 'contact',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EntryScalarFieldEnum = {
    id: 'id',
    reference: 'reference',
    date: 'date',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    supplierId: 'supplierId',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.EntryLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    createdAt: 'createdAt',
    entryId: 'entryId',
    productId: 'productId'
};
exports.ExitScalarFieldEnum = {
    id: 'id',
    reference: 'reference',
    date: 'date',
    type: 'type',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.ExitLineScalarFieldEnum = {
    id: 'id',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    createdAt: 'createdAt',
    exitId: 'exitId',
    productId: 'productId'
};
exports.MovementScalarFieldEnum = {
    id: 'id',
    type: 'type',
    quantity: 'quantity',
    date: 'date',
    description: 'description',
    createdAt: 'createdAt',
    productId: 'productId',
    fromWarehouseId: 'fromWarehouseId',
    toWarehouseId: 'toWarehouseId'
};
exports.InventoryScalarFieldEnum = {
    id: 'id',
    reference: 'reference',
    date: 'date',
    status: 'status',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.InventoryLineScalarFieldEnum = {
    id: 'id',
    expectedQty: 'expectedQty',
    actualQty: 'actualQty',
    difference: 'difference',
    createdAt: 'createdAt',
    inventoryId: 'inventoryId',
    productId: 'productId'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    avatar: 'avatar',
    department: 'department'
};
exports.CategoryOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description'
};
exports.BrandOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name'
};
exports.UnitOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    abbrev: 'abbrev'
};
exports.ProductOrderByRelevanceFieldEnum = {
    id: 'id',
    reference: 'reference',
    name: 'name',
    description: 'description',
    categoryId: 'categoryId',
    brandId: 'brandId',
    unitId: 'unitId'
};
exports.WarehouseOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    location: 'location'
};
exports.ZoneOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    warehouseId: 'warehouseId'
};
exports.StockOrderByRelevanceFieldEnum = {
    id: 'id',
    productId: 'productId',
    warehouseId: 'warehouseId',
    zoneId: 'zoneId'
};
exports.SupplierOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    contact: 'contact'
};
exports.EntryOrderByRelevanceFieldEnum = {
    id: 'id',
    reference: 'reference',
    description: 'description',
    supplierId: 'supplierId',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.EntryLineOrderByRelevanceFieldEnum = {
    id: 'id',
    entryId: 'entryId',
    productId: 'productId'
};
exports.ExitOrderByRelevanceFieldEnum = {
    id: 'id',
    reference: 'reference',
    type: 'type',
    description: 'description',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.ExitLineOrderByRelevanceFieldEnum = {
    id: 'id',
    exitId: 'exitId',
    productId: 'productId'
};
exports.MovementOrderByRelevanceFieldEnum = {
    id: 'id',
    type: 'type',
    description: 'description',
    productId: 'productId',
    fromWarehouseId: 'fromWarehouseId',
    toWarehouseId: 'toWarehouseId'
};
exports.InventoryOrderByRelevanceFieldEnum = {
    id: 'id',
    reference: 'reference',
    status: 'status',
    description: 'description',
    userId: 'userId',
    warehouseId: 'warehouseId'
};
exports.InventoryLineOrderByRelevanceFieldEnum = {
    id: 'id',
    inventoryId: 'inventoryId',
    productId: 'productId'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map