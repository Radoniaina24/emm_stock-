import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import * as rolePermissionsApi from "@/api/role-permissions"
import { useAuthStore } from "@/stores/auth-store"

const BYPASS_ROLE_CODES = new Set(["SUPER_ADMIN", "ADMIN"])

export function useRolePermissions(roleId?: string) {
  return useQuery({
    queryKey: ["role-permissions", roleId],
    queryFn: () => rolePermissionsApi.getRolePermissions(roleId as string),
    enabled: Boolean(roleId),
    staleTime: 5 * 60 * 1000,
  })
}

type PermissionsApi = {
  can: (permission: string) => boolean
  ready: boolean
}

/**
 * Permet de conditionner l'affichage des actions (boutons, modales) selon les
 * permissions de l'utilisateur courant. Les rôles SUPER_ADMIN / ADMIN disposent
 * de toutes les permissions. Pour les autres rôles, on résout les permissions
 * depuis l'API rôle (mise en cache 5 min).
 */
export function usePermissions(): PermissionsApi {
  const role = useAuthStore((state) => state.user?.role ?? null)
  const { data, isLoading } = useRolePermissions(role?.id)

  return useMemo<PermissionsApi>(() => {
    if (!role) return { can: () => false, ready: false }

    if (BYPASS_ROLE_CODES.has(role.code)) {
      return { can: () => true, ready: true }
    }

    const assigned = new Set((data?.permissions ?? []).map((p) => p.code))
    return {
      can: (permission: string) => assigned.has(permission),
      ready: !isLoading,
    }
  }, [role, data, isLoading])
}
