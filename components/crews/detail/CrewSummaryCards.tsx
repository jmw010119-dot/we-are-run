import { CalendarDays, Gauge, Radio, UserPlus, Users, Zap } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CrewDetail } from "@/types";

type CrewSummaryCardsProps = { crew: CrewDetail };

export function CrewSummaryCards({ crew }: CrewSummaryCardsProps) {
  const items = [
    { label: "멤버 수", value: `${crew.memberCount}명`, icon: <Users size={14} />, accent: true },
    { label: "이번 주 일정", value: `${crew.schedules.length}개`, icon: <CalendarDays size={14} /> },
    { label: "정기런 시간", value: `${crew.regularRunDay} ${crew.regularRunTime}`, icon: <Zap size={14} /> },
    { label: "평균 페이스", value: crew.averagePace, icon: <Gauge size={14} />, accent: true },
    { label: "레벨", value: crew.level, icon: <Radio size={14} /> },
    { label: "모집 상태", value: crew.isRecruiting ? "모집중" : "모집 마감", icon: <UserPlus size={14} /> },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <StatChip key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} className="flex min-h-[94px] flex-col justify-between bg-run-bg/70" />
        ))}
      </div>
    </Card>
  );
}
