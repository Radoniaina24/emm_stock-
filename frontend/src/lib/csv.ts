export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false
  let i = 0

  const pushField = () => {
    row.push(field)
    field = ""
  }
  const pushRow = () => {
    pushField()
    rows.push(row)
    row = []
  }

  while (i < text.length) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        continue
      }
      field += char
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = true
      i += 1
      continue
    }

    if (char === ",") {
      pushField()
      i += 1
      continue
    }

    if (char === "\r") {
      i += 1
      continue
    }

    if (char === "\n") {
      pushRow()
      i += 1
      continue
    }

    field += char
    i += 1
  }

  if (field.length > 0 || row.length > 0) pushRow()

  return rows.filter((r) => r.some((c) => c.trim() !== ""))
}

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return ""
  const str = String(value)
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function toCsv(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const lines = [headers.map(escapeCsv).join(",")]
  for (const row of rows) {
    lines.push(row.map(escapeCsv).join(","))
  }
  return "﻿" + lines.join("\r\n")
}

export function downloadFile(content: string | Blob, filename: string, mime: string) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
