import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common"
import type { Response } from "express"
import { AuthService } from "./auth.service.js"
import { RegisterDto } from "./dto/register.dto.js"
import { LoginDto } from "./dto/login.dto.js"
import { JwtAuthGuard } from "./guards/jwt-auth.guard.js"
import { CurrentUser } from "../common/decorators/current-user.decorator.js"

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.auth.register(dto)
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 })
    return user
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.auth.login(dto)
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 })
    return user
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" })
    return { message: "Logged out" }
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser("id") userId: string) {
    return this.auth.me(userId)
  }
}
