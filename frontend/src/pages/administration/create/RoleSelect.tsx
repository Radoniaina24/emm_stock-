import { Shield } from "lucide-react"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select"
import { useRolesQuery } from "@/hooks/use-roles"

type RoleSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function RoleSelect({ value, onValueChange, error }: RoleSelectProps) {
  const { data: roles, isLoading } = useRolesQuery()
  const label = roles?.find((r) => r.id === value)?.name

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Rôle <span className="text-destructive">*</span>
      </label>
      <SelectRoot value={value} onValueChange={(v) => onValueChange(v ?? "")}>
        <SelectTrigger className={`h-10 ${error ? "border-destructive/60" : ""}`}>
          <span className="flex-1 truncate text-left data-[placeholder]:text-muted-foreground/40">
            {label ?? (isLoading ? "Chargement..." : "Sélectionner un rôle")}
          </span>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {roles?.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-muted-foreground" />
                  <span>{role.name}</span>
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
