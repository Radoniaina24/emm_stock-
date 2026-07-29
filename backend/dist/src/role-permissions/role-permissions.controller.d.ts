import { RolePermissionsService } from './role-permissions.service.js';
import { SyncRolePermissionsDto } from './dto/sync-role-permissions.dto.js';
export declare class RolePermissionsController {
    private readonly service;
    constructor(service: RolePermissionsService);
    find(roleId: string): Promise<{
        role: {
            id: any;
            name: any;
            code: any;
        };
        permissions: any;
        assignedPermissionIds: any;
    }>;
    sync(roleId: string, dto: SyncRolePermissionsDto): Promise<{
        role: {
            id: any;
            name: any;
            code: any;
        };
        permissions: runtime.Types.Public.PrismaPromise<T>;
        assignedPermissionIds: any;
    }>;
}
