import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InventoryLineModel = runtime.Types.Result.DefaultSelection<Prisma.$InventoryLinePayload>;
export type AggregateInventoryLine = {
    _count: InventoryLineCountAggregateOutputType | null;
    _avg: InventoryLineAvgAggregateOutputType | null;
    _sum: InventoryLineSumAggregateOutputType | null;
    _min: InventoryLineMinAggregateOutputType | null;
    _max: InventoryLineMaxAggregateOutputType | null;
};
export type InventoryLineAvgAggregateOutputType = {
    expectedQty: number | null;
    actualQty: number | null;
    difference: number | null;
};
export type InventoryLineSumAggregateOutputType = {
    expectedQty: number | null;
    actualQty: number | null;
    difference: number | null;
};
export type InventoryLineMinAggregateOutputType = {
    id: string | null;
    expectedQty: number | null;
    actualQty: number | null;
    difference: number | null;
    createdAt: Date | null;
    inventoryId: string | null;
    productId: string | null;
};
export type InventoryLineMaxAggregateOutputType = {
    id: string | null;
    expectedQty: number | null;
    actualQty: number | null;
    difference: number | null;
    createdAt: Date | null;
    inventoryId: string | null;
    productId: string | null;
};
export type InventoryLineCountAggregateOutputType = {
    id: number;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt: number;
    inventoryId: number;
    productId: number;
    _all: number;
};
export type InventoryLineAvgAggregateInputType = {
    expectedQty?: true;
    actualQty?: true;
    difference?: true;
};
export type InventoryLineSumAggregateInputType = {
    expectedQty?: true;
    actualQty?: true;
    difference?: true;
};
export type InventoryLineMinAggregateInputType = {
    id?: true;
    expectedQty?: true;
    actualQty?: true;
    difference?: true;
    createdAt?: true;
    inventoryId?: true;
    productId?: true;
};
export type InventoryLineMaxAggregateInputType = {
    id?: true;
    expectedQty?: true;
    actualQty?: true;
    difference?: true;
    createdAt?: true;
    inventoryId?: true;
    productId?: true;
};
export type InventoryLineCountAggregateInputType = {
    id?: true;
    expectedQty?: true;
    actualQty?: true;
    difference?: true;
    createdAt?: true;
    inventoryId?: true;
    productId?: true;
    _all?: true;
};
export type InventoryLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryLineWhereInput;
    orderBy?: Prisma.InventoryLineOrderByWithRelationInput | Prisma.InventoryLineOrderByWithRelationInput[];
    cursor?: Prisma.InventoryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InventoryLineCountAggregateInputType;
    _avg?: InventoryLineAvgAggregateInputType;
    _sum?: InventoryLineSumAggregateInputType;
    _min?: InventoryLineMinAggregateInputType;
    _max?: InventoryLineMaxAggregateInputType;
};
export type GetInventoryLineAggregateType<T extends InventoryLineAggregateArgs> = {
    [P in keyof T & keyof AggregateInventoryLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInventoryLine[P]> : Prisma.GetScalarType<T[P], AggregateInventoryLine[P]>;
};
export type InventoryLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryLineWhereInput;
    orderBy?: Prisma.InventoryLineOrderByWithAggregationInput | Prisma.InventoryLineOrderByWithAggregationInput[];
    by: Prisma.InventoryLineScalarFieldEnum[] | Prisma.InventoryLineScalarFieldEnum;
    having?: Prisma.InventoryLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InventoryLineCountAggregateInputType | true;
    _avg?: InventoryLineAvgAggregateInputType;
    _sum?: InventoryLineSumAggregateInputType;
    _min?: InventoryLineMinAggregateInputType;
    _max?: InventoryLineMaxAggregateInputType;
};
export type InventoryLineGroupByOutputType = {
    id: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt: Date;
    inventoryId: string;
    productId: string;
    _count: InventoryLineCountAggregateOutputType | null;
    _avg: InventoryLineAvgAggregateOutputType | null;
    _sum: InventoryLineSumAggregateOutputType | null;
    _min: InventoryLineMinAggregateOutputType | null;
    _max: InventoryLineMaxAggregateOutputType | null;
};
export type GetInventoryLineGroupByPayload<T extends InventoryLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InventoryLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InventoryLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InventoryLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InventoryLineGroupByOutputType[P]>;
}>>;
export type InventoryLineWhereInput = {
    AND?: Prisma.InventoryLineWhereInput | Prisma.InventoryLineWhereInput[];
    OR?: Prisma.InventoryLineWhereInput[];
    NOT?: Prisma.InventoryLineWhereInput | Prisma.InventoryLineWhereInput[];
    id?: Prisma.StringFilter<"InventoryLine"> | string;
    expectedQty?: Prisma.IntFilter<"InventoryLine"> | number;
    actualQty?: Prisma.IntFilter<"InventoryLine"> | number;
    difference?: Prisma.IntFilter<"InventoryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"InventoryLine"> | Date | string;
    inventoryId?: Prisma.StringFilter<"InventoryLine"> | string;
    productId?: Prisma.StringFilter<"InventoryLine"> | string;
    inventory?: Prisma.XOR<Prisma.InventoryScalarRelationFilter, Prisma.InventoryWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type InventoryLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inventoryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    inventory?: Prisma.InventoryOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    _relevance?: Prisma.InventoryLineOrderByRelevanceInput;
};
export type InventoryLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InventoryLineWhereInput | Prisma.InventoryLineWhereInput[];
    OR?: Prisma.InventoryLineWhereInput[];
    NOT?: Prisma.InventoryLineWhereInput | Prisma.InventoryLineWhereInput[];
    expectedQty?: Prisma.IntFilter<"InventoryLine"> | number;
    actualQty?: Prisma.IntFilter<"InventoryLine"> | number;
    difference?: Prisma.IntFilter<"InventoryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"InventoryLine"> | Date | string;
    inventoryId?: Prisma.StringFilter<"InventoryLine"> | string;
    productId?: Prisma.StringFilter<"InventoryLine"> | string;
    inventory?: Prisma.XOR<Prisma.InventoryScalarRelationFilter, Prisma.InventoryWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type InventoryLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inventoryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    _count?: Prisma.InventoryLineCountOrderByAggregateInput;
    _avg?: Prisma.InventoryLineAvgOrderByAggregateInput;
    _max?: Prisma.InventoryLineMaxOrderByAggregateInput;
    _min?: Prisma.InventoryLineMinOrderByAggregateInput;
    _sum?: Prisma.InventoryLineSumOrderByAggregateInput;
};
export type InventoryLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.InventoryLineScalarWhereWithAggregatesInput | Prisma.InventoryLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.InventoryLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InventoryLineScalarWhereWithAggregatesInput | Prisma.InventoryLineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InventoryLine"> | string;
    expectedQty?: Prisma.IntWithAggregatesFilter<"InventoryLine"> | number;
    actualQty?: Prisma.IntWithAggregatesFilter<"InventoryLine"> | number;
    difference?: Prisma.IntWithAggregatesFilter<"InventoryLine"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InventoryLine"> | Date | string;
    inventoryId?: Prisma.StringWithAggregatesFilter<"InventoryLine"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"InventoryLine"> | string;
};
export type InventoryLineCreateInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventory: Prisma.InventoryCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutInventoryLinesInput;
};
export type InventoryLineUncheckedCreateInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventoryId: string;
    productId: string;
};
export type InventoryLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutInventoryLinesNestedInput;
};
export type InventoryLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineCreateManyInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventoryId: string;
    productId: string;
};
export type InventoryLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineListRelationFilter = {
    every?: Prisma.InventoryLineWhereInput;
    some?: Prisma.InventoryLineWhereInput;
    none?: Prisma.InventoryLineWhereInput;
};
export type InventoryLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InventoryLineOrderByRelevanceInput = {
    fields: Prisma.InventoryLineOrderByRelevanceFieldEnum | Prisma.InventoryLineOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type InventoryLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inventoryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type InventoryLineAvgOrderByAggregateInput = {
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
};
export type InventoryLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inventoryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type InventoryLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inventoryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type InventoryLineSumOrderByAggregateInput = {
    expectedQty?: Prisma.SortOrder;
    actualQty?: Prisma.SortOrder;
    difference?: Prisma.SortOrder;
};
export type InventoryLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput> | Prisma.InventoryLineCreateWithoutProductInput[] | Prisma.InventoryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutProductInput | Prisma.InventoryLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.InventoryLineCreateManyProductInputEnvelope;
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
};
export type InventoryLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput> | Prisma.InventoryLineCreateWithoutProductInput[] | Prisma.InventoryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutProductInput | Prisma.InventoryLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.InventoryLineCreateManyProductInputEnvelope;
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
};
export type InventoryLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput> | Prisma.InventoryLineCreateWithoutProductInput[] | Prisma.InventoryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutProductInput | Prisma.InventoryLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.InventoryLineUpsertWithWhereUniqueWithoutProductInput | Prisma.InventoryLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.InventoryLineCreateManyProductInputEnvelope;
    set?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    disconnect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    delete?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    update?: Prisma.InventoryLineUpdateWithWhereUniqueWithoutProductInput | Prisma.InventoryLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.InventoryLineUpdateManyWithWhereWithoutProductInput | Prisma.InventoryLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
};
export type InventoryLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput> | Prisma.InventoryLineCreateWithoutProductInput[] | Prisma.InventoryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutProductInput | Prisma.InventoryLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.InventoryLineUpsertWithWhereUniqueWithoutProductInput | Prisma.InventoryLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.InventoryLineCreateManyProductInputEnvelope;
    set?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    disconnect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    delete?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    update?: Prisma.InventoryLineUpdateWithWhereUniqueWithoutProductInput | Prisma.InventoryLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.InventoryLineUpdateManyWithWhereWithoutProductInput | Prisma.InventoryLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
};
export type InventoryLineCreateNestedManyWithoutInventoryInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput> | Prisma.InventoryLineCreateWithoutInventoryInput[] | Prisma.InventoryLineUncheckedCreateWithoutInventoryInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutInventoryInput | Prisma.InventoryLineCreateOrConnectWithoutInventoryInput[];
    createMany?: Prisma.InventoryLineCreateManyInventoryInputEnvelope;
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
};
export type InventoryLineUncheckedCreateNestedManyWithoutInventoryInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput> | Prisma.InventoryLineCreateWithoutInventoryInput[] | Prisma.InventoryLineUncheckedCreateWithoutInventoryInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutInventoryInput | Prisma.InventoryLineCreateOrConnectWithoutInventoryInput[];
    createMany?: Prisma.InventoryLineCreateManyInventoryInputEnvelope;
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
};
export type InventoryLineUpdateManyWithoutInventoryNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput> | Prisma.InventoryLineCreateWithoutInventoryInput[] | Prisma.InventoryLineUncheckedCreateWithoutInventoryInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutInventoryInput | Prisma.InventoryLineCreateOrConnectWithoutInventoryInput[];
    upsert?: Prisma.InventoryLineUpsertWithWhereUniqueWithoutInventoryInput | Prisma.InventoryLineUpsertWithWhereUniqueWithoutInventoryInput[];
    createMany?: Prisma.InventoryLineCreateManyInventoryInputEnvelope;
    set?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    disconnect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    delete?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    update?: Prisma.InventoryLineUpdateWithWhereUniqueWithoutInventoryInput | Prisma.InventoryLineUpdateWithWhereUniqueWithoutInventoryInput[];
    updateMany?: Prisma.InventoryLineUpdateManyWithWhereWithoutInventoryInput | Prisma.InventoryLineUpdateManyWithWhereWithoutInventoryInput[];
    deleteMany?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
};
export type InventoryLineUncheckedUpdateManyWithoutInventoryNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput> | Prisma.InventoryLineCreateWithoutInventoryInput[] | Prisma.InventoryLineUncheckedCreateWithoutInventoryInput[];
    connectOrCreate?: Prisma.InventoryLineCreateOrConnectWithoutInventoryInput | Prisma.InventoryLineCreateOrConnectWithoutInventoryInput[];
    upsert?: Prisma.InventoryLineUpsertWithWhereUniqueWithoutInventoryInput | Prisma.InventoryLineUpsertWithWhereUniqueWithoutInventoryInput[];
    createMany?: Prisma.InventoryLineCreateManyInventoryInputEnvelope;
    set?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    disconnect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    delete?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    connect?: Prisma.InventoryLineWhereUniqueInput | Prisma.InventoryLineWhereUniqueInput[];
    update?: Prisma.InventoryLineUpdateWithWhereUniqueWithoutInventoryInput | Prisma.InventoryLineUpdateWithWhereUniqueWithoutInventoryInput[];
    updateMany?: Prisma.InventoryLineUpdateManyWithWhereWithoutInventoryInput | Prisma.InventoryLineUpdateManyWithWhereWithoutInventoryInput[];
    deleteMany?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
};
export type InventoryLineCreateWithoutProductInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventory: Prisma.InventoryCreateNestedOneWithoutLinesInput;
};
export type InventoryLineUncheckedCreateWithoutProductInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventoryId: string;
};
export type InventoryLineCreateOrConnectWithoutProductInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput>;
};
export type InventoryLineCreateManyProductInputEnvelope = {
    data: Prisma.InventoryLineCreateManyProductInput | Prisma.InventoryLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type InventoryLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.InventoryLineUpdateWithoutProductInput, Prisma.InventoryLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.InventoryLineCreateWithoutProductInput, Prisma.InventoryLineUncheckedCreateWithoutProductInput>;
};
export type InventoryLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.InventoryLineUpdateWithoutProductInput, Prisma.InventoryLineUncheckedUpdateWithoutProductInput>;
};
export type InventoryLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.InventoryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.InventoryLineUpdateManyMutationInput, Prisma.InventoryLineUncheckedUpdateManyWithoutProductInput>;
};
export type InventoryLineScalarWhereInput = {
    AND?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
    OR?: Prisma.InventoryLineScalarWhereInput[];
    NOT?: Prisma.InventoryLineScalarWhereInput | Prisma.InventoryLineScalarWhereInput[];
    id?: Prisma.StringFilter<"InventoryLine"> | string;
    expectedQty?: Prisma.IntFilter<"InventoryLine"> | number;
    actualQty?: Prisma.IntFilter<"InventoryLine"> | number;
    difference?: Prisma.IntFilter<"InventoryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"InventoryLine"> | Date | string;
    inventoryId?: Prisma.StringFilter<"InventoryLine"> | string;
    productId?: Prisma.StringFilter<"InventoryLine"> | string;
};
export type InventoryLineCreateWithoutInventoryInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutInventoryLinesInput;
};
export type InventoryLineUncheckedCreateWithoutInventoryInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    productId: string;
};
export type InventoryLineCreateOrConnectWithoutInventoryInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput>;
};
export type InventoryLineCreateManyInventoryInputEnvelope = {
    data: Prisma.InventoryLineCreateManyInventoryInput | Prisma.InventoryLineCreateManyInventoryInput[];
    skipDuplicates?: boolean;
};
export type InventoryLineUpsertWithWhereUniqueWithoutInventoryInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.InventoryLineUpdateWithoutInventoryInput, Prisma.InventoryLineUncheckedUpdateWithoutInventoryInput>;
    create: Prisma.XOR<Prisma.InventoryLineCreateWithoutInventoryInput, Prisma.InventoryLineUncheckedCreateWithoutInventoryInput>;
};
export type InventoryLineUpdateWithWhereUniqueWithoutInventoryInput = {
    where: Prisma.InventoryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.InventoryLineUpdateWithoutInventoryInput, Prisma.InventoryLineUncheckedUpdateWithoutInventoryInput>;
};
export type InventoryLineUpdateManyWithWhereWithoutInventoryInput = {
    where: Prisma.InventoryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.InventoryLineUpdateManyMutationInput, Prisma.InventoryLineUncheckedUpdateManyWithoutInventoryInput>;
};
export type InventoryLineCreateManyProductInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    inventoryId: string;
};
export type InventoryLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventory?: Prisma.InventoryUpdateOneRequiredWithoutLinesNestedInput;
};
export type InventoryLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineCreateManyInventoryInput = {
    id?: string;
    expectedQty: number;
    actualQty: number;
    difference: number;
    createdAt?: Date | string;
    productId: string;
};
export type InventoryLineUpdateWithoutInventoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutInventoryLinesNestedInput;
};
export type InventoryLineUncheckedUpdateWithoutInventoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineUncheckedUpdateManyWithoutInventoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expectedQty?: Prisma.IntFieldUpdateOperationsInput | number;
    actualQty?: Prisma.IntFieldUpdateOperationsInput | number;
    difference?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type InventoryLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    expectedQty?: boolean;
    actualQty?: boolean;
    difference?: boolean;
    createdAt?: boolean;
    inventoryId?: boolean;
    productId?: boolean;
    inventory?: boolean | Prisma.InventoryDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventoryLine"]>;
export type InventoryLineSelectScalar = {
    id?: boolean;
    expectedQty?: boolean;
    actualQty?: boolean;
    difference?: boolean;
    createdAt?: boolean;
    inventoryId?: boolean;
    productId?: boolean;
};
export type InventoryLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "expectedQty" | "actualQty" | "difference" | "createdAt" | "inventoryId" | "productId", ExtArgs["result"]["inventoryLine"]>;
export type InventoryLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inventory?: boolean | Prisma.InventoryDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $InventoryLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InventoryLine";
    objects: {
        inventory: Prisma.$InventoryPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        expectedQty: number;
        actualQty: number;
        difference: number;
        createdAt: Date;
        inventoryId: string;
        productId: string;
    }, ExtArgs["result"]["inventoryLine"]>;
    composites: {};
};
export type InventoryLineGetPayload<S extends boolean | null | undefined | InventoryLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload, S>;
export type InventoryLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InventoryLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InventoryLineCountAggregateInputType | true;
};
export interface InventoryLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InventoryLine'];
        meta: {
            name: 'InventoryLine';
        };
    };
    findUnique<T extends InventoryLineFindUniqueArgs>(args: Prisma.SelectSubset<T, InventoryLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InventoryLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InventoryLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InventoryLineFindFirstArgs>(args?: Prisma.SelectSubset<T, InventoryLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InventoryLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InventoryLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InventoryLineFindManyArgs>(args?: Prisma.SelectSubset<T, InventoryLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InventoryLineCreateArgs>(args: Prisma.SelectSubset<T, InventoryLineCreateArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InventoryLineCreateManyArgs>(args?: Prisma.SelectSubset<T, InventoryLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends InventoryLineDeleteArgs>(args: Prisma.SelectSubset<T, InventoryLineDeleteArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InventoryLineUpdateArgs>(args: Prisma.SelectSubset<T, InventoryLineUpdateArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InventoryLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, InventoryLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InventoryLineUpdateManyArgs>(args: Prisma.SelectSubset<T, InventoryLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends InventoryLineUpsertArgs>(args: Prisma.SelectSubset<T, InventoryLineUpsertArgs<ExtArgs>>): Prisma.Prisma__InventoryLineClient<runtime.Types.Result.GetResult<Prisma.$InventoryLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InventoryLineCountArgs>(args?: Prisma.Subset<T, InventoryLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InventoryLineCountAggregateOutputType> : number>;
    aggregate<T extends InventoryLineAggregateArgs>(args: Prisma.Subset<T, InventoryLineAggregateArgs>): Prisma.PrismaPromise<GetInventoryLineAggregateType<T>>;
    groupBy<T extends InventoryLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InventoryLineGroupByArgs['orderBy'];
    } : {
        orderBy?: InventoryLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InventoryLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InventoryLineFieldRefs;
}
export interface Prisma__InventoryLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    inventory<T extends Prisma.InventoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryDefaultArgs<ExtArgs>>): Prisma.Prisma__InventoryClient<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InventoryLineFieldRefs {
    readonly id: Prisma.FieldRef<"InventoryLine", 'String'>;
    readonly expectedQty: Prisma.FieldRef<"InventoryLine", 'Int'>;
    readonly actualQty: Prisma.FieldRef<"InventoryLine", 'Int'>;
    readonly difference: Prisma.FieldRef<"InventoryLine", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"InventoryLine", 'DateTime'>;
    readonly inventoryId: Prisma.FieldRef<"InventoryLine", 'String'>;
    readonly productId: Prisma.FieldRef<"InventoryLine", 'String'>;
}
export type InventoryLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    where: Prisma.InventoryLineWhereUniqueInput;
};
export type InventoryLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    where: Prisma.InventoryLineWhereUniqueInput;
};
export type InventoryLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InventoryLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InventoryLineCreateInput, Prisma.InventoryLineUncheckedCreateInput>;
};
export type InventoryLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InventoryLineCreateManyInput | Prisma.InventoryLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InventoryLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InventoryLineUpdateInput, Prisma.InventoryLineUncheckedUpdateInput>;
    where: Prisma.InventoryLineWhereUniqueInput;
};
export type InventoryLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InventoryLineUpdateManyMutationInput, Prisma.InventoryLineUncheckedUpdateManyInput>;
    where?: Prisma.InventoryLineWhereInput;
    limit?: number;
};
export type InventoryLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    where: Prisma.InventoryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryLineCreateInput, Prisma.InventoryLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InventoryLineUpdateInput, Prisma.InventoryLineUncheckedUpdateInput>;
};
export type InventoryLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
    where: Prisma.InventoryLineWhereUniqueInput;
};
export type InventoryLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryLineWhereInput;
    limit?: number;
};
export type InventoryLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InventoryLineSelect<ExtArgs> | null;
    omit?: Prisma.InventoryLineOmit<ExtArgs> | null;
    include?: Prisma.InventoryLineInclude<ExtArgs> | null;
};
