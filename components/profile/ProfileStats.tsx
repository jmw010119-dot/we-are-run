import { Activity, BadgeCheck, MapPinned, Route, Timer, Users } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { Section } from "@/components/common/ui/Section";
import { profileStats } from "@/lib/mock";
import type { ProfileStats as ProfileStatsType } from "@/types";

type ProfileStatsProps = {
  stats?: ProfileStatsType;
};

export function ProfileStats({ stats = profileStats }: ProfileStatsProps) {
  const statItems = [
    { label: "총 러닝 거리", value: stats.totalDistance, icon: <Route size={16} />, accent: true },
    { label: "이번 달 거리", value: stats.monthlyDistance, icon: <Activity size={16} />, accent: true },
    { label: "평균 페이스", value: stats.averagePace, icon: <Timer size={16} /> },
    { label: "총 인증 수", value: stats.totalCertifications, icon: <BadgeCheck size={16} /> },
    { label: "가입 크루", value: stats.joinedCrews, icon: <Users size={16} /> },
    { label: "저장 코스", value: stats.savedCourses, icon: <MapPinned size={16} /> },
  ];

  return (
    <Section spacing="sm" className="pt-0" containerClassName="max-w-[1320px]">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {statItems.map((stat) => (
          <Card key={stat.label} variant="hover" padding="lg" radius="xl" className="flex min-h-[132px] min-w-0 flex-col justify-between sm:min-h-[142px]">
            <div className="flex items-start justify-between gap-3">
              <p className="break-keep text-xs font-black tracking-[0.12em] text-run-muted">{stat.label}</p>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">{stat.icon}</span>
            </div>
            <p className={['mt-5 truncate text-2xl font-black sm:text-3xl', stat.accent ? 'text-run-lime' : 'text-run-text'].join(' ')}>{stat.value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
