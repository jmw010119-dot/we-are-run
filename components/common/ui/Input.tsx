import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputSize = "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: InputSize;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-10 rounded-[14px] px-3 text-sm",
  md: "h-12 rounded-[16px] px-4 text-sm",
  lg: "h-14 rounded-[18px] px-5 text-base",
};

export function Input({ inputSize = "md", leftIcon, rightSlot, className, ...props }: InputProps) {
  return (
    <label
      className={cn(
        "flex w-full items-center gap-3 border border-run-border bg-run-card text-run-muted transition duration-200 focus-within:border-run-lime/50",
        sizeClasses[inputSize],
        className,
      )}
    >
      {leftIcon}
      <input
        className="min-w-0 flex-1 bg-transparent font-semibold text-run-text outline-none placeholder:text-run-muted"
        {...props}
      />
      {rightSlot}
    </label>
  );
}
