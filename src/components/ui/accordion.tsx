import * as React from "react"
import { cn } from "@/lib/utils"

export function Accordion({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3", className)}>{children}</div>
}

export function AccordionItem({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border", className)}>{children}</div>
}

export function AccordionTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [open, setOpen] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "w-full px-4 py-3 text-left text-sm font-medium flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
      <span className={cn("ml-3 text-muted-foreground transition-transform", open && "rotate-45")}>+</span>
    </button>
  )
}

export function AccordionContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4 text-sm text-muted-foreground", className)}>{children}</div>
}

