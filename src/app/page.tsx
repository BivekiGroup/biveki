import Image from "next/image"
import Link from "next/link"
import { Check, Sparkles, Timer, Rocket, Shield, Wrench, Gauge, Layers, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24">
          <div className="flex flex-col items-center text-center gap-7">
            <Badge className="animate-in fade-in slide-in-from-top-2 duration-700" variant="secondary">
              Веб‑разработка по подписке
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.03]">
              Современные сайты и продукты по подписке
            </h1>
            <p className="max-w-3xl text-muted-foreground text-lg sm:text-xl">
              Команда Biveki берёт на себя весь цикл: дизайн, разработка, поддержку и развитие — быстро, прозрачно и предсказуемо.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/pricing"><Button size="lg">Выбрать подписку</Button></Link>
              <Link href="/portfolio"><Button size="lg" variant="outline">Смотреть кейсы</Button></Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-left w-full max-w-3xl">
              {[{i:Timer,t:"Запуск",d:"1–2 недели"},{i:Gauge,t:"Релизы",d:"еженедельно"},{i:Handshake,t:"Коммуникация",d:"в одном канале"}].map((item)=> (
                <div key={item.t} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {/* @ts-expect-error dynamic icon */}
                    <item.i className="h-4 w-4 text-primary" />
                    {item.t}
                  </div>
                  <div className="mt-1 text-lg font-medium">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Rocket, title: "Быстрый старт", text: "Запуск MVP или сайта за 1–2 недели. Дальше — непрерывное улучшение." },
            { icon: Layers, title: "Гибкий бэклог", text: "Вы задаёте приоритеты. Мы планируем спринты и показываем прогресс каждую неделю." },
            { icon: Shield, title: "Надёжная поддержка", text: "Фиксированные SLA и прозрачные ожидания по каждому тарифу." },
            { icon: Sparkles, title: "Качество UI", text: "Современный стек, акцент на UX и чистую реализацию." },
            { icon: Wrench, title: "Интеграции", text: "Подключаем платежи, CRM, аналитики и внешние API." },
            { icon: Timer, title: "Предсказуемость", text: "Подписка — без сюрпризов в бюджете и сроках." },
          ].map((f) => (
            <Card key={f.title}>
              <CardHeader className="flex-row items-center gap-3">
                {/* @ts-expect-error component */}
                <f.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{f.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Как это работает</h2>
            <p className="mt-2 text-muted-foreground">Прозрачный процесс. Каждую неделю — результат.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Бриф", d: "Цели, аудитория, KPI, метрики. Формируем бэклог и приоритеты." },
              { n: "02", t: "Дизайн", d: "Концепт, UI‑кит, кликабельные прототипы. Быстрые проверки гипотез." },
              { n: "03", t: "Разработка", d: "Сборка на Next.js. Интеграции, аналитика, деплой. Weekly релизы." },
              { n: "04", t: "Рост", d: "A/B, SEO‑работы, улучшения конверсии. Поддержка и SLA." },
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
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Тарифы подписки</h2>
            <p className="mt-2 text-muted-foreground">Фиксированная стоимость, прозрачные ожидания и быстрые релизы</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Start",
                price: "$1,990",
                features: [
                  "Лендинг или сайт до 5 страниц",
                  "1 итерация в неделю",
                  "Поддержка в будни",
                  "Базовая аналитика",
                ],
                highlight: false,
              },
              {
                name: "Growth",
                price: "$3,990",
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
                price: "$6,990",
                features: [
                  "Команда под проект",
                  "До 3 итераций в неделю",
                  "SLA и мониторинг",
                  "Выделенный менеджер",
                ],
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

      {/* Subscription vs classic */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Почему подписка лучше классики</h2>
            <p className="mt-2 text-muted-foreground">Меньше риска, больше предсказуемости и скорости</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Подписка с Biveki</CardTitle>
                <CardDescription>Прозрачно, быстро, без сюрпризов</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {["Фиксированная ставка/мес", "Еженедельные релизы", "Гибкий бэклог", "SLA поддержка", "Отмена в любой момент"].map((f)=> (
                    <li key={f} className="flex items-start gap-2"><Check className="mt-[2px] h-4 w-4 text-primary"/> {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Классический проект</CardTitle>
                <CardDescription>Затянувшиеся сроки и доп. сметы</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Непредсказуемые этапы",
                    "Долгие согласования",
                    "Доплаты за изменения",
                    "Редкие релизы",
                    "Слабая поддержка после запуска",
                  ].map((f)=> (
                    <li key={f} className="flex items-start gap-2">— {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">FAQ</h2>
            <p className="mt-2 text-muted-foreground">Частые вопросы про подписку</p>
          </div>
          <div className="space-y-3">
            {[
              {q:"Что входит в подписку?", a:"Дизайн, разработка, интеграции, базовая аналитика, поддержка по SLA."},
              {q:"Как формируется бэклог?", a:"Вы ставите задачи — мы оцениваем и планируем спринты, показываем прогресс еженедельно."},
              {q:"Можно ли приостанавливать?", a:"Да, можно заморозить подписку или переключить тариф."},
              {q:"Как считаются итерации?", a:"Итерация — это согласованный объём работ на неделю с демонстрацией результата."},
              {q:"Работаете с нашим дизайном?", a:"Да, можем брать готовые макеты или предложить свою концепцию."},
            ].map((f)=> (
              <details key={f.q} className="group rounded-lg border p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border bg-card p-10 sm:p-14 text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">Готовы ускорить развитие продукта?</h3>
            <p className="mt-3 text-muted-foreground text-lg">Подписка Biveki: меньше согласований — больше релизов.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact"><Button size="lg">Обсудить проект</Button></Link>
              <Link href="/pricing"><Button size="lg" variant="outline">Тарифы</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
