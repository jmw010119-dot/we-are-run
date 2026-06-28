import { CircleDot } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Card } from "@/components/common/ui/Card";
import { adminActivities } from "@/lib/mock";

export function AdminActivityLog() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <SectionHeader label="ACTIVITY LOG" title="최근 활동 로그" description="운영자가 확인해야 할 서비스 이벤트입니다." compact className="mb-5" />
      <div className="grid gap-3">
        {adminActivities.map((activity) => (
          <div key={activity.id} className="grid gap-3 rounded-[18px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card/70 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime"><CircleDot size={15} /></span>
            <div className="min-w-0">
              <p className="break-keep text-sm font-black text-run-text">{activity.title}</p>
              <p className="mt-1 break-keep text-xs font-bold leading-5 text-run-muted">{activity.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Badge variant="info" className="tracking-[0.04em]">{activity.status}</Badge>
              <span className="rounded-full border border-run-border bg-run-card px-2.5 py-1 text-xs font-bold text-run-muted">{activity.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
