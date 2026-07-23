import { PrismaService } from "../prisma/prisma.service.js";
import { UpdateProfileDto } from "./dto/update-profile.dto.js";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("./user.mapper.js").AuthUserDto>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<import("./user.mapper.js").AuthUserDto>;
    deleteAvatar(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
    private removeAvatarFile;
}
