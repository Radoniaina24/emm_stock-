import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InventoryModel = runtime.Types.Result.DefaultSelection<Prisma.$InventoryPayload>;
export type AggregateInventory = {
    _count: InventoryCountAggregateOutputType | null;
    _min: InventoryMinAggregateOutputType | null;
    _max: InventoryMaxAggregateOutputType | null;
};
export type InventoryMinAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    status: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    warehouseId: string | null;
};
export type InventoryMaxAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    status: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    warehouseId: string | null;
};
export type InventoryCountAggregateOutputType = {
    id: number;
    reference: number;
    date: number;
    status: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    warehouseId: number;
    _all: number;
};
export type InventoryMinAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    status?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
};
export type InventoryMaxAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    status?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
};
export type InventoryCountAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    status?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
    _all?: true;
};
export type InventoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput | Prisma.InventoryOrderByWithRelationInput[];
    cursor?: Prisma.InventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InventoryCountAggregateInputType;
    _min?: InventoryMinAggregateInputType;
    _max?: InventoryMaxAggregateInputType;
};
export type GetInventoryAggregateType<T extends InventoryAggregateArgs> = {
    [P in keyof T & keyof AggregateInventory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInventory[P]> : Prisma.GetScalarType<T[P], AggregateInventory[P]>;
};
export type InventoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithAggregationInput | Prisma.InventoryOrderByWithAggregationInput[];
    by: Prisma.InventoryScalarFieldEnum[] | Prisma.InventoryScalarFieldEnum;
    having?: Prisma.InventoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InventoryCountAggregateInputType | true;
    _min?: InventoryMinAggregateInputType;
    _max?: InventoryMaxAggregateInputType;
};
export type InventoryGroupByOutputType = {
    id: string;
    reference: string;
    date: Date;
    status: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    warehouseId: string;
    _count: InventoryCountAggregateOutputType | null;
    _min: InventoryMinAggregateOutputType | null;
    _max: InventoryMaxAggregateOutputType | null;
};
export type GetInventoryGroupByPayload<T extends InventoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InventoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InventoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InventoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InventoryGroupByOutputType[P]>;
}>>;
export type InventoryWhereInput = {
    AND?: Prisma.InventoryWhereInput | Prisma.InventoryWhereInput[];
    OR?: Prisma.InventoryWhereInput[];
    NOT?: Prisma.InventoryWhereInput | Prisma.InventoryWhereInput[];
    id?: Prisma.StringFilter<"Inventory"> | string;
    reference?: Prisma.StringFilter<"Inventory"> | string;
    date?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    status?: Prisma.StringFilter<"Inventory"> | string;
    description?: Prisma.StringNullableFilter<"Inventory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    userId?: Prisma.StringFilter<"Inventory"> | string;
    warehouseId?: Prisma.StringFilter<"Inventory"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    lines?: Prisma.InventoryLineListRelationFilter;
};
export type InventoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    lines?: Prisma.InventoryLineOrderByRelationAggregateInput;
    _relevance?: Prisma.InventoryOrderByRelevanceInput;
};
export type InventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reference?: string;
    AND?: Prisma.InventoryWhereInput | Prisma.InventoryWhereInput[];
    OR?: Prisma.InventoryWhereInput[];
    NOT?: Prisma.InventoryWhereInput | Prisma.InventoryWhereInput[];
    date?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    status?: Prisma.StringFilter<"Inventory"> | string;
    description?: Prisma.StringNullableFilter<"Inventory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    userId?: Prisma.StringFilter<"Inventory"> | string;
    warehouseId?: Prisma.StringFilter<"Inventory"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    lines?: Prisma.InventoryLineListRelationFilter;
}, "id" | "reference">;
export type InventoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    _count?: Prisma.InventoryCountOrderByAggregateInput;
    _max?: Prisma.InventoryMaxOrderByAggregateInput;
    _min?: Prisma.InventoryMinOrderByAggregateInput;
};
export type InventoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.InventoryScalarWhereWithAggregatesInput | Prisma.InventoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.InventoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InventoryScalarWhereWithAggregatesInput | Prisma.InventoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Inventory"> | string;
    reference?: Prisma.StringWithAggregatesFilter<"Inventory"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Inventory"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"Inventory"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Inventory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Inventory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Inventory"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"Inventory"> | string;
    warehouseId?: Prisma.StringWithAggregatesFilter<"Inventory"> | string;
};
export type InventoryCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInventoriesInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutInventoriesInput;
    lines?: Prisma.InventoryLineCreateNestedManyWithoutInventoryInput;
};
export type InventoryUncheckedCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
    lines?: Prisma.InventoryLineUncheckedCreateNestedManyWithoutInventoryInput;
};
export type InventoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInventoriesNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutInventoriesNestedInput;
    lines?: Prisma.InventoryLineUpdateManyWithoutInventoryNestedInput;
};
export type InventoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.InventoryLineUncheckedUpdateManyWithoutInventoryNestedInput;
};
export type InventoryCreateManyInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
};
export type InventoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryListRelationFilter = {
    every?: Prisma.InventoryWhereInput;
    some?: Prisma.InventoryWhereInput;
    none?: Prisma.InventoryWhereInput;
};
export type InventoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InventoryOrderByRelevanceInput = {
    fields: Prisma.InventoryOrderByRelevanceFieldEnum | Prisma.InventoryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type InventoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type InventoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type InventoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type InventoryScalarRelationFilter = {
    is?: Prisma.InventoryWhereInput;
    isNot?: Prisma.InventoryWhereInput;
};
export type InventoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput> | Prisma.InventoryCreateWithoutUserInput[] | Prisma.InventoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutUserInput | Prisma.InventoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InventoryCreateManyUserInputEnvelope;
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
};
export type InventoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput> | Prisma.InventoryCreateWithoutUserInput[] | Prisma.InventoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutUserInput | Prisma.InventoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InventoryCreateManyUserInputEnvelope;
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
};
export type InventoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput> | Prisma.InventoryCreateWithoutUserInput[] | Prisma.InventoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutUserInput | Prisma.InventoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InventoryUpsertWithWhereUniqueWithoutUserInput | Prisma.InventoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InventoryCreateManyUserInputEnvelope;
    set?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    disconnect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    delete?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    update?: Prisma.InventoryUpdateWithWhereUniqueWithoutUserInput | Prisma.InventoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InventoryUpdateManyWithWhereWithoutUserInput | Prisma.InventoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
};
export type InventoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput> | Prisma.InventoryCreateWithoutUserInput[] | Prisma.InventoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutUserInput | Prisma.InventoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InventoryUpsertWithWhereUniqueWithoutUserInput | Prisma.InventoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InventoryCreateManyUserInputEnvelope;
    set?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    disconnect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    delete?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    update?: Prisma.InventoryUpdateWithWhereUniqueWithoutUserInput | Prisma.InventoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InventoryUpdateManyWithWhereWithoutUserInput | Prisma.InventoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
};
export type InventoryCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput> | Prisma.InventoryCreateWithoutWarehouseInput[] | Prisma.InventoryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutWarehouseInput | Prisma.InventoryCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.InventoryCreateManyWarehouseInputEnvelope;
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
};
export type InventoryUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput> | Prisma.InventoryCreateWithoutWarehouseInput[] | Prisma.InventoryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutWarehouseInput | Prisma.InventoryCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.InventoryCreateManyWarehouseInputEnvelope;
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
};
export type InventoryUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput> | Prisma.InventoryCreateWithoutWarehouseInput[] | Prisma.InventoryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutWarehouseInput | Prisma.InventoryCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.InventoryUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.InventoryUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.InventoryCreateManyWarehouseInputEnvelope;
    set?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    disconnect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    delete?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    update?: Prisma.InventoryUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.InventoryUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.InventoryUpdateManyWithWhereWithoutWarehouseInput | Prisma.InventoryUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
};
export type InventoryUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput> | Prisma.InventoryCreateWithoutWarehouseInput[] | Prisma.InventoryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutWarehouseInput | Prisma.InventoryCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.InventoryUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.InventoryUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.InventoryCreateManyWarehouseInputEnvelope;
    set?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    disconnect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    delete?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    connect?: Prisma.InventoryWhereUniqueInput | Prisma.InventoryWhereUniqueInput[];
    update?: Prisma.InventoryUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.InventoryUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.InventoryUpdateManyWithWhereWithoutWarehouseInput | Prisma.InventoryUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
};
export type InventoryCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutLinesInput, Prisma.InventoryUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutLinesInput;
    connect?: Prisma.InventoryWhereUniqueInput;
};
export type InventoryUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryCreateWithoutLinesInput, Prisma.InventoryUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.InventoryCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.InventoryUpsertWithoutLinesInput;
    connect?: Prisma.InventoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryUpdateToOneWithWhereWithoutLinesInput, Prisma.InventoryUpdateWithoutLinesInput>, Prisma.InventoryUncheckedUpdateWithoutLinesInput>;
};
export type InventoryCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutInventoriesInput;
    lines?: Prisma.InventoryLineCreateNestedManyWithoutInventoryInput;
};
export type InventoryUncheckedCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
    lines?: Prisma.InventoryLineUncheckedCreateNestedManyWithoutInventoryInput;
};
export type InventoryCreateOrConnectWithoutUserInput = {
    where: Prisma.InventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput>;
};
export type InventoryCreateManyUserInputEnvelope = {
    data: Prisma.InventoryCreateManyUserInput | Prisma.InventoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type InventoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.InventoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.InventoryUpdateWithoutUserInput, Prisma.InventoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutUserInput, Prisma.InventoryUncheckedCreateWithoutUserInput>;
};
export type InventoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.InventoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.InventoryUpdateWithoutUserInput, Prisma.InventoryUncheckedUpdateWithoutUserInput>;
};
export type InventoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.InventoryScalarWhereInput;
    data: Prisma.XOR<Prisma.InventoryUpdateManyMutationInput, Prisma.InventoryUncheckedUpdateManyWithoutUserInput>;
};
export type InventoryScalarWhereInput = {
    AND?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
    OR?: Prisma.InventoryScalarWhereInput[];
    NOT?: Prisma.InventoryScalarWhereInput | Prisma.InventoryScalarWhereInput[];
    id?: Prisma.StringFilter<"Inventory"> | string;
    reference?: Prisma.StringFilter<"Inventory"> | string;
    date?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    status?: Prisma.StringFilter<"Inventory"> | string;
    description?: Prisma.StringNullableFilter<"Inventory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Inventory"> | Date | string;
    userId?: Prisma.StringFilter<"Inventory"> | string;
    warehouseId?: Prisma.StringFilter<"Inventory"> | string;
};
export type InventoryCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInventoriesInput;
    lines?: Prisma.InventoryLineCreateNestedManyWithoutInventoryInput;
};
export type InventoryUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    lines?: Prisma.InventoryLineUncheckedCreateNestedManyWithoutInventoryInput;
};
export type InventoryCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.InventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput>;
};
export type InventoryCreateManyWarehouseInputEnvelope = {
    data: Prisma.InventoryCreateManyWarehouseInput | Prisma.InventoryCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type InventoryUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.InventoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.InventoryUpdateWithoutWarehouseInput, Prisma.InventoryUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutWarehouseInput, Prisma.InventoryUncheckedCreateWithoutWarehouseInput>;
};
export type InventoryUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.InventoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.InventoryUpdateWithoutWarehouseInput, Prisma.InventoryUncheckedUpdateWithoutWarehouseInput>;
};
export type InventoryUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.InventoryScalarWhereInput;
    data: Prisma.XOR<Prisma.InventoryUpdateManyMutationInput, Prisma.InventoryUncheckedUpdateManyWithoutWarehouseInput>;
};
export type InventoryCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInventoriesInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutInventoriesInput;
};
export type InventoryUncheckedCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
};
export type InventoryCreateOrConnectWithoutLinesInput = {
    where: Prisma.InventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutLinesInput, Prisma.InventoryUncheckedCreateWithoutLinesInput>;
};
export type InventoryUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.InventoryUpdateWithoutLinesInput, Prisma.InventoryUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.InventoryCreateWithoutLinesInput, Prisma.InventoryUncheckedCreateWithoutLinesInput>;
    where?: Prisma.InventoryWhereInput;
};
export type InventoryUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.InventoryWhereInput;
    data: Prisma.XOR<Prisma.InventoryUpdateWithoutLinesInput, Prisma.InventoryUncheckedUpdateWithoutLinesInput>;
};
export type InventoryUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInventoriesNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutInventoriesNestedInput;
};
export type InventoryUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryCreateManyUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
};
export type InventoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutInventoriesNestedInput;
    lines?: Prisma.InventoryLineUpdateManyWithoutInventoryNestedInput;
};
export type InventoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.InventoryLineUncheckedUpdateManyWithoutInventoryNestedInput;
};
export type InventoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryCreateManyWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    status?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type InventoryUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInventoriesNestedInput;
    lines?: Prisma.InventoryLineUpdateManyWithoutInventoryNestedInput;
};
export type InventoryUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.InventoryLineUncheckedUpdateManyWithoutInventoryNestedInput;
};
export type InventoryUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryCountOutputType = {
    lines: number;
};
export type InventoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | InventoryCountOutputTypeCountLinesArgs;
};
export type InventoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryCountOutputTypeSelect<ExtArgs> | null;
};
export type InventoryCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryLineWhereInput;
};
export type InventorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    status?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Inventory$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.InventoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventory"]>;
export type InventorySelectScalar = {
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    status?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
};
export type InventoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reference" | "date" | "status" | "description" | "createdAt" | "updatedAt" | "userId" | "warehouseId", ExtArgs["result"]["inventory"]>;
export type InventoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Inventory$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.InventoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $InventoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Inventory";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
        lines: Prisma.$InventoryLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reference: string;
        date: Date;
        status: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        warehouseId: string;
    }, ExtArgs["result"]["inventory"]>;
    composites: {};
};
export type InventoryGetPayload<S extends boolean | null | undefined | InventoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InventoryPayload, S>;
export type InventoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InventoryCountAggregateInputType | true;
};
export interface InventoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Inventory'];
        meta: {
            name: 'Inventory';
        };
    };
    findUnique<T extends InventoryFindUniqueArgs>(args: Prisma.SelectSubset<T, InventoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InventoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InventoryFindFirstArgs>(args?: Prisma.SelectSubset<T, InventoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InventoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InventoryFindManyArgs>(args?: Prisma.SelectSubset<T, InventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InventoryCreateArgs>(args: Prisma.SelectSubset<T, InventoryCreateArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InventoryCreateManyArgs>(args?: Prisma.SelectSubset<T, InventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends InventoryDeleteArgs>(args: Prisma.SelectSubset<T, InventoryDeleteArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InventoryUpdateArgs>(args: Prisma.SelectSubset<T, InventoryUpdateArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InventoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, InventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InventoryUpdateManyArgs>(args: Prisma.SelectSubset<T, InventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends InventoryUpsertArgs>(args: Prisma.SelectSubset<T, InventoryUpsertArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InventoryCountArgs>(args?: Prisma.Subset<T, InventoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InventoryCountAggregateOutputType> : number>;
    aggregate<T extends InventoryAggregateArgs>(args: Prisma.Subset<T, InventoryAggregateArgs>): Prisma.PrismaPromise<GetInventoryAggregateType<T>>;
    groupBy<T extends InventoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InventoryGroupByArgs['orderBy'];
    } : {
        orderBy?: InventoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InventoryFieldRefs;
}
export interface Prisma__InventoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Inventory$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Inventory$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InventoryFieldRefs {
    readonly id: Prisma.FieldRef<"Inventory", 'String'>;
    readonly reference: Prisma.FieldRef<"Inventory", 'String'>;
    readonly date: Prisma.FieldRef<"Inventory", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Inventory", 'String'>;
    readonly description: Prisma.FieldRef<"Inventory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Inventory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Inventory", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Inventory", 'String'>;
    readonly warehouseId: Prisma.FieldRef<"Inventory", 'String'>;
}
export type InventoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where: Prisma.InventoryWhereUniqueInput;
};
export type InventoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where: Prisma.InventoryWhereUniqueInput;
};
export type InventoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InventoryCreateInput, Prisma.InventoryUncheckedCreateInput>;
};
export type InventoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InventoryCreateManyInput | Prisma.InventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InventoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InventoryUpdateInput, Prisma.InventoryUncheckedUpdateInput>;
    where: Prisma.InventoryWhereUniqueInput;
};
export type InventoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InventoryUpdateManyMutationInput, Prisma.InventoryUncheckedUpdateManyInput>;
    where?: Prisma.InventoryWhereInput;
    limit?: number;
};
export type InventoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where: Prisma.InventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryCreateInput, Prisma.InventoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InventoryUpdateInput, Prisma.InventoryUncheckedUpdateInput>;
};
export type InventoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where: Prisma.InventoryWhereUniqueInput;
};
export type InventoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
    limit?: number;
};
export type Inventory$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    where?: Prisma.InventoryLineWhereInput;
    orderBy?: Prisma.InventoryLineOrderByWithRelationInput | Prisma.InventoryLineOrderByWithRelationInput[];
    cursor?: Prisma.InventoryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryLineScalarFieldEnum | Prisma.InventoryLineScalarFieldEnum[];
};
export type InventoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventorySelect<ExtArgs> | null;
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    include?: Prisma.InventoryInclude<ExtArgs> | null;
};
