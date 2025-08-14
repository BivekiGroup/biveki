import Link from "next/link"
import Image from "next/image"
import { Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Biveki" width={24} height={24} className="rounded-sm" />
            <span className="text-sm font-semibold">Biveki</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/services" className="hover:text-foreground">Услуги</Link>
            <Link href="/pricing" className="hover:text-foreground">Подписка</Link>
            <Link href="/portfolio" className="hover:text-foreground">Портфолио</Link>
            <Link href="/about" className="hover:text-foreground">О нас</Link>
            <Link href="/contact" className="hover:text-foreground">Контакты</Link>
          </nav>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="mailto:hello@biveki.com" aria-label="Email"><Mail className="h-5 w-5 hover:text-foreground" /></Link>
            <Link href="https://github.com/BivekiGroup" target="_blank" aria-label="GitHub"><Github className="h-5 w-5 hover:text-foreground" /></Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Biveki. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer

