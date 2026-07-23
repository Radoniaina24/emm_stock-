import type { Area } from "react-easy-crop"

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.crossOrigin = "anonymous"
    image.src = url
  })
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/** Crop + rotate an image and return a JPEG File (~512px square). */
export async function getCroppedImageFile(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  fileName = "avatar.jpg",
): Promise<File> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas non disponible")

  const rotRad = getRadianAngle(rotation)
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  )

  canvas.width = Math.max(1, Math.round(bBoxWidth))
  canvas.height = Math.max(1, Math.round(bBoxHeight))

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height),
  )

  const cropCanvas = document.createElement("canvas")
  cropCanvas.width = data.width
  cropCanvas.height = data.height
  const cropCtx = cropCanvas.getContext("2d")
  if (!cropCtx) throw new Error("Canvas non disponible")
  cropCtx.putImageData(data, 0, 0)

  const outputSize = 512
  const output = document.createElement("canvas")
  output.width = outputSize
  output.height = outputSize
  const outCtx = output.getContext("2d")
  if (!outCtx) throw new Error("Canvas non disponible")
  outCtx.imageSmoothingEnabled = true
  outCtx.imageSmoothingQuality = "high"
  outCtx.drawImage(cropCanvas, 0, 0, outputSize, outputSize)

  const blob = await new Promise<Blob>((resolve, reject) => {
    output.toBlob(
      (result) => {
        if (result) resolve(result)
        else reject(new Error("Échec de l'export de l'image"))
      },
      "image/jpeg",
      0.92,
    )
  })

  return new File([blob], fileName, { type: "image/jpeg" })
}

export const AVATAR_ACCEPT = "image/jpeg,image/png,image/webp"
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024

export function validateAvatarFile(file: File): string | null {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "Formats acceptés : JPG, PNG, WebP"
  }
  if (file.size > AVATAR_MAX_BYTES) {
    return "Fichier trop volumineux (max 2 Mo)"
  }
  return null
}
