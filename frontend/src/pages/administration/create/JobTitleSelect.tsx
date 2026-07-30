import { BadgeCheck } from "lucide-react"
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
      <SelectRoot value={value} onValueChange={(v) => onValueChange(v ?? "")}>
        <SelectTrigger
          className={`h-10 ${error ? "border-destructive/60" : ""}`}
        >
          <SelectValue placeholder={isLoading ? "Chargement..." : "Sélectionner un poste"} />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {jobTitles?.map((jt) => (
              <SelectItem key={jt.id} value={jt.id}>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-muted-foreground" />
                  <span>{jt.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
