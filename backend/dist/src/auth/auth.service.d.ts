import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
            role: string;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
    me(userId: string): Promise<{
        name: string;
        email: string;
        phone: string | null;
        department: string | null;
        id: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
    } | null>;
    private signToken;
}
