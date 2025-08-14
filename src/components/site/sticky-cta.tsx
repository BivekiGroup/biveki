"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-medium">Разработка по подписке</div>
          <div className="text-muted-foreground">Еженедельные релизы</div>
        </div>
        <Link href="/pricing"><Button size="sm">Тарифы</Button></Link>
      </div>
    </div>
  )
}

export default StickyCTA

