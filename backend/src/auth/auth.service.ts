import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import {
  splitDisplayName,
  toAuthUserDto,
  userWithProfileSelect,
} from '../users/user.mapper.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const names = splitDisplayName(dto.name);
    const employeeCode = `EMP-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    const username = dto.email.split('@')[0];
    const defaultRole = await this.prisma.role.findFirst({ where: { code: 'VIEWER' } });

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username,
        password: hashed,
        role: { connect: { id: defaultRole?.id ?? '' } },
        profile: {
          create: {
            employeeCode,
            firstName: names.firstName,
            lastName: names.lastName,
            displayName: names.displayName,
            phone: dto.phone,
          },
        },
      },
      select: userWithProfileSelect,
    });

    return {
      user: toAuthUserDto(user),
      token: this.signToken(user.id, user.email),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        ...userWithProfileSelect,
        password: true,
      },
    });
    if (!user || user.status !== 'ACTIVE')
      throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...safe } = user;
    return {
      user: toAuthUserDto(safe),
      token: this.signToken(user.id, user.email),
    };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userWithProfileSelect,
    });
    if (!user) throw new UnauthorizedException();
    return toAuthUserDto(user);
  }

  private signToken(userId: string, email: string): string {
    return this.jwt.sign({ sub: userId, email }, { expiresIn: '7d' });
  }
}
