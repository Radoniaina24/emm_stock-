import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';
export declare class PermissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePermissionDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdatePermissionDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
