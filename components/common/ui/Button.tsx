import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
};

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-run-lime text-run-bg hover:brightness-110",
  secondary: "border border-run-border bg-run-card text-run-text hover:border-run-lime/50 hover:bg-run-card-hover hover:text-run-lime",
  outline: "border border-run-border bg-transparent text-run-text hover:border-run-lime/50 hover:text-run-lime",
  ghost: "bg-transparent text-run-muted hover:bg-run-card hover:text-run-lime",
  danger: "bg-red-500 text-white hover:bg-red-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 rounded-[14px] px-4 text-xs",
  md: "h-12 rounded-[16px] px-5 text-sm",
  lg: "h-14 rounded-[18px] px-7 text-base",
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  href,
  type,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {loading ? <LoaderCircle className="animate-spin" size={17} /> : leftIcon}
      {children}
      {!loading ? rightIcon : null}
    </>
  );
  const buttonClassName = cn(
    "inline-flex max-w-full items-center justify-center gap-2 font-black transition duration-200 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={buttonClassName} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={buttonClassName} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled || loading}
      className={buttonClassName}
      {...props}
    >
      {content}
    </button>
  );
}
