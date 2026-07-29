import { useMemo, useState, useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  CheckCheck,
  FilterX,
  Search,
  Shield,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast"
import { SelectRoot, SelectTrigger, SelectValue, SelectPopup, SelectList, SelectItem } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  useRolePermissionsQuery,
  useSyncRolePermissionsMutation,
} from "@/hooks/use-role-permissions"
import { ApiError } from "@/lib/api"
import { cn } from "@/lib/utils"

type Permission = {
  id: string
  module: string
  action: string
  code: string
  description: string | null
}

function PermissionCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  const id = `perm-${label.replace(/\s+/g, "-")}`
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted/60",
        checked && "bg-primary/[0.04]",
      )}
    >
      <div className="relative flex size-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            "flex size-5 items-center justify-center rounded-[5px] border-2 transition-all duration-150",
            "peer-hover:border-primary/60 peer-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]",
            checked
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/30 bg-transparent",
          )}
        >
          {checked && (
            <svg className="size-3 fill-current" viewBox="0 0 12 12">
              <path d="M3 6l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm font-medium text-foreground/90">{label}</span>
    </label>
  )
}

function PermissionGroup({
  module,
  permissions,
  selectedIds,
  onToggle,
}: {
  module: string
  permissions: Permission[]
  selectedIds: Set<string>
  onToggle: (id: string, checked: boolean) => void
}) {
  const moduleSelectedCount = permissions.filter((p) => selectedIds.has(p.id)).length
  const allModuleSelected = moduleSelectedCount === permissions.length

  function toggleModule(checked: boolean) {
    for (const p of permissions) {
      onToggle(p.id, checked)
    }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{module}</span>
          <Badge variant="secondary" className="text-[10px] font-medium">
            {moduleSelectedCount}/{permissions.length}
          </Badge>
        </div>
        <button
          type="button"
          onClick={() => toggleModule(!allModuleSelected)}
          className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          {allModuleSelected ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>
      <div className="divide-y divide-border/20">
        {permissions.map((perm) => (
          <PermissionCheckbox
            key={perm.id}
            checked={selectedIds.has(perm.id)}
            onChange={(checked) => onToggle(perm.id, checked)}
            label={perm.action}
          />
        ))}
      </div>
    </div>
  )
}

function RolePermissionToolbar({
  search,
  onSearchChange,
  modules,
  selectedModule,
  onModuleChange,
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
}: {
  search: string
  onSearchChange: (value: string) => void
  modules: string[]
  selectedModule: string
  onModuleChange: (value: string) => void
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onDeselectAll: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-52 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une permission..."
          className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground/50 transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <SelectRoot value={selectedModule} onValueChange={(v) => onModuleChange(v ?? "")}>
        <SelectTrigger className="h-9 min-w-40 text-sm">
          <SelectValue placeholder="Filtrer par module" />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            <SelectItem value="">
              <span className="flex items-center gap-2 text-muted-foreground">
                <FilterX className="size-3.5" />
                Tous les modules
              </span>
            </SelectItem>
            {modules.map((mod) => (
              <SelectItem key={mod} value={mod}>
                {mod}
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="sm" onClick={onSelectAll} className="h-8 text-xs gap-1.5">
          <CheckCheck className="size-3.5" />
          Tout
        </Button>
        <Button variant="ghost" size="sm" onClick={onDeselectAll} className="h-8 text-xs gap-1.5">
          <X className="size-3.5" />
          Aucun
        </Button>
      </div>

      <Badge variant="secondary" className="text-xs font-medium whitespace-nowrap">
        {selectedCount} / {totalCount} sélectionnée(s)
      </Badge>
    </div>
  )
}

function PermissionFooter({
  hasChanges,
  isSaving,
  onSave,
}: {
  hasChanges: boolean
  isSaving: boolean
  onSave: () => void
}) {
  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-between rounded-xl border border-border/60 bg-background/95 px-5 py-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className={cn(
          "inline-block size-2 rounded-full",
          hasChanges ? "bg-amber-500" : "bg-emerald-500",
        )} />
        {hasChanges
          ? "Modifications non enregistrées"
          : "Toutes les modifications sont enregistrées"}
      </div>
      <Button onClick={onSave} disabled={!hasChanges || isSaving}>
        {isSaving ? (
          <span className="flex items-center gap-2">
            <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Enregistrement…
          </span>
        ) : (
          "Enregistrer"
        )}
      </Button>
    </div>
  )
}

export function RolePermissionPage() {
  const { roleId } = useParams<{ roleId: string }>()
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useRolePermissionsQuery(roleId ?? "")
  const syncMutation = useSyncRolePermissionsMutation(roleId ?? "")

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [selectedModule, setSelectedModule] = useState("")

  useEffect(() => {
    if (data) {
      setSelectedIds(new Set(data.assignedPermissionIds))
    }
  }, [data?.assignedPermissionIds])

  const hasChanges = useMemo(() => {
    if (!data) return false
    const current = new Set(data.assignedPermissionIds)
    if (current.size !== selectedIds.size) return true
    for (const id of current) {
      if (!selectedIds.has(id)) return true
    }
    return false
  }, [data, selectedIds])

  const modules = useMemo(() => {
    if (!data) return []
    return [...new Set(data.permissions.map((p) => p.module))].sort()
  }, [data])

  const grouped = useMemo(() => {
    if (!data) return new Map<string, Permission[]>()
    const map = new Map<string, Permission[]>()
    for (const p of data.permissions) {
      const group = map.get(p.module) ?? []
      group.push(p)
      map.set(p.module, group)
    }
    return map
  }, [data])

  const filteredModules = useMemo(() => {
    const entries = [...grouped.entries()]
    return entries.filter(([module, perms]) => {
      if (selectedModule && module !== selectedModule) return false
      if (search) {
        const q = search.toLowerCase()
        return perms.some(
          (p) =>
            p.action.toLowerCase().includes(q) ||
            p.code.toLowerCase().includes(q),
        )
      }
      return true
    })
  }, [grouped, selectedModule, search])

  const selectedCount = selectedIds.size
  const totalCount = data?.permissions.length ?? 0

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    if (!data) return
    setSelectedIds(new Set(data.permissions.map((p) => p.id)))
  }, [data])

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  async function handleSave() {
    if (!roleId) return
    try {
      await syncMutation.mutateAsync([...selectedIds])
      toast.success("Permissions mises à jour avec succès")
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <p className="text-sm text-destructive">
          {error instanceof ApiError ? error.message : "Impossible de charger les permissions."}
        </p>
        <Button variant="outline" onClick={() => navigate("/dashboard/administration/roles")}>
          Retour aux rôles
        </Button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="w-full space-y-6 pb-24">
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => navigate("/dashboard/administration/roles")}
          className="group inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Retour aux rôles
        </button>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
            <Shield className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Permissions — {data.role.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {data.role.code}
            </p>
          </div>
        </div>
      </div>

      <RolePermissionToolbar
        search={search}
        onSearchChange={setSearch}
        modules={modules}
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
        selectedCount={selectedCount}
        totalCount={totalCount}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />

      {filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <Search className="size-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground/70">Aucune permission trouvée</p>
          {(search || selectedModule) && (
            <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setSelectedModule("") }}>
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredModules.map(([module, perms]) => (
            <PermissionGroup
              key={module}
              module={module}
              permissions={perms}
              selectedIds={selectedIds}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      <PermissionFooter
        hasChanges={hasChanges}
        isSaving={syncMutation.isPending}
        onSave={handleSave}
      />
    </div>
  )
}
