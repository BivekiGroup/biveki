import Link from "next/link"

export function AnnouncementBar() {
  return (
    <div className="w-full border-b bg-secondary/60 text-center text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
        <span className="text-muted-foreground">Подписка на разработку с еженедельными релизами. </span>
        <Link href="/pricing" className="font-medium text-foreground underline underline-offset-4">Попробовать</Link>
      </div>
    </div>
  )
}

export default AnnouncementBar

