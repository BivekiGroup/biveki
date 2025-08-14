import Image from "next/image"
import Link from "next/link"
import { Check, Sparkles, Timer, Rocket, Shield, Wrench, Gauge, Layers, Handshake, Plug, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Marquee } from "@/components/site/marquee"
import { StickyCTA } from "@/components/site/sticky-cta"
import PricingPreview from "@/components/site/pricing-preview"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left: copy */}
            <div className="flex flex-col items-start text-left gap-6">
              <Badge className="animate-in fade-in slide-in-from-top-2 duration-700" variant="secondary">
                Веб‑разработка по подписке
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.03]">
                Современные сайты и продукты по подписке
              </h1>
              <p className="text-muted-foreground text-lg">
                Дизайн, разработка, интеграции и поддержка по модели подписки. Предсказуемый бюджет — еженедельные релизы.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/pricing"><Button size="lg">Выбрать подписку</Button></Link>
                <Link href="/portfolio"><Button size="lg" variant="outline">Смотреть кейсы</Button></Link>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 w-full">
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
            {/* Right: preview */}
            <div className="relative">
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Biveki UI</div>
                  <Badge variant="secondary">shadcn‑style</Badge>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Кнопки","Карточки","Формы","Таблицы"].map((x)=> (
                    <div key={x} className="rounded-lg border p-4 text-sm">
                      {x}
                      <div className="mt-3 h-8 rounded-md bg-secondary" />
                    </div>
                  ))}
                  <div className="sm:col-span-2 rounded-lg border p-4">
                    <Tabs defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Стартапам</TabsTrigger>
                        <TabsTrigger value="tab2">Маркетингу</TabsTrigger>
                        <TabsTrigger value="tab3">B2B</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab1" className="text-sm text-muted-foreground">Быстрый MVP, гибкий бэклог, еженедельные релизы.</TabsContent>
                      <TabsContent value="tab2" className="text-sm text-muted-foreground">Лендинги, интеграции, эксперименты и аналитика.</TabsContent>
                      <TabsContent value="tab3" className="text-sm text-muted-foreground">Порталы, личные кабинеты, интеграции с CRM.</TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients / Social proof */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center text-sm text-muted-foreground">Нам доверяют</div>
          <div className="mt-5">
            <Marquee className="py-2" speed={30}>
              {["FinTech","EduTech","E‑com","SaaS","B2B","Agency","Retail","Health","Media"].map((c)=>(
                <div key={c} className="flex h-12 w-32 shrink-0 items-center justify-center rounded-md border bg-secondary/50 text-xs text-muted-foreground">
                  {c}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Integrations preview */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Интеграции</h2>
              <p className="mt-2 text-muted-foreground">Подключаем инструменты, которые вы уже используете</p>
            </div>
            <Link href="/integrations" className="text-sm text-primary hover:underline">Все интеграции →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Telegram", "AmoCRM", "Bitrix24", "GA4", "Yandex Metrica", "Stripe", "ЮKassa", "CloudPayments"].map((i)=> (
              <div key={i} className="flex items-center gap-2 rounded-md border p-4 text-sm">
                <Plug className="h-4 w-4 text-primary" />
                {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Отзывы</h2>
            <p className="mt-2 text-muted-foreground">Что говорят клиенты о подписке Biveki</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n:"Анна", r:"CMO в e‑com", t:"Ускорили релизы, теперь каждую неделю вижу результат и могу управлять приоритетами." },
              { n:"Игорь", r:"CEO SaaS", t:"Наконец‑то предсказуемая разработка без сюрпризов в бюджете." },
              { n:"Мария", r:"Product Lead", t:"Команда быстро встройлась в процесс, классный UI и коммуникация в одном канале." },
            ].map((x)=> (
              <div key={x.n} className="rounded-lg border p-6 bg-card">
                <Quote className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{x.t}</p>
                <div className="mt-4 text-sm font-medium">{x.n}</div>
                <div className="text-xs text-muted-foreground">{x.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Блог</h2>
              <p className="mt-2 text-muted-foreground">Практика продуктовой разработки и маркетинга</p>
            </div>
            <Link href="/blog" className="text-sm text-primary hover:underline">Все статьи →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {t:"Как запустить сайт за 2 недели", d:"Подход подписки и приоритизация", tag:"Продакт"},
              {t:"Дизайн‑система за 5 шагов", d:"Компоненты, токены, ритм", tag:"Дизайн"},
              {t:"Интеграции: что учесть", d:"Платежи, CRM, аналитика", tag:"Интеграции"},
            ].map((p)=> (
              <Card key={p.t}>
                <CardHeader>
                  <Badge variant="secondary">{p.tag}</Badge>
                  <CardTitle className="text-xl mt-2">{p.t}</CardTitle>
                  <CardDescription>{p.d}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/blog" className="text-sm text-primary hover:underline">Читать →</Link>
                </CardContent>
              </Card>
            ))}
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
          <Accordion>
            {[{ n:"01", q:"Бриф", a:"Цели, аудитория, KPI, метрики. Формируем бэклог и приоритеты." },
              { n:"02", q:"Дизайн", a:"Концепт, UI‑кит, кликабельные прототипы. Быстрые проверки гипотез." },
              { n:"03", q:"Разработка", a:"Сборка на Next.js. Интеграции, аналитика, деплой. Weekly релизы." },
              { n:"04", q:"Рост", a:"A/B, SEO‑работы, улучшения конверсии. Поддержка и SLA." }].map((s)=> (
              <AccordionItem key={s.n}>
                <AccordionTrigger>
                  <span className="text-sm text-muted-foreground mr-2">{s.n}</span> {s.q}
                </AccordionTrigger>
                <AccordionContent>{s.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Тарифы подписки</h2>
            <p className="mt-2 text-muted-foreground">Фиксированная стоимость, прозрачные ожидания и быстрые релизы</p>
          </div>
          <PricingPreview />
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
          <Accordion>
            {[
              {q:"Что входит в подписку?", a:"Дизайн, разработка, интеграции, базовая аналитика, поддержка по SLA."},
              {q:"Как формируется бэклог?", a:"Вы ставите задачи — мы оцениваем и планируем спринты, показываем прогресс еженедельно."},
              {q:"Можно ли приостанавливать?", a:"Да, можно заморозить подписку или переключить тариф."},
              {q:"Как считаются итерации?", a:"Итерация — это согласованный объём работ на неделю с демонстрацией результата."},
              {q:"Работаете с нашим дизайном?", a:"Да, можем брать готовые макеты или предложить свою концепцию."},
            ].map((f)=> (
              <AccordionItem key={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

      <StickyCTA />
    </>
  )
}
