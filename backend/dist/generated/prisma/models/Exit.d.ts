import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExitModel = runtime.Types.Result.DefaultSelection<Prisma.$ExitPayload>;
export type AggregateExit = {
    _count: ExitCountAggregateOutputType | null;
    _min: ExitMinAggregateOutputType | null;
    _max: ExitMaxAggregateOutputType | null;
};
export type ExitMinAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    type: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    warehouseId: string | null;
};
export type ExitMaxAggregateOutputType = {
    id: string | null;
    reference: string | null;
    date: Date | null;
    type: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    warehouseId: string | null;
};
export type ExitCountAggregateOutputType = {
    id: number;
    reference: number;
    date: number;
    type: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    warehouseId: number;
    _all: number;
};
export type ExitMinAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    type?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
};
export type ExitMaxAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    type?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
};
export type ExitCountAggregateInputType = {
    id?: true;
    reference?: true;
    date?: true;
    type?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    warehouseId?: true;
    _all?: true;
};
export type ExitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitWhereInput;
    orderBy?: Prisma.ExitOrderByWithRelationInput | Prisma.ExitOrderByWithRelationInput[];
    cursor?: Prisma.ExitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExitCountAggregateInputType;
    _min?: ExitMinAggregateInputType;
    _max?: ExitMaxAggregateInputType;
};
export type GetExitAggregateType<T extends ExitAggregateArgs> = {
    [P in keyof T & keyof AggregateExit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExit[P]> : Prisma.GetScalarType<T[P], AggregateExit[P]>;
};
export type ExitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitWhereInput;
    orderBy?: Prisma.ExitOrderByWithAggregationInput | Prisma.ExitOrderByWithAggregationInput[];
    by: Prisma.ExitScalarFieldEnum[] | Prisma.ExitScalarFieldEnum;
    having?: Prisma.ExitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExitCountAggregateInputType | true;
    _min?: ExitMinAggregateInputType;
    _max?: ExitMaxAggregateInputType;
};
export type ExitGroupByOutputType = {
    id: string;
    reference: string;
    date: Date;
    type: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    warehouseId: string;
    _count: ExitCountAggregateOutputType | null;
    _min: ExitMinAggregateOutputType | null;
    _max: ExitMaxAggregateOutputType | null;
};
export type GetExitGroupByPayload<T extends ExitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExitGroupByOutputType[P]>;
}>>;
export type ExitWhereInput = {
    AND?: Prisma.ExitWhereInput | Prisma.ExitWhereInput[];
    OR?: Prisma.ExitWhereInput[];
    NOT?: Prisma.ExitWhereInput | Prisma.ExitWhereInput[];
    id?: Prisma.StringFilter<"Exit"> | string;
    reference?: Prisma.StringFilter<"Exit"> | string;
    date?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    type?: Prisma.StringFilter<"Exit"> | string;
    description?: Prisma.StringNullableFilter<"Exit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    userId?: Prisma.StringFilter<"Exit"> | string;
    warehouseId?: Prisma.StringFilter<"Exit"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    lines?: Prisma.ExitLineListRelationFilter;
};
export type ExitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    lines?: Prisma.ExitLineOrderByRelationAggregateInput;
    _relevance?: Prisma.ExitOrderByRelevanceInput;
};
export type ExitWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reference?: string;
    AND?: Prisma.ExitWhereInput | Prisma.ExitWhereInput[];
    OR?: Prisma.ExitWhereInput[];
    NOT?: Prisma.ExitWhereInput | Prisma.ExitWhereInput[];
    date?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    type?: Prisma.StringFilter<"Exit"> | string;
    description?: Prisma.StringNullableFilter<"Exit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    userId?: Prisma.StringFilter<"Exit"> | string;
    warehouseId?: Prisma.StringFilter<"Exit"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    lines?: Prisma.ExitLineListRelationFilter;
}, "id" | "reference">;
export type ExitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    _count?: Prisma.ExitCountOrderByAggregateInput;
    _max?: Prisma.ExitMaxOrderByAggregateInput;
    _min?: Prisma.ExitMinOrderByAggregateInput;
};
export type ExitScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExitScalarWhereWithAggregatesInput | Prisma.ExitScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExitScalarWhereWithAggregatesInput | Prisma.ExitScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Exit"> | string;
    reference?: Prisma.StringWithAggregatesFilter<"Exit"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Exit"> | Date | string;
    type?: Prisma.StringWithAggregatesFilter<"Exit"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Exit"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Exit"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Exit"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"Exit"> | string;
    warehouseId?: Prisma.StringWithAggregatesFilter<"Exit"> | string;
};
export type ExitCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExitsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutExitsInput;
    lines?: Prisma.ExitLineCreateNestedManyWithoutExitInput;
};
export type ExitUncheckedCreateInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
    lines?: Prisma.ExitLineUncheckedCreateNestedManyWithoutExitInput;
};
export type ExitUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExitsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutExitsNestedInput;
    lines?: Prisma.ExitLineUpdateManyWithoutExitNestedInput;
};
export type ExitUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.ExitLineUncheckedUpdateManyWithoutExitNestedInput;
};
export type ExitCreateManyInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
};
export type ExitUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExitUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitListRelationFilter = {
    every?: Prisma.ExitWhereInput;
    some?: Prisma.ExitWhereInput;
    none?: Prisma.ExitWhereInput;
};
export type ExitOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExitOrderByRelevanceInput = {
    fields: Prisma.ExitOrderByRelevanceFieldEnum | Prisma.ExitOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ExitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ExitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ExitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
};
export type ExitScalarRelationFilter = {
    is?: Prisma.ExitWhereInput;
    isNot?: Prisma.ExitWhereInput;
};
export type ExitCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput> | Prisma.ExitCreateWithoutUserInput[] | Prisma.ExitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutUserInput | Prisma.ExitCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExitCreateManyUserInputEnvelope;
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
};
export type ExitUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput> | Prisma.ExitCreateWithoutUserInput[] | Prisma.ExitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutUserInput | Prisma.ExitCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExitCreateManyUserInputEnvelope;
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
};
export type ExitUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput> | Prisma.ExitCreateWithoutUserInput[] | Prisma.ExitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutUserInput | Prisma.ExitCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExitUpsertWithWhereUniqueWithoutUserInput | Prisma.ExitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExitCreateManyUserInputEnvelope;
    set?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    disconnect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    delete?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    update?: Prisma.ExitUpdateWithWhereUniqueWithoutUserInput | Prisma.ExitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExitUpdateManyWithWhereWithoutUserInput | Prisma.ExitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
};
export type ExitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput> | Prisma.ExitCreateWithoutUserInput[] | Prisma.ExitUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutUserInput | Prisma.ExitCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExitUpsertWithWhereUniqueWithoutUserInput | Prisma.ExitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExitCreateManyUserInputEnvelope;
    set?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    disconnect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    delete?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    update?: Prisma.ExitUpdateWithWhereUniqueWithoutUserInput | Prisma.ExitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExitUpdateManyWithWhereWithoutUserInput | Prisma.ExitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
};
export type ExitCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput> | Prisma.ExitCreateWithoutWarehouseInput[] | Prisma.ExitUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutWarehouseInput | Prisma.ExitCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.ExitCreateManyWarehouseInputEnvelope;
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
};
export type ExitUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput> | Prisma.ExitCreateWithoutWarehouseInput[] | Prisma.ExitUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutWarehouseInput | Prisma.ExitCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.ExitCreateManyWarehouseInputEnvelope;
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
};
export type ExitUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput> | Prisma.ExitCreateWithoutWarehouseInput[] | Prisma.ExitUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutWarehouseInput | Prisma.ExitCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.ExitUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.ExitUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.ExitCreateManyWarehouseInputEnvelope;
    set?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    disconnect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    delete?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    update?: Prisma.ExitUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.ExitUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.ExitUpdateManyWithWhereWithoutWarehouseInput | Prisma.ExitUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
};
export type ExitUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput> | Prisma.ExitCreateWithoutWarehouseInput[] | Prisma.ExitUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutWarehouseInput | Prisma.ExitCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.ExitUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.ExitUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.ExitCreateManyWarehouseInputEnvelope;
    set?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    disconnect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    delete?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    connect?: Prisma.ExitWhereUniqueInput | Prisma.ExitWhereUniqueInput[];
    update?: Prisma.ExitUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.ExitUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.ExitUpdateManyWithWhereWithoutWarehouseInput | Prisma.ExitUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
};
export type ExitCreateNestedOneWithoutLinesInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutLinesInput, Prisma.ExitUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutLinesInput;
    connect?: Prisma.ExitWhereUniqueInput;
};
export type ExitUpdateOneRequiredWithoutLinesNestedInput = {
    create?: Prisma.XOR<Prisma.ExitCreateWithoutLinesInput, Prisma.ExitUncheckedCreateWithoutLinesInput>;
    connectOrCreate?: Prisma.ExitCreateOrConnectWithoutLinesInput;
    upsert?: Prisma.ExitUpsertWithoutLinesInput;
    connect?: Prisma.ExitWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExitUpdateToOneWithWhereWithoutLinesInput, Prisma.ExitUpdateWithoutLinesInput>, Prisma.ExitUncheckedUpdateWithoutLinesInput>;
};
export type ExitCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutExitsInput;
    lines?: Prisma.ExitLineCreateNestedManyWithoutExitInput;
};
export type ExitUncheckedCreateWithoutUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
    lines?: Prisma.ExitLineUncheckedCreateNestedManyWithoutExitInput;
};
export type ExitCreateOrConnectWithoutUserInput = {
    where: Prisma.ExitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput>;
};
export type ExitCreateManyUserInputEnvelope = {
    data: Prisma.ExitCreateManyUserInput | Prisma.ExitCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExitUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExitWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExitUpdateWithoutUserInput, Prisma.ExitUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExitCreateWithoutUserInput, Prisma.ExitUncheckedCreateWithoutUserInput>;
};
export type ExitUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExitWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExitUpdateWithoutUserInput, Prisma.ExitUncheckedUpdateWithoutUserInput>;
};
export type ExitUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExitScalarWhereInput;
    data: Prisma.XOR<Prisma.ExitUpdateManyMutationInput, Prisma.ExitUncheckedUpdateManyWithoutUserInput>;
};
export type ExitScalarWhereInput = {
    AND?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
    OR?: Prisma.ExitScalarWhereInput[];
    NOT?: Prisma.ExitScalarWhereInput | Prisma.ExitScalarWhereInput[];
    id?: Prisma.StringFilter<"Exit"> | string;
    reference?: Prisma.StringFilter<"Exit"> | string;
    date?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    type?: Prisma.StringFilter<"Exit"> | string;
    description?: Prisma.StringNullableFilter<"Exit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Exit"> | Date | string;
    userId?: Prisma.StringFilter<"Exit"> | string;
    warehouseId?: Prisma.StringFilter<"Exit"> | string;
};
export type ExitCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExitsInput;
    lines?: Prisma.ExitLineCreateNestedManyWithoutExitInput;
};
export type ExitUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    lines?: Prisma.ExitLineUncheckedCreateNestedManyWithoutExitInput;
};
export type ExitCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.ExitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput>;
};
export type ExitCreateManyWarehouseInputEnvelope = {
    data: Prisma.ExitCreateManyWarehouseInput | Prisma.ExitCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type ExitUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.ExitWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExitUpdateWithoutWarehouseInput, Prisma.ExitUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.ExitCreateWithoutWarehouseInput, Prisma.ExitUncheckedCreateWithoutWarehouseInput>;
};
export type ExitUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.ExitWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExitUpdateWithoutWarehouseInput, Prisma.ExitUncheckedUpdateWithoutWarehouseInput>;
};
export type ExitUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.ExitScalarWhereInput;
    data: Prisma.XOR<Prisma.ExitUpdateManyMutationInput, Prisma.ExitUncheckedUpdateManyWithoutWarehouseInput>;
};
export type ExitCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutExitsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutExitsInput;
};
export type ExitUncheckedCreateWithoutLinesInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    warehouseId: string;
};
export type ExitCreateOrConnectWithoutLinesInput = {
    where: Prisma.ExitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitCreateWithoutLinesInput, Prisma.ExitUncheckedCreateWithoutLinesInput>;
};
export type ExitUpsertWithoutLinesInput = {
    update: Prisma.XOR<Prisma.ExitUpdateWithoutLinesInput, Prisma.ExitUncheckedUpdateWithoutLinesInput>;
    create: Prisma.XOR<Prisma.ExitCreateWithoutLinesInput, Prisma.ExitUncheckedCreateWithoutLinesInput>;
    where?: Prisma.ExitWhereInput;
};
export type ExitUpdateToOneWithWhereWithoutLinesInput = {
    where?: Prisma.ExitWhereInput;
    data: Prisma.XOR<Prisma.ExitUpdateWithoutLinesInput, Prisma.ExitUncheckedUpdateWithoutLinesInput>;
};
export type ExitUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExitsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutExitsNestedInput;
};
export type ExitUncheckedUpdateWithoutLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitCreateManyUserInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    warehouseId: string;
};
export type ExitUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutExitsNestedInput;
    lines?: Prisma.ExitLineUpdateManyWithoutExitNestedInput;
};
export type ExitUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.ExitLineUncheckedUpdateManyWithoutExitNestedInput;
};
export type ExitUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitCreateManyWarehouseInput = {
    id?: string;
    reference: string;
    date?: Date | string;
    type?: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type ExitUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutExitsNestedInput;
    lines?: Prisma.ExitLineUpdateManyWithoutExitNestedInput;
};
export type ExitUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    lines?: Prisma.ExitLineUncheckedUpdateManyWithoutExitNestedInput;
};
export type ExitUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitCountOutputType = {
    lines: number;
};
export type ExitCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lines?: boolean | ExitCountOutputTypeCountLinesArgs;
};
export type ExitCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitCountOutputTypeSelect<ExtArgs> | null;
};
export type ExitCountOutputTypeCountLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitLineWhereInput;
};
export type ExitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    type?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Exit$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.ExitCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exit"]>;
export type ExitSelectScalar = {
    id?: boolean;
    reference?: boolean;
    date?: boolean;
    type?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    warehouseId?: boolean;
};
export type ExitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reference" | "date" | "type" | "description" | "createdAt" | "updatedAt" | "userId" | "warehouseId", ExtArgs["result"]["exit"]>;
export type ExitInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    lines?: boolean | Prisma.Exit$linesArgs<ExtArgs>;
    _count?: boolean | Prisma.ExitCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $ExitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Exit";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
        lines: Prisma.$ExitLinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reference: string;
        date: Date;
        type: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        warehouseId: string;
    }, ExtArgs["result"]["exit"]>;
    composites: {};
};
export type ExitGetPayload<S extends boolean | null | undefined | ExitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExitPayload, S>;
export type ExitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExitCountAggregateInputType | true;
};
export interface ExitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Exit'];
        meta: {
            name: 'Exit';
        };
    };
    findUnique<T extends ExitFindUniqueArgs>(args: Prisma.SelectSubset<T, ExitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExitFindFirstArgs>(args?: Prisma.SelectSubset<T, ExitFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExitFindManyArgs>(args?: Prisma.SelectSubset<T, ExitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExitCreateArgs>(args: Prisma.SelectSubset<T, ExitCreateArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExitCreateManyArgs>(args?: Prisma.SelectSubset<T, ExitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ExitDeleteArgs>(args: Prisma.SelectSubset<T, ExitDeleteArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExitUpdateArgs>(args: Prisma.SelectSubset<T, ExitUpdateArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExitDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExitUpdateManyArgs>(args: Prisma.SelectSubset<T, ExitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ExitUpsertArgs>(args: Prisma.SelectSubset<T, ExitUpsertArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExitCountArgs>(args?: Prisma.Subset<T, ExitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExitCountAggregateOutputType> : number>;
    aggregate<T extends ExitAggregateArgs>(args: Prisma.Subset<T, ExitAggregateArgs>): Prisma.PrismaPromise<GetExitAggregateType<T>>;
    groupBy<T extends ExitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExitGroupByArgs['orderBy'];
    } : {
        orderBy?: ExitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExitFieldRefs;
}
export interface Prisma__ExitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lines<T extends Prisma.Exit$linesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Exit$linesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExitFieldRefs {
    readonly id: Prisma.FieldRef<"Exit", 'String'>;
    readonly reference: Prisma.FieldRef<"Exit", 'String'>;
    readonly date: Prisma.FieldRef<"Exit", 'DateTime'>;
    readonly type: Prisma.FieldRef<"Exit", 'String'>;
    readonly description: Prisma.FieldRef<"Exit", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Exit", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Exit", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Exit", 'String'>;
    readonly warehouseId: Prisma.FieldRef<"Exit", 'String'>;
}
export type ExitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    where: Prisma.ExitWhereUniqueInput;
};
export type ExitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    where: Prisma.ExitWhereUniqueInput;
};
export type ExitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExitCreateInput, Prisma.ExitUncheckedCreateInput>;
};
export type ExitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExitCreateManyInput | Prisma.ExitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExitUpdateInput, Prisma.ExitUncheckedUpdateInput>;
    where: Prisma.ExitWhereUniqueInput;
};
export type ExitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExitUpdateManyMutationInput, Prisma.ExitUncheckedUpdateManyInput>;
    where?: Prisma.ExitWhereInput;
    limit?: number;
};
export type ExitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    where: Prisma.ExitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitCreateInput, Prisma.ExitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExitUpdateInput, Prisma.ExitUncheckedUpdateInput>;
};
export type ExitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
    where: Prisma.ExitWhereUniqueInput;
};
export type ExitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitWhereInput;
    limit?: number;
};
export type Exit$linesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    where?: Prisma.ExitLineWhereInput;
    orderBy?: Prisma.ExitLineOrderByWithRelationInput | Prisma.ExitLineOrderByWithRelationInput[];
    cursor?: Prisma.ExitLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExitLineScalarFieldEnum | Prisma.ExitLineScalarFieldEnum[];
};
export type ExitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitSelect<ExtArgs> | null;
    omit?: Prisma.ExitOmit<ExtArgs> | null;
    include?: Prisma.ExitInclude<ExtArgs> | null;
};
