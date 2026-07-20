import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EntryModel = runtime.Types.Result.DefaultSelection<Prisma.$EntryPayload>;
export type AggregateEntry = {
    _count: EntryCountAggregateOutputType | null;
    _min: EntryMinAggregateOutputType | null;
    _max: EntryMaxAggregateOutputType | null;
};
export type EntryMinAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    supplierId: string | null;
    userId: string | null;
    warehouseId: string | null;
};
export type EntryMaxAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    supplierId: string | null;
    userId: string | null;
    warehouseId: string | null;
};
export type EntryCountAggregateOutputType = {
    id: number;
    reference: number;
    date: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    supplierId: number;
    userId: number;
    warehouseId: number;
    _all: number;
};
export type EntryMinAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    supplierId?: true;
    userId?: true;
    warehouseId?: true;
};
export type EntryMaxAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    supplierId?: true;
    userId?: true;
    warehouseId?: true;
};
export type EntryCountAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    supplierId?: true;
    userId?: true;
    warehouseId?: true;
    _all?: true;
};
export type EntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryWhereInput;
    orderBy?: Prisma.EntryOrderByWithRelationInput | Prisma.EntryOrderByWithRelationInput[];
    cursor?: Prisma.EntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EntryCountAggregateInputType;
    _min?: EntryMinAggregateInputType;
    _max?: EntryMaxAggregateInputType;
};
export type GetEntryAggregateType<T extends EntryAggregateArgs> = {
    [P in keyof T & keyof AggregateEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntry[P]> : Prisma.GetScalarType<T[P], AggregateEntry[P]>;
};
export type EntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryWhereInput;
    orderBy?: Prisma.EntryOrderByWithAggregationInput | Prisma.EntryOrderByWithAggregationInput[];
    by: Prisma.EntryScalarFieldEnum[] | Prisma.EntryScalarFieldEnum;
    having?: Prisma.EntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntryCountAggregateInputType | true;
    _min?: EntryMinAggregateInputType;
    _max?: EntryMaxAggregateInputType;
};
export type EntryGroupByOutputType = {
    id: string;
    reference: string;
    date: Date;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    supplierId: string;
    userId: string;
    warehouseId: string;
    _count: EntryCountAggregateOutputType | null;
    _min: EntryMinAggregateOutputType | null;
    _max: EntryMaxAggregateOutputType | null;
};
export type GetEntryGroupByPayload<T extends EntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntryGroupByOutputType[P]>;
}>>;
export type EntryWhereInput = {
    AND?: Prisma.EntryWhereInput | Prisma.EntryWhereInput[];
    OR?: Prisma.EntryWhereInput[];
    NOT?: Prisma.EntryWhereInput | Prisma.EntryWhereInput[];
    id?: Prisma.StringFilter<"Entry"> | string;
    reference?: Prisma.StringFilter<"Entry"> | string;
    date?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    description?: Prisma.StringNullableFilter<"Entry"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    supplierId?: Prisma.StringFilter<"Entry"> | string;
    userId?: Prisma.StringFilter<"Entry"> | string;
    warehouseId?: Prisma.StringFilter<"Entry"> | string;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lines?: Prisma.EntryLineListRelationFilter;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
};
export type EntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    lines?: Prisma.EntryLineOrderByRelationAggregateInput;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    _relevance?: Prisma.EntryOrderByRelevanceInput;
};
export type EntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reference?: string;
    AND?: Prisma.EntryWhereInput | Prisma.EntryWhereInput[];
    OR?: Prisma.EntryWhereInput[];
    NOT?: Prisma.EntryWhereInput | Prisma.EntryWhereInput[];
    date?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    description?: Prisma.StringNullableFilter<"Entry"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    supplierId?: Prisma.StringFilter<"Entry"> | string;
    userId?: Prisma.StringFilter<"Entry"> | string;
    warehouseId?: Prisma.StringFilter<"Entry"> | string;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lines?: Prisma.EntryLineListRelationFilter;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
}, "id" | "reference">;
export type EntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    _count?: Prisma.EntryCountOrderByAggregateInput;
    _max?: Prisma.EntryMaxOrderByAggregateInput;
    _min?: Prisma.EntryMinOrderByAggregateInput;
};
export type EntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntryScalarWhereWithAggregatesInput | Prisma.EntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntryScalarWhereWithAggregatesInput | Prisma.EntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Entry"> | string;
    reference?: Prisma.StringWithAggregatesFilter<"Entry"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Entry"> | Date | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Entry"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Entry"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Entry"> | Date | string;
    supplierId?: Prisma.StringWithAggregatesFilter<"Entry"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Entry"> | string;
    warehouseId?: Prisma.StringWithAggregatesFilter<"Entry"> | string;
};
export type EntryCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier: Prisma.SupplierCreateNestedOneWithoutEntriesInput;
    user: Prisma.UserCreateNestedOneWithoutEntriesInput;
    lines?: Prisma.EntryLineCreateNestedManyWithoutEntryInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutEntriesInput;
};
export type EntryUncheckedCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    userId: string;
    warehouseId: string;
    lines?: Prisma.EntryLineUncheckedCreateNestedManyWithoutEntryInput;
};
export type EntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEntriesNestedInput;
    lines?: Prisma.EntryLineUpdateManyWithoutEntryNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.EntryLineUncheckedUpdateManyWithoutEntryNestedInput;
};
export type EntryCreateManyInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    userId: string;
    warehouseId: string;
};
export type EntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryListRelationFilter = {
    every?: Prisma.EntryWhereInput;
    some?: Prisma.EntryWhereInput;
    none?: Prisma.EntryWhereInput;
};
export type EntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EntryOrderByRelevanceInput = {
    fields: Prisma.EntryOrderByRelevanceFieldEnum | Prisma.EntryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type EntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type EntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type EntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type EntryScalarRelationFilter = {
    is?: Prisma.EntryWhereInput;
    isNot?: Prisma.EntryWhereInput;
};
export type EntryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput> | Prisma.EntryCreateWithoutUserInput[] | Prisma.EntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutUserInput | Prisma.EntryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EntryCreateManyUserInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput> | Prisma.EntryCreateWithoutUserInput[] | Prisma.EntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutUserInput | Prisma.EntryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EntryCreateManyUserInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput> | Prisma.EntryCreateWithoutUserInput[] | Prisma.EntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutUserInput | Prisma.EntryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutUserInput | Prisma.EntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EntryCreateManyUserInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutUserInput | Prisma.EntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutUserInput | Prisma.EntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput> | Prisma.EntryCreateWithoutUserInput[] | Prisma.EntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutUserInput | Prisma.EntryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutUserInput | Prisma.EntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EntryCreateManyUserInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutUserInput | Prisma.EntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutUserInput | Prisma.EntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput> | Prisma.EntryCreateWithoutWarehouseInput[] | Prisma.EntryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutWarehouseInput | Prisma.EntryCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.EntryCreateManyWarehouseInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput> | Prisma.EntryCreateWithoutWarehouseInput[] | Prisma.EntryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutWarehouseInput | Prisma.EntryCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.EntryCreateManyWarehouseInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput> | Prisma.EntryCreateWithoutWarehouseInput[] | Prisma.EntryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutWarehouseInput | Prisma.EntryCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.EntryUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.EntryCreateManyWarehouseInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.EntryUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutWarehouseInput | Prisma.EntryUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput> | Prisma.EntryCreateWithoutWarehouseInput[] | Prisma.EntryUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutWarehouseInput | Prisma.EntryCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.EntryUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.EntryCreateManyWarehouseInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.EntryUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutWarehouseInput | Prisma.EntryUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput> | Prisma.EntryCreateWithoutSupplierInput[] | Prisma.EntryUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutSupplierInput | Prisma.EntryCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.EntryCreateManySupplierInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput> | Prisma.EntryCreateWithoutSupplierInput[] | Prisma.EntryUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutSupplierInput | Prisma.EntryCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.EntryCreateManySupplierInputEnvelope;
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
};
export type EntryUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput> | Prisma.EntryCreateWithoutSupplierInput[] | Prisma.EntryUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutSupplierInput | Prisma.EntryCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutSupplierInput | Prisma.EntryUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.EntryCreateManySupplierInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutSupplierInput | Prisma.EntryUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutSupplierInput | Prisma.EntryUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput> | Prisma.EntryCreateWithoutSupplierInput[] | Prisma.EntryUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutSupplierInput | Prisma.EntryCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.EntryUpsertWithWhereUniqueWithoutSupplierInput | Prisma.EntryUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.EntryCreateManySupplierInputEnvelope;
    set?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    disconnect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    delete?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    connect?: Prisma.EntryWhereUniqueInput | Prisma.EntryWhereUniqueInput[];
    update?: Prisma.EntryUpdateWithWhereUniqueWithoutSupplierInput | Prisma.EntryUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.EntryUpdateManyWithWhereWithoutSupplierInput | Prisma.EntryUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
};
export type EntryCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutLinesInput, Prisma.EntryUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutLinesInput;
    connect?: Prisma.EntryWhereUniqueInput;
};
export type EntryUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.EntryCreateWithoutLinesInput, Prisma.EntryUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.EntryCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.EntryUpsertWithoutLinesInput;
    connect?: Prisma.EntryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntryUpdateToOneWithWhereWithoutLinesInput, Prisma.EntryUpdateWithoutLinesInput>, Prisma.EntryUncheckedUpdateWithoutLinesInput>;
};
export type EntryCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier: Prisma.SupplierCreateNestedOneWithoutEntriesInput;
    lines?: Prisma.EntryLineCreateNestedManyWithoutEntryInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutEntriesInput;
};
export type EntryUncheckedCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    warehouseId: string;
    lines?: Prisma.EntryLineUncheckedCreateNestedManyWithoutEntryInput;
};
export type EntryCreateOrConnectWithoutUserInput = {
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput>;
};
export type EntryCreateManyUserInputEnvelope = {
    data: Prisma.EntryCreateManyUserInput | Prisma.EntryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EntryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntryUpdateWithoutUserInput, Prisma.EntryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EntryCreateWithoutUserInput, Prisma.EntryUncheckedCreateWithoutUserInput>;
};
export type EntryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntryUpdateWithoutUserInput, Prisma.EntryUncheckedUpdateWithoutUserInput>;
};
export type EntryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EntryScalarWhereInput;
    data: Prisma.XOR<Prisma.EntryUpdateManyMutationInput, Prisma.EntryUncheckedUpdateManyWithoutUserInput>;
};
export type EntryScalarWhereInput = {
    AND?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
    OR?: Prisma.EntryScalarWhereInput[];
    NOT?: Prisma.EntryScalarWhereInput | Prisma.EntryScalarWhereInput[];
    id?: Prisma.StringFilter<"Entry"> | string;
    reference?: Prisma.StringFilter<"Entry"> | string;
    date?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    description?: Prisma.StringNullableFilter<"Entry"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entry"> | Date | string;
    supplierId?: Prisma.StringFilter<"Entry"> | string;
    userId?: Prisma.StringFilter<"Entry"> | string;
    warehouseId?: Prisma.StringFilter<"Entry"> | string;
};
export type EntryCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier: Prisma.SupplierCreateNestedOneWithoutEntriesInput;
    user: Prisma.UserCreateNestedOneWithoutEntriesInput;
    lines?: Prisma.EntryLineCreateNestedManyWithoutEntryInput;
};
export type EntryUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    userId: string;
    lines?: Prisma.EntryLineUncheckedCreateNestedManyWithoutEntryInput;
};
export type EntryCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput>;
};
export type EntryCreateManyWarehouseInputEnvelope = {
    data: Prisma.EntryCreateManyWarehouseInput | Prisma.EntryCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type EntryUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.EntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntryUpdateWithoutWarehouseInput, Prisma.EntryUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.EntryCreateWithoutWarehouseInput, Prisma.EntryUncheckedCreateWithoutWarehouseInput>;
};
export type EntryUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.EntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntryUpdateWithoutWarehouseInput, Prisma.EntryUncheckedUpdateWithoutWarehouseInput>;
};
export type EntryUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.EntryScalarWhereInput;
    data: Prisma.XOR<Prisma.EntryUpdateManyMutationInput, Prisma.EntryUncheckedUpdateManyWithoutWarehouseInput>;
};
export type EntryCreateWithoutSupplierInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutEntriesInput;
    lines?: Prisma.EntryLineCreateNestedManyWithoutEntryInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutEntriesInput;
};
export type EntryUncheckedCreateWithoutSupplierInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
    lines?: Prisma.EntryLineUncheckedCreateNestedManyWithoutEntryInput;
};
export type EntryCreateOrConnectWithoutSupplierInput = {
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput>;
};
export type EntryCreateManySupplierInputEnvelope = {
    data: Prisma.EntryCreateManySupplierInput | Prisma.EntryCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type EntryUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.EntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntryUpdateWithoutSupplierInput, Prisma.EntryUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.EntryCreateWithoutSupplierInput, Prisma.EntryUncheckedCreateWithoutSupplierInput>;
};
export type EntryUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.EntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntryUpdateWithoutSupplierInput, Prisma.EntryUncheckedUpdateWithoutSupplierInput>;
};
export type EntryUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.EntryScalarWhereInput;
    data: Prisma.XOR<Prisma.EntryUpdateManyMutationInput, Prisma.EntryUncheckedUpdateManyWithoutSupplierInput>;
};
export type EntryCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier: Prisma.SupplierCreateNestedOneWithoutEntriesInput;
    user: Prisma.UserCreateNestedOneWithoutEntriesInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutEntriesInput;
};
export type EntryUncheckedCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    userId: string;
    warehouseId: string;
};
export type EntryCreateOrConnectWithoutLinesInput = {
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryCreateWithoutLinesInput, Prisma.EntryUncheckedCreateWithoutLinesInput>;
};
export type EntryUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.EntryUpdateWithoutLinesInput, Prisma.EntryUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.EntryCreateWithoutLinesInput, Prisma.EntryUncheckedCreateWithoutLinesInput>;
    where?: Prisma.EntryWhereInput;
};
export type EntryUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.EntryWhereInput;
    data: Prisma.XOR<Prisma.EntryUpdateWithoutLinesInput, Prisma.EntryUncheckedUpdateWithoutLinesInput>;
};
export type EntryUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEntriesNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryCreateManyUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    warehouseId: string;
};
export type EntryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutEntriesNestedInput;
    lines?: Prisma.EntryLineUpdateManyWithoutEntryNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.EntryLineUncheckedUpdateManyWithoutEntryNestedInput;
};
export type EntryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryCreateManyWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplierId: string;
    userId: string;
};
export type EntryUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEntriesNestedInput;
    lines?: Prisma.EntryLineUpdateManyWithoutEntryNestedInput;
};
export type EntryUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.EntryLineUncheckedUpdateManyWithoutEntryNestedInput;
};
export type EntryUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryCreateManySupplierInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
};
export type EntryUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutEntriesNestedInput;
    lines?: Prisma.EntryLineUpdateManyWithoutEntryNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryUncheckedUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.EntryLineUncheckedUpdateManyWithoutEntryNestedInput;
};
export type EntryUncheckedUpdateManyWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryCountOutputType = {
    lines: number;
};
export type EntryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | EntryCountOutputTypeCountLinesArgs;
};
export type EntryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryCountOutputTypeSelect<ExtArgs> | null;
};
export type EntryCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryLineWhereInput;
};
export type EntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    supplierId?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Entry$linesArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.EntryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entry"]>;
export type EntrySelectScalar = {
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    supplierId?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
};
export type EntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reference" | "date" | "description" | "createdAt" | "updatedAt" | "supplierId" | "userId" | "warehouseId", ExtArgs["result"]["entry"]>;
export type EntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Entry$linesArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.EntryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $EntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Entry";
    objects: {
        supplier: Prisma.$SupplierPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        lines: Prisma.$EntryLinePayload<ExtArgs>[];
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reference: string;
        date: Date;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        userId: string;
        warehouseId: string;
    }, ExtArgs["result"]["entry"]>;
    composites: {};
};
export type EntryGetPayload<S extends boolean | null | undefined | EntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntryPayload, S>;
export type EntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntryCountAggregateInputType | true;
};
export interface EntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Entry'];
        meta: {
            name: 'Entry';
        };
    };
    findUnique<T extends EntryFindUniqueArgs>(args: Prisma.SelectSubset<T, EntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EntryFindFirstArgs>(args?: Prisma.SelectSubset<T, EntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EntryFindManyArgs>(args?: Prisma.SelectSubset<T, EntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EntryCreateArgs>(args: Prisma.SelectSubset<T, EntryCreateArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EntryCreateManyArgs>(args?: Prisma.SelectSubset<T, EntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends EntryDeleteArgs>(args: Prisma.SelectSubset<T, EntryDeleteArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EntryUpdateArgs>(args: Prisma.SelectSubset<T, EntryUpdateArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EntryUpdateManyArgs>(args: Prisma.SelectSubset<T, EntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends EntryUpsertArgs>(args: Prisma.SelectSubset<T, EntryUpsertArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EntryCountArgs>(args?: Prisma.Subset<T, EntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntryCountAggregateOutputType> : number>;
    aggregate<T extends EntryAggregateArgs>(args: Prisma.Subset<T, EntryAggregateArgs>): Prisma.PrismaPromise<GetEntryAggregateType<T>>;
    groupBy<T extends EntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntryGroupByArgs['orderBy'];
    } : {
        orderBy?: EntryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EntryFieldRefs;
}
export interface Prisma__EntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    supplier<T extends Prisma.SupplierDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SupplierDefaultArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Entry$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entry$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EntryFieldRefs {
    readonly id: Prisma.FieldRef<"Entry", 'String'>;
    readonly reference: Prisma.FieldRef<"Entry", 'String'>;
    readonly date: Prisma.FieldRef<"Entry", 'DateTime'>;
    readonly description: Prisma.FieldRef<"Entry", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Entry", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Entry", 'DateTime'>;
    readonly supplierId: Prisma.FieldRef<"Entry", 'String'>;
    readonly userId: Prisma.FieldRef<"Entry", 'String'>;
    readonly warehouseId: Prisma.FieldRef<"Entry", 'String'>;
}
export type EntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    where: Prisma.EntryWhereUniqueInput;
};
export type EntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    where: Prisma.EntryWhereUniqueInput;
};
export type EntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntryCreateInput, Prisma.EntryUncheckedCreateInput>;
};
export type EntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EntryCreateManyInput | Prisma.EntryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntryUpdateInput, Prisma.EntryUncheckedUpdateInput>;
    where: Prisma.EntryWhereUniqueInput;
};
export type EntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EntryUpdateManyMutationInput, Prisma.EntryUncheckedUpdateManyInput>;
    where?: Prisma.EntryWhereInput;
    limit?: number;
};
export type EntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryCreateInput, Prisma.EntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EntryUpdateInput, Prisma.EntryUncheckedUpdateInput>;
};
export type EntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
    where: Prisma.EntryWhereUniqueInput;
};
export type EntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryWhereInput;
    limit?: number;
};
export type Entry$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    where?: Prisma.EntryLineWhereInput;
    orderBy?: Prisma.EntryLineOrderByWithRelationInput | Prisma.EntryLineOrderByWithRelationInput[];
    cursor?: Prisma.EntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntryLineScalarFieldEnum | Prisma.EntryLineScalarFieldEnum[];
};
export type EntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntrySelect<ExtArgs> | null;
    omit?: Prisma.EntryOmit<ExtArgs> | null;
    include?: Prisma.EntryInclude<ExtArgs> | null;
};
