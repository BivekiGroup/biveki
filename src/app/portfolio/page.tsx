import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Портфолио" }

export default function PortfolioPage() {
  const works = [
    { t: "SaaS Dashboard", d: "B2B продукт с биллингом и аналитикой" },
    { t: "E‑commerce", d: "Магазин с каталогом и CRM интеграцией" },
    { t: "Marketing", d: "Серия лендингов для запуска кампаний" },
  ]
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Кейсы</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Небольшой выбор проектов. По запросу пришлём больше примеров и доступы к демо.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {works.map((w, i) => (
            <Card key={w.t}>
              <CardHeader>
                <CardTitle className="text-xl">{w.t}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md border bg-secondary/30" />
                <p className="mt-3 text-sm text-muted-foreground">{w.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

