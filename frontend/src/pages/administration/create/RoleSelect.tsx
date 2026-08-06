import { SearchableSelect } from "@/components/ui/searchable-select"
import { useRolesQuery } from "@/hooks/use-roles"

type RoleSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function RoleSelect({ value, onValueChange, error }: RoleSelectProps) {
  const { data: roles, isLoading } = useRolesQuery()

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Rôle <span className="text-destructive">*</span>
      </label>
      <SearchableSelect
        value={value}
        placeholder={isLoading ? "Chargement..." : "Sélectionner un rôle"}
        options={(roles ?? []).map((r) => ({ value: r.id, label: r.name }))}
        onSelect={onValueChange}
        triggerClassName={`h-10 ${error ? "border-destructive/60" : ""}`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}