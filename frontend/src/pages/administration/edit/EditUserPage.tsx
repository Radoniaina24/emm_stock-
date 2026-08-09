import { useCallback, useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Loader2, Save, UserCog } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useUserQuery, useUpdateUserMutation } from "@/hooks/use-users"
import { PersonalInformationCard } from "@/pages/administration/create/PersonalInformationCard"
import { AccountInformationCard } from "@/pages/administration/create/AccountInformationCard"
import { ProfessionalInformationCard } from "@/pages/administration/create/ProfessionalInformationCard"
import { StatusSelect } from "@/pages/administration/create/StatusSelect"

const userSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  username: z
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères")
    .regex(/^[a-zA-Z0-9_.]+$/, "Lettres, chiffres, _ et . uniquement"),
  email: z.string().email("Format d'email invalide"),
  employeeCode: z.string().optional(),
  roleId: z.string().min(1, "Le rôle est obligatoire"),
  departmentId: z.string().min(1, "Le département est obligatoire"),
  jobTitleId: z.string().min(1, "Le poste est obligatoire"),
  warehouseId: z.string().optional(),
  status: z.string().min(1, "Le statut est obligatoire"),
})

type UserFormData = z.infer<typeof userSchema>

type FieldErrors = Partial<Record<keyof UserFormData, string>>

export function EditUserPage() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()
  const { data: user, isLoading: isUserLoading, isError } = useUserQuery(userId)
  const updateUser = useUpdateUserMutation()
  const [form, setForm] = useState<UserFormData | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  useEffect(() => {
    if (!user) return
    setForm({
      firstName: user.profile?.firstName ?? "",
      lastName: user.profile?.lastName ?? "",
      username: user.username,
      email: user.email,
      employeeCode: user.profile?.employeeCode ?? "",
      roleId: user.role?.id ?? "",
      departmentId: user.profile?.department?.id ?? "",
      jobTitleId: user.profile?.jobTitle?.id ?? "",
      warehouseId: user.profile?.warehouse?.id ?? "",
      status: user.status,
    })
  }, [user])

  const set = useCallback(<K extends keyof UserFormData>(key: K, value: UserFormData[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }, [])

  function validate(): UserFormData | null {
    if (!form) return null
    const result = userSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof UserFormData
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return null
    }
    setFieldErrors({})
    return result.data
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user) return
    const data = validate()
    if (!data) return

    try {
      await updateUser.mutateAsync({
        id: user.id,
        payload: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          roleId: data.roleId,
          departmentId: data.departmentId,
          jobTitleId: data.jobTitleId,
          warehouseId: data.warehouseId || undefined,
          status: data.status,
        },
      })
      toast.success("Utilisateur modifié avec succès")
      navigate("/dashboard/administration/utilisateurs")
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Une erreur est survenue.",
      )
    }
  }

  if (isUserLoading || !form) {
    return (
      <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Chargement de l'utilisateur…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">Utilisateur introuvable ou accès refusé.</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/administration/utilisateurs")}>
          <ArrowLeft className="size-4" />
          Retour à la liste
        </Button>
      </div>
    )
  }

  const isPending = updateUser.isPending

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/administration/utilisateurs")} className="size-9 shrink-0">
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <UserCog className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Modifier l'utilisateur</h1>
            <p className="text-sm text-muted-foreground">
              Mettez à jour les informations du compte (mot de passe non modifiable)
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <PersonalInformationCard
          firstName={form.firstName}
          lastName={form.lastName}
          onFirstNameChange={(v) => set("firstName", v)}
          onLastNameChange={(v) => set("lastName", v)}
          errors={fieldErrors}
        />

        <AccountInformationCard
          username={form.username}
          email={form.email}
          password=""
          confirmPassword=""
          onUsernameChange={(v) => set("username", v)}
          onEmailChange={(v) => set("email", v)}
          onPasswordChange={() => {}}
          onConfirmPasswordChange={() => {}}
          errors={fieldErrors}
          hidePassword
        />

        <ProfessionalInformationCard
          employeeCode={form.employeeCode ?? ""}
          employeeCodeReadOnly
          roleId={form.roleId}
          departmentId={form.departmentId}
          jobTitleId={form.jobTitleId}
          warehouseId={form.warehouseId ?? ""}
          onEmployeeCodeChange={() => {}}
          onRoleIdChange={(v) => set("roleId", v)}
          onDepartmentIdChange={(v) => set("departmentId", v)}
          onJobTitleIdChange={(v) => set("jobTitleId", v)}
          onWarehouseIdChange={(v) => set("warehouseId", v)}
          errors={fieldErrors}
          warehouseRequired={false}
        />

        <div className="rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3.5">
            <h3 className="text-sm font-semibold text-foreground">Statut du compte</h3>
          </div>
          <div className="p-5">
            <StatusSelect
              value={form.status}
              onValueChange={(value) => set("status", value)}
              error={fieldErrors.status}
            />
          </div>
        </div>

        {updateUser.isError && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
            {updateUser.error instanceof ApiError
              ? updateUser.error.message
              : "Une erreur est survenue."}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/dashboard/administration/utilisateurs")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isPending} className="min-w-36">
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Enregistrement…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="size-4" />
                Enregistrer les modifications
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}