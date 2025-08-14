import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const styles = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border",
    success: "bg-green-600 text-white dark:bg-green-500",
    warning: "bg-amber-500 text-black",
  }[variant]
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles,
        className
      )}
      {...props}
    />
  )
}

export default Badge

