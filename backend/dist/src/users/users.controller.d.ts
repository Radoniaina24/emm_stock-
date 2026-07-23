import { UpdateProfileDto } from "./dto/update-profile.dto.js";
import { UsersService } from "./users.service.js";
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    getMe(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("./user.mapper.js").AuthUserDto>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<import("./user.mapper.js").AuthUserDto>;
    deleteAvatar(userId: string): Promise<import("./user.mapper.js").AuthUserDto>;
}
