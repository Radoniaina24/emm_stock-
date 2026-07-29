import { useMemo, useState, useCallback, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  CheckCheck,
  ChevronRight,
  Database,
  FileText,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
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

const MODULE_ICONS: Record<string, typeof Shield> = {
  Produits: Package,
  Stock: Warehouse,
  Utilisateurs: Users,
  Rôles: Shield,
  Permissions: Shield,
  Entrées: FileText,
  Sorties: FileText,
  Achats: ShoppingCart,
  Fournisseurs: Truck,
  Ventes: ShoppingCart,
  Rapports: FileText,
  Administration: Settings,
  Paramètres: Settings,
}

const MODULE_COLORS: Record<string, string> = {
  Produits: "from-emerald-500 to-teal-600",
  Stock: "from-blue-500 to-indigo-600",
  Utilisateurs: "from-violet-500 to-purple-600",
  Rôles: "from-indigo-500 to-violet-600",
  Permissions: "from-rose-500 to-pink-600",
  Entrées: "from-cyan-500 to-sky-600",
  Sorties: "from-orange-500 to-amber-600",
  Achats: "from-red-500 to-rose-600",
  Fournisseurs: "from-teal-500 to-emerald-600",
  Ventes: "from-green-500 to-emerald-600",
  Rapports: "from-slate-500 to-gray-600",
  Administration: "from-slate-600 to-gray-700",
  Paramètres: "from-stone-500 to-neutral-600",
}

function getModuleIcon(module: string) {
  return MODULE_ICONS[module] ?? Database
}

function getModuleGradient(module: string) {
  return MODULE_COLORS[module] ?? "from-primary to-primary/70"
}

function PermissionCheckbox({
  checked,
  onChange,
  label,
  description,
  id: checkboxId,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string | null
  id: string
}) {
  const inputId = `perm-${checkboxId}`
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-all duration-150",
        "hover:bg-muted/50",
        checked && "bg-primary/[0.03]",
      )}
    >
      <div className="relative flex size-5 shrink-0 items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            "flex size-5 items-center justify-center rounded-[5px] border-2 transition-all duration-200",
            "peer-hover:border-primary/60 peer-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1",
            checked
              ? "scale-100 border-primary bg-primary text-primary-foreground"
              : "scale-100 border-muted-foreground/30 bg-transparent",
          )}
        >
          {checked && (
            <svg
              className="size-3 animate-in zoom-in-75 fill-current"
              viewBox="0 0 12 12"
            >
              <path
                d="M3 6l2 2 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-muted-foreground/50 leading-tight mt-0.5">
            {description}
          </span>
        )}
      </div>
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
  const ModuleIcon = getModuleIcon(module)
  const progress = Math.round((moduleSelectedCount / permissions.length) * 100)

  function toggleModule(checked: boolean) {
    for (const p of permissions) {
      onToggle(p.id, checked)
    }
  }

  return (
    <div className="group/card overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/80">
      <div className={cn(
        "h-1.5 w-full bg-gradient-to-r transition-all duration-300",
        getModuleGradient(module),
        allModuleSelected ? "opacity-100" : "opacity-60",
      )} />
      <div className="flex items-center justify-between border-b border-border/20 px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg ring-1",
            "bg-gradient-to-br text-white shadow-sm",
            getModuleGradient(module),
            "ring-white/20",
          )}>
            <ModuleIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-sm font-semibold text-foreground truncate">
              {module}
            </span>
            <span className="text-[11px] text-muted-foreground/60">
              {moduleSelectedCount}/{permissions.length} permission{permissions.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleModule(!allModuleSelected)}
          className={cn(
            "shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all duration-150",
            "border border-transparent",
            allModuleSelected
              ? "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              : "bg-primary/10 text-primary hover:bg-primary/15",
          )}
        >
          {allModuleSelected ? "Désél." : "Tout sel."}
        </button>
      </div>
      <div className="px-1.5 pt-1.5 pb-1">
        <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
              getModuleGradient(module),
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="divide-y divide-border/10">
        {permissions.map((perm) => (
          <PermissionCheckbox
            key={perm.id}
            checked={selectedIds.has(perm.id)}
            onChange={(checked) => onToggle(perm.id, checked)}
            label={perm.action}
            description={perm.description}
            id={perm.id}
          />
        ))}
      </div>
    </div>
  )
}

function ModulePills({
  modules,
  selectedModule,
  onModuleChange,
}: {
  modules: string[]
  selectedModule: string
  onModuleChange: (value: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={scrollRef}
      className="flex gap-1.5 overflow-x-auto scrollbar-hidden -mx-1 px-1 pb-1"
    >
      <button
        type="button"
        onClick={() => onModuleChange("")}
        className={cn(
          "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border",
          !selectedModule
            ? "bg-foreground text-background border-foreground shadow-sm"
            : "bg-muted/40 text-muted-foreground/70 border-border/40 hover:bg-muted hover:text-foreground hover:border-border",
        )}
      >
        Tous
      </button>
      {modules.map((mod) => {
        const isActive = selectedModule === mod
        const ModuleIcon = getModuleIcon(mod)
        return (
          <button
            key={mod}
            type="button"
            onClick={() => onModuleChange(isActive ? "" : mod)}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border",
              isActive
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-muted/40 text-muted-foreground/70 border-border/40 hover:bg-muted hover:text-foreground hover:border-border",
            )}
          >
            <ModuleIcon className="size-3" />
            {mod}
          </button>
        )
      })}
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
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher une permission..."
            className="h-10 w-full rounded-xl border border-border/60 bg-muted/30 pl-10 pr-10 text-sm outline-none placeholder:text-muted-foreground/40 transition-all hover:border-border focus:border-ring/80 focus:bg-background focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground/40 transition-colors hover:text-foreground hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="h-9 rounded-xl px-3 text-xs gap-1.5 text-muted-foreground/70 hover:text-foreground"
          >
            <CheckCheck className="size-3.5" />
            Tout
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            className="h-9 rounded-xl px-3 text-xs gap-1.5 text-muted-foreground/70 hover:text-foreground"
          >
            <X className="size-3.5" />
            Aucun
          </Button>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-muted/40 border border-border/40 px-3.5 py-1.5">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold tabular-nums text-foreground">{selectedCount}</span>
            <span className="text-xs text-muted-foreground/60">/ {totalCount}</span>
          </div>
          <div className="h-5 w-px bg-border/40" />
          <span className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-wider">
            Sélectionnées
          </span>
        </div>
      </div>

      <ModulePills
        modules={modules}
        selectedModule={selectedModule}
        onModuleChange={onModuleChange}
      />
    </div>
  )
}

function PermissionFooter({
  hasChanges,
  isSaving,
  onSave,
  selectedCount,
  totalCount,
}: {
  hasChanges: boolean
  isSaving: boolean
  onSave: () => void
  selectedCount: number
  totalCount: number
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-3 lg:-mx-5 mt-8">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between rounded-2xl border border-border/50 bg-background/95 px-5 py-3.5 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex size-2.5 shrink-0 rounded-full transition-colors duration-300",
            hasChanges ? "bg-amber-400" : "bg-emerald-400",
          )}>
            <span className={cn(
              "absolute inline-flex size-2.5 rounded-full animate-ping opacity-30",
              hasChanges ? "bg-amber-400" : "bg-emerald-400",
            )} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground/80">
              {hasChanges
                ? "Modifications non enregistrées"
                : "Toutes les modifications sont enregistrées"}
            </span>
            <span className="text-[11px] text-muted-foreground/50">
              {selectedCount} / {totalCount} permission{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <Button
          onClick={onSave}
          disabled={!hasChanges || isSaving}
          size="lg"
          className={cn(
            "rounded-xl px-6 text-sm font-semibold transition-all duration-200",
            hasChanges && "shadow-lg shadow-primary/25",
          )}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Enregistrement…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCheck className="size-4" />
              Enregistrer
            </span>
          )}
        </Button>
      </div>
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
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative">
          <Spinner className="size-10 text-primary/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="size-4 text-primary/40" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground/60 animate-pulse">Chargement des permissions…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 ring-1 ring-destructive/20">
          <X className="size-7 text-destructive" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground/80">Erreur de chargement</p>
          <p className="text-sm text-muted-foreground/60">
            {error instanceof ApiError ? error.message : "Impossible de charger les permissions."}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/dashboard/administration/roles")} className="rounded-xl">
          Retour aux rôles
        </Button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 shadow-xl shadow-indigo-500/20">
        <div className="relative px-6 py-5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative">
            <button
              type="button"
              onClick={() => navigate("/dashboard/administration/roles")}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <ChevronRight className="size-3 -ml-1 opacity-30" />
              Administration
              <ChevronRight className="size-3 -ml-1 opacity-30" />
              Rôles
            </button>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 shadow-lg">
                <Shield className="size-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Permissions — {data.role.name}
                </h1>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-sm text-indigo-200/80 font-mono">{data.role.code}</span>
                  <span className="size-1 rounded-full bg-indigo-400/40" />
                  <span className="text-sm text-indigo-200/60">
                    {totalCount} permission{totalCount > 1 ? "s" : ""} disponibles
                  </span>
                </div>
              </div>
            </div>
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
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/50 ring-1 ring-border/40">
            <Search className="size-6 text-muted-foreground/30" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground/70">Aucune permission trouvée</p>
            <p className="text-xs text-muted-foreground/50">
              Essayez de modifier votre recherche ou vos filtres
            </p>
          </div>
          {(search || selectedModule) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearch(""); setSelectedModule("") }}
              className="rounded-xl text-xs"
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
        selectedCount={selectedCount}
        totalCount={totalCount}
      />
    </div>
  )
}
