import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    failedLoginAttempts: number | null;
};
export type UserSumAggregateOutputType = {
    failedLoginAttempts: number | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    username: string | null;
    password: string | null;
    status: $Enums.UserStatus | null;
    mustChangePassword: boolean | null;
    twoFactorEnabled: boolean | null;
    failedLoginAttempts: number | null;
    lockedUntil: Date | null;
    lastLoginAt: Date | null;
    emailVerifiedAt: Date | null;
    roleId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    username: string | null;
    password: string | null;
    status: $Enums.UserStatus | null;
    mustChangePassword: boolean | null;
    twoFactorEnabled: boolean | null;
    failedLoginAttempts: number | null;
    lockedUntil: Date | null;
    lastLoginAt: Date | null;
    emailVerifiedAt: Date | null;
    roleId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    username: number;
    password: number;
    status: number;
    mustChangePassword: number;
    twoFactorEnabled: number;
    failedLoginAttempts: number;
    lockedUntil: number;
    lastLoginAt: number;
    emailVerifiedAt: number;
    roleId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    failedLoginAttempts?: true;
};
export type UserSumAggregateInputType = {
    failedLoginAttempts?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    password?: true;
    status?: true;
    mustChangePassword?: true;
    twoFactorEnabled?: true;
    failedLoginAttempts?: true;
    lockedUntil?: true;
    lastLoginAt?: true;
    emailVerifiedAt?: true;
    roleId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    password?: true;
    status?: true;
    mustChangePassword?: true;
    twoFactorEnabled?: true;
    failedLoginAttempts?: true;
    lockedUntil?: true;
    lastLoginAt?: true;
    emailVerifiedAt?: true;
    roleId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    password?: true;
    status?: true;
    mustChangePassword?: true;
    twoFactorEnabled?: true;
    failedLoginAttempts?: true;
    lockedUntil?: true;
    lastLoginAt?: true;
    emailVerifiedAt?: true;
    roleId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    username: string;
    password: string;
    status: $Enums.UserStatus;
    mustChangePassword: boolean;
    twoFactorEnabled: boolean;
    failedLoginAttempts: number;
    lockedUntil: Date | null;
    lastLoginAt: Date | null;
    emailVerifiedAt: Date | null;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFilter<"User"> | boolean;
    twoFactorEnabled?: Prisma.BoolFilter<"User"> | boolean;
    failedLoginAttempts?: Prisma.IntFilter<"User"> | number;
    lockedUntil?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    roleId?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    profile?: Prisma.XOR<Prisma.UserProfileNullableScalarRelationFilter, Prisma.UserProfileWhereInput> | null;
    entries?: Prisma.EntryListRelationFilter;
    exits?: Prisma.ExitListRelationFilter;
    inventories?: Prisma.InventoryListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    mustChangePassword?: Prisma.SortOrder;
    twoFactorEnabled?: Prisma.SortOrder;
    failedLoginAttempts?: Prisma.SortOrder;
    lockedUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.RoleOrderByWithRelationInput;
    profile?: Prisma.UserProfileOrderByWithRelationInput;
    entries?: Prisma.EntryOrderByRelationAggregateInput;
    exits?: Prisma.ExitOrderByRelationAggregateInput;
    inventories?: Prisma.InventoryOrderByRelationAggregateInput;
    _relevance?: Prisma.UserOrderByRelevanceInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    username?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFilter<"User"> | boolean;
    twoFactorEnabled?: Prisma.BoolFilter<"User"> | boolean;
    failedLoginAttempts?: Prisma.IntFilter<"User"> | number;
    lockedUntil?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    roleId?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    profile?: Prisma.XOR<Prisma.UserProfileNullableScalarRelationFilter, Prisma.UserProfileWhereInput> | null;
    entries?: Prisma.EntryListRelationFilter;
    exits?: Prisma.ExitListRelationFilter;
    inventories?: Prisma.InventoryListRelationFilter;
}, "id" | "email" | "username">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    mustChangePassword?: Prisma.SortOrder;
    twoFactorEnabled?: Prisma.SortOrder;
    failedLoginAttempts?: Prisma.SortOrder;
    lockedUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    username?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    status?: Prisma.EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    twoFactorEnabled?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    failedLoginAttempts?: Prisma.IntWithAggregatesFilter<"User"> | number;
    lockedUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    lastLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    emailVerifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    roleId?: Prisma.StringWithAggregatesFilter<"User"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserOrderByRelevanceInput = {
    fields: Prisma.UserOrderByRelevanceFieldEnum | Prisma.UserOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    mustChangePassword?: Prisma.SortOrder;
    twoFactorEnabled?: Prisma.SortOrder;
    failedLoginAttempts?: Prisma.SortOrder;
    lockedUntil?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    failedLoginAttempts?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    mustChangePassword?: Prisma.SortOrder;
    twoFactorEnabled?: Prisma.SortOrder;
    failedLoginAttempts?: Prisma.SortOrder;
    lockedUntil?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    mustChangePassword?: Prisma.SortOrder;
    twoFactorEnabled?: Prisma.SortOrder;
    failedLoginAttempts?: Prisma.SortOrder;
    lockedUntil?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    failedLoginAttempts?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutRoleInput | Prisma.UserUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutRoleInput | Prisma.UserUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type UserCreateNestedOneWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProfileInput;
    upsert?: Prisma.UserUpsertWithoutProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProfileInput, Prisma.UserUpdateWithoutProfileInput>, Prisma.UserUncheckedUpdateWithoutProfileInput>;
};
export type UserCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEntriesInput, Prisma.UserUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEntriesInput, Prisma.UserUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.UserUpsertWithoutEntriesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEntriesInput, Prisma.UserUpdateWithoutEntriesInput>, Prisma.UserUncheckedUpdateWithoutEntriesInput>;
};
export type UserCreateNestedOneWithoutExitsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExitsInput, Prisma.UserUncheckedCreateWithoutExitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExitsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExitsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExitsInput, Prisma.UserUncheckedCreateWithoutExitsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExitsInput;
    upsert?: Prisma.UserUpsertWithoutExitsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExitsInput, Prisma.UserUpdateWithoutExitsInput>, Prisma.UserUncheckedUpdateWithoutExitsInput>;
};
export type UserCreateNestedOneWithoutInventoriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoriesInput, Prisma.UserUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutInventoriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoriesInput, Prisma.UserUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoriesInput;
    upsert?: Prisma.UserUpsertWithoutInventoriesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutInventoriesInput, Prisma.UserUpdateWithoutInventoriesInput>, Prisma.UserUncheckedUpdateWithoutInventoriesInput>;
};
export type UserCreateWithoutRoleInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRoleInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput>;
};
export type UserCreateManyRoleInputEnvelope = {
    data: Prisma.UserCreateManyRoleInput | Prisma.UserCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutRoleInput, Prisma.UserUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput>;
};
export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRoleInput, Prisma.UserUncheckedUpdateWithoutRoleInput>;
};
export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutRoleInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFilter<"User"> | boolean;
    twoFactorEnabled?: Prisma.BoolFilter<"User"> | boolean;
    failedLoginAttempts?: Prisma.IntFilter<"User"> | number;
    lockedUntil?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    roleId?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
};
export type UserCreateWithoutProfileInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    entries?: Prisma.EntryCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutProfileInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
};
export type UserUpsertWithoutProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProfileInput, Prisma.UserUncheckedUpdateWithoutProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProfileInput, Prisma.UserUncheckedCreateWithoutProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProfileInput, Prisma.UserUncheckedUpdateWithoutProfileInput>;
};
export type UserUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEntriesInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    exits?: Prisma.ExitCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEntriesInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEntriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEntriesInput, Prisma.UserUncheckedCreateWithoutEntriesInput>;
};
export type UserUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEntriesInput, Prisma.UserUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEntriesInput, Prisma.UserUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEntriesInput, Prisma.UserUncheckedUpdateWithoutEntriesInput>;
};
export type UserUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutExitsInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutExitsInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutUserInput;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutExitsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExitsInput, Prisma.UserUncheckedCreateWithoutExitsInput>;
};
export type UserUpsertWithoutExitsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExitsInput, Prisma.UserUncheckedUpdateWithoutExitsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExitsInput, Prisma.UserUncheckedCreateWithoutExitsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExitsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExitsInput, Prisma.UserUncheckedUpdateWithoutExitsInput>;
};
export type UserUpdateWithoutExitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutExitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutInventoriesInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    profile?: Prisma.UserProfileCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutInventoriesInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    roleId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile?: Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput;
    entries?: Prisma.EntryUncheckedCreateNestedManyWithoutUserInput;
    exits?: Prisma.ExitUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutInventoriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoriesInput, Prisma.UserUncheckedCreateWithoutInventoriesInput>;
};
export type UserUpsertWithoutInventoriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutInventoriesInput, Prisma.UserUncheckedUpdateWithoutInventoriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoriesInput, Prisma.UserUncheckedCreateWithoutInventoriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutInventoriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInventoriesInput, Prisma.UserUncheckedUpdateWithoutInventoriesInput>;
};
export type UserUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roleId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyRoleInput = {
    id?: string;
    email: string;
    username: string;
    password: string;
    status?: $Enums.UserStatus;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: number;
    lockedUntil?: Date | string | null;
    lastLoginAt?: Date | string | null;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput;
    entries?: Prisma.EntryUncheckedUpdateManyWithoutUserNestedInput;
    exits?: Prisma.ExitUncheckedUpdateManyWithoutUserNestedInput;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    mustChangePassword?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    twoFactorEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failedLoginAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    lockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOutputType = {
    entries: number;
    exits: number;
    inventories: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entries?: boolean | UserCountOutputTypeCountEntriesArgs;
    exits?: boolean | UserCountOutputTypeCountExitsArgs;
    inventories?: boolean | UserCountOutputTypeCountInventoriesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntryWhereInput;
};
export type UserCountOutputTypeCountExitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExitWhereInput;
};
export type UserCountOutputTypeCountInventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    username?: boolean;
    password?: boolean;
    status?: boolean;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: boolean;
    lockedUntil?: boolean;
    lastLoginAt?: boolean;
    emailVerifiedAt?: boolean;
    roleId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    profile?: boolean | Prisma.User$profileArgs<ExtArgs>;
    entries?: boolean | Prisma.User$entriesArgs<ExtArgs>;
    exits?: boolean | Prisma.User$exitsArgs<ExtArgs>;
    inventories?: boolean | Prisma.User$inventoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    username?: boolean;
    password?: boolean;
    status?: boolean;
    mustChangePassword?: boolean;
    twoFactorEnabled?: boolean;
    failedLoginAttempts?: boolean;
    lockedUntil?: boolean;
    lastLoginAt?: boolean;
    emailVerifiedAt?: boolean;
    roleId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "username" | "password" | "status" | "mustChangePassword" | "twoFactorEnabled" | "failedLoginAttempts" | "lockedUntil" | "lastLoginAt" | "emailVerifiedAt" | "roleId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    profile?: boolean | Prisma.User$profileArgs<ExtArgs>;
    entries?: boolean | Prisma.User$entriesArgs<ExtArgs>;
    exits?: boolean | Prisma.User$exitsArgs<ExtArgs>;
    inventories?: boolean | Prisma.User$inventoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        role: Prisma.$RolePayload<ExtArgs>;
        profile: Prisma.$UserProfilePayload<ExtArgs> | null;
        entries: Prisma.$EntryPayload<ExtArgs>[];
        exits: Prisma.$ExitPayload<ExtArgs>[];
        inventories: Prisma.$InventoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        username: string;
        password: string;
        status: $Enums.UserStatus;
        mustChangePassword: boolean;
        twoFactorEnabled: boolean;
        failedLoginAttempts: number;
        lockedUntil: Date | null;
        lastLoginAt: Date | null;
        emailVerifiedAt: Date | null;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    profile<T extends Prisma.User$profileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$profileArgs<ExtArgs>>): Prisma.Prisma__UserProfileClient<runtime.Types.Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    entries<T extends Prisma.User$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exits<T extends Prisma.User$exitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$exitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inventories<T extends Prisma.User$inventoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$inventoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly username: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly status: Prisma.FieldRef<"User", 'UserStatus'>;
    readonly mustChangePassword: Prisma.FieldRef<"User", 'Boolean'>;
    readonly twoFactorEnabled: Prisma.FieldRef<"User", 'Boolean'>;
    readonly failedLoginAttempts: Prisma.FieldRef<"User", 'Int'>;
    readonly lockedUntil: Prisma.FieldRef<"User", 'DateTime'>;
    readonly lastLoginAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly emailVerifiedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly roleId: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$profileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserProfileSelect<ExtArgs> | null;
    omit?: Prisma.UserProfileOmit<ExtArgs> | null;
    include?: Prisma.UserProfileInclude<ExtArgs> | null;
    where?: Prisma.UserProfileWhereInput;
};
export type User$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$exitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$inventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
