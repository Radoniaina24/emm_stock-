import { Link } from "react-router-dom"
import {
  ArrowRight,
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  Check,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Smartphone,
  Timer,
  TrendingDown,
  Truck,
  Send,
  Globe,
  Code2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"

const features = [
  {
    icon: Boxes,
    title: "Inventaire en temps réel",
    description:
      "Suivez chaque produit, entrepôt et mouvement de stock avec une synchronisation instantanée.",
  },
  {
    icon: Bell,
    title: "Alertes de rupture",
    description:
      "Recevez une notification automatique lorsqu'un article atteint son seuil d'alerte.",
  },
  {
    icon: BarChart3,
    title: "Tableaux de bord",
    description:
      "Visualisez vos performances, valeurs de stock et tendances via des graphiques clairs.",
  },
  {
    icon: Truck,
    title: "Gestion des réceptions",
    description:
      "Enregistrez les livraisons fournisseurs et mettez à jour le stock en quelques clics.",
  },
  {
    icon: ShieldCheck,
    title: "Accès sécurisé",
    description:
      "Un espace administrateur protégé avec des rôles et permissions granulaires.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description:
      "Une interface pensée pour le bureau comme pour le mobile, partout dans l'entrepôt.",
  },
]

const advantages = [
  { value: "99,9 %", label: "Disponibilité du service", icon: Activity, color: "text-primary" },
  { value: "— 35 %", label: "Ruptures de stock évitées", icon: TrendingDown, color: "text-success" },
  { value: "2 min", label: "Pour réceptionner une livraison", icon: Timer, color: "text-warning" },
]

const pricingPlans = [
  {
    name: "Découverte",
    price: "0 Ar",
    period: "/ mois",
    description: "Parfait pour tester StockFlow en solo.",
    features: ["Jusqu'à 100 produits", "1 entrepôt", "Alertes par e-mail", "Support communautaire"],
    cta: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "145 000 Ar",
    period: "/ mois",
    description: "Pour les équipes qui pilotent leur croissance.",
    features: ["Produits illimités", "Entrepôts illimités", "Alertes & tableaux de bord", "Rôles et permissions", "Support prioritaire"],
    cta: "Essai gratuit 14 jours",
    highlighted: true,
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    period: "",
    description: "Pour les structures à forte volumétrie.",
    features: ["Tout le plan Pro", "API dédiée", "Intégrations ERP", "Accompagnement sur mesure"],
    cta: "Nous contacter",
    highlighted: false,
  },
]

const docs = [
  {
    icon: BookOpen,
    title: "Guide de démarrage",
    description: "Mettez en place votre inventaire en moins de 10 minutes.",
  },
  {
    icon: BarChart3,
    title: "Référence API",
    description: "Intégrez StockFlow à vos outils existants.",
  },
  {
    icon: ShieldCheck,
    title: "Centre de sécurité",
    description: "Comprenez comment vos données sont protégées.",
  },
]

const socials = [
  { icon: Send, label: "Twitter / X", href: "#" },
  { icon: Code2, label: "GitHub", href: "#" },
  { icon: Globe, label: "LinkedIn", href: "#" },
]

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  return (
    <div
      className={
        "max-w-2xl " + (align === "center" ? "mx-auto text-center" : "text-left")
      }
    >
      {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
      <h2
        className={
          "mt-4 text-3xl font-bold tracking-tight sm:text-4xl " +
          (align === "center" ? "mx-auto" : "")
        }
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}


export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/55 to-background"
          />
          <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <PackageCheck className="size-4 text-success" />
              La gestion de stock, simplifiée
            </div>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Pilotez votre inventaire avec{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-success bg-clip-text text-transparent">
                StockFlow
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-muted-foreground">
              StockFlow centralise votre gestion des stocks, de la réception à
              l'expédition. Gagnez du temps, évitez les ruptures et prenez les
              meilleures décisions, en toute simplicité.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button size="lg" render={<Link to="/dashboard" />}>
                Accéder au backoffice
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" render={<a href="#fonctionnalites" />}>
                Découvrir
              </Button>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border px-4 py-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {advantages.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 px-4 py-4 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={"flex size-11 items-center justify-center rounded-full bg-background shadow-sm " + item.color}>
                  <item.icon className="size-5" />
                </div>
                <p className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* À propos */}
        <section id="a-propos" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="À propos"
                title="Une solution née des besoins réels des entrepôts"
                description="StockFlow est né d'un constat simple : la gestion de stock reste trop souvent manuelle, fragmentée et source d'erreurs coûteuses. Nous avons conçu un outil clair, rapide et fiable pour aider les équipes à reprendre le contrôle de leur inventaire."
              />
              <ul className="mt-6 space-y-3">
                {[
                  "Conçu pour les PME et les équipes logistiques",
                  "Une interface pensée pour l'utilisateur, pas pour la technique",
                  "Hébergé et sécurisé en Europe",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-success" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Boxes, color: "text-primary", value: "+2 000", label: "entrepôts suivis" },
                { icon: PackageCheck, color: "text-success", value: "5 M+", label: "mouvements / an" },
                { icon: ShieldCheck, color: "text-warning", value: "RGPD", label: "conforme" },
                { icon: MapPin, color: "text-destructive", value: "12", label: "pays desservis" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <stat.icon className={"size-6 " + stat.color} />
                  <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section id="fonctionnalites" className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              eyebrow="Fonctionnalités"
              title="Tout ce qu'il vous faut"
              description="Une suite complète pour gérer votre stock, pensée pour les équipes opérationnelles."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="Tarifs"
            title="Un tarif adapté à votre taille"
            description="Sans engagement, passez d'un plan à l'autre à tout moment."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={
                  "flex flex-col rounded-2xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg " +
                  (plan.highlighted
                    ? "relative border-primary ring-1 ring-primary lg:-mt-4 lg:mb-4"
                    : "")
                }
              >
                {plan.highlighted ? (
                  <Badge className="mb-3 w-fit">Le plus populaire</Badge>
                ) : null}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  render={<Link to="/dashboard" />}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation */}
        <section id="documentation" className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              eyebrow="Documentation"
              title="Apprenez à maîtriser StockFlow"
              description="Guides, références et bonnes pratiques pour tirer le meilleur parti de la plateforme."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {docs.map((doc) => (
                <a
                  key={doc.title}
                  href="#"
                  className="group rounded-xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <doc.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Contact"
                title="Une question ? Écrivez-nous"
                description="Notre équipe répond sous 24 h ouvre en jours ouvrés."
              />
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-primary" />
                  <span>contact@stockflow.app</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-primary" />
                  <span>+261 32 91 907 96</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-5 text-primary" />
                  <span>12 rue de l'Entrepôt, 75011 Paris, France</span>
                </li>
              </ul>
            </div>
            <form className="rounded-2xl border bg-card p-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="name">
                      Nom
                    </label>
                    <input
                      id="name"
                      placeholder="Votre nom"
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="vous@entreprise.com"
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-success px-8 py-16 text-center text-primary-foreground">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-black/10 blur-2xl"
            />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à organiser votre stock ?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Rejoignez les équipes qui pilotent leur inventaire avec StockFlow.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                render={<Link to="/dashboard" />}
              >
                Ouvrir le backoffice
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer socials={socials} />
    </div>
  )
}
