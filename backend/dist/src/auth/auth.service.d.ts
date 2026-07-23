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
            email: string;
            id: string;
            name: string;
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
        email: string;
        id: string;
        name: string;
        role: string;
        phone: string | null;
        avatar: string | null;
        department: string | null;
        createdAt: Date;
    } | null>;
    private signToken;
}
