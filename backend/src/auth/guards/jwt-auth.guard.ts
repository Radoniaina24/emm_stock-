import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator.js';

/**
 * Garde d'authentification globale.
 *
 * - Laisse passer les routes marquées `@Public()`.
 * - Laisse passer la documentation Swagger (`/api/docs`) qui n'est pas
 *   soumise au cookie JWT.
 * - Sinon délègue à la stratégie Passport « jwt » (cookie httpOnly) et
 *   renvoie `401` si le jeton est absent ou invalide.
 *
 * Enregistrée via `APP_GUARD` dans `AppModule` afin de couvrir tous les
 * modules. Elle doit être déclarée avant `PermissionsGuard` pour peupler
 * `request.user` avant le contrôle d'autorisation.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    if (request.path.startsWith('/api/docs')) return true;

    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: unknown, user: unknown, info: unknown, context?: unknown, status?: unknown): any {
    if (err || !user) {
      throw new UnauthorizedException('Authentification requise');
    }
    return user;
  }
}
