import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MovementModel = runtime.Types.Result.DefaultSelection<Prisma.$MovementPayload>;
export type AggregateMovement = {
    _count: MovementCountAggregateOutputType | null;
    _avg: MovementAvgAggregateOutputType | null;
    _sum: MovementSumAggregateOutputType | null;
    _min: MovementMinAggregateOutputType | null;
    _max: MovementMaxAggregateOutputType | null;
};
export type MovementAvgAggregateOutputType = {
    quantity: number | null;
};
export type MovementSumAggregateOutputType = {
    quantity: number | null;
};
export type MovementMinAggregateOutputType = {
    id: string | null;
    type: string | null;
    quantity: number | null;
    date: Date | null;
    description: string | null;
    createdAt: Date | null;
    productId: string | null;
    fromWarehouseId: string | null;
    toWarehouseId: string | null;
};
export type MovementMaxAggregateOutputType = {
    id: string | null;
    type: string | null;
    quantity: number | null;
    date: Date | null;
    description: string | null;
    createdAt: Date | null;
    productId: string | null;
    fromWarehouseId: string | null;
    toWarehouseId: string | null;
};
export type MovementCountAggregateOutputType = {
    id: number;
    type: number;
    quantity: number;
    date: number;
    description: number;
    createdAt: number;
    productId: number;
    fromWarehouseId: number;
    toWarehouseId: number;
    _all: number;
};
export type MovementAvgAggregateInputType = {
    quantity?: true;
};
export type MovementSumAggregateInputType = {
    quantity?: true;
};
export type MovementMinAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    productId?: true;
    fromWarehouseId?: true;
    toWarehouseId?: true;
};
export type MovementMaxAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    productId?: true;
    fromWarehouseId?: true;
    toWarehouseId?: true;
};
export type MovementCountAggregateInputType = {
    id?: true;
    type?: true;
    quantity?: true;
    date?: true;
    description?: true;
    createdAt?: true;
    productId?: true;
    fromWarehouseId?: true;
    toWarehouseId?: true;
    _all?: true;
};
export type MovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MovementWhereInput;
    orderBy?: Prisma.MovementOrderByWithRelationInput | Prisma.MovementOrderByWithRelationInput[];
    cursor?: Prisma.MovementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MovementCountAggregateInputType;
    _avg?: MovementAvgAggregateInputType;
    _sum?: MovementSumAggregateInputType;
    _min?: MovementMinAggregateInputType;
    _max?: MovementMaxAggregateInputType;
};
export type GetMovementAggregateType<T extends MovementAggregateArgs> = {
    [P in keyof T & keyof AggregateMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMovement[P]> : Prisma.GetScalarType<T[P], AggregateMovement[P]>;
};
export type MovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MovementWhereInput;
    orderBy?: Prisma.MovementOrderByWithAggregationInput | Prisma.MovementOrderByWithAggregationInput[];
    by: Prisma.MovementScalarFieldEnum[] | Prisma.MovementScalarFieldEnum;
    having?: Prisma.MovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MovementCountAggregateInputType | true;
    _avg?: MovementAvgAggregateInputType;
    _sum?: MovementSumAggregateInputType;
    _min?: MovementMinAggregateInputType;
    _max?: MovementMaxAggregateInputType;
};
export type MovementGroupByOutputType = {
    id: string;
    type: string;
    quantity: number;
    date: Date;
    description: string | null;
    createdAt: Date;
    productId: string;
    fromWarehouseId: string | null;
    toWarehouseId: string | null;
    _count: MovementCountAggregateOutputType | null;
    _avg: MovementAvgAggregateOutputType | null;
    _sum: MovementSumAggregateOutputType | null;
    _min: MovementMinAggregateOutputType | null;
    _max: MovementMaxAggregateOutputType | null;
};
export type GetMovementGroupByPayload<T extends MovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MovementGroupByOutputType[P]>;
}>>;
export type MovementWhereInput = {
    AND?: Prisma.MovementWhereInput | Prisma.MovementWhereInput[];
    OR?: Prisma.MovementWhereInput[];
    NOT?: Prisma.MovementWhereInput | Prisma.MovementWhereInput[];
    id?: Prisma.StringFilter<"Movement"> | string;
    type?: Prisma.StringFilter<"Movement"> | string;
    quantity?: Prisma.IntFilter<"Movement"> | number;
    date?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    description?: Prisma.StringNullableFilter<"Movement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    productId?: Prisma.StringFilter<"Movement"> | string;
    fromWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
    toWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    fromWarehouse?: Prisma.XOR<Prisma.WarehouseNullableScalarRelationFilter, Prisma.WarehouseWhereInput> | null;
    toWarehouse?: Prisma.XOR<Prisma.WarehouseNullableScalarRelationFilter, Prisma.WarehouseWhereInput> | null;
};
export type MovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fromWarehouseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toWarehouseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    fromWarehouse?: Prisma.WarehouseOrderByWithRelationInput;
    toWarehouse?: Prisma.WarehouseOrderByWithRelationInput;
    _relevance?: Prisma.MovementOrderByRelevanceInput;
};
export type MovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MovementWhereInput | Prisma.MovementWhereInput[];
    OR?: Prisma.MovementWhereInput[];
    NOT?: Prisma.MovementWhereInput | Prisma.MovementWhereInput[];
    type?: Prisma.StringFilter<"Movement"> | string;
    quantity?: Prisma.IntFilter<"Movement"> | number;
    date?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    description?: Prisma.StringNullableFilter<"Movement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    productId?: Prisma.StringFilter<"Movement"> | string;
    fromWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
    toWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    fromWarehouse?: Prisma.XOR<Prisma.WarehouseNullableScalarRelationFilter, Prisma.WarehouseWhereInput> | null;
    toWarehouse?: Prisma.XOR<Prisma.WarehouseNullableScalarRelationFilter, Prisma.WarehouseWhereInput> | null;
}, "id">;
export type MovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fromWarehouseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toWarehouseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MovementCountOrderByAggregateInput;
    _avg?: Prisma.MovementAvgOrderByAggregateInput;
    _max?: Prisma.MovementMaxOrderByAggregateInput;
    _min?: Prisma.MovementMinOrderByAggregateInput;
    _sum?: Prisma.MovementSumOrderByAggregateInput;
};
export type MovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.MovementScalarWhereWithAggregatesInput | Prisma.MovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.MovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MovementScalarWhereWithAggregatesInput | Prisma.MovementScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Movement"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Movement"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"Movement"> | number;
    date?: Prisma.DateTimeWithAggregatesFilter<"Movement"> | Date | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Movement"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Movement"> | Date | string;
    productId?: Prisma.StringWithAggregatesFilter<"Movement"> | string;
    fromWarehouseId?: Prisma.StringNullableWithAggregatesFilter<"Movement"> | string | null;
    toWarehouseId?: Prisma.StringNullableWithAggregatesFilter<"Movement"> | string | null;
};
export type MovementCreateInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    fromWarehouse?: Prisma.WarehouseCreateNestedOneWithoutFromMovementsInput;
    toWarehouse?: Prisma.WarehouseCreateNestedOneWithoutToMovementsInput;
};
export type MovementUncheckedCreateInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    fromWarehouseId?: string | null;
    toWarehouseId?: string | null;
};
export type MovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    fromWarehouse?: Prisma.WarehouseUpdateOneWithoutFromMovementsNestedInput;
    toWarehouse?: Prisma.WarehouseUpdateOneWithoutToMovementsNestedInput;
};
export type MovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementCreateManyInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    fromWarehouseId?: string | null;
    toWarehouseId?: string | null;
};
export type MovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementListRelationFilter = {
    every?: Prisma.MovementWhereInput;
    some?: Prisma.MovementWhereInput;
    none?: Prisma.MovementWhereInput;
};
export type MovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MovementOrderByRelevanceInput = {
    fields: Prisma.MovementOrderByRelevanceFieldEnum | Prisma.MovementOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type MovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fromWarehouseId?: Prisma.SortOrder;
    toWarehouseId?: Prisma.SortOrder;
};
export type MovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fromWarehouseId?: Prisma.SortOrder;
    toWarehouseId?: Prisma.SortOrder;
};
export type MovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fromWarehouseId?: Prisma.SortOrder;
    toWarehouseId?: Prisma.SortOrder;
};
export type MovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type MovementCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput> | Prisma.MovementCreateWithoutProductInput[] | Prisma.MovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutProductInput | Prisma.MovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.MovementCreateManyProductInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput> | Prisma.MovementCreateWithoutProductInput[] | Prisma.MovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutProductInput | Prisma.MovementCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.MovementCreateManyProductInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput> | Prisma.MovementCreateWithoutProductInput[] | Prisma.MovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutProductInput | Prisma.MovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutProductInput | Prisma.MovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.MovementCreateManyProductInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutProductInput | Prisma.MovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutProductInput | Prisma.MovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput> | Prisma.MovementCreateWithoutProductInput[] | Prisma.MovementUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutProductInput | Prisma.MovementCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutProductInput | Prisma.MovementUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.MovementCreateManyProductInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutProductInput | Prisma.MovementUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutProductInput | Prisma.MovementUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementCreateNestedManyWithoutFromWarehouseInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput> | Prisma.MovementCreateWithoutFromWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutFromWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutFromWarehouseInput | Prisma.MovementCreateOrConnectWithoutFromWarehouseInput[];
    createMany?: Prisma.MovementCreateManyFromWarehouseInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementCreateNestedManyWithoutToWarehouseInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput> | Prisma.MovementCreateWithoutToWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutToWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutToWarehouseInput | Prisma.MovementCreateOrConnectWithoutToWarehouseInput[];
    createMany?: Prisma.MovementCreateManyToWarehouseInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementUncheckedCreateNestedManyWithoutFromWarehouseInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput> | Prisma.MovementCreateWithoutFromWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutFromWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutFromWarehouseInput | Prisma.MovementCreateOrConnectWithoutFromWarehouseInput[];
    createMany?: Prisma.MovementCreateManyFromWarehouseInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementUncheckedCreateNestedManyWithoutToWarehouseInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput> | Prisma.MovementCreateWithoutToWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutToWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutToWarehouseInput | Prisma.MovementCreateOrConnectWithoutToWarehouseInput[];
    createMany?: Prisma.MovementCreateManyToWarehouseInputEnvelope;
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
};
export type MovementUpdateManyWithoutFromWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput> | Prisma.MovementCreateWithoutFromWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutFromWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutFromWarehouseInput | Prisma.MovementCreateOrConnectWithoutFromWarehouseInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutFromWarehouseInput | Prisma.MovementUpsertWithWhereUniqueWithoutFromWarehouseInput[];
    createMany?: Prisma.MovementCreateManyFromWarehouseInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutFromWarehouseInput | Prisma.MovementUpdateWithWhereUniqueWithoutFromWarehouseInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutFromWarehouseInput | Prisma.MovementUpdateManyWithWhereWithoutFromWarehouseInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementUpdateManyWithoutToWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput> | Prisma.MovementCreateWithoutToWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutToWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutToWarehouseInput | Prisma.MovementCreateOrConnectWithoutToWarehouseInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutToWarehouseInput | Prisma.MovementUpsertWithWhereUniqueWithoutToWarehouseInput[];
    createMany?: Prisma.MovementCreateManyToWarehouseInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutToWarehouseInput | Prisma.MovementUpdateWithWhereUniqueWithoutToWarehouseInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutToWarehouseInput | Prisma.MovementUpdateManyWithWhereWithoutToWarehouseInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementUncheckedUpdateManyWithoutFromWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput> | Prisma.MovementCreateWithoutFromWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutFromWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutFromWarehouseInput | Prisma.MovementCreateOrConnectWithoutFromWarehouseInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutFromWarehouseInput | Prisma.MovementUpsertWithWhereUniqueWithoutFromWarehouseInput[];
    createMany?: Prisma.MovementCreateManyFromWarehouseInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutFromWarehouseInput | Prisma.MovementUpdateWithWhereUniqueWithoutFromWarehouseInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutFromWarehouseInput | Prisma.MovementUpdateManyWithWhereWithoutFromWarehouseInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementUncheckedUpdateManyWithoutToWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput> | Prisma.MovementCreateWithoutToWarehouseInput[] | Prisma.MovementUncheckedCreateWithoutToWarehouseInput[];
    connectOrCreate?: Prisma.MovementCreateOrConnectWithoutToWarehouseInput | Prisma.MovementCreateOrConnectWithoutToWarehouseInput[];
    upsert?: Prisma.MovementUpsertWithWhereUniqueWithoutToWarehouseInput | Prisma.MovementUpsertWithWhereUniqueWithoutToWarehouseInput[];
    createMany?: Prisma.MovementCreateManyToWarehouseInputEnvelope;
    set?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    disconnect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    delete?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    connect?: Prisma.MovementWhereUniqueInput | Prisma.MovementWhereUniqueInput[];
    update?: Prisma.MovementUpdateWithWhereUniqueWithoutToWarehouseInput | Prisma.MovementUpdateWithWhereUniqueWithoutToWarehouseInput[];
    updateMany?: Prisma.MovementUpdateManyWithWhereWithoutToWarehouseInput | Prisma.MovementUpdateManyWithWhereWithoutToWarehouseInput[];
    deleteMany?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
};
export type MovementCreateWithoutProductInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    fromWarehouse?: Prisma.WarehouseCreateNestedOneWithoutFromMovementsInput;
    toWarehouse?: Prisma.WarehouseCreateNestedOneWithoutToMovementsInput;
};
export type MovementUncheckedCreateWithoutProductInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    fromWarehouseId?: string | null;
    toWarehouseId?: string | null;
};
export type MovementCreateOrConnectWithoutProductInput = {
    where: Prisma.MovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput>;
};
export type MovementCreateManyProductInputEnvelope = {
    data: Prisma.MovementCreateManyProductInput | Prisma.MovementCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type MovementUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.MovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.MovementUpdateWithoutProductInput, Prisma.MovementUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.MovementCreateWithoutProductInput, Prisma.MovementUncheckedCreateWithoutProductInput>;
};
export type MovementUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.MovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.MovementUpdateWithoutProductInput, Prisma.MovementUncheckedUpdateWithoutProductInput>;
};
export type MovementUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.MovementScalarWhereInput;
    data: Prisma.XOR<Prisma.MovementUpdateManyMutationInput, Prisma.MovementUncheckedUpdateManyWithoutProductInput>;
};
export type MovementScalarWhereInput = {
    AND?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
    OR?: Prisma.MovementScalarWhereInput[];
    NOT?: Prisma.MovementScalarWhereInput | Prisma.MovementScalarWhereInput[];
    id?: Prisma.StringFilter<"Movement"> | string;
    type?: Prisma.StringFilter<"Movement"> | string;
    quantity?: Prisma.IntFilter<"Movement"> | number;
    date?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    description?: Prisma.StringNullableFilter<"Movement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Movement"> | Date | string;
    productId?: Prisma.StringFilter<"Movement"> | string;
    fromWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
    toWarehouseId?: Prisma.StringNullableFilter<"Movement"> | string | null;
};
export type MovementCreateWithoutFromWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    toWarehouse?: Prisma.WarehouseCreateNestedOneWithoutToMovementsInput;
};
export type MovementUncheckedCreateWithoutFromWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    toWarehouseId?: string | null;
};
export type MovementCreateOrConnectWithoutFromWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput>;
};
export type MovementCreateManyFromWarehouseInputEnvelope = {
    data: Prisma.MovementCreateManyFromWarehouseInput | Prisma.MovementCreateManyFromWarehouseInput[];
    skipDuplicates?: boolean;
};
export type MovementCreateWithoutToWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutMovementsInput;
    fromWarehouse?: Prisma.WarehouseCreateNestedOneWithoutFromMovementsInput;
};
export type MovementUncheckedCreateWithoutToWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    fromWarehouseId?: string | null;
};
export type MovementCreateOrConnectWithoutToWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput>;
};
export type MovementCreateManyToWarehouseInputEnvelope = {
    data: Prisma.MovementCreateManyToWarehouseInput | Prisma.MovementCreateManyToWarehouseInput[];
    skipDuplicates?: boolean;
};
export type MovementUpsertWithWhereUniqueWithoutFromWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.MovementUpdateWithoutFromWarehouseInput, Prisma.MovementUncheckedUpdateWithoutFromWarehouseInput>;
    create: Prisma.XOR<Prisma.MovementCreateWithoutFromWarehouseInput, Prisma.MovementUncheckedCreateWithoutFromWarehouseInput>;
};
export type MovementUpdateWithWhereUniqueWithoutFromWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.MovementUpdateWithoutFromWarehouseInput, Prisma.MovementUncheckedUpdateWithoutFromWarehouseInput>;
};
export type MovementUpdateManyWithWhereWithoutFromWarehouseInput = {
    where: Prisma.MovementScalarWhereInput;
    data: Prisma.XOR<Prisma.MovementUpdateManyMutationInput, Prisma.MovementUncheckedUpdateManyWithoutFromWarehouseInput>;
};
export type MovementUpsertWithWhereUniqueWithoutToWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.MovementUpdateWithoutToWarehouseInput, Prisma.MovementUncheckedUpdateWithoutToWarehouseInput>;
    create: Prisma.XOR<Prisma.MovementCreateWithoutToWarehouseInput, Prisma.MovementUncheckedCreateWithoutToWarehouseInput>;
};
export type MovementUpdateWithWhereUniqueWithoutToWarehouseInput = {
    where: Prisma.MovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.MovementUpdateWithoutToWarehouseInput, Prisma.MovementUncheckedUpdateWithoutToWarehouseInput>;
};
export type MovementUpdateManyWithWhereWithoutToWarehouseInput = {
    where: Prisma.MovementScalarWhereInput;
    data: Prisma.XOR<Prisma.MovementUpdateManyMutationInput, Prisma.MovementUncheckedUpdateManyWithoutToWarehouseInput>;
};
export type MovementCreateManyProductInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    fromWarehouseId?: string | null;
    toWarehouseId?: string | null;
};
export type MovementUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromWarehouse?: Prisma.WarehouseUpdateOneWithoutFromMovementsNestedInput;
    toWarehouse?: Prisma.WarehouseUpdateOneWithoutToMovementsNestedInput;
};
export type MovementUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementCreateManyFromWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    toWarehouseId?: string | null;
};
export type MovementCreateManyToWarehouseInput = {
    id?: string;
    type: string;
    quantity: number;
    date?: Date | string;
    description?: string | null;
    createdAt?: Date | string;
    productId: string;
    fromWarehouseId?: string | null;
};
export type MovementUpdateWithoutFromWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    toWarehouse?: Prisma.WarehouseUpdateOneWithoutToMovementsNestedInput;
};
export type MovementUncheckedUpdateWithoutFromWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementUncheckedUpdateManyWithoutFromWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    toWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementUpdateWithoutToWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutMovementsNestedInput;
    fromWarehouse?: Prisma.WarehouseUpdateOneWithoutFromMovementsNestedInput;
};
export type MovementUncheckedUpdateWithoutToWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementUncheckedUpdateManyWithoutToWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromWarehouseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    date?: boolean;
    description?: boolean;
    createdAt?: boolean;
    productId?: boolean;
    fromWarehouseId?: boolean;
    toWarehouseId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    fromWarehouse?: boolean | Prisma.Movement$fromWarehouseArgs<ExtArgs>;
    toWarehouse?: boolean | Prisma.Movement$toWarehouseArgs<ExtArgs>;
}, ExtArgs["result"]["movement"]>;
export type MovementSelectScalar = {
    id?: boolean;
    type?: boolean;
    quantity?: boolean;
    date?: boolean;
    description?: boolean;
    createdAt?: boolean;
    productId?: boolean;
    fromWarehouseId?: boolean;
    toWarehouseId?: boolean;
};
export type MovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "quantity" | "date" | "description" | "createdAt" | "productId" | "fromWarehouseId" | "toWarehouseId", ExtArgs["result"]["movement"]>;
export type MovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    fromWarehouse?: boolean | Prisma.Movement$fromWarehouseArgs<ExtArgs>;
    toWarehouse?: boolean | Prisma.Movement$toWarehouseArgs<ExtArgs>;
};
export type $MovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Movement";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        fromWarehouse: Prisma.$WarehousePayload<ExtArgs> | null;
        toWarehouse: Prisma.$WarehousePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: string;
        quantity: number;
        date: Date;
        description: string | null;
        createdAt: Date;
        productId: string;
        fromWarehouseId: string | null;
        toWarehouseId: string | null;
    }, ExtArgs["result"]["movement"]>;
    composites: {};
};
export type MovementGetPayload<S extends boolean | null | undefined | MovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MovementPayload, S>;
export type MovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MovementCountAggregateInputType | true;
};
export interface MovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Movement'];
        meta: {
            name: 'Movement';
        };
    };
    findUnique<T extends MovementFindUniqueArgs>(args: Prisma.SelectSubset<T, MovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MovementFindFirstArgs>(args?: Prisma.SelectSubset<T, MovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MovementFindManyArgs>(args?: Prisma.SelectSubset<T, MovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MovementCreateArgs>(args: Prisma.SelectSubset<T, MovementCreateArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MovementCreateManyArgs>(args?: Prisma.SelectSubset<T, MovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends MovementDeleteArgs>(args: Prisma.SelectSubset<T, MovementDeleteArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MovementUpdateArgs>(args: Prisma.SelectSubset<T, MovementUpdateArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, MovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MovementUpdateManyArgs>(args: Prisma.SelectSubset<T, MovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends MovementUpsertArgs>(args: Prisma.SelectSubset<T, MovementUpsertArgs<ExtArgs>>): Prisma.Prisma__MovementClient<runtime.Types.Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MovementCountArgs>(args?: Prisma.Subset<T, MovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MovementCountAggregateOutputType> : number>;
    aggregate<T extends MovementAggregateArgs>(args: Prisma.Subset<T, MovementAggregateArgs>): Prisma.PrismaPromise<GetMovementAggregateType<T>>;
    groupBy<T extends MovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MovementGroupByArgs['orderBy'];
    } : {
        orderBy?: MovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MovementFieldRefs;
}
export interface Prisma__MovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fromWarehouse<T extends Prisma.Movement$fromWarehouseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Movement$fromWarehouseArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    toWarehouse<T extends Prisma.Movement$toWarehouseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Movement$toWarehouseArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MovementFieldRefs {
    readonly id: Prisma.FieldRef<"Movement", 'String'>;
    readonly type: Prisma.FieldRef<"Movement", 'String'>;
    readonly quantity: Prisma.FieldRef<"Movement", 'Int'>;
    readonly date: Prisma.FieldRef<"Movement", 'DateTime'>;
    readonly description: Prisma.FieldRef<"Movement", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Movement", 'DateTime'>;
    readonly productId: Prisma.FieldRef<"Movement", 'String'>;
    readonly fromWarehouseId: Prisma.FieldRef<"Movement", 'String'>;
    readonly toWarehouseId: Prisma.FieldRef<"Movement", 'String'>;
}
export type MovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where: Prisma.MovementWhereUniqueInput;
};
export type MovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where: Prisma.MovementWhereUniqueInput;
};
export type MovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MovementCreateInput, Prisma.MovementUncheckedCreateInput>;
};
export type MovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MovementCreateManyInput | Prisma.MovementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MovementUpdateInput, Prisma.MovementUncheckedUpdateInput>;
    where: Prisma.MovementWhereUniqueInput;
};
export type MovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MovementUpdateManyMutationInput, Prisma.MovementUncheckedUpdateManyInput>;
    where?: Prisma.MovementWhereInput;
    limit?: number;
};
export type MovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where: Prisma.MovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.MovementCreateInput, Prisma.MovementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MovementUpdateInput, Prisma.MovementUncheckedUpdateInput>;
};
export type MovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
    where: Prisma.MovementWhereUniqueInput;
};
export type MovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MovementWhereInput;
    limit?: number;
};
export type Movement$fromWarehouseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where?: Prisma.WarehouseWhereInput;
};
export type Movement$toWarehouseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WarehouseSelect<ExtArgs> | null;
    omit?: Prisma.WarehouseOmit<ExtArgs> | null;
    include?: Prisma.WarehouseInclude<ExtArgs> | null;
    where?: Prisma.WarehouseWhereInput;
};
export type MovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MovementSelect<ExtArgs> | null;
    omit?: Prisma.MovementOmit<ExtArgs> | null;
    include?: Prisma.MovementInclude<ExtArgs> | null;
};
