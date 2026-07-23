import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ExitLineModel = runtime.Types.Result.DefaultSelection<Prisma.$ExitLinePayload>;
export type AggregateExitLine = {
    _count: ExitLineCountAggregateOutputType | null;
    _avg: ExitLineAvgAggregateOutputType | null;
    _sum: ExitLineSumAggregateOutputType | null;
    _min: ExitLineMinAggregateOutputType | null;
    _max: ExitLineMaxAggregateOutputType | null;
};
export type ExitLineAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type ExitLineSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type ExitLineMinAggregateOutputType = {
    id: string | null;
    quantity: number | null;
    unitPrice: number | null;
    createdAt: Date | null;
    exitId: string | null;
    productId: string | null;
};
export type ExitLineMaxAggregateOutputType = {
    id: string | null;
    quantity: number | null;
    unitPrice: number | null;
    createdAt: Date | null;
    exitId: string | null;
    productId: string | null;
};
export type ExitLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    unitPrice: number;
    createdAt: number;
    exitId: number;
    productId: number;
    _all: number;
};
export type ExitLineAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type ExitLineSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type ExitLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    exitId?: true;
    productId?: true;
};
export type ExitLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    exitId?: true;
    productId?: true;
};
export type ExitLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    exitId?: true;
    productId?: true;
    _all?: true;
};
export type ExitLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitLineWhereInput;
    orderBy?: Prisma.ExitLineOrderByWithRelationInput | Prisma.ExitLineOrderByWithRelationInput[];
    cursor?: Prisma.ExitLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExitLineCountAggregateInputType;
    _avg?: ExitLineAvgAggregateInputType;
    _sum?: ExitLineSumAggregateInputType;
    _min?: ExitLineMinAggregateInputType;
    _max?: ExitLineMaxAggregateInputType;
};
export type GetExitLineAggregateType<T extends ExitLineAggregateArgs> = {
    [P in keyof T & keyof AggregateExitLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExitLine[P]> : Prisma.GetScalarType<T[P], AggregateExitLine[P]>;
};
export type ExitLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitLineWhereInput;
    orderBy?: Prisma.ExitLineOrderByWithAggregationInput | Prisma.ExitLineOrderByWithAggregationInput[];
    by: Prisma.ExitLineScalarFieldEnum[] | Prisma.ExitLineScalarFieldEnum;
    having?: Prisma.ExitLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExitLineCountAggregateInputType | true;
    _avg?: ExitLineAvgAggregateInputType;
    _sum?: ExitLineSumAggregateInputType;
    _min?: ExitLineMinAggregateInputType;
    _max?: ExitLineMaxAggregateInputType;
};
export type ExitLineGroupByOutputType = {
    id: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    exitId: string;
    productId: string;
    _count: ExitLineCountAggregateOutputType | null;
    _avg: ExitLineAvgAggregateOutputType | null;
    _sum: ExitLineSumAggregateOutputType | null;
    _min: ExitLineMinAggregateOutputType | null;
    _max: ExitLineMaxAggregateOutputType | null;
};
export type GetExitLineGroupByPayload<T extends ExitLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExitLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExitLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExitLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExitLineGroupByOutputType[P]>;
}>>;
export type ExitLineWhereInput = {
    AND?: Prisma.ExitLineWhereInput | Prisma.ExitLineWhereInput[];
    OR?: Prisma.ExitLineWhereInput[];
    NOT?: Prisma.ExitLineWhereInput | Prisma.ExitLineWhereInput[];
    id?: Prisma.StringFilter<"ExitLine"> | string;
    quantity?: Prisma.IntFilter<"ExitLine"> | number;
    unitPrice?: Prisma.FloatFilter<"ExitLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExitLine"> | Date | string;
    exitId?: Prisma.StringFilter<"ExitLine"> | string;
    productId?: Prisma.StringFilter<"ExitLine"> | string;
    exit?: Prisma.XOR<Prisma.ExitScalarRelationFilter, Prisma.ExitWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ExitLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exitId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    exit?: Prisma.ExitOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    _relevance?: Prisma.ExitLineOrderByRelevanceInput;
};
export type ExitLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExitLineWhereInput | Prisma.ExitLineWhereInput[];
    OR?: Prisma.ExitLineWhereInput[];
    NOT?: Prisma.ExitLineWhereInput | Prisma.ExitLineWhereInput[];
    quantity?: Prisma.IntFilter<"ExitLine"> | number;
    unitPrice?: Prisma.FloatFilter<"ExitLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExitLine"> | Date | string;
    exitId?: Prisma.StringFilter<"ExitLine"> | string;
    productId?: Prisma.StringFilter<"ExitLine"> | string;
    exit?: Prisma.XOR<Prisma.ExitScalarRelationFilter, Prisma.ExitWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type ExitLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exitId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    _count?: Prisma.ExitLineCountOrderByAggregateInput;
    _avg?: Prisma.ExitLineAvgOrderByAggregateInput;
    _max?: Prisma.ExitLineMaxOrderByAggregateInput;
    _min?: Prisma.ExitLineMinOrderByAggregateInput;
    _sum?: Prisma.ExitLineSumOrderByAggregateInput;
};
export type ExitLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExitLineScalarWhereWithAggregatesInput | Prisma.ExitLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExitLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExitLineScalarWhereWithAggregatesInput | Prisma.ExitLineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExitLine"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"ExitLine"> | number;
    unitPrice?: Prisma.FloatWithAggregatesFilter<"ExitLine"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ExitLine"> | Date | string;
    exitId?: Prisma.StringWithAggregatesFilter<"ExitLine"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ExitLine"> | string;
};
export type ExitLineCreateInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exit: Prisma.ExitCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutExitLinesInput;
};
export type ExitLineUncheckedCreateInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exitId: string;
    productId: string;
};
export type ExitLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exit?: Prisma.ExitUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutExitLinesNestedInput;
};
export type ExitLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineCreateManyInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exitId: string;
    productId: string;
};
export type ExitLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExitLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineListRelationFilter = {
    every?: Prisma.ExitLineWhereInput;
    some?: Prisma.ExitLineWhereInput;
    none?: Prisma.ExitLineWhereInput;
};
export type ExitLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExitLineOrderByRelevanceInput = {
    fields: Prisma.ExitLineOrderByRelevanceFieldEnum | Prisma.ExitLineOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ExitLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exitId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type ExitLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type ExitLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exitId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type ExitLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exitId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type ExitLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type ExitLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput> | Prisma.ExitLineCreateWithoutProductInput[] | Prisma.ExitLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutProductInput | Prisma.ExitLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ExitLineCreateManyProductInputEnvelope;
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
};
export type ExitLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput> | Prisma.ExitLineCreateWithoutProductInput[] | Prisma.ExitLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutProductInput | Prisma.ExitLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ExitLineCreateManyProductInputEnvelope;
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
};
export type ExitLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput> | Prisma.ExitLineCreateWithoutProductInput[] | Prisma.ExitLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutProductInput | Prisma.ExitLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ExitLineUpsertWithWhereUniqueWithoutProductInput | Prisma.ExitLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ExitLineCreateManyProductInputEnvelope;
    set?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    disconnect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    delete?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    update?: Prisma.ExitLineUpdateWithWhereUniqueWithoutProductInput | Prisma.ExitLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ExitLineUpdateManyWithWhereWithoutProductInput | Prisma.ExitLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
};
export type ExitLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput> | Prisma.ExitLineCreateWithoutProductInput[] | Prisma.ExitLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutProductInput | Prisma.ExitLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ExitLineUpsertWithWhereUniqueWithoutProductInput | Prisma.ExitLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ExitLineCreateManyProductInputEnvelope;
    set?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    disconnect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    delete?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    update?: Prisma.ExitLineUpdateWithWhereUniqueWithoutProductInput | Prisma.ExitLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ExitLineUpdateManyWithWhereWithoutProductInput | Prisma.ExitLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
};
export type ExitLineCreateNestedManyWithoutExitInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput> | Prisma.ExitLineCreateWithoutExitInput[] | Prisma.ExitLineUncheckedCreateWithoutExitInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutExitInput | Prisma.ExitLineCreateOrConnectWithoutExitInput[];
    createMany?: Prisma.ExitLineCreateManyExitInputEnvelope;
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
};
export type ExitLineUncheckedCreateNestedManyWithoutExitInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput> | Prisma.ExitLineCreateWithoutExitInput[] | Prisma.ExitLineUncheckedCreateWithoutExitInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutExitInput | Prisma.ExitLineCreateOrConnectWithoutExitInput[];
    createMany?: Prisma.ExitLineCreateManyExitInputEnvelope;
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
};
export type ExitLineUpdateManyWithoutExitNestedInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput> | Prisma.ExitLineCreateWithoutExitInput[] | Prisma.ExitLineUncheckedCreateWithoutExitInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutExitInput | Prisma.ExitLineCreateOrConnectWithoutExitInput[];
    upsert?: Prisma.ExitLineUpsertWithWhereUniqueWithoutExitInput | Prisma.ExitLineUpsertWithWhereUniqueWithoutExitInput[];
    createMany?: Prisma.ExitLineCreateManyExitInputEnvelope;
    set?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    disconnect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    delete?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    update?: Prisma.ExitLineUpdateWithWhereUniqueWithoutExitInput | Prisma.ExitLineUpdateWithWhereUniqueWithoutExitInput[];
    updateMany?: Prisma.ExitLineUpdateManyWithWhereWithoutExitInput | Prisma.ExitLineUpdateManyWithWhereWithoutExitInput[];
    deleteMany?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
};
export type ExitLineUncheckedUpdateManyWithoutExitNestedInput = {
    create?: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput> | Prisma.ExitLineCreateWithoutExitInput[] | Prisma.ExitLineUncheckedCreateWithoutExitInput[];
    connectOrCreate?: Prisma.ExitLineCreateOrConnectWithoutExitInput | Prisma.ExitLineCreateOrConnectWithoutExitInput[];
    upsert?: Prisma.ExitLineUpsertWithWhereUniqueWithoutExitInput | Prisma.ExitLineUpsertWithWhereUniqueWithoutExitInput[];
    createMany?: Prisma.ExitLineCreateManyExitInputEnvelope;
    set?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    disconnect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    delete?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    connect?: Prisma.ExitLineWhereUniqueInput | Prisma.ExitLineWhereUniqueInput[];
    update?: Prisma.ExitLineUpdateWithWhereUniqueWithoutExitInput | Prisma.ExitLineUpdateWithWhereUniqueWithoutExitInput[];
    updateMany?: Prisma.ExitLineUpdateManyWithWhereWithoutExitInput | Prisma.ExitLineUpdateManyWithWhereWithoutExitInput[];
    deleteMany?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
};
export type ExitLineCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exit: Prisma.ExitCreateNestedOneWithoutLinesInput;
};
export type ExitLineUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exitId: string;
};
export type ExitLineCreateOrConnectWithoutProductInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput>;
};
export type ExitLineCreateManyProductInputEnvelope = {
    data: Prisma.ExitLineCreateManyProductInput | Prisma.ExitLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ExitLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExitLineUpdateWithoutProductInput, Prisma.ExitLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ExitLineCreateWithoutProductInput, Prisma.ExitLineUncheckedCreateWithoutProductInput>;
};
export type ExitLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExitLineUpdateWithoutProductInput, Prisma.ExitLineUncheckedUpdateWithoutProductInput>;
};
export type ExitLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ExitLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ExitLineUpdateManyMutationInput, Prisma.ExitLineUncheckedUpdateManyWithoutProductInput>;
};
export type ExitLineScalarWhereInput = {
    AND?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
    OR?: Prisma.ExitLineScalarWhereInput[];
    NOT?: Prisma.ExitLineScalarWhereInput | Prisma.ExitLineScalarWhereInput[];
    id?: Prisma.StringFilter<"ExitLine"> | string;
    quantity?: Prisma.IntFilter<"ExitLine"> | number;
    unitPrice?: Prisma.FloatFilter<"ExitLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"ExitLine"> | Date | string;
    exitId?: Prisma.StringFilter<"ExitLine"> | string;
    productId?: Prisma.StringFilter<"ExitLine"> | string;
};
export type ExitLineCreateWithoutExitInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutExitLinesInput;
};
export type ExitLineUncheckedCreateWithoutExitInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    productId: string;
};
export type ExitLineCreateOrConnectWithoutExitInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput>;
};
export type ExitLineCreateManyExitInputEnvelope = {
    data: Prisma.ExitLineCreateManyExitInput | Prisma.ExitLineCreateManyExitInput[];
    skipDuplicates?: boolean;
};
export type ExitLineUpsertWithWhereUniqueWithoutExitInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExitLineUpdateWithoutExitInput, Prisma.ExitLineUncheckedUpdateWithoutExitInput>;
    create: Prisma.XOR<Prisma.ExitLineCreateWithoutExitInput, Prisma.ExitLineUncheckedCreateWithoutExitInput>;
};
export type ExitLineUpdateWithWhereUniqueWithoutExitInput = {
    where: Prisma.ExitLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExitLineUpdateWithoutExitInput, Prisma.ExitLineUncheckedUpdateWithoutExitInput>;
};
export type ExitLineUpdateManyWithWhereWithoutExitInput = {
    where: Prisma.ExitLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ExitLineUpdateManyMutationInput, Prisma.ExitLineUncheckedUpdateManyWithoutExitInput>;
};
export type ExitLineCreateManyProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    exitId: string;
};
export type ExitLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exit?: Prisma.ExitUpdateOneRequiredWithoutLinesNestedInput;
};
export type ExitLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exitId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineCreateManyExitInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    productId: string;
};
export type ExitLineUpdateWithoutExitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutExitLinesNestedInput;
};
export type ExitLineUncheckedUpdateWithoutExitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineUncheckedUpdateManyWithoutExitInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExitLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    createdAt?: boolean;
    exitId?: boolean;
    productId?: boolean;
    exit?: boolean | Prisma.ExitDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exitLine"]>;
export type ExitLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    createdAt?: boolean;
    exitId?: boolean;
    productId?: boolean;
};
export type ExitLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "unitPrice" | "createdAt" | "exitId" | "productId", ExtArgs["result"]["exitLine"]>;
export type ExitLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exit?: boolean | Prisma.ExitDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ExitLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExitLine";
    objects: {
        exit: Prisma.$ExitPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        exitId: string;
        productId: string;
    }, ExtArgs["result"]["exitLine"]>;
    composites: {};
};
export type ExitLineGetPayload<S extends boolean | null | undefined | ExitLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExitLinePayload, S>;
export type ExitLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExitLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExitLineCountAggregateInputType | true;
};
export interface ExitLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExitLine'];
        meta: {
            name: 'ExitLine';
        };
    };
    findUnique<T extends ExitLineFindUniqueArgs>(args: Prisma.SelectSubset<T, ExitLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExitLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExitLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExitLineFindFirstArgs>(args?: Prisma.SelectSubset<T, ExitLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExitLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExitLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExitLineFindManyArgs>(args?: Prisma.SelectSubset<T, ExitLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExitLineCreateArgs>(args: Prisma.SelectSubset<T, ExitLineCreateArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExitLineCreateManyArgs>(args?: Prisma.SelectSubset<T, ExitLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ExitLineDeleteArgs>(args: Prisma.SelectSubset<T, ExitLineDeleteArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExitLineUpdateArgs>(args: Prisma.SelectSubset<T, ExitLineUpdateArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExitLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExitLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExitLineUpdateManyArgs>(args: Prisma.SelectSubset<T, ExitLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ExitLineUpsertArgs>(args: Prisma.SelectSubset<T, ExitLineUpsertArgs<ExtArgs>>): Prisma.Prisma__ExitLineClient<runtime.Types.Result.GetResult<Prisma.$ExitLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExitLineCountArgs>(args?: Prisma.Subset<T, ExitLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExitLineCountAggregateOutputType> : number>;
    aggregate<T extends ExitLineAggregateArgs>(args: Prisma.Subset<T, ExitLineAggregateArgs>): Prisma.PrismaPromise<GetExitLineAggregateType<T>>;
    groupBy<T extends ExitLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExitLineGroupByArgs['orderBy'];
    } : {
        orderBy?: ExitLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExitLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExitLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExitLineFieldRefs;
}
export interface Prisma__ExitLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    exit<T extends Prisma.ExitDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ExitDefaultArgs<ExtArgs>>): Prisma.Prisma__ExitClient<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExitLineFieldRefs {
    readonly id: Prisma.FieldRef<"ExitLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"ExitLine", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"ExitLine", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"ExitLine", 'DateTime'>;
    readonly exitId: Prisma.FieldRef<"ExitLine", 'String'>;
    readonly productId: Prisma.FieldRef<"ExitLine", 'String'>;
}
export type ExitLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    where: Prisma.ExitLineWhereUniqueInput;
};
export type ExitLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    where: Prisma.ExitLineWhereUniqueInput;
};
export type ExitLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ExitLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExitLineCreateInput, Prisma.ExitLineUncheckedCreateInput>;
};
export type ExitLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExitLineCreateManyInput | Prisma.ExitLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExitLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExitLineUpdateInput, Prisma.ExitLineUncheckedUpdateInput>;
    where: Prisma.ExitLineWhereUniqueInput;
};
export type ExitLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExitLineUpdateManyMutationInput, Prisma.ExitLineUncheckedUpdateManyInput>;
    where?: Prisma.ExitLineWhereInput;
    limit?: number;
};
export type ExitLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    where: Prisma.ExitLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExitLineCreateInput, Prisma.ExitLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExitLineUpdateInput, Prisma.ExitLineUncheckedUpdateInput>;
};
export type ExitLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
    where: Prisma.ExitLineWhereUniqueInput;
};
export type ExitLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitLineWhereInput;
    limit?: number;
};
export type ExitLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExitLineSelect<ExtArgs> | null;
    omit?: Prisma.ExitLineOmit<ExtArgs> | null;
    include?: Prisma.ExitLineInclude<ExtArgs> | null;
};
