# Règles d'utilisation des composants

## Principe fondamental

**Toute l'application doit utiliser les composants existants dans `@/components/ui/`.**

Il est interdit de créer des éléments HTML bruts ( `<div>`, `<button>`, `<input>`, `<select>`, etc. ) alors qu'un composant équivalent existe déjà.

## Composants disponibles

| Élément natif | Composant à utiliser | Import |
|---|---|---|
| `<button>` | `<Button>` | `@/components/ui` |
| `<div>` (carte) | `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>` | `@/components/ui` |
| `<table>` | `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` | `@/components/ui` |
| `<select>` / `<option>` | `<SelectRoot>`, `<SelectTrigger>`, `<SelectValue>`, `<SelectPopup>`, `<SelectList>`, `<SelectItem>` | `@/components/ui` |
| `<dialog>` / modale | `<ModalRoot>`, `<ModalTrigger>`, `<ModalPopup>`, `<ModalHeader>`, `<ModalTitle>`, `<ModalDescription>`, `<ModalContent>`, `<ModalFooter>`, `<ModalClose>` | `@/components/ui` |
| `<input type="date">` | `<DatePicker>` | `@/components/ui` |
| `<input type="month">` | `<MonthPicker>` | `@/components/ui` |
| `<input type="time">` | `<TimePicker>` | `@/components/ui` |
| `<input type="year">` | `<YearPicker>` | `@/components/ui` |
| `<span>` (badge) | `<Badge>` | `@/components/ui` |
| `<input>` + `<datalist>` | `<Combobox>` | `@/components/ui` |
| Toast / notification | `toast()` + `<Toaster>` | `@/components/ui` |
| Tableau de données | `<DataTable>` | `@/components/ui` |
| Calendrier | `<Calendar>` | `@/components/ui` |

## Import simplifié

Tous les composants sont accessibles depuis un seul point d'entrée :

```tsx
import { Button, Card, ModalRoot, SelectRoot, Badge } from "@/components/ui"
```

## Cas particuliers

- Si un composant existant ne répond pas au besoin, **ne pas créer d'élément HTML brut**.
- Étendre le composant existant ou en créer un nouveau dans `@/components/ui/` en suivant le même modèle ( `cva`, `data-slot`, `cn()` ).
- Les composants de layout ( `Sidebar`, `Topbar`, `DashboardLayout` ) et les composants métier ( `StatCard`, `StockTable` ) sont exclus de cette règle.

## Validation

Cette règle est appliquée lors des revues de code. Toute PR contenant des éléments HTML bruts remplaçables par un composant existant sera refusée.
