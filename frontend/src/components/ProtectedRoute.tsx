import { Navigate, useLocation } from "react-router-dom"

import { useAuthStore } from "@/stores/auth-store"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const status = useAuthStore((s) => s.status)
  const location = useLocation()

  if (status === "idle") {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
