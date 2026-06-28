import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "outline" | "hover";
type CardPadding = "none" | "sm" | "md" | "lg";
type CardRadius = "md" | "lg" | "xl";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border-run-border bg-run-card",
  glass: "border-white/[0.08] bg-run-card/80 backdrop-blur-xl",
  outline: "border-run-border bg-transparent",
  hover: "border-run-border bg-run-card transition duration-200 hover:-translate-y-1 hover:border-run-lime/45 hover:bg-run-card-hover",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

const radiusClasses: Record<CardRadius, string> = {
  md: "rounded-[16px]",
  lg: "rounded-[20px]",
  xl: "rounded-[22px]",
};

export function Card({ variant = "default", padding = "md", radius = "xl", className, children, ...props }: CardProps) {
  return (
    <div className={cn("min-w-0 max-w-full border", variantClasses[variant], paddingClasses[padding], radiusClasses[radius], className)} {...props}>
      {children}
    </div>
  );
}
