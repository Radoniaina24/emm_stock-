import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "category" | "brand" | "unit" | "product" | "warehouse" | "zone" | "stock" | "supplier" | "entry" | "entryLine" | "exit" | "exitLine" | "movement" | "inventory" | "inventoryLine";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        Brand: {
            payload: Prisma.$BrandPayload<ExtArgs>;
            fields: Prisma.BrandFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BrandFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                findFirst: {
                    args: Prisma.BrandFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                findMany: {
                    args: Prisma.BrandFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>[];
                };
                create: {
                    args: Prisma.BrandCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                createMany: {
                    args: Prisma.BrandCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.BrandDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                update: {
                    args: Prisma.BrandUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                deleteMany: {
                    args: Prisma.BrandDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BrandUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.BrandUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                aggregate: {
                    args: Prisma.BrandAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBrand>;
                };
                groupBy: {
                    args: Prisma.BrandGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BrandGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BrandCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BrandCountAggregateOutputType> | number;
                };
            };
        };
        Unit: {
            payload: Prisma.$UnitPayload<ExtArgs>;
            fields: Prisma.UnitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UnitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                findFirst: {
                    args: Prisma.UnitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                findMany: {
                    args: Prisma.UnitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>[];
                };
                create: {
                    args: Prisma.UnitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                createMany: {
                    args: Prisma.UnitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UnitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                update: {
                    args: Prisma.UnitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                deleteMany: {
                    args: Prisma.UnitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UnitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UnitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UnitPayload>;
                };
                aggregate: {
                    args: Prisma.UnitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit>;
                };
                groupBy: {
                    args: Prisma.UnitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UnitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UnitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UnitCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        Warehouse: {
            payload: Prisma.$WarehousePayload<ExtArgs>;
            fields: Prisma.WarehouseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WarehouseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WarehouseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findFirst: {
                    args: Prisma.WarehouseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WarehouseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findMany: {
                    args: Prisma.WarehouseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                create: {
                    args: Prisma.WarehouseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                createMany: {
                    args: Prisma.WarehouseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.WarehouseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                update: {
                    args: Prisma.WarehouseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                deleteMany: {
                    args: Prisma.WarehouseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WarehouseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.WarehouseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                aggregate: {
                    args: Prisma.WarehouseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWarehouse>;
                };
                groupBy: {
                    args: Prisma.WarehouseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WarehouseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseCountAggregateOutputType> | number;
                };
            };
        };
        Zone: {
            payload: Prisma.$ZonePayload<ExtArgs>;
            fields: Prisma.ZoneFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ZoneFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ZoneFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                findFirst: {
                    args: Prisma.ZoneFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ZoneFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                findMany: {
                    args: Prisma.ZoneFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>[];
                };
                create: {
                    args: Prisma.ZoneCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                createMany: {
                    args: Prisma.ZoneCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ZoneDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                update: {
                    args: Prisma.ZoneUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                deleteMany: {
                    args: Prisma.ZoneDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ZoneUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ZoneUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                aggregate: {
                    args: Prisma.ZoneAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateZone>;
                };
                groupBy: {
                    args: Prisma.ZoneGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ZoneGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ZoneCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ZoneCountAggregateOutputType> | number;
                };
            };
        };
        Stock: {
            payload: Prisma.$StockPayload<ExtArgs>;
            fields: Prisma.StockFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                findFirst: {
                    args: Prisma.StockFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                findMany: {
                    args: Prisma.StockFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>[];
                };
                create: {
                    args: Prisma.StockCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                createMany: {
                    args: Prisma.StockCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.StockDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                update: {
                    args: Prisma.StockUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                deleteMany: {
                    args: Prisma.StockDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.StockUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockPayload>;
                };
                aggregate: {
                    args: Prisma.StockAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStock>;
                };
                groupBy: {
                    args: Prisma.StockGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockCountAggregateOutputType> | number;
                };
            };
        };
        Supplier: {
            payload: Prisma.$SupplierPayload<ExtArgs>;
            fields: Prisma.SupplierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findFirst: {
                    args: Prisma.SupplierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findMany: {
                    args: Prisma.SupplierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                create: {
                    args: Prisma.SupplierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                createMany: {
                    args: Prisma.SupplierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SupplierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                update: {
                    args: Prisma.SupplierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SupplierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                aggregate: {
                    args: Prisma.SupplierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplier>;
                };
                groupBy: {
                    args: Prisma.SupplierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierCountAggregateOutputType> | number;
                };
            };
        };
        Entry: {
            payload: Prisma.$EntryPayload<ExtArgs>;
            fields: Prisma.EntryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EntryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EntryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                findFirst: {
                    args: Prisma.EntryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EntryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                findMany: {
                    args: Prisma.EntryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>[];
                };
                create: {
                    args: Prisma.EntryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                createMany: {
                    args: Prisma.EntryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EntryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                update: {
                    args: Prisma.EntryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                deleteMany: {
                    args: Prisma.EntryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EntryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EntryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryPayload>;
                };
                aggregate: {
                    args: Prisma.EntryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEntry>;
                };
                groupBy: {
                    args: Prisma.EntryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EntryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntryCountAggregateOutputType> | number;
                };
            };
        };
        EntryLine: {
            payload: Prisma.$EntryLinePayload<ExtArgs>;
            fields: Prisma.EntryLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EntryLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EntryLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                findFirst: {
                    args: Prisma.EntryLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EntryLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                findMany: {
                    args: Prisma.EntryLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>[];
                };
                create: {
                    args: Prisma.EntryLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                createMany: {
                    args: Prisma.EntryLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EntryLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                update: {
                    args: Prisma.EntryLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                deleteMany: {
                    args: Prisma.EntryLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EntryLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EntryLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntryLinePayload>;
                };
                aggregate: {
                    args: Prisma.EntryLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEntryLine>;
                };
                groupBy: {
                    args: Prisma.EntryLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntryLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EntryLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntryLineCountAggregateOutputType> | number;
                };
            };
        };
        Exit: {
            payload: Prisma.$ExitPayload<ExtArgs>;
            fields: Prisma.ExitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                findFirst: {
                    args: Prisma.ExitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                findMany: {
                    args: Prisma.ExitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>[];
                };
                create: {
                    args: Prisma.ExitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                createMany: {
                    args: Prisma.ExitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ExitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                update: {
                    args: Prisma.ExitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                deleteMany: {
                    args: Prisma.ExitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ExitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitPayload>;
                };
                aggregate: {
                    args: Prisma.ExitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExit>;
                };
                groupBy: {
                    args: Prisma.ExitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExitCountAggregateOutputType> | number;
                };
            };
        };
        ExitLine: {
            payload: Prisma.$ExitLinePayload<ExtArgs>;
            fields: Prisma.ExitLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExitLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExitLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                findFirst: {
                    args: Prisma.ExitLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExitLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                findMany: {
                    args: Prisma.ExitLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>[];
                };
                create: {
                    args: Prisma.ExitLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                createMany: {
                    args: Prisma.ExitLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ExitLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                update: {
                    args: Prisma.ExitLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                deleteMany: {
                    args: Prisma.ExitLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExitLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ExitLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExitLinePayload>;
                };
                aggregate: {
                    args: Prisma.ExitLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExitLine>;
                };
                groupBy: {
                    args: Prisma.ExitLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExitLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExitLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExitLineCountAggregateOutputType> | number;
                };
            };
        };
        Movement: {
            payload: Prisma.$MovementPayload<ExtArgs>;
            fields: Prisma.MovementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MovementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MovementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                findFirst: {
                    args: Prisma.MovementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MovementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                findMany: {
                    args: Prisma.MovementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>[];
                };
                create: {
                    args: Prisma.MovementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                createMany: {
                    args: Prisma.MovementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.MovementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                update: {
                    args: Prisma.MovementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                deleteMany: {
                    args: Prisma.MovementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MovementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.MovementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MovementPayload>;
                };
                aggregate: {
                    args: Prisma.MovementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMovement>;
                };
                groupBy: {
                    args: Prisma.MovementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MovementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MovementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MovementCountAggregateOutputType> | number;
                };
            };
        };
        Inventory: {
            payload: Prisma.$InventoryPayload<ExtArgs>;
            fields: Prisma.InventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                findMany: {
                    args: Prisma.InventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>[];
                };
                create: {
                    args: Prisma.InventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                createMany: {
                    args: Prisma.InventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.InventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                update: {
                    args: Prisma.InventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.InventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventory>;
                };
                groupBy: {
                    args: Prisma.InventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryCountAggregateOutputType> | number;
                };
            };
        };
        InventoryLine: {
            payload: Prisma.$InventoryLinePayload<ExtArgs>;
            fields: Prisma.InventoryLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                findFirst: {
                    args: Prisma.InventoryLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                findMany: {
                    args: Prisma.InventoryLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>[];
                };
                create: {
                    args: Prisma.InventoryLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                createMany: {
                    args: Prisma.InventoryLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.InventoryLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                update: {
                    args: Prisma.InventoryLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.InventoryLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryLinePayload>;
                };
                aggregate: {
                    args: Prisma.InventoryLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryLine>;
                };
                groupBy: {
                    args: Prisma.InventoryLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryLineCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    category?: Prisma.CategoryOmit;
    brand?: Prisma.BrandOmit;
    unit?: Prisma.UnitOmit;
    product?: Prisma.ProductOmit;
    warehouse?: Prisma.WarehouseOmit;
    zone?: Prisma.ZoneOmit;
    stock?: Prisma.StockOmit;
    supplier?: Prisma.SupplierOmit;
    entry?: Prisma.EntryOmit;
    entryLine?: Prisma.EntryLineOmit;
    exit?: Prisma.ExitOmit;
    exitLine?: Prisma.ExitLineOmit;
    movement?: Prisma.MovementOmit;
    inventory?: Prisma.InventoryOmit;
    inventoryLine?: Prisma.InventoryLineOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
