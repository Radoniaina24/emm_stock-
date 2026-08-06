import { SearchableSelect } from "@/components/ui/searchable-select"
import { useJobTitlesQuery } from "@/hooks/use-job-titles"

type JobTitleSelectProps = {
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function JobTitleSelect({ value, onValueChange, error }: JobTitleSelectProps) {
  const { data: jobTitles, isLoading } = useJobTitlesQuery()

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">
        Poste <span className="text-destructive">*</span>
      </label>
      <SearchableSelect
        value={value}
        placeholder={isLoading ? "Chargement..." : "Sélectionner un poste"}
        options={(jobTitles ?? []).map((j) => ({ value: j.id, label: j.name }))}
        onSelect={onValueChange}
        triggerClassName={`h-10 ${error ? "border-destructive/60" : ""}`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}