import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobTitleDto } from './dto/create-job-title.dto.js';
import { UpdateJobTitleDto } from './dto/update-job-title.dto.js';
export declare class JobTitlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateJobTitleDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$JobTitlePayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findAll(): Promise<runtime.Types.Public.PrismaPromise<T>>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateJobTitleDto): Promise<runtime.Types.Result.GetResult<import("../../generated/prisma/models.js").$JobTitlePayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    remove(id: string): Promise<void>;
}
