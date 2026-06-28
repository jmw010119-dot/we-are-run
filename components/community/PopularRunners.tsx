import { Card } from "@/components/common/ui/Card";
import { popularRunners } from "@/lib/mock";

export function PopularRunners() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">RUNNERS</p>
      <h2 className="mt-2 text-xl font-black text-run-text">이번주 인기 러너</h2>
      <div className="mt-5 grid gap-3">
        {popularRunners.map((runner) => (
          <div key={runner.id} className="flex items-center gap-3 rounded-[18px] border border-run-border bg-run-bg/70 p-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-sm font-black text-run-lime">
              {runner.avatarLabel}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-run-text">{runner.name}</p>
              <p className="mt-1 text-xs font-bold text-run-muted">{runner.region} · {runner.weeklyDistance}</p>
            </div>
            <span className="shrink-0 text-xs font-black text-run-lime">{runner.posts} posts</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
