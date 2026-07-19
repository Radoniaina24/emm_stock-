import { useState } from "react"
import { Check, ChevronDown, Mail, Lock, EyeOff, AlertCircle, AlertTriangle, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxRoot,
  ComboboxTrigger,
} from "@/components/ui/combobox"

export function FormulairesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Formulaires</h1>
        <p className="text-sm text-muted-foreground">
          Champs de saisie, select, textarea et leurs états.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input simple</CardTitle>
          <CardDescription>Champ de texte standard avec bordure.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Libellé</label>
            <input
              type="text"
              placeholder="Saisir du texte…"
              className="h-9 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Désactivé</label>
            <input
              type="text"
              defaultValue="Lecture seule"
              disabled
              className="h-9 w-full rounded-lg border border-border/60 bg-muted/50 px-3 text-sm text-muted-foreground/60 outline-none transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avec icône</CardTitle>
          <CardDescription>Icône à gauche ou à droite du champ.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Icône à gauche</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
              <input
                type="search"
                placeholder="Rechercher…"
                className="h-9 w-full rounded-lg border border-border/60 bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Icône à droite</label>
            <div className="relative">
              <input
                type="email"
                placeholder="votre@email.com"
                className="h-9 w-full rounded-lg border border-border/60 bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
              />
              <Mail className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Deux icônes</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
              <input
                type="password"
                placeholder="Mot de passe"
                defaultValue="monmotdepasse"
                className="h-9 w-full rounded-lg border border-border/60 bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
              />
              <EyeOff className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avec erreur et validation</CardTitle>
          <CardDescription>États d'erreur, succès et avertissement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Erreur</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="emailinvalide"
                className="h-9 w-full rounded-lg border border-destructive/60 bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-destructive/40 focus:shadow-sm focus:ring-2 focus:ring-destructive/10"
              />
              <AlertCircle className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-destructive/60" />
            </div>
            <p className="text-xs text-destructive/80">Format d'email invalide.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Succès</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="email@exemple.com"
                className="h-9 w-full rounded-lg border border-success/60 bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-success/40 focus:shadow-sm focus:ring-2 focus:ring-success/10"
              />
              <Check className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-success/60" />
            </div>
            <p className="text-xs text-success/80">Email valide.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Avertissement</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="Stock faible"
                className="h-9 w-full rounded-lg border border-warning/60 bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-warning/40 focus:shadow-sm focus:ring-2 focus:ring-warning/10"
              />
              <AlertTriangle className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-warning/60" />
            </div>
            <p className="text-xs text-warning/80">Quantité en dessous du seuil minimum.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Textarea et Select</CardTitle>
          <CardDescription>Champs multiligne et liste déroulante.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Textarea</label>
            <textarea
              placeholder="Saisir une description…"
              rows={3}
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Select</label>
            <SelectRoot defaultValue="option1">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                <SelectList>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                  <SelectItem value="option4" disabled>Option 4 (désactivée)</SelectItem>
                  <SelectItem value="option5">Option 5</SelectItem>
                </SelectList>
              </SelectPopup>
            </SelectRoot>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avec bouton intégré</CardTitle>
          <CardDescription>Combinaison input + bouton.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Adresse email…"
              className="h-9 flex-1 rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
            />
            <Button><Mail /> Envoyer</Button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Rechercher un produit…"
              className="h-9 flex-1 rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"
            />
            <Button variant="outline" size="icon"><Search /></Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multiselect avec recherche</CardTitle>
          <CardDescription>Sélection multiple avec filtrage, chips et état vide.</CardDescription>
        </CardHeader>
        <CardContent>
          <MultiSelectDemo />
        </CardContent>
      </Card>
    </div>
  )
}

const categories = [
  "Électronique",
  "Vêtements",
  "Alimentation",
  "Boissons",
  "Mobilier",
  "Papeterie",
  "Hygiène",
  "Entretien",
  "Jouets",
  "Sport",
  "Informatique",
  "Librairie",
]

function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <ComboboxRoot
      multiple
      items={categories}
      value={selected}
      onValueChange={(val) => setSelected(val ?? [])}
    >
      <ComboboxInputGroup>
        <ComboboxChips>
          {selected.map((item) => (
            <ComboboxChip key={item}>
              <span>{item}</span>
              <ComboboxChipRemove>
                <X className="size-2.5" />
              </ComboboxChipRemove>
            </ComboboxChip>
          ))}
        </ComboboxChips>
        <ComboboxInput placeholder="Rechercher une catégorie…" />
        {selected.length > 0 && (
          <ComboboxClear>
            <X className="size-3" />
          </ComboboxClear>
        )}
        <ComboboxTrigger>
          <ComboboxIcon>
            <ChevronDown className="size-3" />
          </ComboboxIcon>
        </ComboboxTrigger>
      </ComboboxInputGroup>

      <ComboboxPopup>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem value={item}>
              {item}
              <ComboboxItemIndicator>
                <Check className="size-3" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>Aucune catégorie trouvée</ComboboxEmpty>
      </ComboboxPopup>
    </ComboboxRoot>
  )
}
