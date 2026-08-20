import { SetMetadata } from '@nestjs/common';

/** Clé de métadonnée utilisée pour marquer une route comme publique. */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marque un handler/controller comme accessible sans authentification.
 * La `JwtAuthGuard` globale honore cette métadonnée et laisse passer la route.
 *
 * Ex: @Public() @Post('login')
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
