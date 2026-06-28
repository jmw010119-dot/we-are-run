import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatChipProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: boolean;
  className?: string;
};

export function StatChip({ label, value, icon, accent = false, className }: StatChipProps) {
  return (
    <div className={cn("rounded-[15px] border border-run-border bg-run-bg px-3 py-3", className)}>
      <p className="flex items-center gap-1.5 text-[11px] font-black tracking-[0.12em] text-run-muted">
        {icon}
        {label}
      </p>
      <p className={cn("mt-1 truncate text-sm font-black", accent ? "text-run-lime" : "text-run-text")}>{value}</p>
    </div>
  );
}
