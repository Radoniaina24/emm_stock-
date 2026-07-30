import { DepartmentsService } from './departments.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';
export declare class DepartmentsController {
    private readonly departments;
    constructor(departments: DepartmentsService);
    create(dto: CreateDepartmentDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateDepartmentDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
