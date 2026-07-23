import { useState, type FormEvent } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Boxes, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { ApiError } from "@/lib/api"

type LocationState = { from?: { pathname: string } }

export function LoginPage() {
  const { login, isAuthenticated, isLoggingIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as LocationState | null)?.from?.pathname ?? "/dashboard"

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.status === 401
            ? "Identifiants incorrects."
            : err.message,
        )
      } else {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.")
      }
    }
  }

  return (
    <div className="flex min-h-svh">
      <div
        aria-hidden
        className="relative hidden w-1/2 bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-background/70" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-background/15 backdrop-blur">
              <Boxes className="size-6" />
            </div>
            <span className="text-xl font-semibold tracking-tight">StockFlow</span>
          </div>
          <div>
            <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight">
              Pilotez votre inventaire en toute sérénité
            </h2>
            <p className="mt-3 max-w-sm text-primary-foreground/80">
              Connectez-vous pour accéder à votre tableau de bord et gérer vos stocks en temps réel.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-muted/30 px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground lg:hidden">
              <Boxes className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Connectez-vous à votre espace backoffice
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card p-6 shadow-xs"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="email">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@entreprise.com"
                    className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">
                    Mot de passe
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              </div>

              {error ? (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Connexion…" : "Se connecter"}
              </Button>
            </div>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground lg:justify-start">
            <ShieldCheck className="size-4" />
            Connexion sécurisée et chiffrée
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground lg:text-left">
            <Link to="/" className="font-medium text-primary hover:underline">
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
