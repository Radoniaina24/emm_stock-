import { SearchableSelect } from "@/components/ui/searchable-select"
import { useWarehousesQuery } from "@/hooks/use-warehouses"

type WarehouseSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
  required?: boolean
}

export function WarehouseSelect({ value, onValueChange, error, required }: WarehouseSelectProps) {
  const { data: warehouses, isLoading } = useWarehousesQuery()

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Entrepôt {required && <span className="text-destructive">*</span>}
      </label>
      <SearchableSelect
        value={value}
        placeholder={isLoading ? "Chargement..." : "Sélectionner un entrepôt"}
        options={(warehouses ?? []).map((w) => ({ value: w.id, label: w.name }))}
        onSelect={onValueChange}
        triggerClassName={`h-10 ${error ? "border-destructive/60" : ""}`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}