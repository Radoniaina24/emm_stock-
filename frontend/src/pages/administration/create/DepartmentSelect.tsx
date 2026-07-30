import { Building2 } from "lucide-react"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select"
import { useDepartmentsQuery } from "@/hooks/use-departments"

type DepartmentSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function DepartmentSelect({ value, onValueChange, error }: DepartmentSelectProps) {
  const { data: departments, isLoading } = useDepartmentsQuery()
  const label = departments?.find((d) => d.id === value)?.name

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Département <span className="text-destructive">*</span>
      </label>
      <SelectRoot value={value} onValueChange={(v) => onValueChange(v ?? "")}>
        <SelectTrigger className={`h-10 ${error ? "border-destructive/60" : ""}`}>
          <span className="flex-1 truncate text-left">
            {label ?? (isLoading ? "Chargement..." : "Sélectionner un département")}
          </span>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {departments?.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span>{dept.name}</span>
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
