import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Category: "Category";
    readonly Brand: "Brand";
    readonly Unit: "Unit";
    readonly Product: "Product";
    readonly Warehouse: "Warehouse";
    readonly Zone: "Zone";
    readonly Stock: "Stock";
    readonly Supplier: "Supplier";
    readonly Entry: "Entry";
    readonly EntryLine: "EntryLine";
    readonly Exit: "Exit";
    readonly ExitLine: "ExitLine";
    readonly Movement: "Movement";
    readonly Inventory: "Inventory";
    readonly InventoryLine: "InventoryLine";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly phone: "phone";
    readonly avatar: "avatar";
    readonly department: "department";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const BrandScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum];
export declare const UnitScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly abbrev: "abbrev";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly stockMin: "stockMin";
    readonly stockMax: "stockMax";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly categoryId: "categoryId";
    readonly brandId: "brandId";
    readonly unitId: "unitId";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const WarehouseScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly location: "location";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum];
export declare const ZoneScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly warehouseId: "warehouseId";
};
export type ZoneScalarFieldEnum = (typeof ZoneScalarFieldEnum)[keyof typeof ZoneScalarFieldEnum];
export declare const StockScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly productId: "productId";
    readonly warehouseId: "warehouseId";
    readonly zoneId: "zoneId";
};
export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum];
export declare const SupplierScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly address: "address";
    readonly contact: "contact";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum];
export declare const EntryScalarFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly date: "date";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly supplierId: "supplierId";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type EntryScalarFieldEnum = (typeof EntryScalarFieldEnum)[keyof typeof EntryScalarFieldEnum];
export declare const EntryLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly createdAt: "createdAt";
    readonly entryId: "entryId";
    readonly productId: "productId";
};
export type EntryLineScalarFieldEnum = (typeof EntryLineScalarFieldEnum)[keyof typeof EntryLineScalarFieldEnum];
export declare const ExitScalarFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly date: "date";
    readonly type: "type";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type ExitScalarFieldEnum = (typeof ExitScalarFieldEnum)[keyof typeof ExitScalarFieldEnum];
export declare const ExitLineScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly createdAt: "createdAt";
    readonly exitId: "exitId";
    readonly productId: "productId";
};
export type ExitLineScalarFieldEnum = (typeof ExitLineScalarFieldEnum)[keyof typeof ExitLineScalarFieldEnum];
export declare const MovementScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly quantity: "quantity";
    readonly date: "date";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly productId: "productId";
    readonly fromWarehouseId: "fromWarehouseId";
    readonly toWarehouseId: "toWarehouseId";
};
export type MovementScalarFieldEnum = (typeof MovementScalarFieldEnum)[keyof typeof MovementScalarFieldEnum];
export declare const InventoryScalarFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly date: "date";
    readonly status: "status";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum];
export declare const InventoryLineScalarFieldEnum: {
    readonly id: "id";
    readonly expectedQty: "expectedQty";
    readonly actualQty: "actualQty";
    readonly difference: "difference";
    readonly createdAt: "createdAt";
    readonly inventoryId: "inventoryId";
    readonly productId: "productId";
};
export type InventoryLineScalarFieldEnum = (typeof InventoryLineScalarFieldEnum)[keyof typeof InventoryLineScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly phone: "phone";
    readonly avatar: "avatar";
    readonly department: "department";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const CategoryOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum];
export declare const BrandOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type BrandOrderByRelevanceFieldEnum = (typeof BrandOrderByRelevanceFieldEnum)[keyof typeof BrandOrderByRelevanceFieldEnum];
export declare const UnitOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly abbrev: "abbrev";
};
export type UnitOrderByRelevanceFieldEnum = (typeof UnitOrderByRelevanceFieldEnum)[keyof typeof UnitOrderByRelevanceFieldEnum];
export declare const ProductOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly name: "name";
    readonly description: "description";
    readonly categoryId: "categoryId";
    readonly brandId: "brandId";
    readonly unitId: "unitId";
};
export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum];
export declare const WarehouseOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly location: "location";
};
export type WarehouseOrderByRelevanceFieldEnum = (typeof WarehouseOrderByRelevanceFieldEnum)[keyof typeof WarehouseOrderByRelevanceFieldEnum];
export declare const ZoneOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly warehouseId: "warehouseId";
};
export type ZoneOrderByRelevanceFieldEnum = (typeof ZoneOrderByRelevanceFieldEnum)[keyof typeof ZoneOrderByRelevanceFieldEnum];
export declare const StockOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly warehouseId: "warehouseId";
    readonly zoneId: "zoneId";
};
export type StockOrderByRelevanceFieldEnum = (typeof StockOrderByRelevanceFieldEnum)[keyof typeof StockOrderByRelevanceFieldEnum];
export declare const SupplierOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly address: "address";
    readonly contact: "contact";
};
export type SupplierOrderByRelevanceFieldEnum = (typeof SupplierOrderByRelevanceFieldEnum)[keyof typeof SupplierOrderByRelevanceFieldEnum];
export declare const EntryOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly description: "description";
    readonly supplierId: "supplierId";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type EntryOrderByRelevanceFieldEnum = (typeof EntryOrderByRelevanceFieldEnum)[keyof typeof EntryOrderByRelevanceFieldEnum];
export declare const EntryLineOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly entryId: "entryId";
    readonly productId: "productId";
};
export type EntryLineOrderByRelevanceFieldEnum = (typeof EntryLineOrderByRelevanceFieldEnum)[keyof typeof EntryLineOrderByRelevanceFieldEnum];
export declare const ExitOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly type: "type";
    readonly description: "description";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type ExitOrderByRelevanceFieldEnum = (typeof ExitOrderByRelevanceFieldEnum)[keyof typeof ExitOrderByRelevanceFieldEnum];
export declare const ExitLineOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly exitId: "exitId";
    readonly productId: "productId";
};
export type ExitLineOrderByRelevanceFieldEnum = (typeof ExitLineOrderByRelevanceFieldEnum)[keyof typeof ExitLineOrderByRelevanceFieldEnum];
export declare const MovementOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly description: "description";
    readonly productId: "productId";
    readonly fromWarehouseId: "fromWarehouseId";
    readonly toWarehouseId: "toWarehouseId";
};
export type MovementOrderByRelevanceFieldEnum = (typeof MovementOrderByRelevanceFieldEnum)[keyof typeof MovementOrderByRelevanceFieldEnum];
export declare const InventoryOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly reference: "reference";
    readonly status: "status";
    readonly description: "description";
    readonly userId: "userId";
    readonly warehouseId: "warehouseId";
};
export type InventoryOrderByRelevanceFieldEnum = (typeof InventoryOrderByRelevanceFieldEnum)[keyof typeof InventoryOrderByRelevanceFieldEnum];
export declare const InventoryLineOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly inventoryId: "inventoryId";
    readonly productId: "productId";
};
export type InventoryLineOrderByRelevanceFieldEnum = (typeof InventoryLineOrderByRelevanceFieldEnum)[keyof typeof InventoryLineOrderByRelevanceFieldEnum];
