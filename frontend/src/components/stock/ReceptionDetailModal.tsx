import {
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useReceptionQuery } from "@/hooks/use-stock"

type Props = {
  id: string | null
  onClose: () => void
}

const STATUS: Record<
  string,
  { label: string; variant: "success" | "outline" | "destructive" | "secondary" }
> = {
  DONE: { label: "Validée", variant: "success" },
  CONFIRMED: { label: "Confirmée", variant: "secondary" },
  DRAFT: { label: "Brouillon", variant: "outline" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
}

export function ReceptionDetailModal({ id, onClose }: Props) {
  const { data, isLoading } = useReceptionQuery(id ?? "")
  const open = Boolean(id)

  return (
    <ModalRoot open={open} onOpenChange={(o) => (o ? undefined : onClose())}>
      <ModalPopup className="max-w-2xl">
        <ModalClose />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <span className="text-sm font-bold">REC</span>
            </div>
            <div>
              <ModalTitle>{data ? `Réception ${data.reference}` : "Réception"}</ModalTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {data ? `${data.supplier.name} · ${data.warehouse.name}` : "Chargement…"}
              </p>
            </div>
          </div>
        </ModalHeader>

        <ModalContent>
          {isLoading || !data ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Chargement…</p>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 text-sm sm:grid-cols-4">
                <Info
                  label="Date"
                  value={format(new Date(data.date), "d MMM yyyy", { locale: fr })}
                />
                <Info
                  label="Statut"
                  value={
                    <Badge variant={STATUS[data.status]?.variant ?? "outline"}>
                      {STATUS[data.status]?.label ?? data.status}
                    </Badge>
                  }
                />
                <Info label="Fournisseur" value={data.supplier.name} />
                <Info label="Entrepôt" value={data.warehouse.name} />
                {data.description && (
                  <div className="col-span-2 sm:col-span-4">
                    <p className="text-xs text-muted-foreground">Note</p>
                    <p className="text-foreground/80">{data.description}</p>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">Produit</th>
                      <th className="px-3 py-2 text-right">Qté</th>
                      <th className="px-3 py-2 text-right">Coût unit.</th>
                      <th className="px-3 py-2">Lot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lines.map((l) => (
                      <tr key={l.id} className="border-t border-border/60">
                        <td className="px-3 py-2">
                          <p className="font-medium text-foreground">{l.product.name}</p>
                          <p className="text-xs text-muted-foreground/60">{l.product.sku}</p>
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {Number(l.quantity).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {Number(l.unitCost).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground/80">{l.lotNumber ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </ModalContent>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalPopup>
    </ModalRoot>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  )
}
