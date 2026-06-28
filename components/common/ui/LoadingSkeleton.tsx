import { cn } from "@/lib/utils";

type SkeletonVariant = "card" | "list" | "text" | "avatar";

type LoadingSkeletonProps = {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
};

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[14px] bg-white/[0.07]", className)} />;
}

export function LoadingSkeleton({ variant = "card", count = 1, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, index) => index);

  if (variant === "text") {
    return (
      <div className={cn("grid gap-2", className)}>
        {items.map((item) => <SkeletonBlock key={item} className="h-4 w-full" />)}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className={cn("flex gap-3", className)}>
        {items.map((item) => <SkeletonBlock key={item} className="h-12 w-12 rounded-full" />)}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("grid gap-3", className)}>
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-[18px] border border-run-border bg-run-card p-4">
            <SkeletonBlock className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-2/3" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((item) => (
        <div key={item} className="rounded-[22px] border border-run-border bg-run-card p-4">
          <SkeletonBlock className="h-40 w-full rounded-[18px]" />
          <SkeletonBlock className="mt-5 h-5 w-2/3" />
          <SkeletonBlock className="mt-3 h-4 w-full" />
          <SkeletonBlock className="mt-2 h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}
