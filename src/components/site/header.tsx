"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/services", label: "Услуги" },
  { href: "/pricing", label: "Подписка" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
]

export function Header({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Biveki" width={28} height={28} className="rounded-sm" />
          <span className="text-base font-semibold tracking-tight">Biveki</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/pricing"><Button size="sm">Начать сейчас</Button></Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-2 text-sm" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">Начать сейчас</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

