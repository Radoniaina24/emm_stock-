import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { PrismaService } from "../prisma/prisma.service.js"
import { RegisterDto } from "./dto/register.dto.js"
import { LoginDto } from "./dto/login.dto.js"

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) throw new ConflictException("Email already in use")

    const hashed = await bcrypt.hash(dto.password, 10)
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hashed, phone: dto.phone, department: dto.department },
      select: { id: true, name: true, email: true, role: true },
    })

    return { user, token: this.signToken(user.id, user.email) }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user) throw new UnauthorizedException("Invalid credentials")

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new UnauthorizedException("Invalid credentials")

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: this.signToken(user.id, user.email),
    }
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, phone: true, department: true, avatar: true, createdAt: true },
    })
  }

  private signToken(userId: string, email: string): string {
    return this.jwt.sign({ sub: userId, email }, { expiresIn: "7d" })
  }
}
