import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "ghost" | "primary";
type IconButtonSize = "sm" | "md" | "lg";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
};

const variantClasses: Record<IconButtonVariant, string> = {
  default: "border border-run-border bg-run-card text-run-muted hover:border-run-lime/50 hover:bg-run-card-hover hover:text-run-lime",
  ghost: "bg-transparent text-run-muted hover:bg-run-card hover:text-run-lime",
  primary: "bg-run-lime text-run-bg hover:brightness-110",
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "h-9 w-9 rounded-[12px]",
  md: "h-11 w-11 rounded-[14px]",
  lg: "h-12 w-12 rounded-[16px]",
};

export function IconButton({ icon, variant = "default", size = "md", loading = false, disabled, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "grid place-items-center transition duration-200 hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" size={18} /> : icon}
    </button>
  );
}
