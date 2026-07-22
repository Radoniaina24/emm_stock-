import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Request } from "express"
import { PrismaService } from "../../prisma/prisma.service.js"

export type JwtPayload = { sub: string; email: string }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.token]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? "default-secret",
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    })
    if (!user || !user.isActive) throw new UnauthorizedException()
    return user
  }
}
