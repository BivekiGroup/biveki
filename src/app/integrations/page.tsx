import { Metadata } from "next"
import { Plug } from "lucide-react"

export const metadata: Metadata = { title: "Интеграции" }

export default function IntegrationsPage() {
  const items = [
    "Telegram", "AmoCRM", "Bitrix24", "Google Analytics 4", "Yandex Metrica",
    "Stripe", "ЮKassa", "CloudPayments", "Notion", "Airtable", "HubSpot", "Sendpulse"
  ]
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Интеграции</h1>
        <p className="mt-2 text-muted-foreground">Подключаем ключевые сервисы для маркетинга, продаж и платежей</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((i)=> (
            <div key={i} className="flex items-center gap-2 rounded-md border p-4 text-sm">
              <Plug className="h-4 w-4 text-primary" />
              {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

