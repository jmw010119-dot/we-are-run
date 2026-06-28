import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  leftIcon?: ReactNode;
};

export function Chip({ selected = false, leftIcon, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-bold transition duration-200 hover:scale-[1.02]",
        selected
          ? "border-run-lime bg-run-lime text-run-bg"
          : "border-run-border bg-run-card text-run-muted hover:border-run-lime/50 hover:text-run-lime",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}
