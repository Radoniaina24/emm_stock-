import type { Response } from "express";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto, res: Response): Promise<import("../users/user.mapper.js").AuthUserDto>;
    login(dto: LoginDto, res: Response): Promise<import("../users/user.mapper.js").AuthUserDto>;
    logout(res: Response): {
        message: string;
    };
    me(userId: string): Promise<import("../users/user.mapper.js").AuthUserDto>;
}
