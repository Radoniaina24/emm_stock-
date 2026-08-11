import { useRef } from "react"
import { ImagePlus, Image as ImageIcon, Trash2 } from "lucide-react"

import { toast } from "@/components/ui/toast"
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  type PendingImage,
} from "@/lib/product-form"

type Props = {
  pendingImages: PendingImage[]
  onAddFiles: (files: File[]) => void
  onRemovePending: (index: number) => void
}

export function ImagesCard({ pendingImages, onAddFiles, onRemovePending }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFilesChange(files: FileList | null) {
    if (!files || files.length === 0) return
    const list = Array.from(files)
    const invalidCount = list.filter(
      (f) => !ACCEPTED_IMAGE_TYPES.includes(f.type as (typeof ACCEPTED_IMAGE_TYPES)[number]) || f.size > MAX_IMAGE_SIZE,
    ).length
    if (invalidCount > 0) {
      toast.error(`${invalidCount} fichier(s) ignoré(s) — JPG, PNG ou WebP, max 2 Mo.`)
    }
    const accepted = list
      .filter(
        (f) => ACCEPTED_IMAGE_TYPES.includes(f.type as (typeof ACCEPTED_IMAGE_TYPES)[number]) && f.size <= MAX_IMAGE_SIZE,
      )
      .map((file) => ({ file, url: URL.createObjectURL(file) }))
    if (accepted.length > 0) {
      onAddFiles(accepted.map((p) => p.file))
      toast.success(`${accepted.length} image(s) ajoutée(s)`)
    }
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors hover:border-border/80">
      <div className="flex items-center justify-between border-b border-border/20 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
            <ImageIcon className="size-3.5" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Images</h3>
        </div>
        {pendingImages.length > 0 && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
            {pendingImages.length} {pendingImages.length > 1 ? "images" : "image"}
          </span>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {pendingImages.map((pending, index) => (
            <div key={pending.url} className="group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-muted/20 ring-1 ring-primary/20">
              <img src={pending.url} alt={pending.file.name} className="size-full object-cover" />
              <span className="absolute top-1.5 left-1.5 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                En attente
              </span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onRemovePending(index)}
                  title="Retirer"
                  className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-destructive/80"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          <label
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border/60 text-muted-foreground/50 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            title="Ajouter des images"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFilesChange(e.target.files)
                e.target.value = ""
              }}
            />
            <ImagePlus className="size-5" />
            <span className="text-[11px] font-medium">Ajouter</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground/50">
          JPG, PNG ou WebP — 2 Mo max par image. La première image ajoutée devient principale.
        </p>
      </div>
    </div>
  )
}
