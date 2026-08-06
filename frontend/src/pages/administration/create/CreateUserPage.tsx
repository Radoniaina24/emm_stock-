import { useCallback, useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2, Save, UserPlus } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { ApiError } from "@/lib/api"
import { useCreateUserMutation, useNextEmployeeCodeQuery } from "@/hooks/use-users"
import { PersonalInformationCard } from "./PersonalInformationCard"
import { AccountInformationCard } from "./AccountInformationCard"
import { ProfessionalInformationCard } from "./ProfessionalInformationCard"

const userSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  username: z
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères")
    .regex(/^[a-zA-Z0-9_.]+$/, "Lettres, chiffres, _ et . uniquement"),
  email: z.string().email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[a-z]/, "Au moins une minuscule")
    .regex(/[0-9]/, "Au moins un chiffre")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Au moins un caractère spécial"),
  confirmPassword: z.string(),
  employeeCode: z.string().min(1, "Le matricule est obligatoire"),
  roleId: z.string().min(1, "Le rôle est obligatoire"),
  departmentId: z.string().min(1, "Le département est obligatoire"),
  jobTitleId: z.string().min(1, "Le poste est obligatoire"),
  warehouseId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

type UserFormData = z.infer<typeof userSchema>

type FieldErrors = Partial<Record<keyof UserFormData, string>>

const initialForm: UserFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  employeeCode: "",
  roleId: "",
  departmentId: "",
  jobTitleId: "",
  warehouseId: "",
}

export function CreateUserPage() {
  const navigate = useNavigate()
  const createUser = useCreateUserMutation()
  const { data: nextCode, isFetching: isNextCodeLoading } = useNextEmployeeCodeQuery()
  const [form, setForm] = useState<UserFormData>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (nextCode?.employeeCode) {
      setForm((prev) => ({ ...prev, employeeCode: nextCode!.employeeCode }))
    }
  }, [nextCode])

  const set = useCallback(<K extends keyof UserFormData>(key: K, value: UserFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
  }, [])

  function validate(): UserFormData | null {
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
    setFormError(null)
    const data = validate()
    if (!data) return

    try {
      await createUser.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        employeeCode: data.employeeCode,
        roleId: data.roleId,
        departmentId: data.departmentId,
        jobTitleId: data.jobTitleId,
        warehouseId: data.warehouseId || undefined,
      })
      toast.success("Utilisateur créé avec succès")
      setDirty(false)
      navigate("/dashboard/administration/utilisateurs")
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Une erreur est survenue.")
    }
  }

  const isPending = createUser.isPending

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/administration/utilisateurs")} className="size-9 shrink-0">
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <UserPlus className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Nouvel utilisateur</h1>
            <p className="text-sm text-muted-foreground">Créez un compte pour un membre de l'équipe</p>
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
          password={form.password}
          confirmPassword={form.confirmPassword}
          onUsernameChange={(v) => set("username", v)}
          onEmailChange={(v) => set("email", v)}
          onPasswordChange={(v) => set("password", v)}
          onConfirmPasswordChange={(v) => set("confirmPassword", v)}
          errors={fieldErrors}
        />

        <ProfessionalInformationCard
          employeeCode={form.employeeCode}
          employeeCodeAuto
          employeeCodeLoading={isNextCodeLoading}
          roleId={form.roleId}
          departmentId={form.departmentId}
          jobTitleId={form.jobTitleId}
          warehouseId={form.warehouseId ?? ""}
          onEmployeeCodeChange={(v) => set("employeeCode", v)}
          onRoleIdChange={(v) => set("roleId", v)}
          onDepartmentIdChange={(v) => set("departmentId", v)}
          onJobTitleIdChange={(v) => set("jobTitleId", v)}
          onWarehouseIdChange={(v) => set("warehouseId", v || undefined)}
          errors={fieldErrors}
          warehouseRequired={false}
        />

        {formError ? (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <span className="inline-block size-1.5 shrink-0 rounded-full bg-destructive" />
            {formError}
          </div>
        ) : null}

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
                Création…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="size-4" />
                Créer l'utilisateur
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
