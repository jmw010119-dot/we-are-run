import { CalendarDays, FileText, Footprints } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/common/ui/Card";
import { profileActivities } from "@/lib/mock";

const typeIcon = {
  running: <Footprints size={16} />,
  post: <FileText size={16} />,
  schedule: <CalendarDays size={16} />,
};

const typeLabel = {
  running: "러닝 인증",
  post: "작성/저장 글",
  schedule: "참여 일정",
};

export function ActivityOverview() {
  return (
    <div className="min-w-0">
      <SectionHeader
        label="ACTIVITY"
        title="최근 활동 요약"
        description="최근 러닝 인증, 작성 글, 참여 일정을 한눈에 확인하세요."
        compact
        className="mb-5"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profileActivities.slice(0, 9).map((activity) => (
          <Card key={activity.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[306px] min-w-0 flex-col overflow-hidden">
            <div className={["relative mb-5 min-h-[108px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-gradient-to-br", activity.gradient].join(" ")}>
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute bottom-5 left-5 right-5 h-[3px] -rotate-6 rounded-full bg-run-lime/70 shadow-[0_0_22px_rgba(183,255,42,0.38)]" />
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.12em] text-run-lime">{typeIcon[activity.type]}{typeLabel[activity.type]}</p>
            <h3 className="mt-3 break-keep text-lg font-black leading-snug text-run-text">{activity.title}</h3>
            <p className="mt-2 break-keep text-sm font-semibold leading-6 text-run-muted">{activity.description}</p>
            <p className="mt-auto pt-4 text-xs font-bold text-run-muted">{activity.meta}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
