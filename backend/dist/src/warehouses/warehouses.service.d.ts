import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWarehouseDto } from './dto/create-warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto.js';
export declare class WarehousesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWarehouseDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$WarehousePayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateWarehouseDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$WarehousePayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
