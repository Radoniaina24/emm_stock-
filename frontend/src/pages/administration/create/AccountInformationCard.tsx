import { Lock, Mail, User as UserIcon } from "lucide-react"
import { PasswordField } from "./PasswordField"

type Props = {
  username: string
  email: string
  password: string
  confirmPassword: string
  onUsernameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  errors: { username?: string; email?: string; password?: string; confirmPassword?: string }
  hidePassword?: boolean
}

function inputClass(error?: string) {
  const base = "h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 focus:shadow-sm focus:ring-2"
  return error
    ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
    : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
}

export function AccountInformationCard({
  username, email, password, confirmPassword,
  onUsernameChange, onEmailChange, onPasswordChange, onConfirmPasswordChange,
  errors, hidePassword = false,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3.5">
        <UserIcon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Compte utilisateur</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-username">
            Nom d'utilisateur <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
            <input
              id="create-username"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="jean.dupont"
              className={inputClass(errors.username)}
            />
          </div>
          {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-email">
            Adresse e-mail <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
            <input
              id="create-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="jean.dupont@email.com"
              className={inputClass(errors.email)}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        {hidePassword ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-muted/30 px-3.5 py-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
            <div>
              <p className="text-xs font-medium text-foreground/80">
                Mot de passe non modifiable ici
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Le mot de passe du compte ne peut pas être changé depuis cette page.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField
              id="create-password"
              label="Mot de passe"
              value={password}
              onChange={onPasswordChange}
              error={errors.password}
              placeholder="Minimum 8 caractères"
            />
            <PasswordField
              id="create-confirmPassword"
              label="Confirmation du mot de passe"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              error={errors.confirmPassword}
              placeholder="Répétez le mot de passe"
            />
          </div>
        )}
      </div>
    </div>
  )
}
