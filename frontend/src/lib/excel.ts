export function cellValue(value: unknown): string | number {
  if (value == null) return ""
  if (typeof value === "number") return value
  if (typeof value === "boolean") return value ? "Oui" : "Non"
  return String(value)
}

export async function exportToExcel(
  headers: string[],
  rows: unknown[][],
  filename: string,
): Promise<void> {
  const ExcelJS = (await import("exceljs")).default
  const workbook = new ExcelJS.Workbook()
  workbook.creator = "StockFlow"
  workbook.modified = new Date()

  const sheet = workbook.addWorksheet("Export")
  sheet.addRow(headers)

  const headerRow = sheet.getRow(1)
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } }
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E3A8A" },
  }
  headerRow.alignment = { vertical: "middle", horizontal: "left" }

  for (const row of rows) {
    sheet.addRow(row.map(cellValue))
  }

  sheet.columns.forEach((col) => {
    let maxLen = headers.join("").length / headers.length + 2
    for (const v of col.values ?? []) {
      const len = v == null ? 0 : String(v).length
      if (len > maxLen) maxLen = len
    }
    col.width = Math.min(60, Math.max(12, maxLen))
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename.toLowerCase().endsWith(".xlsx") ? filename : `${filename}.xlsx`
  a.click()
  URL.revokeObjectURL(url)
}

function cellToString(value: unknown): string {
  if (value == null) return ""
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === "object" && "text" in (value as Record<string, unknown>)) {
    return String((value as { text: unknown }).text)
  }
  return String(value)
}

export async function parseExcelFile(file: File): Promise<string[][]> {
  const ExcelJS = (await import("exceljs")).default
  const buffer = await file.arrayBuffer()
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)
  const sheet = workbook.worksheets[0]
  if (!sheet) return []
  const rows: string[][] = []
  for (let r = 1; r <= sheet.rowCount; r++) {
    const cells: string[] = []
    for (let c = 1; c <= sheet.columnCount; c++) {
      cells.push(cellToString(sheet.getCell(r, c).value))
    }
    rows.push(cells)
  }
  return rows
}
