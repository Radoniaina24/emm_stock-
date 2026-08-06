import { Briefcase, Hash, Sparkles } from "lucide-react"
import { RoleSelect } from "./RoleSelect"
import { DepartmentSelect } from "./DepartmentSelect"
import { JobTitleSelect } from "./JobTitleSelect"
import { WarehouseSelect } from "./WarehouseSelect"

type Props = {
  employeeCode: string
  employeeCodeAuto?: boolean
  employeeCodeLoading?: boolean
  roleId: string
  departmentId: string
  jobTitleId: string
  warehouseId: string
  onEmployeeCodeChange: (value: string) => void
  onRoleIdChange: (value: string) => void
  onDepartmentIdChange: (value: string) => void
  onJobTitleIdChange: (value: string) => void
  onWarehouseIdChange: (value: string) => void
  errors: { employeeCode?: string; roleId?: string; departmentId?: string; jobTitleId?: string; warehouseId?: string }
  warehouseRequired: boolean
}

function inputClass(error?: string) {
  const base = "h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground/30 focus:shadow-sm focus:ring-2"
  return error
    ? `${base} border-destructive/60 focus:border-destructive/40 focus:ring-destructive/10`
    : `${base} border-border/60 focus:border-primary/40 focus:ring-primary/10`
}

export function ProfessionalInformationCard({
  employeeCode, employeeCodeAuto, employeeCodeLoading, roleId, departmentId, jobTitleId, warehouseId,
  onEmployeeCodeChange, onRoleIdChange, onDepartmentIdChange, onJobTitleIdChange, onWarehouseIdChange,
  errors, warehouseRequired,
}: Props) {
  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3.5">
        <Briefcase className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Affectation professionnelle</h3>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80" htmlFor="create-employeeCode">
            Matricule <span className="text-destructive">*</span>
            {employeeCodeAuto ? (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <Sparkles className="size-3" />
                Auto
              </span>
            ) : null}
          </label>
          <div className="relative">
            <Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
            <input
              id="create-employeeCode"
              value={employeeCode}
              onChange={(e) => onEmployeeCodeChange(e.target.value)}
              placeholder={employeeCodeLoading ? "Génération…" : "EMP-2026-0001"}
              readOnly={employeeCodeAuto}
              className={`${inputClass(errors.employeeCode)}${employeeCodeAuto ? " cursor-not-allowed opacity-80" : ""}`}
            />
          </div>
          {employeeCodeAuto ? (
            <p className="text-xs text-muted-foreground/60">Généré automatiquement, format EMP-année-séquence</p>
          ) : null}
          {errors.employeeCode && <p className="text-xs text-destructive">{errors.employeeCode}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DepartmentSelect value={departmentId} onValueChange={onDepartmentIdChange} error={errors.departmentId} />
          <JobTitleSelect value={jobTitleId} onValueChange={onJobTitleIdChange} error={errors.jobTitleId} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <RoleSelect value={roleId} onValueChange={onRoleIdChange} error={errors.roleId} />
          <WarehouseSelect value={warehouseId} onValueChange={onWarehouseIdChange} error={errors.warehouseId} required={warehouseRequired} />
        </div>
      </div>
    </div>
  )
}
