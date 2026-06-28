import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "green";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  warning: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  danger: "border-red-400/30 bg-red-400/10 text-red-300",
  info: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  green: "border-run-lime/30 bg-run-lime/10 text-run-lime",
};

export function Badge({ variant = "green", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-black tracking-[0.08em]",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
