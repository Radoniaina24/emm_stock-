import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EntryLineModel = runtime.Types.Result.DefaultSelection<Prisma.$EntryLinePayload>;
export type AggregateEntryLine = {
    _count: EntryLineCountAggregateOutputType | null;
    _avg: EntryLineAvgAggregateOutputType | null;
    _sum: EntryLineSumAggregateOutputType | null;
    _min: EntryLineMinAggregateOutputType | null;
    _max: EntryLineMaxAggregateOutputType | null;
};
export type EntryLineAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type EntryLineSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: number | null;
};
export type EntryLineMinAggregateOutputType = {
    id: string | null;
    quantity: number | null;
    unitPrice: number | null;
    createdAt: Date | null;
    entryId: string | null;
    productId: string | null;
};
export type EntryLineMaxAggregateOutputType = {
    id: string | null;
    quantity: number | null;
    unitPrice: number | null;
    createdAt: Date | null;
    entryId: string | null;
    productId: string | null;
};
export type EntryLineCountAggregateOutputType = {
    id: number;
    quantity: number;
    unitPrice: number;
    createdAt: number;
    entryId: number;
    productId: number;
    _all: number;
};
export type EntryLineAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type EntryLineSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
};
export type EntryLineMinAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    entryId?: true;
    productId?: true;
};
export type EntryLineMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    entryId?: true;
    productId?: true;
};
export type EntryLineCountAggregateInputType = {
    id?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    entryId?: true;
    productId?: true;
    _all?: true;
};
export type EntryLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryLineWhereInput;
    orderBy?: Prisma.EntryLineOrderByWithRelationInput | Prisma.EntryLineOrderByWithRelationInput[];
    cursor?: Prisma.EntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EntryLineCountAggregateInputType;
    _avg?: EntryLineAvgAggregateInputType;
    _sum?: EntryLineSumAggregateInputType;
    _min?: EntryLineMinAggregateInputType;
    _max?: EntryLineMaxAggregateInputType;
};
export type GetEntryLineAggregateType<T extends EntryLineAggregateArgs> = {
    [P in keyof T & keyof AggregateEntryLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntryLine[P]> : Prisma.GetScalarType<T[P], AggregateEntryLine[P]>;
};
export type EntryLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryLineWhereInput;
    orderBy?: Prisma.EntryLineOrderByWithAggregationInput | Prisma.EntryLineOrderByWithAggregationInput[];
    by: Prisma.EntryLineScalarFieldEnum[] | Prisma.EntryLineScalarFieldEnum;
    having?: Prisma.EntryLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntryLineCountAggregateInputType | true;
    _avg?: EntryLineAvgAggregateInputType;
    _sum?: EntryLineSumAggregateInputType;
    _min?: EntryLineMinAggregateInputType;
    _max?: EntryLineMaxAggregateInputType;
};
export type EntryLineGroupByOutputType = {
    id: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    entryId: string;
    productId: string;
    _count: EntryLineCountAggregateOutputType | null;
    _avg: EntryLineAvgAggregateOutputType | null;
    _sum: EntryLineSumAggregateOutputType | null;
    _min: EntryLineMinAggregateOutputType | null;
    _max: EntryLineMaxAggregateOutputType | null;
};
export type GetEntryLineGroupByPayload<T extends EntryLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntryLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntryLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntryLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntryLineGroupByOutputType[P]>;
}>>;
export type EntryLineWhereInput = {
    AND?: Prisma.EntryLineWhereInput | Prisma.EntryLineWhereInput[];
    OR?: Prisma.EntryLineWhereInput[];
    NOT?: Prisma.EntryLineWhereInput | Prisma.EntryLineWhereInput[];
    id?: Prisma.StringFilter<"EntryLine"> | string;
    quantity?: Prisma.IntFilter<"EntryLine"> | number;
    unitPrice?: Prisma.FloatFilter<"EntryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"EntryLine"> | Date | string;
    entryId?: Prisma.StringFilter<"EntryLine"> | string;
    productId?: Prisma.StringFilter<"EntryLine"> | string;
    entry?: Prisma.XOR<Prisma.EntryScalarRelationFilter, Prisma.EntryWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type EntryLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    entryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    entry?: Prisma.EntryOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    _relevance?: Prisma.EntryLineOrderByRelevanceInput;
};
export type EntryLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EntryLineWhereInput | Prisma.EntryLineWhereInput[];
    OR?: Prisma.EntryLineWhereInput[];
    NOT?: Prisma.EntryLineWhereInput | Prisma.EntryLineWhereInput[];
    quantity?: Prisma.IntFilter<"EntryLine"> | number;
    unitPrice?: Prisma.FloatFilter<"EntryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"EntryLine"> | Date | string;
    entryId?: Prisma.StringFilter<"EntryLine"> | string;
    productId?: Prisma.StringFilter<"EntryLine"> | string;
    entry?: Prisma.XOR<Prisma.EntryScalarRelationFilter, Prisma.EntryWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type EntryLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    entryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    _count?: Prisma.EntryLineCountOrderByAggregateInput;
    _avg?: Prisma.EntryLineAvgOrderByAggregateInput;
    _max?: Prisma.EntryLineMaxOrderByAggregateInput;
    _min?: Prisma.EntryLineMinOrderByAggregateInput;
    _sum?: Prisma.EntryLineSumOrderByAggregateInput;
};
export type EntryLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntryLineScalarWhereWithAggregatesInput | Prisma.EntryLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntryLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntryLineScalarWhereWithAggregatesInput | Prisma.EntryLineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EntryLine"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"EntryLine"> | number;
    unitPrice?: Prisma.FloatWithAggregatesFilter<"EntryLine"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EntryLine"> | Date | string;
    entryId?: Prisma.StringWithAggregatesFilter<"EntryLine"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"EntryLine"> | string;
};
export type EntryLineCreateInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entry: Prisma.EntryCreateNestedOneWithoutLinesInput;
    product: Prisma.ProductCreateNestedOneWithoutEntriesInput;
};
export type EntryLineUncheckedCreateInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entryId: string;
    productId: string;
};
export type EntryLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entry?: Prisma.EntryUpdateOneRequiredWithoutLinesNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entryId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineCreateManyInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entryId: string;
    productId: string;
};
export type EntryLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntryLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entryId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineListRelationFilter = {
    every?: Prisma.EntryLineWhereInput;
    some?: Prisma.EntryLineWhereInput;
    none?: Prisma.EntryLineWhereInput;
};
export type EntryLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EntryLineOrderByRelevanceInput = {
    fields: Prisma.EntryLineOrderByRelevanceFieldEnum | Prisma.EntryLineOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type EntryLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    entryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type EntryLineAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type EntryLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    entryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type EntryLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    entryId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
};
export type EntryLineSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type EntryLineCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput> | Prisma.EntryLineCreateWithoutProductInput[] | Prisma.EntryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutProductInput | Prisma.EntryLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.EntryLineCreateManyProductInputEnvelope;
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
};
export type EntryLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput> | Prisma.EntryLineCreateWithoutProductInput[] | Prisma.EntryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutProductInput | Prisma.EntryLineCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.EntryLineCreateManyProductInputEnvelope;
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
};
export type EntryLineUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput> | Prisma.EntryLineCreateWithoutProductInput[] | Prisma.EntryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutProductInput | Prisma.EntryLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.EntryLineUpsertWithWhereUniqueWithoutProductInput | Prisma.EntryLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.EntryLineCreateManyProductInputEnvelope;
    set?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    disconnect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    delete?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    update?: Prisma.EntryLineUpdateWithWhereUniqueWithoutProductInput | Prisma.EntryLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.EntryLineUpdateManyWithWhereWithoutProductInput | Prisma.EntryLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
};
export type EntryLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput> | Prisma.EntryLineCreateWithoutProductInput[] | Prisma.EntryLineUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutProductInput | Prisma.EntryLineCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.EntryLineUpsertWithWhereUniqueWithoutProductInput | Prisma.EntryLineUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.EntryLineCreateManyProductInputEnvelope;
    set?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    disconnect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    delete?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    update?: Prisma.EntryLineUpdateWithWhereUniqueWithoutProductInput | Prisma.EntryLineUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.EntryLineUpdateManyWithWhereWithoutProductInput | Prisma.EntryLineUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
};
export type EntryLineCreateNestedManyWithoutEntryInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput> | Prisma.EntryLineCreateWithoutEntryInput[] | Prisma.EntryLineUncheckedCreateWithoutEntryInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutEntryInput | Prisma.EntryLineCreateOrConnectWithoutEntryInput[];
    createMany?: Prisma.EntryLineCreateManyEntryInputEnvelope;
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
};
export type EntryLineUncheckedCreateNestedManyWithoutEntryInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput> | Prisma.EntryLineCreateWithoutEntryInput[] | Prisma.EntryLineUncheckedCreateWithoutEntryInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutEntryInput | Prisma.EntryLineCreateOrConnectWithoutEntryInput[];
    createMany?: Prisma.EntryLineCreateManyEntryInputEnvelope;
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
};
export type EntryLineUpdateManyWithoutEntryNestedInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput> | Prisma.EntryLineCreateWithoutEntryInput[] | Prisma.EntryLineUncheckedCreateWithoutEntryInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutEntryInput | Prisma.EntryLineCreateOrConnectWithoutEntryInput[];
    upsert?: Prisma.EntryLineUpsertWithWhereUniqueWithoutEntryInput | Prisma.EntryLineUpsertWithWhereUniqueWithoutEntryInput[];
    createMany?: Prisma.EntryLineCreateManyEntryInputEnvelope;
    set?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    disconnect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    delete?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    update?: Prisma.EntryLineUpdateWithWhereUniqueWithoutEntryInput | Prisma.EntryLineUpdateWithWhereUniqueWithoutEntryInput[];
    updateMany?: Prisma.EntryLineUpdateManyWithWhereWithoutEntryInput | Prisma.EntryLineUpdateManyWithWhereWithoutEntryInput[];
    deleteMany?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
};
export type EntryLineUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput> | Prisma.EntryLineCreateWithoutEntryInput[] | Prisma.EntryLineUncheckedCreateWithoutEntryInput[];
    connectOrCreate?: Prisma.EntryLineCreateOrConnectWithoutEntryInput | Prisma.EntryLineCreateOrConnectWithoutEntryInput[];
    upsert?: Prisma.EntryLineUpsertWithWhereUniqueWithoutEntryInput | Prisma.EntryLineUpsertWithWhereUniqueWithoutEntryInput[];
    createMany?: Prisma.EntryLineCreateManyEntryInputEnvelope;
    set?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    disconnect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    delete?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    connect?: Prisma.EntryLineWhereUniqueInput | Prisma.EntryLineWhereUniqueInput[];
    update?: Prisma.EntryLineUpdateWithWhereUniqueWithoutEntryInput | Prisma.EntryLineUpdateWithWhereUniqueWithoutEntryInput[];
    updateMany?: Prisma.EntryLineUpdateManyWithWhereWithoutEntryInput | Prisma.EntryLineUpdateManyWithWhereWithoutEntryInput[];
    deleteMany?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
};
export type EntryLineCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entry: Prisma.EntryCreateNestedOneWithoutLinesInput;
};
export type EntryLineUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entryId: string;
};
export type EntryLineCreateOrConnectWithoutProductInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput>;
};
export type EntryLineCreateManyProductInputEnvelope = {
    data: Prisma.EntryLineCreateManyProductInput | Prisma.EntryLineCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type EntryLineUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntryLineUpdateWithoutProductInput, Prisma.EntryLineUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.EntryLineCreateWithoutProductInput, Prisma.EntryLineUncheckedCreateWithoutProductInput>;
};
export type EntryLineUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntryLineUpdateWithoutProductInput, Prisma.EntryLineUncheckedUpdateWithoutProductInput>;
};
export type EntryLineUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.EntryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.EntryLineUpdateManyMutationInput, Prisma.EntryLineUncheckedUpdateManyWithoutProductInput>;
};
export type EntryLineScalarWhereInput = {
    AND?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
    OR?: Prisma.EntryLineScalarWhereInput[];
    NOT?: Prisma.EntryLineScalarWhereInput | Prisma.EntryLineScalarWhereInput[];
    id?: Prisma.StringFilter<"EntryLine"> | string;
    quantity?: Prisma.IntFilter<"EntryLine"> | number;
    unitPrice?: Prisma.FloatFilter<"EntryLine"> | number;
    createdAt?: Prisma.DateTimeFilter<"EntryLine"> | Date | string;
    entryId?: Prisma.StringFilter<"EntryLine"> | string;
    productId?: Prisma.StringFilter<"EntryLine"> | string;
};
export type EntryLineCreateWithoutEntryInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutEntriesInput;
};
export type EntryLineUncheckedCreateWithoutEntryInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    productId: string;
};
export type EntryLineCreateOrConnectWithoutEntryInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput>;
};
export type EntryLineCreateManyEntryInputEnvelope = {
    data: Prisma.EntryLineCreateManyEntryInput | Prisma.EntryLineCreateManyEntryInput[];
    skipDuplicates?: boolean;
};
export type EntryLineUpsertWithWhereUniqueWithoutEntryInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntryLineUpdateWithoutEntryInput, Prisma.EntryLineUncheckedUpdateWithoutEntryInput>;
    create: Prisma.XOR<Prisma.EntryLineCreateWithoutEntryInput, Prisma.EntryLineUncheckedCreateWithoutEntryInput>;
};
export type EntryLineUpdateWithWhereUniqueWithoutEntryInput = {
    where: Prisma.EntryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntryLineUpdateWithoutEntryInput, Prisma.EntryLineUncheckedUpdateWithoutEntryInput>;
};
export type EntryLineUpdateManyWithWhereWithoutEntryInput = {
    where: Prisma.EntryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.EntryLineUpdateManyMutationInput, Prisma.EntryLineUncheckedUpdateManyWithoutEntryInput>;
};
export type EntryLineCreateManyProductInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    entryId: string;
};
export type EntryLineUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entry?: Prisma.EntryUpdateOneRequiredWithoutLinesNestedInput;
};
export type EntryLineUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineCreateManyEntryInput = {
    id?: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date | string;
    productId: string;
};
export type EntryLineUpdateWithoutEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EntryLineUncheckedUpdateWithoutEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineUncheckedUpdateManyWithoutEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntryLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    createdAt?: boolean;
    entryId?: boolean;
    productId?: boolean;
    entry?: boolean | Prisma.EntryDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entryLine"]>;
export type EntryLineSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    createdAt?: boolean;
    entryId?: boolean;
    productId?: boolean;
};
export type EntryLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "unitPrice" | "createdAt" | "entryId" | "productId", ExtArgs["result"]["entryLine"]>;
export type EntryLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entry?: boolean | Prisma.EntryDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $EntryLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EntryLine";
    objects: {
        entry: Prisma.$EntryPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: number;
        unitPrice: number;
        createdAt: Date;
        entryId: string;
        productId: string;
    }, ExtArgs["result"]["entryLine"]>;
    composites: {};
};
export type EntryLineGetPayload<S extends boolean | null | undefined | EntryLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntryLinePayload, S>;
export type EntryLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntryLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntryLineCountAggregateInputType | true;
};
export interface EntryLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EntryLine'];
        meta: {
            name: 'EntryLine';
        };
    };
    findUnique<T extends EntryLineFindUniqueArgs>(args: Prisma.SelectSubset<T, EntryLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EntryLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntryLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EntryLineFindFirstArgs>(args?: Prisma.SelectSubset<T, EntryLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EntryLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntryLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EntryLineFindManyArgs>(args?: Prisma.SelectSubset<T, EntryLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EntryLineCreateArgs>(args: Prisma.SelectSubset<T, EntryLineCreateArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EntryLineCreateManyArgs>(args?: Prisma.SelectSubset<T, EntryLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends EntryLineDeleteArgs>(args: Prisma.SelectSubset<T, EntryLineDeleteArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EntryLineUpdateArgs>(args: Prisma.SelectSubset<T, EntryLineUpdateArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EntryLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntryLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EntryLineUpdateManyArgs>(args: Prisma.SelectSubset<T, EntryLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends EntryLineUpsertArgs>(args: Prisma.SelectSubset<T, EntryLineUpsertArgs<ExtArgs>>): Prisma.Prisma__EntryLineClient<runtime.Types.Result.GetResult<Prisma.$EntryLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EntryLineCountArgs>(args?: Prisma.Subset<T, EntryLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntryLineCountAggregateOutputType> : number>;
    aggregate<T extends EntryLineAggregateArgs>(args: Prisma.Subset<T, EntryLineAggregateArgs>): Prisma.PrismaPromise<GetEntryLineAggregateType<T>>;
    groupBy<T extends EntryLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntryLineGroupByArgs['orderBy'];
    } : {
        orderBy?: EntryLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntryLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EntryLineFieldRefs;
}
export interface Prisma__EntryLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    entry<T extends Prisma.EntryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EntryDefaultArgs<ExtArgs>>): Prisma.Prisma__EntryClient<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EntryLineFieldRefs {
    readonly id: Prisma.FieldRef<"EntryLine", 'String'>;
    readonly quantity: Prisma.FieldRef<"EntryLine", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"EntryLine", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"EntryLine", 'DateTime'>;
    readonly entryId: Prisma.FieldRef<"EntryLine", 'String'>;
    readonly productId: Prisma.FieldRef<"EntryLine", 'String'>;
}
export type EntryLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    where: Prisma.EntryLineWhereUniqueInput;
};
export type EntryLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    where: Prisma.EntryLineWhereUniqueInput;
};
export type EntryLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EntryLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntryLineCreateInput, Prisma.EntryLineUncheckedCreateInput>;
};
export type EntryLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EntryLineCreateManyInput | Prisma.EntryLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EntryLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EntryLineUpdateInput, Prisma.EntryLineUncheckedUpdateInput>;
    where: Prisma.EntryLineWhereUniqueInput;
};
export type EntryLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EntryLineUpdateManyMutationInput, Prisma.EntryLineUncheckedUpdateManyInput>;
    where?: Prisma.EntryLineWhereInput;
    limit?: number;
};
export type EntryLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    where: Prisma.EntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntryLineCreateInput, Prisma.EntryLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EntryLineUpdateInput, Prisma.EntryLineUncheckedUpdateInput>;
};
export type EntryLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
    where: Prisma.EntryLineWhereUniqueInput;
};
export type EntryLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryLineWhereInput;
    limit?: number;
};
export type EntryLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EntryLineSelect<ExtArgs> | null;
    omit?: Prisma.EntryLineOmit<ExtArgs> | null;
    include?: Prisma.EntryLineInclude<ExtArgs> | null;
};
