import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { RolesService } from './roles.service.js';
export declare class RolesController {
    private readonly roles;
    constructor(roles: RolesService);
    create(dto: CreateRoleDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateRoleDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
