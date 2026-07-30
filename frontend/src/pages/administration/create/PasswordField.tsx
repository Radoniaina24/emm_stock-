import { useState } from "react"
import { Eye, EyeOff, Hash } from "lucide-react"

type PasswordFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

export function PasswordField({ id, label, value, onChange, error, placeholder }: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  const inputClass = `h-10 w-full rounded-lg border bg-background pl-9 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground/30 focus:shadow-sm focus:ring-2 ${
    error
      ? "border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10"
      : "border-border/60 focus:border-primary/40 focus:ring-primary/10"
  }`

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80" htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Masquer" : "Afficher"}
          className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-muted hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
