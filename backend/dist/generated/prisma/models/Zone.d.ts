import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ZoneModel = runtime.Types.Result.DefaultSelection<Prisma.$ZonePayload>;
export type AggregateZone = {
    _count: ZoneCountAggregateOutputType | null;
    _min: ZoneMinAggregateOutputType | null;
    _max: ZoneMaxAggregateOutputType | null;
};
export type ZoneMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    warehouseId: string | null;
};
export type ZoneMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    warehouseId: string | null;
};
export type ZoneCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    warehouseId: number;
    _all: number;
};
export type ZoneMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    warehouseId?: true;
};
export type ZoneMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    warehouseId?: true;
};
export type ZoneCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    warehouseId?: true;
    _all?: true;
};
export type ZoneAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ZoneCountAggregateInputType;
    _min?: ZoneMinAggregateInputType;
    _max?: ZoneMaxAggregateInputType;
};
export type GetZoneAggregateType<T extends ZoneAggregateArgs> = {
    [P in keyof T & keyof AggregateZone]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateZone[P]> : Prisma.GetScalarType<T[P], AggregateZone[P]>;
};
export type ZoneGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithAggregationInput | Prisma.ZoneOrderByWithAggregationInput[];
    by: Prisma.ZoneScalarFieldEnum[] | Prisma.ZoneScalarFieldEnum;
    having?: Prisma.ZoneScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ZoneCountAggregateInputType | true;
    _min?: ZoneMinAggregateInputType;
    _max?: ZoneMaxAggregateInputType;
};
export type ZoneGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    warehouseId: string;
    _count: ZoneCountAggregateOutputType | null;
    _min: ZoneMinAggregateOutputType | null;
    _max: ZoneMaxAggregateOutputType | null;
};
export type GetZoneGroupByPayload<T extends ZoneGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ZoneGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ZoneGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ZoneGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ZoneGroupByOutputType[P]>;
}>>;
export type ZoneWhereInput = {
    AND?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    OR?: Prisma.ZoneWhereInput[];
    NOT?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    id?: Prisma.StringFilter<"Zone"> | string;
    name?: Prisma.StringFilter<"Zone"> | string;
    description?: Prisma.StringNullableFilter<"Zone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    warehouseId?: Prisma.StringFilter<"Zone"> | string;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    stocks?: Prisma.StockListRelationFilter;
};
export type ZoneOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    stocks?: Prisma.StockOrderByRelationAggregateInput;
    _relevance?: Prisma.ZoneOrderByRelevanceInput;
};
export type ZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    OR?: Prisma.ZoneWhereInput[];
    NOT?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    name?: Prisma.StringFilter<"Zone"> | string;
    description?: Prisma.StringNullableFilter<"Zone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    warehouseId?: Prisma.StringFilter<"Zone"> | string;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    stocks?: Prisma.StockListRelationFilter;
}, "id">;
export type ZoneOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    _count?: Prisma.ZoneCountOrderByAggregateInput;
    _max?: Prisma.ZoneMaxOrderByAggregateInput;
    _min?: Prisma.ZoneMinOrderByAggregateInput;
};
export type ZoneScalarWhereWithAggregatesInput = {
    AND?: Prisma.ZoneScalarWhereWithAggregatesInput | Prisma.ZoneScalarWhereWithAggregatesInput[];
    OR?: Prisma.ZoneScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ZoneScalarWhereWithAggregatesInput | Prisma.ZoneScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Zone"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Zone"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Zone"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Zone"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Zone"> | Date | string;
    warehouseId?: Prisma.StringWithAggregatesFilter<"Zone"> | string;
};
export type ZoneCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutZonesInput;
    stocks?: Prisma.StockCreateNestedManyWithoutZoneInput;
};
export type ZoneUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutZoneInput;
};
export type ZoneUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutZonesNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutZoneNestedInput;
};
export type ZoneUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutZoneNestedInput;
};
export type ZoneCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
};
export type ZoneUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ZoneListRelationFilter = {
    every?: Prisma.ZoneWhereInput;
    some?: Prisma.ZoneWhereInput;
    none?: Prisma.ZoneWhereInput;
};
export type ZoneOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ZoneOrderByRelevanceInput = {
    fields: Prisma.ZoneOrderByRelevanceFieldEnum | Prisma.ZoneOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ZoneCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ZoneMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ZoneMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ZoneNullableScalarRelationFilter = {
    is?: Prisma.ZoneWhereInput | null;
    isNot?: Prisma.ZoneWhereInput | null;
};
export type ZoneCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput> | Prisma.ZoneCreateWithoutWarehouseInput[] | Prisma.ZoneUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutWarehouseInput | Prisma.ZoneCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.ZoneCreateManyWarehouseInputEnvelope;
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
};
export type ZoneUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput> | Prisma.ZoneCreateWithoutWarehouseInput[] | Prisma.ZoneUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutWarehouseInput | Prisma.ZoneCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.ZoneCreateManyWarehouseInputEnvelope;
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
};
export type ZoneUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput> | Prisma.ZoneCreateWithoutWarehouseInput[] | Prisma.ZoneUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutWarehouseInput | Prisma.ZoneCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.ZoneUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.ZoneUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.ZoneCreateManyWarehouseInputEnvelope;
    set?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    disconnect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    delete?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    update?: Prisma.ZoneUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.ZoneUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.ZoneUpdateManyWithWhereWithoutWarehouseInput | Prisma.ZoneUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
};
export type ZoneUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput> | Prisma.ZoneCreateWithoutWarehouseInput[] | Prisma.ZoneUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutWarehouseInput | Prisma.ZoneCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.ZoneUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.ZoneUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.ZoneCreateManyWarehouseInputEnvelope;
    set?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    disconnect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    delete?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    update?: Prisma.ZoneUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.ZoneUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.ZoneUpdateManyWithWhereWithoutWarehouseInput | Prisma.ZoneUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
};
export type ZoneCreateNestedOneWithoutStocksInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutStocksInput, Prisma.ZoneUncheckedCreateWithoutStocksInput>;
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutStocksInput;
    connect?: Prisma.ZoneWhereUniqueInput;
};
export type ZoneUpdateOneWithoutStocksNestedInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutStocksInput, Prisma.ZoneUncheckedCreateWithoutStocksInput>;
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutStocksInput;
    upsert?: Prisma.ZoneUpsertWithoutStocksInput;
    disconnect?: Prisma.ZoneWhereInput | boolean;
    delete?: Prisma.ZoneWhereInput | boolean;
    connect?: Prisma.ZoneWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ZoneUpdateToOneWithWhereWithoutStocksInput, Prisma.ZoneUpdateWithoutStocksInput>, Prisma.ZoneUncheckedUpdateWithoutStocksInput>;
};
export type ZoneCreateWithoutWarehouseInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stocks?: Prisma.StockCreateNestedManyWithoutZoneInput;
};
export type ZoneUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutZoneInput;
};
export type ZoneCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.ZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput>;
};
export type ZoneCreateManyWarehouseInputEnvelope = {
    data: Prisma.ZoneCreateManyWarehouseInput | Prisma.ZoneCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type ZoneUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.ZoneWhereUniqueInput;
    update: Prisma.XOR<Prisma.ZoneUpdateWithoutWarehouseInput, Prisma.ZoneUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutWarehouseInput, Prisma.ZoneUncheckedCreateWithoutWarehouseInput>;
};
export type ZoneUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.ZoneWhereUniqueInput;
    data: Prisma.XOR<Prisma.ZoneUpdateWithoutWarehouseInput, Prisma.ZoneUncheckedUpdateWithoutWarehouseInput>;
};
export type ZoneUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.ZoneScalarWhereInput;
    data: Prisma.XOR<Prisma.ZoneUpdateManyMutationInput, Prisma.ZoneUncheckedUpdateManyWithoutWarehouseInput>;
};
export type ZoneScalarWhereInput = {
    AND?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
    OR?: Prisma.ZoneScalarWhereInput[];
    NOT?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
    id?: Prisma.StringFilter<"Zone"> | string;
    name?: Prisma.StringFilter<"Zone"> | string;
    description?: Prisma.StringNullableFilter<"Zone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    warehouseId?: Prisma.StringFilter<"Zone"> | string;
};
export type ZoneCreateWithoutStocksInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutZonesInput;
};
export type ZoneUncheckedCreateWithoutStocksInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
};
export type ZoneCreateOrConnectWithoutStocksInput = {
    where: Prisma.ZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutStocksInput, Prisma.ZoneUncheckedCreateWithoutStocksInput>;
};
export type ZoneUpsertWithoutStocksInput = {
    update: Prisma.XOR<Prisma.ZoneUpdateWithoutStocksInput, Prisma.ZoneUncheckedUpdateWithoutStocksInput>;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutStocksInput, Prisma.ZoneUncheckedCreateWithoutStocksInput>;
    where?: Prisma.ZoneWhereInput;
};
export type ZoneUpdateToOneWithWhereWithoutStocksInput = {
    where?: Prisma.ZoneWhereInput;
    data: Prisma.XOR<Prisma.ZoneUpdateWithoutStocksInput, Prisma.ZoneUncheckedUpdateWithoutStocksInput>;
};
export type ZoneUpdateWithoutStocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutZonesNestedInput;
};
export type ZoneUncheckedUpdateWithoutStocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ZoneCreateManyWarehouseInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ZoneUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stocks?: Prisma.StockUpdateManyWithoutZoneNestedInput;
};
export type ZoneUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutZoneNestedInput;
};
export type ZoneUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneCountOutputType = {
    stocks: number;
};
export type ZoneCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stocks?: boolean | ZoneCountOutputTypeCountStocksArgs;
};
export type ZoneCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneCountOutputTypeSelect<ExtArgs> | null;
};
export type ZoneCountOutputTypeCountStocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockWhereInput;
};
export type ZoneSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    warehouseId?: boolean;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    stocks?: boolean | Prisma.Zone$stocksArgs<ExtArgs>;
    _count?: boolean | Prisma.ZoneCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zone"]>;
export type ZoneSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    warehouseId?: boolean;
};
export type ZoneOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "warehouseId", ExtArgs["result"]["zone"]>;
export type ZoneInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    stocks?: boolean | Prisma.Zone$stocksArgs<ExtArgs>;
    _count?: boolean | Prisma.ZoneCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $ZonePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Zone";
    objects: {
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
        stocks: Prisma.$StockPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
    }, ExtArgs["result"]["zone"]>;
    composites: {};
};
export type ZoneGetPayload<S extends boolean | null | undefined | ZoneDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ZonePayload, S>;
export type ZoneCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ZoneCountAggregateInputType | true;
};
export interface ZoneDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Zone'];
        meta: {
            name: 'Zone';
        };
    };
    findUnique<T extends ZoneFindUniqueArgs>(args: Prisma.SelectSubset<T, ZoneFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ZoneFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ZoneFindFirstArgs>(args?: Prisma.SelectSubset<T, ZoneFindFirstArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ZoneFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ZoneFindManyArgs>(args?: Prisma.SelectSubset<T, ZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ZoneCreateArgs>(args: Prisma.SelectSubset<T, ZoneCreateArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ZoneCreateManyArgs>(args?: Prisma.SelectSubset<T, ZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ZoneDeleteArgs>(args: Prisma.SelectSubset<T, ZoneDeleteArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ZoneUpdateArgs>(args: Prisma.SelectSubset<T, ZoneUpdateArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ZoneDeleteManyArgs>(args?: Prisma.SelectSubset<T, ZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ZoneUpdateManyArgs>(args: Prisma.SelectSubset<T, ZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ZoneUpsertArgs>(args: Prisma.SelectSubset<T, ZoneUpsertArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ZoneCountArgs>(args?: Prisma.Subset<T, ZoneCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ZoneCountAggregateOutputType> : number>;
    aggregate<T extends ZoneAggregateArgs>(args: Prisma.Subset<T, ZoneAggregateArgs>): Prisma.PrismaPromise<GetZoneAggregateType<T>>;
    groupBy<T extends ZoneGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ZoneGroupByArgs['orderBy'];
    } : {
        orderBy?: ZoneGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ZoneFieldRefs;
}
export interface Prisma__ZoneClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    stocks<T extends Prisma.Zone$stocksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Zone$stocksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ZoneFieldRefs {
    readonly id: Prisma.FieldRef<"Zone", 'String'>;
    readonly name: Prisma.FieldRef<"Zone", 'String'>;
    readonly description: Prisma.FieldRef<"Zone", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Zone", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Zone", 'DateTime'>;
    readonly warehouseId: Prisma.FieldRef<"Zone", 'String'>;
}
export type ZoneFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ZoneScalarFieldEnum | Prisma.ZoneScalarFieldEnum[];
};
export type ZoneFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ZoneScalarFieldEnum | Prisma.ZoneScalarFieldEnum[];
};
export type ZoneFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ZoneScalarFieldEnum | Prisma.ZoneScalarFieldEnum[];
};
export type ZoneCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ZoneCreateInput, Prisma.ZoneUncheckedCreateInput>;
};
export type ZoneCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ZoneCreateManyInput | Prisma.ZoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ZoneUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ZoneUpdateInput, Prisma.ZoneUncheckedUpdateInput>;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ZoneUpdateManyMutationInput, Prisma.ZoneUncheckedUpdateManyInput>;
    where?: Prisma.ZoneWhereInput;
    limit?: number;
};
export type ZoneUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZoneCreateInput, Prisma.ZoneUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ZoneUpdateInput, Prisma.ZoneUncheckedUpdateInput>;
};
export type ZoneDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    limit?: number;
};
export type Zone$stocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockSelect<ExtArgs> | null;
    omit?: Prisma.StockOmit<ExtArgs> | null;
    include?: Prisma.StockInclude<ExtArgs> | null;
    where?: Prisma.StockWhereInput;
    orderBy?: Prisma.StockOrderByWithRelationInput | Prisma.StockOrderByWithRelationInput[];
    cursor?: Prisma.StockWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockScalarFieldEnum | Prisma.StockScalarFieldEnum[];
};
export type ZoneDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
};
