const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

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

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let message = "Une erreur est survenue."
    try {
      const data = (await response.json()) as { message?: string | string[] }
      if (Array.isArray(data.message)) message = data.message.join(", ")
      else if (typeof data.message === "string") message = data.message
    } catch {
      // ignore JSON parse errors
    }

    if (response.status === 401) {
      message = message === "Unauthorized" || message === "Une erreur est survenue."
        ? "Identifiants incorrects ou session expirée."
        : message
    }

    throw new ApiError(message, response.status)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
