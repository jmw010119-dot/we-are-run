import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/ui/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({ title, description, icon, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-72 flex-col items-center justify-center rounded-[22px] border border-run-border bg-run-card p-8 text-center", className)}>
      <div className="grid h-14 w-14 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">
        {icon ?? <SearchX size={24} />}
      </div>
      <h3 className="mt-5 text-xl font-black text-run-text">{title}</h3>
      <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-run-muted">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
