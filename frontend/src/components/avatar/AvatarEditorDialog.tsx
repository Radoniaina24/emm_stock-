import { useCallback, useEffect, useId, useRef, useState } from "react"
import Cropper, { type Area } from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"
import {
  ImagePlus,
  RotateCcw,
  RotateCw,
  Trash2,
  Upload,
  ZoomIn,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalPopup,
  ModalRoot,
  ModalTitle,
} from "@/components/ui/modal"
import {
  AVATAR_ACCEPT,
  AVATAR_MAX_BYTES,
  getCroppedImageFile,
  validateAvatarFile,
} from "@/lib/crop-image"
import { cn } from "@/lib/utils"
import { useDeleteAvatarMutation, useUploadAvatarMutation } from "@/hooks/use-avatar"

type AvatarEditorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentAvatarUrl: string | null
  initials: string
}

export function AvatarEditorDialog({
  open,
  onOpenChange,
  currentAvatarUrl,
  initials,
}: AvatarEditorDialogProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const uploadMutation = useUploadAvatarMutation()
  const deleteMutation = useDeleteAvatarMutation()
  const busy = uploadMutation.isPending || deleteMutation.isPending

  const resetEditor = useCallback(() => {
    setImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setCroppedAreaPixels(null)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setLocalError(null)
    setConfirmDelete(false)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  useEffect(() => {
    if (!open) resetEditor()
  }, [open, resetEditor])

  useEffect(() => {
    if (!imageSrc || !croppedAreaPixels) return

    let cancelled = false
    const timer = window.setTimeout(async () => {
      try {
        const file = await getCroppedImageFile(imageSrc, croppedAreaPixels, rotation)
        if (cancelled) return
        const url = URL.createObjectURL(file)
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return url
        })
      } catch {
        // ignore preview errors while adjusting crop
      }
    }, 120)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  function loadFile(file: File) {
    const error = validateAvatarFile(file)
    if (error) {
      setLocalError(error)
      return
    }
    setLocalError(null)
    setConfirmDelete(false)
    const url = URL.createObjectURL(file)
    setImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) loadFile(file)
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) loadFile(file)
  }

  async function handleSave() {
    if (!imageSrc || !croppedAreaPixels) return
    setLocalError(null)
    try {
      const file = await getCroppedImageFile(imageSrc, croppedAreaPixels, rotation)
      await uploadMutation.mutateAsync(file)
      onOpenChange(false)
    } catch {
      // toast handled in mutation
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    try {
      await deleteMutation.mutateAsync()
      onOpenChange(false)
    } catch {
      // toast handled in mutation
    }
  }

  const displayPreview = previewUrl ?? currentAvatarUrl

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalPopup size="lg">
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Photo de profil</ModalTitle>
          <ModalDescription>
            Importez une image, recadrez-la et validez. Formats JPG, PNG ou WebP — max{" "}
            {AVATAR_MAX_BYTES / (1024 * 1024)} Mo.
          </ModalDescription>
        </ModalHeader>

        <ModalContent className="space-y-5">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={AVATAR_ACCEPT}
            className="sr-only"
            onChange={onFileChange}
          />

          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <div className="space-y-3">
              {imageSrc ? (
                <div className="relative h-72 overflow-hidden rounded-xl bg-zinc-950">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                  />
                </div>
              ) : (
                <label
                  htmlFor={inputId}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={cn(
                    "flex h-72 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 px-6 text-center transition-colors",
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-muted/50",
                  )}
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Upload className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Importer une image</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Glissez-déposez ou cliquez pour parcourir
                    </p>
                  </div>
                </label>
              )}

              {imageSrc ? (
                <div className="space-y-3 rounded-xl border bg-muted/20 p-3">
                  <div className="flex items-center gap-3">
                    <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.05}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer accent-primary"
                      aria-label="Zoom"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 text-center text-[10px] font-medium text-muted-foreground">
                      °
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={1}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer accent-primary"
                      aria-label="Rotation"
                    />
                    <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
                      {rotation}°
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setRotation((r) => (r + 270) % 360)}
                    >
                      <RotateCcw data-icon="inline-start" />
                      −90°
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                    >
                      <RotateCw data-icon="inline-start" />
                      +90°
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => inputRef.current?.click()}
                    >
                      <ImagePlus data-icon="inline-start" />
                      Changer
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-center gap-3 sm:pt-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Aperçu
              </p>
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-lg ring-4 ring-background">
                {displayPreview ? (
                  <img
                    src={displayPreview}
                    alt="Aperçu avatar"
                    className="size-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Affiché sur votre profil et dans la barre supérieure
              </p>
            </div>
          </div>

          {localError ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {localError}
            </p>
          ) : null}

          {confirmDelete ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              Confirmez la suppression de votre photo actuelle.
            </p>
          ) : null}
        </ModalContent>

        <ModalFooter className="justify-between gap-2">
          <div>
            {currentAvatarUrl ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={busy || Boolean(imageSrc)}
                onClick={handleDelete}
              >
                <Trash2 data-icon="inline-start" />
                {confirmDelete ? "Confirmer la suppression" : "Supprimer"}
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              disabled={busy || !imageSrc || !croppedAreaPixels}
              onClick={handleSave}
            >
              {uploadMutation.isPending ? "Enregistrement…" : "Enregistrer"}
            </Button>
          </div>
        </ModalFooter>
      </ModalPopup>
    </ModalRoot>
  )
}
