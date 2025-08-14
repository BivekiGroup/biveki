import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Услуги" }

export default function ServicesPage() {
  const services = [
    { title: "Лендинги и сайты", desc: "Быстрые и лёгкие сайты с отличной SEO‑базой" },
    { title: "Web‑приложения", desc: "Продукты на Next.js/React с современным стеком" },
    { title: "UI/UX дизайн", desc: "Дизайн‑системы, прототипирование, дизайн-концепты" },
    { title: "Интеграции", desc: "CRM, платежи, аналитика и внешние API" },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Услуги Biveki</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Мы покрываем весь цикл: от исследования и дизайна до разработки, релизов и роста продукта.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <CardTitle className="text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

