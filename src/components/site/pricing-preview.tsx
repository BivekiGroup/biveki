"use client"
import * as React from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Billing = "monthly" | "annual"

const basePlans = [
  {
    name: "Start",
    price: 1990,
    desc: "Идеально для быстрого запуска",
    features: [
      "Лендинг или сайт до 5 страниц",
      "1 итерация в неделю",
      "Поддержка в будни",
      "Базовая аналитика",
    ],
  },
  {
    name: "Growth",
    price: 3990,
    desc: "Оптимально для развивающихся продуктов",
    features: [
      "Многостраничный сайт/продукт",
      "2 итерации в неделю",
      "Приоритетная поддержка",
      "A/B эксперименты",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    price: 6990,
    desc: "Команда под масштабные задачи",
    features: [
      "Команда под проект",
      "До 3 итераций в неделю",
      "SLA и мониторинг",
      "Выделенный менеджер",
    ],
  },
]

export function PricingPreview() {
  const [billing, setBilling] = React.useState<Billing>("monthly")
  const multiplier = billing === "monthly" ? 1 : 0.9 // 10% off annually

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-2 text-sm">
        <button
          className={`rounded-md border px-3 py-1.5 ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
          onClick={() => setBilling("monthly")}
        >
          Помесячно
        </button>
        <button
          className={`rounded-md border px-3 py-1.5 ${billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
          onClick={() => setBilling("annual")}
        >
          Годом <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">−10%</span>
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {basePlans.map((p) => {
          const price = Math.round(p.price * multiplier)
          return (
            <Card key={p.name} className={p.highlight ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  {p.highlight && <Badge>Популярный</Badge>}
                </div>
                <CardDescription>{p.desc}</CardDescription>
                <div className="text-3xl font-semibold text-foreground">${price}/мес</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-[2px] h-4 w-4 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="mt-6 block">
                  <Button className="w-full">Выбрать {p.name}</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default PricingPreview

