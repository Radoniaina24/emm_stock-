import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type UnitModel = runtime.Types.Result.DefaultSelection<Prisma.$UnitPayload>;
export type AggregateUnit = {
    _count: UnitCountAggregateOutputType | null;
    _min: UnitMinAggregateOutputType | null;
    _max: UnitMaxAggregateOutputType | null;
};
export type UnitMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    abbrev: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UnitMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    abbrev: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UnitCountAggregateOutputType = {
    id: number;
    name: number;
    abbrev: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UnitMinAggregateInputType = {
    id?: true;
    name?: true;
    abbrev?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UnitMaxAggregateInputType = {
    id?: true;
    name?: true;
    abbrev?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UnitCountAggregateInputType = {
    id?: true;
    name?: true;
    abbrev?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UnitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput | Prisma.UnitOrderByWithRelationInput[];
    cursor?: Prisma.UnitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UnitCountAggregateInputType;
    _min?: UnitMinAggregateInputType;
    _max?: UnitMaxAggregateInputType;
};
export type GetUnitAggregateType<T extends UnitAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit[P]> : Prisma.GetScalarType<T[P], AggregateUnit[P]>;
};
export type UnitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithAggregationInput | Prisma.UnitOrderByWithAggregationInput[];
    by: Prisma.UnitScalarFieldEnum[] | Prisma.UnitScalarFieldEnum;
    having?: Prisma.UnitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UnitCountAggregateInputType | true;
    _min?: UnitMinAggregateInputType;
    _max?: UnitMaxAggregateInputType;
};
export type UnitGroupByOutputType = {
    id: string;
    name: string;
    abbrev: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UnitCountAggregateOutputType | null;
    _min: UnitMinAggregateOutputType | null;
    _max: UnitMaxAggregateOutputType | null;
};
export type GetUnitGroupByPayload<T extends UnitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UnitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UnitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UnitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UnitGroupByOutputType[P]>;
}>>;
export type UnitWhereInput = {
    AND?: Prisma.UnitWhereInput | Prisma.UnitWhereInput[];
    OR?: Prisma.UnitWhereInput[];
    NOT?: Prisma.UnitWhereInput | Prisma.UnitWhereInput[];
    id?: Prisma.StringFilter<"Unit"> | string;
    name?: Prisma.StringFilter<"Unit"> | string;
    abbrev?: Prisma.StringFilter<"Unit"> | string;
    createdAt?: Prisma.DateTimeFilter<"Unit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Unit"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
};
export type UnitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    abbrev?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    _relevance?: Prisma.UnitOrderByRelevanceInput;
};
export type UnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.UnitWhereInput | Prisma.UnitWhereInput[];
    OR?: Prisma.UnitWhereInput[];
    NOT?: Prisma.UnitWhereInput | Prisma.UnitWhereInput[];
    abbrev?: Prisma.StringFilter<"Unit"> | string;
    createdAt?: Prisma.DateTimeFilter<"Unit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Unit"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
}, "id" | "name">;
export type UnitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    abbrev?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UnitCountOrderByAggregateInput;
    _max?: Prisma.UnitMaxOrderByAggregateInput;
    _min?: Prisma.UnitMinOrderByAggregateInput;
};
export type UnitScalarWhereWithAggregatesInput = {
    AND?: Prisma.UnitScalarWhereWithAggregatesInput | Prisma.UnitScalarWhereWithAggregatesInput[];
    OR?: Prisma.UnitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UnitScalarWhereWithAggregatesInput | Prisma.UnitScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Unit"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Unit"> | string;
    abbrev?: Prisma.StringWithAggregatesFilter<"Unit"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Unit"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Unit"> | Date | string;
};
export type UnitCreateInput = {
    id?: string;
    name: string;
    abbrev: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductCreateNestedManyWithoutUnitInput;
};
export type UnitUncheckedCreateInput = {
    id?: string;
    name: string;
    abbrev: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutUnitInput;
};
export type UnitUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUpdateManyWithoutUnitNestedInput;
};
export type UnitUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutUnitNestedInput;
};
export type UnitCreateManyInput = {
    id?: string;
    name: string;
    abbrev: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UnitUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UnitUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UnitOrderByRelevanceInput = {
    fields: Prisma.UnitOrderByRelevanceFieldEnum | Prisma.UnitOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type UnitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    abbrev?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UnitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    abbrev?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UnitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    abbrev?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UnitScalarRelationFilter = {
    is?: Prisma.UnitWhereInput;
    isNot?: Prisma.UnitWhereInput;
};
export type UnitCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.UnitCreateWithoutProductsInput, Prisma.UnitUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.UnitCreateOrConnectWithoutProductsInput;
    connect?: Prisma.UnitWhereUniqueInput;
};
export type UnitUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.UnitCreateWithoutProductsInput, Prisma.UnitUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.UnitCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.UnitUpsertWithoutProductsInput;
    connect?: Prisma.UnitWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UnitUpdateToOneWithWhereWithoutProductsInput, Prisma.UnitUpdateWithoutProductsInput>, Prisma.UnitUncheckedUpdateWithoutProductsInput>;
};
export type UnitCreateWithoutProductsInput = {
    id?: string;
    name: string;
    abbrev: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UnitUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    abbrev: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UnitCreateOrConnectWithoutProductsInput = {
    where: Prisma.UnitWhereUniqueInput;
    create: Prisma.XOR<Prisma.UnitCreateWithoutProductsInput, Prisma.UnitUncheckedCreateWithoutProductsInput>;
};
export type UnitUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.UnitUpdateWithoutProductsInput, Prisma.UnitUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.UnitCreateWithoutProductsInput, Prisma.UnitUncheckedCreateWithoutProductsInput>;
    where?: Prisma.UnitWhereInput;
};
export type UnitUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.UnitWhereInput;
    data: Prisma.XOR<Prisma.UnitUpdateWithoutProductsInput, Prisma.UnitUncheckedUpdateWithoutProductsInput>;
};
export type UnitUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UnitUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    abbrev?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UnitCountOutputType = {
    products: number;
};
export type UnitCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | UnitCountOutputTypeCountProductsArgs;
};
export type UnitCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitCountOutputTypeSelect<ExtArgs> | null;
};
export type UnitCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
export type UnitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    abbrev?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    products?: boolean | Prisma.Unit$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.UnitCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["unit"]>;
export type UnitSelectScalar = {
    id?: boolean;
    name?: boolean;
    abbrev?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UnitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "abbrev" | "createdAt" | "updatedAt", ExtArgs["result"]["unit"]>;
export type UnitInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.Unit$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.UnitCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $UnitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Unit";
    objects: {
        products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        abbrev: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["unit"]>;
    composites: {};
};
export type UnitGetPayload<S extends boolean | null | undefined | UnitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UnitPayload, S>;
export type UnitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UnitCountAggregateInputType | true;
};
export interface UnitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Unit'];
        meta: {
            name: 'Unit';
        };
    };
    findUnique<T extends UnitFindUniqueArgs>(args: Prisma.SelectSubset<T, UnitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UnitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UnitFindFirstArgs>(args?: Prisma.SelectSubset<T, UnitFindFirstArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UnitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UnitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UnitFindManyArgs>(args?: Prisma.SelectSubset<T, UnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UnitCreateArgs>(args: Prisma.SelectSubset<T, UnitCreateArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UnitCreateManyArgs>(args?: Prisma.SelectSubset<T, UnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends UnitDeleteArgs>(args: Prisma.SelectSubset<T, UnitDeleteArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UnitUpdateArgs>(args: Prisma.SelectSubset<T, UnitUpdateArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UnitDeleteManyArgs>(args?: Prisma.SelectSubset<T, UnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UnitUpdateManyArgs>(args: Prisma.SelectSubset<T, UnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends UnitUpsertArgs>(args: Prisma.SelectSubset<T, UnitUpsertArgs<ExtArgs>>): Prisma.Prisma__UnitClient<runtime.Types.Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UnitCountArgs>(args?: Prisma.Subset<T, UnitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UnitCountAggregateOutputType> : number>;
    aggregate<T extends UnitAggregateArgs>(args: Prisma.Subset<T, UnitAggregateArgs>): Prisma.PrismaPromise<GetUnitAggregateType<T>>;
    groupBy<T extends UnitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UnitGroupByArgs['orderBy'];
    } : {
        orderBy?: UnitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UnitFieldRefs;
}
export interface Prisma__UnitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.Unit$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Unit$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UnitFieldRefs {
    readonly id: Prisma.FieldRef<"Unit", 'String'>;
    readonly name: Prisma.FieldRef<"Unit", 'String'>;
    readonly abbrev: Prisma.FieldRef<"Unit", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Unit", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Unit", 'DateTime'>;
}
export type UnitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where: Prisma.UnitWhereUniqueInput;
};
export type UnitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where: Prisma.UnitWhereUniqueInput;
};
export type UnitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput | Prisma.UnitOrderByWithRelationInput[];
    cursor?: Prisma.UnitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UnitScalarFieldEnum | Prisma.UnitScalarFieldEnum[];
};
export type UnitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput | Prisma.UnitOrderByWithRelationInput[];
    cursor?: Prisma.UnitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UnitScalarFieldEnum | Prisma.UnitScalarFieldEnum[];
};
export type UnitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput | Prisma.UnitOrderByWithRelationInput[];
    cursor?: Prisma.UnitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UnitScalarFieldEnum | Prisma.UnitScalarFieldEnum[];
};
export type UnitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UnitCreateInput, Prisma.UnitUncheckedCreateInput>;
};
export type UnitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UnitCreateManyInput | Prisma.UnitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UnitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UnitUpdateInput, Prisma.UnitUncheckedUpdateInput>;
    where: Prisma.UnitWhereUniqueInput;
};
export type UnitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UnitUpdateManyMutationInput, Prisma.UnitUncheckedUpdateManyInput>;
    where?: Prisma.UnitWhereInput;
    limit?: number;
};
export type UnitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where: Prisma.UnitWhereUniqueInput;
    create: Prisma.XOR<Prisma.UnitCreateInput, Prisma.UnitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UnitUpdateInput, Prisma.UnitUncheckedUpdateInput>;
};
export type UnitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
    where: Prisma.UnitWhereUniqueInput;
};
export type UnitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UnitWhereInput;
    limit?: number;
};
export type Unit$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UnitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UnitSelect<ExtArgs> | null;
    omit?: Prisma.UnitOmit<ExtArgs> | null;
    include?: Prisma.UnitInclude<ExtArgs> | null;
};
