import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BrandModel = runtime.Types.Result.DefaultSelection<Prisma.$BrandPayload>;
export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null;
    _min: BrandMinAggregateOutputType | null;
    _max: BrandMaxAggregateOutputType | null;
};
export type BrandMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BrandMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BrandCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BrandMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BrandMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BrandCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BrandAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput | Prisma.BrandOrderByWithRelationInput[];
    cursor?: Prisma.BrandWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BrandCountAggregateInputType;
    _min?: BrandMinAggregateInputType;
    _max?: BrandMaxAggregateInputType;
};
export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
    [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBrand[P]> : Prisma.GetScalarType<T[P], AggregateBrand[P]>;
};
export type BrandGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithAggregationInput | Prisma.BrandOrderByWithAggregationInput[];
    by: Prisma.BrandScalarFieldEnum[] | Prisma.BrandScalarFieldEnum;
    having?: Prisma.BrandScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BrandCountAggregateInputType | true;
    _min?: BrandMinAggregateInputType;
    _max?: BrandMaxAggregateInputType;
};
export type BrandGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: BrandCountAggregateOutputType | null;
    _min: BrandMinAggregateOutputType | null;
    _max: BrandMaxAggregateOutputType | null;
};
export type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BrandGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BrandGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BrandGroupByOutputType[P]>;
}>>;
export type BrandWhereInput = {
    AND?: Prisma.BrandWhereInput | Prisma.BrandWhereInput[];
    OR?: Prisma.BrandWhereInput[];
    NOT?: Prisma.BrandWhereInput | Prisma.BrandWhereInput[];
    id?: Prisma.StringFilter<"Brand"> | string;
    name?: Prisma.StringFilter<"Brand"> | string;
    createdAt?: Prisma.DateTimeFilter<"Brand"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Brand"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
};
export type BrandOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    _relevance?: Prisma.BrandOrderByRelevanceInput;
};
export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.BrandWhereInput | Prisma.BrandWhereInput[];
    OR?: Prisma.BrandWhereInput[];
    NOT?: Prisma.BrandWhereInput | Prisma.BrandWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Brand"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Brand"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
}, "id" | "name">;
export type BrandOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BrandCountOrderByAggregateInput;
    _max?: Prisma.BrandMaxOrderByAggregateInput;
    _min?: Prisma.BrandMinOrderByAggregateInput;
};
export type BrandScalarWhereWithAggregatesInput = {
    AND?: Prisma.BrandScalarWhereWithAggregatesInput | Prisma.BrandScalarWhereWithAggregatesInput[];
    OR?: Prisma.BrandScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BrandScalarWhereWithAggregatesInput | Prisma.BrandScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Brand"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Brand"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Brand"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Brand"> | Date | string;
};
export type BrandCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductCreateNestedManyWithoutBrandInput;
};
export type BrandUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutBrandInput;
};
export type BrandUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUpdateManyWithoutBrandNestedInput;
};
export type BrandUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutBrandNestedInput;
};
export type BrandCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BrandUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BrandUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BrandOrderByRelevanceInput = {
    fields: Prisma.BrandOrderByRelevanceFieldEnum | Prisma.BrandOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type BrandCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BrandMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BrandMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BrandScalarRelationFilter = {
    is?: Prisma.BrandWhereInput;
    isNot?: Prisma.BrandWhereInput;
};
export type BrandCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.BrandCreateWithoutProductsInput, Prisma.BrandUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.BrandCreateOrConnectWithoutProductsInput;
    connect?: Prisma.BrandWhereUniqueInput;
};
export type BrandUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.BrandCreateWithoutProductsInput, Prisma.BrandUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.BrandCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.BrandUpsertWithoutProductsInput;
    connect?: Prisma.BrandWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BrandUpdateToOneWithWhereWithoutProductsInput, Prisma.BrandUpdateWithoutProductsInput>, Prisma.BrandUncheckedUpdateWithoutProductsInput>;
};
export type BrandCreateWithoutProductsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BrandUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BrandCreateOrConnectWithoutProductsInput = {
    where: Prisma.BrandWhereUniqueInput;
    create: Prisma.XOR<Prisma.BrandCreateWithoutProductsInput, Prisma.BrandUncheckedCreateWithoutProductsInput>;
};
export type BrandUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.BrandUpdateWithoutProductsInput, Prisma.BrandUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.BrandCreateWithoutProductsInput, Prisma.BrandUncheckedCreateWithoutProductsInput>;
    where?: Prisma.BrandWhereInput;
};
export type BrandUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.BrandWhereInput;
    data: Prisma.XOR<Prisma.BrandUpdateWithoutProductsInput, Prisma.BrandUncheckedUpdateWithoutProductsInput>;
};
export type BrandUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BrandUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BrandCountOutputType = {
    products: number;
};
export type BrandCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | BrandCountOutputTypeCountProductsArgs;
};
export type BrandCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandCountOutputTypeSelect<ExtArgs> | null;
};
export type BrandCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
export type BrandSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    products?: boolean | Prisma.Brand$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.BrandCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["brand"]>;
export type BrandSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BrandOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["brand"]>;
export type BrandInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.Brand$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.BrandCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $BrandPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Brand";
    objects: {
        products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["brand"]>;
    composites: {};
};
export type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BrandPayload, S>;
export type BrandCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BrandCountAggregateInputType | true;
};
export interface BrandDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Brand'];
        meta: {
            name: 'Brand';
        };
    };
    findUnique<T extends BrandFindUniqueArgs>(args: Prisma.SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BrandFindFirstArgs>(args?: Prisma.SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BrandFindManyArgs>(args?: Prisma.SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BrandCreateArgs>(args: Prisma.SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BrandCreateManyArgs>(args?: Prisma.SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends BrandDeleteArgs>(args: Prisma.SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BrandUpdateArgs>(args: Prisma.SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BrandDeleteManyArgs>(args?: Prisma.SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BrandUpdateManyArgs>(args: Prisma.SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends BrandUpsertArgs>(args: Prisma.SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma.Prisma__BrandClient<runtime.Types.Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BrandCountArgs>(args?: Prisma.Subset<T, BrandCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BrandCountAggregateOutputType> : number>;
    aggregate<T extends BrandAggregateArgs>(args: Prisma.Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>;
    groupBy<T extends BrandGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BrandGroupByArgs['orderBy'];
    } : {
        orderBy?: BrandGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BrandFieldRefs;
}
export interface Prisma__BrandClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.Brand$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Brand$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BrandFieldRefs {
    readonly id: Prisma.FieldRef<"Brand", 'String'>;
    readonly name: Prisma.FieldRef<"Brand", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Brand", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Brand", 'DateTime'>;
}
export type BrandFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where: Prisma.BrandWhereUniqueInput;
};
export type BrandFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where: Prisma.BrandWhereUniqueInput;
};
export type BrandFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput | Prisma.BrandOrderByWithRelationInput[];
    cursor?: Prisma.BrandWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BrandScalarFieldEnum | Prisma.BrandScalarFieldEnum[];
};
export type BrandFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput | Prisma.BrandOrderByWithRelationInput[];
    cursor?: Prisma.BrandWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BrandScalarFieldEnum | Prisma.BrandScalarFieldEnum[];
};
export type BrandFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput | Prisma.BrandOrderByWithRelationInput[];
    cursor?: Prisma.BrandWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BrandScalarFieldEnum | Prisma.BrandScalarFieldEnum[];
};
export type BrandCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BrandCreateInput, Prisma.BrandUncheckedCreateInput>;
};
export type BrandCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BrandCreateManyInput | Prisma.BrandCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BrandUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BrandUpdateInput, Prisma.BrandUncheckedUpdateInput>;
    where: Prisma.BrandWhereUniqueInput;
};
export type BrandUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BrandUpdateManyMutationInput, Prisma.BrandUncheckedUpdateManyInput>;
    where?: Prisma.BrandWhereInput;
    limit?: number;
};
export type BrandUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where: Prisma.BrandWhereUniqueInput;
    create: Prisma.XOR<Prisma.BrandCreateInput, Prisma.BrandUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BrandUpdateInput, Prisma.BrandUncheckedUpdateInput>;
};
export type BrandDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
    where: Prisma.BrandWhereUniqueInput;
};
export type BrandDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BrandWhereInput;
    limit?: number;
};
export type Brand$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type BrandDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BrandSelect<ExtArgs> | null;
    omit?: Prisma.BrandOmit<ExtArgs> | null;
    include?: Prisma.BrandInclude<ExtArgs> | null;
};
