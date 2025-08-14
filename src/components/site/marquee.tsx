import * as React from "react"
import { cn } from "@/lib/utils"

export function Marquee({ children, className, speed = 30 }: { children: React.ReactNode; className?: string; speed?: number }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex min-w-full items-center gap-8 [animation:marquee_linear_infinite]"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

