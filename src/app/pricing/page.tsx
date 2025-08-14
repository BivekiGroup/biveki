import { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Подписка" }

export default function PricingPage() {
  const plans = [
    {
      name: "Start",
      price: "$1,990",
      desc: "Идеально для быстрого запуска",
      features: [
        "Лендинг или сайт до 5 страниц",
        "1 итерация в неделю",
        "Поддержка в будни",
        "Базовая аналитика",
      ],
      cta: "Начать со Start",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$3,990",
      desc: "Оптимально для развивающихся продуктов",
      features: [
        "Многостраничный сайт/продукт",
        "2 итерации в неделю",
        "Приоритетная поддержка",
        "A/B эксперименты",
      ],
      cta: "Расти с Growth",
      highlight: true,
    },
    {
      name: "Scale",
      price: "$6,990",
      desc: "Команда под масштабные задачи",
      features: [
        "Команда под проект",
        "До 3 итераций в неделю",
        "SLA и мониторинг",
        "Выделенный менеджер",
      ],
      cta: "Масштабироваться со Scale",
      highlight: false,
    },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Тарифы подписки</h1>
        <p className="mt-2 text-muted-foreground">Чёткие ожидания, прозрачный процесс и предсказуемая стоимость.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.name} className={p.highlight ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  {p.highlight && <Badge>Рекомендуем</Badge>}
                </div>
                <CardDescription>{p.desc}</CardDescription>
                <div className="text-3xl font-semibold text-foreground">{p.price}/мес</div>
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
                <Link href="/contact" className="mt-6 block">
                  <Button className="w-full">{p.cta}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

