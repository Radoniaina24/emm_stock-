import type { ReactNode } from "react"

import { useMeQuery } from "@/hooks/use-auth"
import { useAuthStore } from "@/stores/auth-store"

/** Hydrates the session from the httpOnly cookie via GET /auth/me */
export function AuthBootstrap({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status)
  const { isPending, isFetching, isError } = useMeQuery()

  if (status === "idle" && (isPending || isFetching) && !isError) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement de la session…</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
