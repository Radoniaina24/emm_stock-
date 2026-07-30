import { Warehouse } from "lucide-react"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
      <SelectRoot value={value} onValueChange={(v) => onValueChange(v ?? "")}>
        <SelectTrigger
          className={`h-10 ${error ? "border-destructive/60" : ""}`}
        >
          <SelectValue placeholder={isLoading ? "Chargement..." : "Sélectionner un entrepôt"} />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {warehouses?.map((wh) => (
              <SelectItem key={wh.id} value={wh.id}>
                <div className="flex items-center gap-2">
                  <Warehouse className="size-4 text-muted-foreground" />
                  <span>{wh.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
