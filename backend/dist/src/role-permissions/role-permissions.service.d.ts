import { PrismaService } from '../prisma/prisma.service.js';
export declare class RolePermissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    find(roleId: string): Promise<{
        role: {
            id: any;
            name: any;
            code: any;
        };
        permissions: any;
        assignedPermissionIds: any;
    }>;
    sync(roleId: string, permissionIds: string[]): Promise<{
        role: {
            id: any;
            name: any;
            code: any;
        };
        permissions: runtime.Types.Public.PrismaPromise<T>;
        assignedPermissionIds: any;
    }>;
}
