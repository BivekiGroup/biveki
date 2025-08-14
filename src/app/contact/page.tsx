"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <section className="py-12">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Связаться с нами</h1>
        <p className="mt-2 text-muted-foreground">Коротко опишите задачу — вернёмся с предложением в ближайшее время.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input id="name" name="name" placeholder="Ваше имя" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="msg">Задача</Label>
            <textarea id="msg" name="msg" className="mt-2 min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Коротко опишите проект" required />
          </div>
          <Button className="w-full" type="submit">Отправить</Button>
          {sent && (
            <p className="text-sm text-green-600">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          )}
        </form>
      </div>
    </section>
  )
}
