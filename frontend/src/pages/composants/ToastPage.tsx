import { toast } from "sonner"
import { Bell, CheckCircle, CircleAlert, Cookie, Info, TriangleAlert, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const reasons = [
  "Tâche terminée avec succès",
  "Mise à jour effectuée",
  "Synchronisation réussie",
  "Document sauvegardé",
  "Import terminé",
]

function randomReason() {
  return reasons[Math.floor(Math.random() * reasons.length)]
}

export function ToastPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Toasts</h1>
        <p className="text-sm text-muted-foreground">
          Notifications toast avec Sonner pour les retours utilisateur.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <CardTitle>Variantes</CardTitle>
          </div>
          <CardDescription>Les différents types de toasts disponibles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => toast(randomReason())}>
              Default
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.success(randomReason(), {
                  icon: <CheckCircle className="size-4" />,
                })
              }
              className="text-success"
            >
              Succès
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error(randomReason(), {
                  icon: <XCircle className="size-4" />,
                })
              }
              className="text-destructive"
            >
              Erreur
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.warning(randomReason(), {
                  icon: <TriangleAlert className="size-4" />,
                })
              }
              className="text-warning"
            >
              Attention
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.info(randomReason(), {
                  icon: <CircleAlert className="size-4" />,
                })
              }
            >
              Info
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="size-4 text-primary" />
            <CardTitle>Options avancées</CardTitle>
          </div>
          <CardDescription>Toasts avec description, action, durée personnalisée et promesse.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Avec description</label>
            <p className="text-xs text-muted-foreground/60">
              Affiche un titre et un sous-titre détaillé.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                toast("Mise à jour disponible", {
                  description: "La version 3.2.1 est prête à être installée.",
                })
              }
            >
              Afficher
            </Button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Avec action</label>
            <p className="text-xs text-muted-foreground/60">
              Toast avec bouton d'action cliquable.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                toast("Modifications non sauvegardées", {
                  description: "Voulez-vous enregistrer avant de quitter ?",
                  action: {
                    label: "Sauvegarder",
                    onClick: () => toast.success("Sauvegardé !"),
                  },
                })
              }
            >
              Afficher
            </Button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Promesse (async)</label>
            <p className="text-xs text-muted-foreground/60">
              Toast qui suit le cycle d'une promesse : chargement → succès/erreur.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                const promise = new Promise<{ name: string }>((resolve, reject) => {
                  const ok = Math.random() > 0.4
                  setTimeout(() => {
                    if (ok) resolve({ name: "Rapport.xlsx" })
                    else reject(new Error("Échec de l'export"))
                  }, 2000)
                })
                toast.promise(promise, {
                  loading: "Export en cours...",
                  success: (data) => `${data.name} exporté avec succès`,
                  error: (err) => err.message,
                })
              }}
            >
              Lancer l'export
            </Button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Durée personnalisée</label>
            <p className="text-xs text-muted-foreground/60">
              Toast qui reste affiché 10 secondes avant de disparaître.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                toast("Toast longue durée", {
                  description: "Ce message reste 10 secondes.",
                  duration: 10000,
                })
              }
            >
              Afficher (10s)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cookie className="size-4 text-primary" />
            <CardTitle>Toasts personnalisés</CardTitle>
          </div>
          <CardDescription>Toasts avec style et contenu totalement personnalisés.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            variant="outline"
            onClick={() =>
              toast("Nouveau message", {
                description: "Vous avez 3 messages non lus.",
                action: {
                  label: "Voir",
                  onClick: () => toast.info("Boîte de réception ouverte"),
                },
                cancel: {
                  label: "Ignorer",
                  onClick: () => toast("Marqué comme lu"),
                },
              })
            }
          >
            Message avec actions
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.custom((id) => (
                <div className="flex w-80 items-start gap-3 rounded-lg border bg-card p-4 shadow-lg">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Rappel important</p>
                    <p className="text-xs text-muted-foreground">
                      Vous avez une réunion dans 15 minutes.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          toast.dismiss(id)
                          toast.success("Rappel acquitté")
                        }}
                        className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => toast.dismiss(id)}
                        className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        Plus tard
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }}
          >
            Toast custom (JSX)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <CardTitle>Position & API</CardTitle>
          </div>
          <CardDescription>Positionnement du toast et fonctions utilitaires.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En haut à droite", { position: "top-right" })}
            >
              Top Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En haut à gauche", { position: "top-left" })}
            >
              Top Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En haut au centre", { position: "top-center" })}
            >
              Top Center
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En bas à droite", { position: "bottom-right" })}
            >
              Bottom Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En bas à gauche", { position: "bottom-left" })}
            >
              Bottom Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("En bas au centre", { position: "bottom-center" })}
            >
              Bottom Center
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.dismiss()}
              className="text-muted-foreground/60 hover:text-foreground"
            >
              Tout fermer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast("Toast non dismissible", { dismissible: false })}
              className="text-muted-foreground/60 hover:text-foreground"
            >
              Non dismissible
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
