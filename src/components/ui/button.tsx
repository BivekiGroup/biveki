"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "ghost"
    | "outline"
    | "destructive"
    | "link"
  size?: "sm" | "md" | "lg" | "icon"
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-5 text-base",
  icon: "h-10 w-10",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button

