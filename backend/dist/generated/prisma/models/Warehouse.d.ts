import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WarehouseModel = runtime.Types.Result.DefaultSelection<Prisma.$WarehousePayload>;
export type AggregateWarehouse = {
    _count: WarehouseCountAggregateOutputType | null;
    _min: WarehouseMinAggregateOutputType | null;
    _max: WarehouseMaxAggregateOutputType | null;
};
export type WarehouseMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    location: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WarehouseMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    location: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WarehouseCountAggregateOutputType = {
    id: number;
    name: number;
    location: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WarehouseMinAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WarehouseMaxAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WarehouseCountAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WarehouseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithRelationInput | Prisma.WarehouseOrderByWithRelationInput[];
    cursor?: Prisma.WarehouseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WarehouseCountAggregateInputType;
    _min?: WarehouseMinAggregateInputType;
    _max?: WarehouseMaxAggregateInputType;
};
export type GetWarehouseAggregateType<T extends WarehouseAggregateArgs> = {
    [P in keyof T & keyof AggregateWarehouse]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWarehouse[P]> : Prisma.GetScalarType<T[P], AggregateWarehouse[P]>;
};
export type WarehouseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithAggregationInput | Prisma.WarehouseOrderByWithAggregationInput[];
    by: Prisma.WarehouseScalarFieldEnum[] | Prisma.WarehouseScalarFieldEnum;
    having?: Prisma.WarehouseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WarehouseCountAggregateInputType | true;
    _min?: WarehouseMinAggregateInputType;
    _max?: WarehouseMaxAggregateInputType;
};
export type WarehouseGroupByOutputType = {
    id: string;
    name: string;
    location: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: WarehouseCountAggregateOutputType | null;
    _min: WarehouseMinAggregateOutputType | null;
    _max: WarehouseMaxAggregateOutputType | null;
};
export type GetWarehouseGroupByPayload<T extends WarehouseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WarehouseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WarehouseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WarehouseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WarehouseGroupByOutputType[P]>;
}>>;
export type WarehouseWhereInput = {
    AND?: Prisma.WarehouseWhereInput | Prisma.WarehouseWhereInput[];
    OR?: Prisma.WarehouseWhereInput[];
    NOT?: Prisma.WarehouseWhereInput | Prisma.WarehouseWhereInput[];
    id?: Prisma.StringFilter<"Warehouse"> | string;
    name?: Prisma.StringFilter<"Warehouse"> | string;
    location?: Prisma.StringNullableFilter<"Warehouse"> | string | null;
    isActive?: Prisma.BoolFilter<"Warehouse"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Warehouse"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Warehouse"> | Date | string;
    zones?: Prisma.ZoneListRelationFilter;
    stocks?: Prisma.StockListRelationFilter;
    entries?: Prisma.EntryListRelationFilter;
    exits?: Prisma.ExitListRelationFilter;
    fromMovements?: Prisma.MovementListRelationFilter;
    toMovements?: Prisma.MovementListRelationFilter;
    inventories?: Prisma.InventoryListRelationFilter;
};
export type WarehouseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    zones?: Prisma.ZoneOrderByRelationAggregateInput;
    stocks?: Prisma.StockOrderByRelationAggregateInput;
    entries?: Prisma.EntryOrderByRelationAggregateInput;
    exits?: Prisma.ExitOrderByRelationAggregateInput;
    fromMovements?: Prisma.MovementOrderByRelationAggregateInput;
    toMovements?: Prisma.MovementOrderByRelationAggregateInput;
    inventories?: Prisma.InventoryOrderByRelationAggregateInput;
    _relevance?: Prisma.WarehouseOrderByRelevanceInput;
};
export type WarehouseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WarehouseWhereInput | Prisma.WarehouseWhereInput[];
    OR?: Prisma.WarehouseWhereInput[];
    NOT?: Prisma.WarehouseWhereInput | Prisma.WarehouseWhereInput[];
    name?: Prisma.StringFilter<"Warehouse"> | string;
    location?: Prisma.StringNullableFilter<"Warehouse"> | string | null;
    isActive?: Prisma.BoolFilter<"Warehouse"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Warehouse"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Warehouse"> | Date | string;
    zones?: Prisma.ZoneListRelationFilter;
    stocks?: Prisma.StockListRelationFilter;
    entries?: Prisma.EntryListRelationFilter;
    exits?: Prisma.ExitListRelationFilter;
    fromMovements?: Prisma.MovementListRelationFilter;
    toMovements?: Prisma.MovementListRelationFilter;
    inventories?: Prisma.InventoryListRelationFilter;
}, "id">;
export type WarehouseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WarehouseCountOrderByAggregateInput;
    _max?: Prisma.WarehouseMaxOrderByAggregateInput;
    _min?: Prisma.WarehouseMinOrderByAggregateInput;
};
export type WarehouseScalarWhereWithAggregatesInput = {
    AND?: Prisma.WarehouseScalarWhereWithAggregatesInput | Prisma.WarehouseScalarWhereWithAggregatesInput[];
    OR?: Prisma.WarehouseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WarehouseScalarWhereWithAggregatesInput | Prisma.WarehouseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Warehouse"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Warehouse"> | string;
    location?: Prisma.StringNullableWithAggregatesFilter<"Warehouse"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Warehouse"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Warehouse"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Warehouse"> | Date | string;
};
export type WarehouseCreateInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateManyInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WarehouseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WarehouseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WarehouseOrderByRelevanceInput = {
    fields: Prisma.WarehouseOrderByRelevanceFieldEnum | Prisma.WarehouseOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type WarehouseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WarehouseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WarehouseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WarehouseScalarRelationFilter = {
    is?: Prisma.WarehouseWhereInput;
    isNot?: Prisma.WarehouseWhereInput;
};
export type WarehouseNullableScalarRelationFilter = {
    is?: Prisma.WarehouseWhereInput | null;
    isNot?: Prisma.WarehouseWhereInput | null;
};
export type WarehouseCreateNestedOneWithoutZonesInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutZonesInput, Prisma.WarehouseUncheckedCreateWithoutZonesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutZonesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneRequiredWithoutZonesNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutZonesInput, Prisma.WarehouseUncheckedCreateWithoutZonesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutZonesInput;
    upsert?: Prisma.WarehouseUpsertWithoutZonesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutZonesInput, Prisma.WarehouseUpdateWithoutZonesInput>, Prisma.WarehouseUncheckedUpdateWithoutZonesInput>;
};
export type WarehouseCreateNestedOneWithoutStocksInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutStocksInput, Prisma.WarehouseUncheckedCreateWithoutStocksInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutStocksInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneRequiredWithoutStocksNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutStocksInput, Prisma.WarehouseUncheckedCreateWithoutStocksInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutStocksInput;
    upsert?: Prisma.WarehouseUpsertWithoutStocksInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutStocksInput, Prisma.WarehouseUpdateWithoutStocksInput>, Prisma.WarehouseUncheckedUpdateWithoutStocksInput>;
};
export type WarehouseCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutEntriesInput, Prisma.WarehouseUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutEntriesInput, Prisma.WarehouseUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.WarehouseUpsertWithoutEntriesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutEntriesInput, Prisma.WarehouseUpdateWithoutEntriesInput>, Prisma.WarehouseUncheckedUpdateWithoutEntriesInput>;
};
export type WarehouseCreateNestedOneWithoutExitsInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutExitsInput, Prisma.WarehouseUncheckedCreateWithoutExitsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutExitsInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneRequiredWithoutExitsNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutExitsInput, Prisma.WarehouseUncheckedCreateWithoutExitsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutExitsInput;
    upsert?: Prisma.WarehouseUpsertWithoutExitsInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutExitsInput, Prisma.WarehouseUpdateWithoutExitsInput>, Prisma.WarehouseUncheckedUpdateWithoutExitsInput>;
};
export type WarehouseCreateNestedOneWithoutFromMovementsInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutFromMovementsInput, Prisma.WarehouseUncheckedCreateWithoutFromMovementsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutFromMovementsInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseCreateNestedOneWithoutToMovementsInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutToMovementsInput, Prisma.WarehouseUncheckedCreateWithoutToMovementsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutToMovementsInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneWithoutFromMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutFromMovementsInput, Prisma.WarehouseUncheckedCreateWithoutFromMovementsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutFromMovementsInput;
    upsert?: Prisma.WarehouseUpsertWithoutFromMovementsInput;
    disconnect?: Prisma.WarehouseWhereInput | boolean;
    delete?: Prisma.WarehouseWhereInput | boolean;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutFromMovementsInput, Prisma.WarehouseUpdateWithoutFromMovementsInput>, Prisma.WarehouseUncheckedUpdateWithoutFromMovementsInput>;
};
export type WarehouseUpdateOneWithoutToMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutToMovementsInput, Prisma.WarehouseUncheckedCreateWithoutToMovementsInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutToMovementsInput;
    upsert?: Prisma.WarehouseUpsertWithoutToMovementsInput;
    disconnect?: Prisma.WarehouseWhereInput | boolean;
    delete?: Prisma.WarehouseWhereInput | boolean;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutToMovementsInput, Prisma.WarehouseUpdateWithoutToMovementsInput>, Prisma.WarehouseUncheckedUpdateWithoutToMovementsInput>;
};
export type WarehouseCreateNestedOneWithoutInventoriesInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutInventoriesInput, Prisma.WarehouseUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutInventoriesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateOneRequiredWithoutInventoriesNestedInput = {
    create?: Prisma.XOR<Prisma.WarehouseCreateWithoutInventoriesInput, Prisma.WarehouseUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.WarehouseCreateOrConnectWithoutInventoriesInput;
    upsert?: Prisma.WarehouseUpsertWithoutInventoriesInput;
    connect?: Prisma.WarehouseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WarehouseUpdateToOneWithWhereWithoutInventoriesInput, Prisma.WarehouseUpdateWithoutInventoriesInput>, Prisma.WarehouseUncheckedUpdateWithoutInventoriesInput>;
};
export type WarehouseCreateWithoutZonesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutZonesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutZonesInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutZonesInput, Prisma.WarehouseUncheckedCreateWithoutZonesInput>;
};
export type WarehouseUpsertWithoutZonesInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutZonesInput, Prisma.WarehouseUncheckedUpdateWithoutZonesInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutZonesInput, Prisma.WarehouseUncheckedCreateWithoutZonesInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutZonesInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutZonesInput, Prisma.WarehouseUncheckedUpdateWithoutZonesInput>;
};
export type WarehouseUpdateWithoutZonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutZonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateWithoutStocksInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutStocksInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutStocksInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutStocksInput, Prisma.WarehouseUncheckedCreateWithoutStocksInput>;
};
export type WarehouseUpsertWithoutStocksInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutStocksInput, Prisma.WarehouseUncheckedUpdateWithoutStocksInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutStocksInput, Prisma.WarehouseUncheckedCreateWithoutStocksInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutStocksInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutStocksInput, Prisma.WarehouseUncheckedUpdateWithoutStocksInput>;
};
export type WarehouseUpdateWithoutStocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutStocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateWithoutEntriesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutEntriesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutEntriesInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutEntriesInput, Prisma.WarehouseUncheckedCreateWithoutEntriesInput>;
};
export type WarehouseUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutEntriesInput, Prisma.WarehouseUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutEntriesInput, Prisma.WarehouseUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutEntriesInput, Prisma.WarehouseUncheckedUpdateWithoutEntriesInput>;
};
export type WarehouseUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateWithoutExitsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutExitsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutExitsInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutExitsInput, Prisma.WarehouseUncheckedCreateWithoutExitsInput>;
};
export type WarehouseUpsertWithoutExitsInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutExitsInput, Prisma.WarehouseUncheckedUpdateWithoutExitsInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutExitsInput, Prisma.WarehouseUncheckedCreateWithoutExitsInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutExitsInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutExitsInput, Prisma.WarehouseUncheckedUpdateWithoutExitsInput>;
};
export type WarehouseUpdateWithoutExitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutExitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateWithoutFromMovementsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutFromMovementsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutFromMovementsInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutFromMovementsInput, Prisma.WarehouseUncheckedCreateWithoutFromMovementsInput>;
};
export type WarehouseCreateWithoutToMovementsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutToMovementsInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutToMovementsInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutToMovementsInput, Prisma.WarehouseUncheckedCreateWithoutToMovementsInput>;
};
export type WarehouseUpsertWithoutFromMovementsInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutFromMovementsInput, Prisma.WarehouseUncheckedUpdateWithoutFromMovementsInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutFromMovementsInput, Prisma.WarehouseUncheckedCreateWithoutFromMovementsInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutFromMovementsInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutFromMovementsInput, Prisma.WarehouseUncheckedUpdateWithoutFromMovementsInput>;
};
export type WarehouseUpdateWithoutFromMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutFromMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUpsertWithoutToMovementsInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutToMovementsInput, Prisma.WarehouseUncheckedUpdateWithoutToMovementsInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutToMovementsInput, Prisma.WarehouseUncheckedCreateWithoutToMovementsInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutToMovementsInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutToMovementsInput, Prisma.WarehouseUncheckedUpdateWithoutToMovementsInput>;
};
export type WarehouseUpdateWithoutToMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutToMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutWarehouseNestedInput;
};
export type WarehouseCreateWithoutInventoriesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementCreateNestedManyWithoutToWarehouseInput;
};
export type WarehouseUncheckedCreateWithoutInventoriesInput = {
    id?: string;
    name: string;
    location?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutWarehouseInput;
    stocks?: Prisma.StockUncheckedCreateNestedManyWithoutWarehouseInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutWarehouseInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutWarehouseInput;
    fromMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutFromWarehouseInput;
    toMovements?: Prisma.MovementUncheckedCreateNestedManyWithoutToWarehouseInput;
};
export type WarehouseCreateOrConnectWithoutInventoriesInput = {
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutInventoriesInput, Prisma.WarehouseUncheckedCreateWithoutInventoriesInput>;
};
export type WarehouseUpsertWithoutInventoriesInput = {
    update: Prisma.XOR<Prisma.WarehouseUpdateWithoutInventoriesInput, Prisma.WarehouseUncheckedUpdateWithoutInventoriesInput>;
    create: Prisma.XOR<Prisma.WarehouseCreateWithoutInventoriesInput, Prisma.WarehouseUncheckedCreateWithoutInventoriesInput>;
    where?: Prisma.WarehouseWhereInput;
};
export type WarehouseUpdateToOneWithWhereWithoutInventoriesInput = {
    where?: Prisma.WarehouseWhereInput;
    data: Prisma.XOR<Prisma.WarehouseUpdateWithoutInventoriesInput, Prisma.WarehouseUncheckedUpdateWithoutInventoriesInput>;
};
export type WarehouseUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUpdateManyWithoutToWarehouseNestedInput;
};
export type WarehouseUncheckedUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutWarehouseNestedInput;
    stocks?: Prisma.StockUncheckedUpdateManyWithoutWarehouseNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutWarehouseNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutWarehouseNestedInput;
    fromMovements?: Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput;
    toMovements?: Prisma.MovementUncheckedUpdateManyWithoutToWarehouseNestedInput;
};
export type WarehouseCountOutputType = {
    zones: number;
    stocks: number;
    entries: number;
    exits: number;
    fromMovements: number;
    toMovements: number;
    inventories: number;
};
export type WarehouseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    zones?: boolean | WarehouseCountOutputTypeCountZonesArgs;
    stocks?: boolean | WarehouseCountOutputTypeCountStocksArgs;
    entries?: boolean | WarehouseCountOutputTypeCountEntriesArgs;
    exits?: boolean | WarehouseCountOutputTypeCountExitsArgs;
    fromMovements?: boolean | WarehouseCountOutputTypeCountFromMovementsArgs;
    toMovements?: boolean | WarehouseCountOutputTypeCountToMovementsArgs;
    inventories?: boolean | WarehouseCountOutputTypeCountInventoriesArgs;
};
export type WarehouseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseCountOutputTypeSelect<ExtArgs> | null;
};
export type WarehouseCountOutputTypeCountZonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
};
export type WarehouseCountOutputTypeCountStocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockWhereInput;
};
export type WarehouseCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryWhereInput;
};
export type WarehouseCountOutputTypeCountExitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitWhereInput;
};
export type WarehouseCountOutputTypeCountFromMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MovementWhereInput;
};
export type WarehouseCountOutputTypeCountToMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MovementWhereInput;
};
export type WarehouseCountOutputTypeCountInventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
};
export type WarehouseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    zones?: boolean | Prisma.Warehouse$zonesArgs<ExtArgs>;
    stocks?: boolean | Prisma.Warehouse$stocksArgs<ExtArgs>;
    entries?: boolean | Prisma.Warehouse$entriesArgs<ExtArgs>;
    exits?: boolean | Prisma.Warehouse$exitsArgs<ExtArgs>;
    fromMovements?: boolean | Prisma.Warehouse$fromMovementsArgs<ExtArgs>;
    toMovements?: boolean | Prisma.Warehouse$toMovementsArgs<ExtArgs>;
    inventories?: boolean | Prisma.Warehouse$inventoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.WarehouseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["warehouse"]>;
export type WarehouseSelectScalar = {
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WarehouseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "location" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["warehouse"]>;
export type WarehouseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    zones?: boolean | Prisma.Warehouse$zonesArgs<ExtArgs>;
    stocks?: boolean | Prisma.Warehouse$stocksArgs<ExtArgs>;
    entries?: boolean | Prisma.Warehouse$entriesArgs<ExtArgs>;
    exits?: boolean | Prisma.Warehouse$exitsArgs<ExtArgs>;
    fromMovements?: boolean | Prisma.Warehouse$fromMovementsArgs<ExtArgs>;
    toMovements?: boolean | Prisma.Warehouse$toMovementsArgs<ExtArgs>;
    inventories?: boolean | Prisma.Warehouse$inventoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.WarehouseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $WarehousePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Warehouse";
    objects: {
        zones: Prisma.$ZonePayload<ExtArgs>[];
        stocks: Prisma.$StockPayload<ExtArgs>[];
        entries: Prisma.$EntryPayload<ExtArgs>[];
        exits: Prisma.$ExitPayload<ExtArgs>[];
        fromMovements: Prisma.$MovementPayload<ExtArgs>[];
        toMovements: Prisma.$MovementPayload<ExtArgs>[];
        inventories: Prisma.$InventoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        location: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["warehouse"]>;
    composites: {};
};
export type WarehouseGetPayload<S extends boolean | null | undefined | WarehouseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WarehousePayload, S>;
export type WarehouseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WarehouseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WarehouseCountAggregateInputType | true;
};
export interface WarehouseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Warehouse'];
        meta: {
            name: 'Warehouse';
        };
    };
    findUnique<T extends WarehouseFindUniqueArgs>(args: Prisma.SelectSubset<T, WarehouseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WarehouseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WarehouseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WarehouseFindFirstArgs>(args?: Prisma.SelectSubset<T, WarehouseFindFirstArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WarehouseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WarehouseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WarehouseFindManyArgs>(args?: Prisma.SelectSubset<T, WarehouseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WarehouseCreateArgs>(args: Prisma.SelectSubset<T, WarehouseCreateArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WarehouseCreateManyArgs>(args?: Prisma.SelectSubset<T, WarehouseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends WarehouseDeleteArgs>(args: Prisma.SelectSubset<T, WarehouseDeleteArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WarehouseUpdateArgs>(args: Prisma.SelectSubset<T, WarehouseUpdateArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WarehouseDeleteManyArgs>(args?: Prisma.SelectSubset<T, WarehouseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WarehouseUpdateManyArgs>(args: Prisma.SelectSubset<T, WarehouseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends WarehouseUpsertArgs>(args: Prisma.SelectSubset<T, WarehouseUpsertArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WarehouseCountArgs>(args?: Prisma.Subset<T, WarehouseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WarehouseCountAggregateOutputType> : number>;
    aggregate<T extends WarehouseAggregateArgs>(args: Prisma.Subset<T, WarehouseAggregateArgs>): Prisma.PrismaPromise<GetWarehouseAggregateType<T>>;
    groupBy<T extends WarehouseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WarehouseGroupByArgs['orderBy'];
    } : {
        orderBy?: WarehouseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WarehouseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehouseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WarehouseFieldRefs;
}
export interface Prisma__WarehouseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    zones<T extends Prisma.Warehouse$zonesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$zonesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stocks<T extends Prisma.Warehouse$stocksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$stocksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    entries<T extends Prisma.Warehouse$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exits<T extends Prisma.Warehouse$exitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$exitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    fromMovements<T extends Prisma.Warehouse$fromMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$fromMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    toMovements<T extends Prisma.Warehouse$toMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$toMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inventories<T extends Prisma.Warehouse$inventoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Warehouse$inventoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WarehouseFieldRefs {
    readonly id: Prisma.FieldRef<"Warehouse", 'String'>;
    readonly name: Prisma.FieldRef<"Warehouse", 'String'>;
    readonly location: Prisma.FieldRef<"Warehouse", 'String'>;
    readonly isActive: Prisma.FieldRef<"Warehouse", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Warehouse", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Warehouse", 'DateTime'>;
}
export type WarehouseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithRelationInput | Prisma.WarehouseOrderByWithRelationInput[];
    cursor?: Prisma.WarehouseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WarehouseScalarFieldEnum | Prisma.WarehouseScalarFieldEnum[];
};
export type WarehouseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithRelationInput | Prisma.WarehouseOrderByWithRelationInput[];
    cursor?: Prisma.WarehouseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WarehouseScalarFieldEnum | Prisma.WarehouseScalarFieldEnum[];
};
export type WarehouseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithRelationInput | Prisma.WarehouseOrderByWithRelationInput[];
    cursor?: Prisma.WarehouseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WarehouseScalarFieldEnum | Prisma.WarehouseScalarFieldEnum[];
};
export type WarehouseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WarehouseCreateInput, Prisma.WarehouseUncheckedCreateInput>;
};
export type WarehouseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WarehouseCreateManyInput | Prisma.WarehouseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WarehouseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WarehouseUpdateInput, Prisma.WarehouseUncheckedUpdateInput>;
    where: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WarehouseUpdateManyMutationInput, Prisma.WarehouseUncheckedUpdateManyInput>;
    where?: Prisma.WarehouseWhereInput;
    limit?: number;
};
export type WarehouseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where: Prisma.WarehouseWhereUniqueInput;
    create: Prisma.XOR<Prisma.WarehouseCreateInput, Prisma.WarehouseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WarehouseUpdateInput, Prisma.WarehouseUncheckedUpdateInput>;
};
export type WarehouseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where: Prisma.WarehouseWhereUniqueInput;
};
export type WarehouseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WarehouseWhereInput;
    limit?: number;
};
export type Warehouse$zonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Warehouse$stocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Warehouse$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    where?: Prisma.EntryWhereInput;
    orderBy?: Prisma.EntryOrderByWithRelationInput | Prisma.EntryOrderByWithRelationInput[];
    cursor?: Prisma.EntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntryScalarFieldEnum | Prisma.EntryScalarFieldEnum[];
};
export type Warehouse$exitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    where?: Prisma.ExitWhereInput;
    orderBy?: Prisma.ExitOrderByWithRelationInput | Prisma.ExitOrderByWithRelationInput[];
    cursor?: Prisma.ExitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExitScalarFieldEnum | Prisma.ExitScalarFieldEnum[];
};
export type Warehouse$fromMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where?: Prisma.MovementWhereInput;
    orderBy?: Prisma.MovementOrderByWithRelationInput | Prisma.MovementOrderByWithRelationInput[];
    cursor?: Prisma.MovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MovementScalarFieldEnum | Prisma.MovementScalarFieldEnum[];
};
export type Warehouse$toMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where?: Prisma.MovementWhereInput;
    orderBy?: Prisma.MovementOrderByWithRelationInput | Prisma.MovementOrderByWithRelationInput[];
    cursor?: Prisma.MovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MovementScalarFieldEnum | Prisma.MovementScalarFieldEnum[];
};
export type Warehouse$inventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput | Prisma.InventoryOrderByWithRelationInput[];
    cursor?: Prisma.InventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryScalarFieldEnum | Prisma.InventoryScalarFieldEnum[];
};
export type WarehouseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
};
