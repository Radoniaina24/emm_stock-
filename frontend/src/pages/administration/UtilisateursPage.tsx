import { useMemo } from "react"
import { Edit, Eye, Shield, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUsersQuery } from "@/hooks/use-users"
import type { User as UserType } from "@/types/auth"

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Gestionnaire: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Employé: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

export function UtilisateursPage() {
  const { data: users, isLoading } = useUsersQuery()

  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Utilisateur",
        cell: ({ row }) => {
          const user = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-semibold text-white ring-1 ring-border/60">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground/70">{user.email}</p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: "Rôle",
        cell: ({ row }) => {
          const role = row.getValue("role") as string
          return (
            <Badge
              variant="secondary"
              className={`gap-1.5 text-xs font-medium ${roleColors[role] ?? ""}`}
            >
              <Shield className="size-3" />
              {role}
            </Badge>
          )
        },
      },
      {
        id: "status",
        header: "Statut",
        cell: () => (
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Actif</span>
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground/70">
            {row.getValue("id")}
          </code>
        ),
      },

    ],
    [],
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Utilisateurs</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les utilisateurs de la plateforme, leurs rôles et leurs accès.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users ?? []}
        searchKey="name"
        searchPlaceholder="Rechercher un utilisateur..."
        loading={isLoading}
        exportFilename="utilisateurs.csv"
        emptyMessage="Aucun utilisateur trouvé."
        enableSelection
        renderActions={() => (
          <div className="flex items-center justify-end gap-0.5">
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-foreground">
              <Eye className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-foreground">
              <Edit className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground/60 hover:text-destructive">
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      />
    </div>
  )
}
