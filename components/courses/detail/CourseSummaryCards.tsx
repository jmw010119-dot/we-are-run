import { Clock3, Map, Mountain, Route, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CourseDetail, CourseDifficulty } from "@/types";

const difficultyLabels: Record<CourseDifficulty, string> = {
  Easy: "쉬움",
  Normal: "보통",
  Hard: "어려움",
};

type CourseSummaryCardsProps = {
  course: CourseDetail;
};

export function CourseSummaryCards({ course }: CourseSummaryCardsProps) {
  const summaryItems = [
    { label: "거리", value: course.distance, icon: <Route size={14} />, accent: true },
    { label: "예상 시간", value: course.estimatedTime, icon: <Clock3 size={14} /> },
    { label: "난이도", value: difficultyLabels[course.difficulty], icon: <TrendingUp size={14} /> },
    { label: "추천 시간대", value: course.recommendedTime, icon: <Sparkles size={14} /> },
    { label: "누적 상승고도", value: course.elevation, icon: <Mountain size={14} /> },
    { label: "코스 유형", value: course.type, icon: <Map size={14} />, accent: true },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {summaryItems.map((item) => (
          <StatChip
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            accent={item.accent}
            className="flex min-h-[92px] flex-col justify-between bg-run-bg/70"
          />
        ))}
      </div>
    </Card>
  );
}
