import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from '../guards/permissions.guard.js';

/**
 * Déclare les codes de permission requis sur un handler/controller.
 * Ex: @RequirePermission('stocks.view')
 * Ex: @RequirePermission('stocks.adjust', 'stocks.transfer')
 */
export const RequirePermission = (...codes: string[]) =>
  SetMetadata(PERMISSIONS_KEY, codes);
