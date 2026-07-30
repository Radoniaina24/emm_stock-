import { User } from "lucide-react"

type Props = {
  firstName: string
  lastName: string
  onFirstNameChange: (value: string) => void
  onLastNameChange: (value: string) => void
  errors: { firstName?: string; lastName?: string }
}

function inputClass(error?: string) {
  const base = "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 focus:shadow-sm focus:ring-2"
  return error
    ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
    : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
}

export function PersonalInformationCard({ firstName, lastName, onFirstNameChange, onLastNameChange, errors }: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3.5">
        <User className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Informations personnelles</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-firstName">
            Prénom <span className="text-destructive">*</span>
          </label>
          <input
            id="create-firstName"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="Jean"
            className={inputClass(errors.firstName)}
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-lastName">
            Nom <span className="text-destructive">*</span>
          </label>
          <input
            id="create-lastName"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Dupont"
            className={inputClass(errors.lastName)}
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>
    </div>
  )
}
