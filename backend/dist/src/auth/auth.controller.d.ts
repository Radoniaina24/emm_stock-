import type { Response } from "express";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
    }>;
    logout(res: Response): {
        message: string;
    };
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
}
