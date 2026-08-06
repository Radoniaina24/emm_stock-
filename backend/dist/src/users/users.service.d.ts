import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<import("./user.mapper.js").AuthUserDto>;
    nextEmployeeCode(): Promise<{
        employeeCode: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<import("./user.mapper.js").AuthUserDto>;
    getMe(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("./user.mapper.js").AuthUserDto>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<import("./user.mapper.js").AuthUserDto>;
    deleteAvatar(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
    private removeAvatarFile;
}
