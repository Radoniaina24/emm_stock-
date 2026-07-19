import { useState } from "react"
import { addDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, CalendarIcon, Clock } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { DatePicker, type RangePreset } from "@/components/ui/date-picker"
import { MonthPicker } from "@/components/ui/month-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { YearPicker } from "@/components/ui/year-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const inputClass =
  "h-9 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/30 focus:shadow-sm focus:ring-2 focus:ring-primary/10"

const RANGE_PRESETS: RangePreset[] = [
  {
    label: "7 jours",
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      return { from: start, to: end }
    },
  },
  {
    label: "30 jours",
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      return { from: start, to: end }
    },
  },
  {
    label: "90 jours",
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 89)
      return { from: start, to: end }
    },
  },
  {
    label: "1 an",
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setFullYear(start.getFullYear() - 1)
      return { from: start, to: end }
    },
  },
]

export function DatePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [date2, setDate2] = useState<Date | undefined>(addDays(new Date(), 3))
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [time1, setTime1] = useState<string | undefined>("14:30")
  const [time2, setTime2] = useState<string | undefined>(undefined)
  const [month, setMonth] = useState<Date | undefined>(new Date())
  const [month2, setMonth2] = useState<Date | undefined>(undefined)
  const [year, setYear] = useState<number | undefined>(2026)
  const [year2, setYear2] = useState<number | undefined>(undefined)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dates & Heures</h1>
        <p className="text-sm text-muted-foreground">
          DatePicker, Calendar et champs natifs pour les dates et intervalles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <CardTitle>DatePicker simple</CardTitle>
          </div>
          <CardDescription>Sélection d'une date avec popover calendar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date libre</label>
            <DatePicker
              mode="single"
              selected={date}
              onSelect={(selected) => setDate(selected as Date | undefined)}
              placeholder="Choisir une date"
            />
            {date && (
              <p className="text-xs text-muted-foreground/60">
                Sélectionnée : {format(date, "PPP", { locale: fr })}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date pré-remplie</label>
            <DatePicker
              mode="single"
              selected={date2}
              onSelect={(selected) => setDate2(selected as Date | undefined)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <CardTitle>Intervalle de dates</CardTitle>
          </div>
          <CardDescription>Sélection d'une plage avec préréglages, navigation clavier et locale française.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DatePicker
            mode="range"
            selected={range}
            onSelect={(selected) => setRange(selected as DateRange | undefined)}
            placeholder="Choisir une période"
            presets={RANGE_PRESETS}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <CardTitle>TimePicker</CardTitle>
          </div>
          <CardDescription>Sélection de l'heure avec popover (heures / minutes par pas de 5).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Heure pré-remplie</label>
            <TimePicker value={time1} onChange={setTime1} />
            {time1 && (
              <p className="text-xs text-muted-foreground/60">Sélectionnée : {time1}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Heure libre</label>
            <TimePicker value={time2} onChange={setTime2} placeholder="Choisir une heure" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Pas de 15 minutes</label>
            <TimePicker minuteStep={15} placeholder="15 min" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <CardTitle>MonthPicker</CardTitle>
          </div>
          <CardDescription>Sélection d'un mois avec navigation par année.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Mois pré-rempli</label>
            <MonthPicker value={month} onChange={setMonth} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Mois libre</label>
            <MonthPicker value={month2} onChange={setMonth2} placeholder="Choisir un mois" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <CardTitle>YearPicker</CardTitle>
          </div>
          <CardDescription>Sélection d'une année avec navigation par page de 12 ans.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Année pré-remplie</label>
            <YearPicker value={year} onChange={setYear} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Année libre</label>
            <YearPicker value={year2} onChange={setYear2} placeholder="Choisir une année" startYear={2000} endYear={2050} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-primary" />
            <CardTitle>Champs natifs</CardTitle>
          </div>
          <CardDescription>Inputs HTML natifs pour date, heure et datetime.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Date</label>
              <input type="date" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Mois</label>
              <input type="month" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Semaine</label>
              <input type="week" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Heure</label>
              <input type="time" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Date & Heure</label>
              <input type="datetime-local" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Désactivé</label>
              <input
                type="date"
                defaultValue="2026-07-19"
                disabled
                className={`${inputClass} bg-muted/50 text-muted-foreground/60`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
