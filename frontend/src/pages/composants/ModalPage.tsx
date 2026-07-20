import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Info,
  Mail,
  Settings2,
  ShoppingCart,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ModalRoot,
  ModalTrigger,
  ModalPopup,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal"
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select"

function InfoModalExample() {
  return (
    <ModalRoot>
      <ModalTrigger>
        <Button variant="outline" className="gap-2">
          <Info className="size-4" />
          Détails du produit
        </Button>
      </ModalTrigger>
      <ModalPopup>
        <ModalHeader>
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShoppingCart className="size-5" />
          </div>
          <ModalTitle>MacBook Pro 16"</ModalTitle>
          <ModalDescription>
            Réf. MK2E3LL/A • En stock : 24 unités
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/50 p-4">
            {[
              { label: "Prix unitaire", value: "2 499,00 €" },
              { label: "Catégorie", value: "Informatique" },
              { label: "Marque", value: "Apple" },
              { label: "Seuil d'alerte", value: "5 unités" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Processeur Apple M3 Max avec CPU 16 cœurs, GPU 40 cœurs,
            48 Go de mémoire unifiée, SSD 1 To.
          </p>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost">Fermer</Button>
          </ModalClose>
          <Button>Modifier le produit</Button>
        </ModalFooter>
        <ModalClose />
      </ModalPopup>
    </ModalRoot>
  )
}

function ConfirmDeleteModalExample() {
  return (
    <ModalRoot>
      <ModalTrigger>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="size-4" />
          Supprimer
        </Button>
      </ModalTrigger>
      <ModalPopup>
        <ModalHeader>
          <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <ModalTitle>Supprimer cet élément ?</ModalTitle>
          <ModalDescription>
            Cette action est irréversible. Les données supprimées ne pourront pas être récupérées.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Facture #INV-2024-0891</p>
                <p className="mt-0.5 text-xs text-destructive/70">
                  Client : SARL Dupont • Montant : 12 450,00 € • Date : 15/03/2024
                </p>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost">Annuler</Button>
          </ModalClose>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="size-4" />
            Supprimer définitivement
          </Button>
        </ModalFooter>
        <ModalClose />
      </ModalPopup>
    </ModalRoot>
  )
}

function InviteUserModalExample() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  return (
    <ModalRoot>
      <ModalTrigger>
        <Button className="gap-2">
          <UserPlus className="size-4" />
          Inviter un utilisateur
        </Button>
      </ModalTrigger>
      <ModalPopup>
        <ModalHeader>
          <ModalTitle>Inviter un utilisateur</ModalTitle>
          <ModalDescription>
            Envoyez une invitation par email pour rejoindre votre espace.
          </ModalDescription>
        </ModalHeader>
        <ModalContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@entreprise.com"
                className="w-full rounded-lg border border-border/60 bg-background py-2 pl-10 pr-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 hover:bg-muted/50 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="role">
              Rôle
            </label>
            <SelectRoot value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectPopup>
                <SelectList>
                  <SelectItem value="Administrateur">Administrateur</SelectItem>
                  <SelectItem value="Gestionnaire de stock">Gestionnaire de stock</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Observateur">Observateur</SelectItem>
                </SelectList>
              </SelectPopup>
            </SelectRoot>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              L'utilisateur recevra un email avec un lien de connexion sécurisé,
              valable pendant 72 heures.
            </p>
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost">Annuler</Button>
          </ModalClose>
          <Button disabled={!email || !role} className="gap-2">
            <Mail className="size-4" />
            Envoyer l'invitation
          </Button>
        </ModalFooter>
        <ModalClose />
      </ModalPopup>
    </ModalRoot>
  )
}

function SuccessModalExample() {
  return (
    <ModalRoot>
      <ModalTrigger>
        <Button variant="secondary" className="gap-2">
          <CheckCircle2 className="size-4" />
          Valider une commande
        </Button>
      </ModalTrigger>
      <ModalPopup>
        <ModalContent className="flex flex-col items-center py-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <CheckCircle2 className="size-7" />
          </div>
          <ModalTitle className="mt-4">Commande validée !</ModalTitle>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            La commande #CMD-2024-0891 a été validée avec succès.
            Un email de confirmation a été envoyé au client.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5 text-sm">
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="size-3" />
              Confirmée
            </Badge>
            <span className="text-muted-foreground">—</span>
            <span className="font-medium text-foreground">Livraison prévue le 28/03/2024</span>
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost">Fermer</Button>
          </ModalClose>
          <Button className="gap-2">
            <ExternalLink className="size-4" />
            Voir le détail
          </Button>
        </ModalFooter>
        <ModalClose />
      </ModalPopup>
    </ModalRoot>
  )
}

const sizes = ["sm", "default", "lg"] as const

export function ModalPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 pb-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
            <Settings2 className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Modal</h1>
            <p className="text-sm text-muted-foreground">
              Boîtes de dialogue modales pour les confirmations, formulaires et affichages d'information.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            @base-ui/react/dialog
          </Badge>
          <Badge variant="outline">5 variantes</Badge>
          <Badge variant="outline">6 tailles</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-violet-50 to-white shadow-md dark:from-violet-950/20 dark:to-background">
          <CardHeader>
            <CardTitle>Information produit</CardTitle>
            <CardDescription>
              Affichez les détails d'un produit dans une interface claire et structurée.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InfoModalExample />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-red-50 to-white shadow-md dark:from-red-950/20 dark:to-background">
          <CardHeader>
            <CardTitle>Confirmation de suppression</CardTitle>
            <CardDescription>
              Modal de confirmation avec style destructif et récapitulatif des données.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfirmDeleteModalExample />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-white shadow-md dark:from-blue-950/20 dark:to-background">
          <CardHeader>
            <CardTitle>Formulaire d'invitation</CardTitle>
            <CardDescription>
              Collectez des informations utilisateur avec validation et feedback visuel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InviteUserModalExample />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-white shadow-md dark:from-emerald-950/20 dark:to-background">
          <CardHeader>
            <CardTitle>État de succès</CardTitle>
            <CardDescription>
              Feedback positif après une action réussie avec résumé des résultats.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SuccessModalExample />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tailles disponibles</CardTitle>
              <CardDescription>
                Le composant ModalPopup accepte une prop <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">size</code> avec 5 valeurs.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Users className="size-3" />
              5 tailles
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <ModalRoot key={size}>
                <ModalTrigger>
                  <Button variant="outline" className="gap-2 min-w-28 justify-center capitalize">
                    {size}
                    <span className="text-xs text-muted-foreground">
                      {size === "sm" ? "384px" : size === "default" ? "512px" : "672px"}
                    </span>
                  </Button>
                </ModalTrigger>
                <ModalPopup size={size}>
                  <ModalHeader>
                    <ModalTitle>Modal {size}</ModalTitle>
                    <ModalDescription>
                      Largeur maximale : {size === "sm" ? "384px" : size === "default" ? "512px" : "672px"}
                    </ModalDescription>
                  </ModalHeader>
                  <ModalContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Utilisez la prop <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">size</code> pour adapter
                      la largeur de la modal à votre contenu.
                    </p>
                  </ModalContent>
                  <ModalFooter>
                    <ModalClose>
                      <Button variant="ghost">Fermer</Button>
                    </ModalClose>
                    <Button>D'accord</Button>
                  </ModalFooter>
                  <ModalClose />
                </ModalPopup>
              </ModalRoot>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API / Utilisation</CardTitle>
              <CardDescription>Structure du composant et sous-composants disponibles.</CardDescription>
            </div>
            <Badge variant="outline">11 sous-composants</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border bg-[#0d1117] text-sm">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-white/40">modal.tsx</span>
            </div>
            <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-white/80"><code>{`<ModalRoot>
  <ModalTrigger>
    <Button>Ouvrir</Button>
  </ModalTrigger>
  <ModalPopup size="default">
    <ModalHeader>
      <ModalTitle>Titre</ModalTitle>
      <ModalDescription>Description</ModalDescription>
    </ModalHeader>
    <ModalContent>
      Contenu de la modal
    </ModalContent>
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost">Annuler</Button>
      </ModalClose>
      <Button>Confirmer</Button>
    </ModalFooter>
    <ModalClose />
  </ModalPopup>
</ModalRoot>`}</code></pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
