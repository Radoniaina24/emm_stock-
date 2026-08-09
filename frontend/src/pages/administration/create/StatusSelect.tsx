import { SearchableSelect } from "@/components/ui/searchable-select"

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Actif" },
  { value: "INACTIVE", label: "Inactif" },
  { value: "SUSPENDED", label: "Suspendu" },
  { value: "LOCKED", label: "Verrouillé" },
]

type StatusSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function StatusSelect({ value, onValueChange, error }: StatusSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">Statut du compte</label>
      <SearchableSelect
        value={value}
        placeholder="Sélectionner un statut"
        options={STATUS_OPTIONS}
        onSelect={onValueChange}
        triggerClassName={`h-10 ${error ? "border-destructive/60" : ""}`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}