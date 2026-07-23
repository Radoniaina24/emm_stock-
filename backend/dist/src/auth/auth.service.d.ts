import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        user: import("../users/user.mapper.js").AuthUserDto;
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: import("../users/user.mapper.js").AuthUserDto;
        token: string;
    }>;
    me(userId: string): Promise<import("../users/user.mapper.js").AuthUserDto>;
    private signToken;
}
