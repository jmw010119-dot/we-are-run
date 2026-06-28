import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description: string;
  actionText?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
  compact?: boolean;
  variant?: "default" | "compact";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  actionText,
  actionLabel,
  actionHref = "#",
  align = "left",
  compact,
  variant,
  className,
}: SectionHeaderProps) {
  const isCompact = compact ?? variant === "compact";
  const action = actionText ?? actionLabel;
  const isCenter = align === "center";
  const titleClassName = cn(
    "mt-3 max-w-3xl font-black leading-tight tracking-normal text-run-text",
    isCompact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl",
    isCenter && "mx-auto",
  );
  const descriptionClassName = cn(
    "mt-4 max-w-2xl font-semibold text-run-muted",
    isCompact ? "text-sm leading-6" : "text-base leading-7 md:text-lg",
    isCenter && "mx-auto",
  );
  const actionClassName = "inline-flex h-12 max-w-full items-center justify-center gap-2 rounded-[16px] border border-run-border bg-run-card px-5 text-sm font-black text-run-text transition duration-200 hover:scale-[1.02] hover:border-run-lime/50 hover:bg-run-card-hover hover:text-run-lime";

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5",
        isCenter ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div>
        <p className="text-xs font-black tracking-[0.22em] text-run-lime">{label}</p>
        <h2 className={titleClassName}>{title}</h2>
        <p className={descriptionClassName}>{description}</p>
      </div>

      {action ? (
        actionHref.startsWith("/") ? (
          <Link href={actionHref} className={actionClassName}>
            {action}
            <ArrowUpRight size={17} strokeWidth={2.4} />
          </Link>
        ) : (
          <a href={actionHref} className={actionClassName}>
            {action}
            <ArrowUpRight size={17} strokeWidth={2.4} />
          </a>
        )
      ) : null}
    </div>
  );
}
