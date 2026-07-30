import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type JobTitleModel = runtime.Types.Result.DefaultSelection<Prisma.$JobTitlePayload>;
export type AggregateJobTitle = {
    _count: JobTitleCountAggregateOutputType | null;
    _min: JobTitleMinAggregateOutputType | null;
    _max: JobTitleMaxAggregateOutputType | null;
};
export type JobTitleMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    code: string | null;
    description: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JobTitleMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    code: string | null;
    description: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JobTitleCountAggregateOutputType = {
    id: number;
    name: number;
    code: number;
    description: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type JobTitleMinAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JobTitleMaxAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JobTitleCountAggregateInputType = {
    id?: true;
    name?: true;
    code?: true;
    description?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type JobTitleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithRelationInput | Prisma.JobTitleOrderByWithRelationInput[];
    cursor?: Prisma.JobTitleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JobTitleCountAggregateInputType;
    _min?: JobTitleMinAggregateInputType;
    _max?: JobTitleMaxAggregateInputType;
};
export type GetJobTitleAggregateType<T extends JobTitleAggregateArgs> = {
    [P in keyof T & keyof AggregateJobTitle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJobTitle[P]> : Prisma.GetScalarType<T[P], AggregateJobTitle[P]>;
};
export type JobTitleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithAggregationInput | Prisma.JobTitleOrderByWithAggregationInput[];
    by: Prisma.JobTitleScalarFieldEnum[] | Prisma.JobTitleScalarFieldEnum;
    having?: Prisma.JobTitleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JobTitleCountAggregateInputType | true;
    _min?: JobTitleMinAggregateInputType;
    _max?: JobTitleMaxAggregateInputType;
};
export type JobTitleGroupByOutputType = {
    id: string;
    name: string;
    code: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: JobTitleCountAggregateOutputType | null;
    _min: JobTitleMinAggregateOutputType | null;
    _max: JobTitleMaxAggregateOutputType | null;
};
export type GetJobTitleGroupByPayload<T extends JobTitleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JobTitleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JobTitleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JobTitleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JobTitleGroupByOutputType[P]>;
}>>;
export type JobTitleWhereInput = {
    AND?: Prisma.JobTitleWhereInput | Prisma.JobTitleWhereInput[];
    OR?: Prisma.JobTitleWhereInput[];
    NOT?: Prisma.JobTitleWhereInput | Prisma.JobTitleWhereInput[];
    id?: Prisma.StringFilter<"JobTitle"> | string;
    name?: Prisma.StringFilter<"JobTitle"> | string;
    code?: Prisma.StringFilter<"JobTitle"> | string;
    description?: Prisma.StringNullableFilter<"JobTitle"> | string | null;
    isActive?: Prisma.BoolFilter<"JobTitle"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"JobTitle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JobTitle"> | Date | string;
    userProfiles?: Prisma.UserProfileListRelationFilter;
};
export type JobTitleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userProfiles?: Prisma.UserProfileOrderByRelationAggregateInput;
    _relevance?: Prisma.JobTitleOrderByRelevanceInput;
};
export type JobTitleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.JobTitleWhereInput | Prisma.JobTitleWhereInput[];
    OR?: Prisma.JobTitleWhereInput[];
    NOT?: Prisma.JobTitleWhereInput | Prisma.JobTitleWhereInput[];
    name?: Prisma.StringFilter<"JobTitle"> | string;
    description?: Prisma.StringNullableFilter<"JobTitle"> | string | null;
    isActive?: Prisma.BoolFilter<"JobTitle"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"JobTitle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JobTitle"> | Date | string;
    userProfiles?: Prisma.UserProfileListRelationFilter;
}, "id" | "code">;
export type JobTitleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.JobTitleCountOrderByAggregateInput;
    _max?: Prisma.JobTitleMaxOrderByAggregateInput;
    _min?: Prisma.JobTitleMinOrderByAggregateInput;
};
export type JobTitleScalarWhereWithAggregatesInput = {
    AND?: Prisma.JobTitleScalarWhereWithAggregatesInput | Prisma.JobTitleScalarWhereWithAggregatesInput[];
    OR?: Prisma.JobTitleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JobTitleScalarWhereWithAggregatesInput | Prisma.JobTitleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"JobTitle"> | string;
    name?: Prisma.StringWithAggregatesFilter<"JobTitle"> | string;
    code?: Prisma.StringWithAggregatesFilter<"JobTitle"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"JobTitle"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"JobTitle"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"JobTitle"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"JobTitle"> | Date | string;
};
export type JobTitleCreateInput = {
    id?: string;
    name: string;
    code: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userProfiles?: Prisma.UserProfileCreateNestedManyWithoutJobTitleInput;
};
export type JobTitleUncheckedCreateInput = {
    id?: string;
    name: string;
    code: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userProfiles?: Prisma.UserProfileUncheckedCreateNestedManyWithoutJobTitleInput;
};
export type JobTitleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userProfiles?: Prisma.UserProfileUpdateManyWithoutJobTitleNestedInput;
};
export type JobTitleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userProfiles?: Prisma.UserProfileUncheckedUpdateManyWithoutJobTitleNestedInput;
};
export type JobTitleCreateManyInput = {
    id?: string;
    name: string;
    code: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobTitleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTitleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTitleNullableScalarRelationFilter = {
    is?: Prisma.JobTitleWhereInput | null;
    isNot?: Prisma.JobTitleWhereInput | null;
};
export type JobTitleOrderByRelevanceInput = {
    fields: Prisma.JobTitleOrderByRelevanceFieldEnum | Prisma.JobTitleOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type JobTitleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobTitleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobTitleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JobTitleCreateNestedOneWithoutUserProfilesInput = {
    create?: Prisma.XOR<Prisma.JobTitleCreateWithoutUserProfilesInput, Prisma.JobTitleUncheckedCreateWithoutUserProfilesInput>;
    connectOrCreate?: Prisma.JobTitleCreateOrConnectWithoutUserProfilesInput;
    connect?: Prisma.JobTitleWhereUniqueInput;
};
export type JobTitleUpdateOneWithoutUserProfilesNestedInput = {
    create?: Prisma.XOR<Prisma.JobTitleCreateWithoutUserProfilesInput, Prisma.JobTitleUncheckedCreateWithoutUserProfilesInput>;
    connectOrCreate?: Prisma.JobTitleCreateOrConnectWithoutUserProfilesInput;
    upsert?: Prisma.JobTitleUpsertWithoutUserProfilesInput;
    disconnect?: Prisma.JobTitleWhereInput | boolean;
    delete?: Prisma.JobTitleWhereInput | boolean;
    connect?: Prisma.JobTitleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JobTitleUpdateToOneWithWhereWithoutUserProfilesInput, Prisma.JobTitleUpdateWithoutUserProfilesInput>, Prisma.JobTitleUncheckedUpdateWithoutUserProfilesInput>;
};
export type JobTitleCreateWithoutUserProfilesInput = {
    id?: string;
    name: string;
    code: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobTitleUncheckedCreateWithoutUserProfilesInput = {
    id?: string;
    name: string;
    code: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JobTitleCreateOrConnectWithoutUserProfilesInput = {
    where: Prisma.JobTitleWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobTitleCreateWithoutUserProfilesInput, Prisma.JobTitleUncheckedCreateWithoutUserProfilesInput>;
};
export type JobTitleUpsertWithoutUserProfilesInput = {
    update: Prisma.XOR<Prisma.JobTitleUpdateWithoutUserProfilesInput, Prisma.JobTitleUncheckedUpdateWithoutUserProfilesInput>;
    create: Prisma.XOR<Prisma.JobTitleCreateWithoutUserProfilesInput, Prisma.JobTitleUncheckedCreateWithoutUserProfilesInput>;
    where?: Prisma.JobTitleWhereInput;
};
export type JobTitleUpdateToOneWithWhereWithoutUserProfilesInput = {
    where?: Prisma.JobTitleWhereInput;
    data: Prisma.XOR<Prisma.JobTitleUpdateWithoutUserProfilesInput, Prisma.JobTitleUncheckedUpdateWithoutUserProfilesInput>;
};
export type JobTitleUpdateWithoutUserProfilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTitleUncheckedUpdateWithoutUserProfilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JobTitleCountOutputType = {
    userProfiles: number;
};
export type JobTitleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userProfiles?: boolean | JobTitleCountOutputTypeCountUserProfilesArgs;
};
export type JobTitleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleCountOutputTypeSelect<ExtArgs> | null;
};
export type JobTitleCountOutputTypeCountUserProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProfileWhereInput;
};
export type JobTitleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    code?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userProfiles?: boolean | Prisma.JobTitle$userProfilesArgs<ExtArgs>;
    _count?: boolean | Prisma.JobTitleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jobTitle"]>;
export type JobTitleSelectScalar = {
    id?: boolean;
    name?: boolean;
    code?: boolean;
    description?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type JobTitleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "code" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["jobTitle"]>;
export type JobTitleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userProfiles?: boolean | Prisma.JobTitle$userProfilesArgs<ExtArgs>;
    _count?: boolean | Prisma.JobTitleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $JobTitlePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JobTitle";
    objects: {
        userProfiles: Prisma.$UserProfilePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["jobTitle"]>;
    composites: {};
};
export type JobTitleGetPayload<S extends boolean | null | undefined | JobTitleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JobTitlePayload, S>;
export type JobTitleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JobTitleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JobTitleCountAggregateInputType | true;
};
export interface JobTitleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JobTitle'];
        meta: {
            name: 'JobTitle';
        };
    };
    findUnique<T extends JobTitleFindUniqueArgs>(args: Prisma.SelectSubset<T, JobTitleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JobTitleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JobTitleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JobTitleFindFirstArgs>(args?: Prisma.SelectSubset<T, JobTitleFindFirstArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JobTitleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JobTitleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JobTitleFindManyArgs>(args?: Prisma.SelectSubset<T, JobTitleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JobTitleCreateArgs>(args: Prisma.SelectSubset<T, JobTitleCreateArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JobTitleCreateManyArgs>(args?: Prisma.SelectSubset<T, JobTitleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends JobTitleDeleteArgs>(args: Prisma.SelectSubset<T, JobTitleDeleteArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JobTitleUpdateArgs>(args: Prisma.SelectSubset<T, JobTitleUpdateArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JobTitleDeleteManyArgs>(args?: Prisma.SelectSubset<T, JobTitleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JobTitleUpdateManyArgs>(args: Prisma.SelectSubset<T, JobTitleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends JobTitleUpsertArgs>(args: Prisma.SelectSubset<T, JobTitleUpsertArgs<ExtArgs>>): Prisma.Prisma__JobTitleClient<runtime.Types.Result.GetResult<Prisma.$JobTitlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JobTitleCountArgs>(args?: Prisma.Subset<T, JobTitleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JobTitleCountAggregateOutputType> : number>;
    aggregate<T extends JobTitleAggregateArgs>(args: Prisma.Subset<T, JobTitleAggregateArgs>): Prisma.PrismaPromise<GetJobTitleAggregateType<T>>;
    groupBy<T extends JobTitleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JobTitleGroupByArgs['orderBy'];
    } : {
        orderBy?: JobTitleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JobTitleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobTitleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JobTitleFieldRefs;
}
export interface Prisma__JobTitleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userProfiles<T extends Prisma.JobTitle$userProfilesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobTitle$userProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JobTitleFieldRefs {
    readonly id: Prisma.FieldRef<"JobTitle", 'String'>;
    readonly name: Prisma.FieldRef<"JobTitle", 'String'>;
    readonly code: Prisma.FieldRef<"JobTitle", 'String'>;
    readonly description: Prisma.FieldRef<"JobTitle", 'String'>;
    readonly isActive: Prisma.FieldRef<"JobTitle", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"JobTitle", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"JobTitle", 'DateTime'>;
}
export type JobTitleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where: Prisma.JobTitleWhereUniqueInput;
};
export type JobTitleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where: Prisma.JobTitleWhereUniqueInput;
};
export type JobTitleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithRelationInput | Prisma.JobTitleOrderByWithRelationInput[];
    cursor?: Prisma.JobTitleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTitleScalarFieldEnum | Prisma.JobTitleScalarFieldEnum[];
};
export type JobTitleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithRelationInput | Prisma.JobTitleOrderByWithRelationInput[];
    cursor?: Prisma.JobTitleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTitleScalarFieldEnum | Prisma.JobTitleScalarFieldEnum[];
};
export type JobTitleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithRelationInput | Prisma.JobTitleOrderByWithRelationInput[];
    cursor?: Prisma.JobTitleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobTitleScalarFieldEnum | Prisma.JobTitleScalarFieldEnum[];
};
export type JobTitleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobTitleCreateInput, Prisma.JobTitleUncheckedCreateInput>;
};
export type JobTitleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JobTitleCreateManyInput | Prisma.JobTitleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JobTitleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JobTitleUpdateInput, Prisma.JobTitleUncheckedUpdateInput>;
    where: Prisma.JobTitleWhereUniqueInput;
};
export type JobTitleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JobTitleUpdateManyMutationInput, Prisma.JobTitleUncheckedUpdateManyInput>;
    where?: Prisma.JobTitleWhereInput;
    limit?: number;
};
export type JobTitleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where: Prisma.JobTitleWhereUniqueInput;
    create: Prisma.XOR<Prisma.JobTitleCreateInput, Prisma.JobTitleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JobTitleUpdateInput, Prisma.JobTitleUncheckedUpdateInput>;
};
export type JobTitleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
    where: Prisma.JobTitleWhereUniqueInput;
};
export type JobTitleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobTitleWhereInput;
    limit?: number;
};
export type JobTitle$userProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput | Prisma.UserProfileOrderByWithRelationInput[];
    cursor?: Prisma.UserProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserProfileScalarFieldEnum | Prisma.UserProfileScalarFieldEnum[];
};
export type JobTitleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JobTitleSelect<ExtArgs> | null;
    omit?: Prisma.JobTitleOmit<ExtArgs> | null;
    include?: Prisma.JobTitleInclude<ExtArgs> | null;
};
