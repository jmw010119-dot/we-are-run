import { Target } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { profileGoals } from "@/lib/mock";

export function RunningGoalCard() {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-run-lime/10 blur-[46px]" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime"><Target size={18} /></span>
          <div className="min-w-0">
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">WEEKLY GOAL</p>
            <h2 className="mt-1 break-keep text-xl font-black text-run-text">이번 주 목표</h2>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-4xl font-black text-run-lime">{profileGoals.currentDistance}</p>
          <p className="mt-1 text-xs font-bold text-run-muted">목표 {profileGoals.weeklyDistance}</p>
        </div>
        <p className="shrink-0 text-sm font-black text-run-text">{profileGoals.progress}%</p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full border border-white/[0.04] bg-run-bg">
        <div className="h-full rounded-full bg-run-lime shadow-[0_0_20px_rgba(183,255,42,0.38)]" style={{ width: `${profileGoals.progress}%` }} />
      </div>
      <p className="mt-4 break-keep text-sm font-semibold leading-6 text-run-muted">{profileGoals.message}</p>
    </Card>
  );
}
