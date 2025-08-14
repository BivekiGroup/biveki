import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Блог" }

export default function BlogPage() {
  const posts = [
    { t: "Как запустить сайт за 2 недели", d: "Подход подписки и приоритизация", tag: "Продакт" },
    { t: "Дизайн‑система за 5 шагов", d: "Компоненты, токены, ритм", tag: "Дизайн" },
    { t: "Интеграции: что учесть", d: "Платежи, CRM, аналитика", tag: "Интеграции" },
    { t: "SEO для новых проектов", d: "Быстрые победы в первые релизы", tag: "Маркетинг" },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Блог Biveki</h1>
        <p className="mt-2 text-muted-foreground">Практика продуктовой разработки и маркетинга</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.t}>
              <CardHeader>
                <Badge variant="secondary">{p.tag}</Badge>
                <CardTitle className="text-xl mt-2">{p.t}</CardTitle>
                <CardDescription>{p.d}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="#" className="text-sm text-primary hover:underline">Читать →</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

