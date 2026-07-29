import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';
import { PermissionsService } from './permissions.service.js';
export declare class PermissionsController {
    private readonly permissions;
    constructor(permissions: PermissionsService);
    create(dto: CreatePermissionDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdatePermissionDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
