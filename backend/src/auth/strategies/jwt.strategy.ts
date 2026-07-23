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
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        profile: { select: { displayName: true } },
      },
    })
    if (!user || !user.isActive) throw new UnauthorizedException()
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      name: user.profile?.displayName ?? user.email,
    }
  }
}
