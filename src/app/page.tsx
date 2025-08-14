import Image from "next/image"
import Link from "next/link"
import { Check, Sparkles, Timer, Rocket, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-14">
          <div className="flex flex-col items-center text-center gap-6">
            <Badge className="animate-in fade-in slide-in-from-top-2 duration-700" variant="secondary">
              Веб‑разработка по подписке
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Современные сайты и продукты за фиксированную ежемесячную плату
            </h1>
            <p className="max-w-2xl text-muted-foreground text-base sm:text-lg">
              Команда Biveki берёт на себя весь цикл: дизайн, разработка, поддержку и развитие — быстро, прозрачно и предсказуемо.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing"><Button size="lg">Выбрать подписку</Button></Link>
              <Link href="/portfolio"><Button size="lg" variant="outline">Смотреть кейсы</Button></Link>
            </div>
            <div className="mt-6 opacity-95">
              <Image src="/logo.png" alt="Biveki" width={72} height={72} className="rounded-md shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Timer, title: "Скорость", text: "Запуски от 1–2 недель" },
            { icon: Rocket, title: "Гибкость", text: "Бэклог и приоритизация под вас" },
            { icon: Shield, title: "Надёжность", text: "Поддержка и SLA по тарифу" },
            { icon: Sparkles, title: "Качество", text: "Актуальный стек и UI" },
          ].map((f) => (
            <Card key={f.title} className="">
              <CardHeader className="flex-row items-center gap-3">
                <f.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{f.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Как это работает</h2>
            <p className="mt-2 text-muted-foreground">Простой и прозрачный процесс в 4 шага</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Бриф", d: "Обсуждаем цели, аудиторию и KPI" },
              { n: "02", t: "Дизайн", d: "Готовим концепт и UI‑систему" },
              { n: "03", t: "Разработка", d: "Верстаем и подключаем бэкенд" },
              { n: "04", t: "Рост", d: "Эксперименты, улучшения и поддержка" },
            ].map((step) => (
              <Card key={step.n}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">{step.n}</CardTitle>
                  <CardTitle className="text-xl">{step.t}</CardTitle>
                  <CardDescription>{step.d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="relative py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Тарифы подписки</h2>
            <p className="mt-2 text-muted-foreground">Фиксированная стоимость, максимум прозрачности</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Start",
                price: "$1,990",
                features: ["Лендинг или сайт до 5 страниц", "1 итерация в неделю", "Поддержка в будни"],
                highlight: false,
              },
              {
                name: "Growth",
                price: "$3,990",
                features: ["Многостраничный сайт/продукт", "2 итерации в неделю", "Приоритетная поддержка"],
                highlight: true,
              },
              {
                name: "Scale",
                price: "$6,990",
                features: ["Команда под проект", "До 3 итераций в неделю", "SLA и мониторинг"],
                highlight: false,
              },
            ].map((p) => (
              <Card key={p.name} className={p.highlight ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                    {p.highlight && <Badge>Популярный</Badge>}
                  </div>
                  <CardDescription className="text-2xl font-semibold text-foreground">{p.price}/мес</CardDescription>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-xl border bg-card p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Готовы ускорить развитие продукта?</h3>
            <p className="mt-2 text-muted-foreground">Подпишитесь на Biveki и получайте результат каждую неделю.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact"><Button size="lg">Обсудить проект</Button></Link>
              <Link href="/pricing"><Button size="lg" variant="outline">Тарифы</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
