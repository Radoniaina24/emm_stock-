import { SearchableSelect } from "@/components/ui/searchable-select"
import { useDepartmentsQuery } from "@/hooks/use-departments"

type DepartmentSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function DepartmentSelect({ value, onValueChange, error }: DepartmentSelectProps) {
  const { data: departments, isLoading } = useDepartmentsQuery()

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Département <span className="text-destructive">*</span>
      </label>
      <SearchableSelect
        value={value}
        placeholder={isLoading ? "Chargement..." : "Sélectionner un département"}
        options={(departments ?? []).map((d) => ({ value: d.id, label: d.name }))}
        onSelect={onValueChange}
        triggerClassName={`h-10 ${error ? "border-destructive/60" : ""}`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
