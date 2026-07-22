import type { Response } from "express";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        name: string;
        email: string;
        id: string;
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
        name: string;
        email: string;
        phone: string | null;
        department: string | null;
        id: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
    } | null>;
}
