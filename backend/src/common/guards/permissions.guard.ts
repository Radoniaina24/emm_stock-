import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service.js';

export const PERMISSIONS_KEY = 'permissions';

/** Rôles disposant de tous les droits, exemptés de la vérification fine. */
const PRIVILEGED_ROLES = new Set(['SUPER_ADMIN', 'ADMIN']);

/**
 * Garde RBAC : vérifie que l'utilisateur authentifié dispose des permissions
 * déclarées via @RequirePermission. Les rôles privilégiés passent sans contrôle.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Aucune permission requise sur la route → accès libre (après auth).
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { id: string; role?: string } | undefined;
    if (!user) throw new UnauthorizedException();

    if (user.role && PRIVILEGED_ROLES.has(user.role)) return true;

    const rows = await this.prisma.rolePermission.findMany({
      where: { role: { users: { some: { id: user.id } } } },
      select: { permission: { select: { code: true } } },
    });
    const granted = new Set(rows.map((r) => r.permission.code));

    const missing = required.filter((code) => !granted.has(code));
    if (missing.length > 0) {
      throw new ForbiddenException(
        `Permissions insuffisantes : ${missing.join(', ')}`,
      );
    }
    return true;
  }
}
