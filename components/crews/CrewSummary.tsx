import { CalendarDays, Radio, UserPlus, Users } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { RunningCrew } from "@/types";

type CrewSummaryProps = { crews: RunningCrew[] };

export function CrewSummary({ crews }: CrewSummaryProps) {
  const recruitingCount = crews.filter((crew) => crew.isRecruiting).length;
  const weeklyRuns = crews.filter((crew) => crew.regularRunDay !== "").length;
  const flashRunCount = crews.filter((crew) => crew.hasFlashRun).length;

  const items = [
    { label: "활동 중 크루", value: `${crews.length}팀`, icon: <Users size={14} />, accent: true },
    { label: "오늘 모집 중", value: `${recruitingCount}팀`, icon: <UserPlus size={14} /> },
    { label: "이번 주 정기런", value: `${weeklyRuns}개`, icon: <CalendarDays size={14} /> },
    { label: "번개런 가능", value: `${flashRunCount}팀`, icon: <Radio size={14} />, accent: true },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((item) => (
          <StatChip key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} className="min-h-[92px] bg-run-bg/70" />
        ))}
      </div>
    </Card>
  );
}
