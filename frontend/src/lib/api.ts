const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"
export const UPLOADS_BASE_URL =
  import.meta.env.VITE_UPLOADS_BASE_URL ?? "http://localhost:3000"

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown
}

async function parseError(response: Response): Promise<string> {
  let message = "Une erreur est survenue."
  try {
    const data = (await response.json()) as { message?: string | string[] }
    if (Array.isArray(data.message)) message = data.message.join(", ")
    else if (typeof data.message === "string") message = data.message
  } catch {
    // ignore
  }

  if (response.status === 401) {
    message =
      message === "Unauthorized" || message === "Une erreur est survenue."
        ? "Identifiants incorrects ou session expirée."
        : message
  }

  return message
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(body !== undefined && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  })

  if (!response.ok) {
    throw new ApiError(await parseError(response), response.status)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

/** Resolve a stored avatar path (/uploads/...) to an absolute URL. */
export function resolveUploadUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path
  }
  return `${UPLOADS_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
