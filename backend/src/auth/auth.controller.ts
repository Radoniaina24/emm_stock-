import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { RequirePermission } from '../common/decorators/require-permission.decorator.js';

/** Cookie JWT : sécurisé en production, lax en développement. */
const COOKIE_SECURE = process.env.NODE_ENV === 'production';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @RequirePermission('users.create')
  @ApiOperation({
    summary: "Créer un compte (réservé aux utilisateurs habilités 'users.create')",
  })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: 'Utilisateur créé (cookie `token` défini)' })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.auth.register(dto);
    res.cookie('token', token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
    });
    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Connexion et définition du cookie JWT' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Utilisateur connecté (cookie `token` défini)',
  })
  @ApiUnauthorizedResponse({ description: 'Identifiants invalides' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.auth.login(dto);
    res.cookie('token', token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
    });
    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Déconnexion — suppression du cookie JWT' })
  @ApiOkResponse({ description: 'Cookie `token` effacé' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: 'lax',
    });
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiCookieAuth('token')
  @ApiOperation({ summary: "Profil de l'utilisateur connecté" })
  @ApiOkResponse({ description: 'Profil utilisateur' })
  @ApiUnauthorizedResponse({ description: 'Cookie JWT manquant ou invalide' })
  me(@CurrentUser('id') userId: string) {
    return this.auth.me(userId);
  }
}
