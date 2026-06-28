import { Activity, MessageCircle, PenLine, Users } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { Section } from "@/components/common/ui/Section";
import { communityStats } from "@/lib/mock";

export function CommunitySummary() {
  const stats = [
    { label: "오늘 인증글", value: communityStats.todayCertifications, icon: <Activity size={16} /> },
    { label: "전체 게시글", value: communityStats.totalPosts, icon: <PenLine size={16} /> },
    { label: "이번 주 댓글", value: communityStats.weeklyComments, icon: <MessageCircle size={16} /> },
    { label: "활동 중 러너", value: communityStats.activeRunners, icon: <Users size={16} /> },
  ];

  return (
    <Section spacing="sm" className="pt-0" containerClassName="max-w-[1320px]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="hover" padding="lg" radius="xl" className="min-h-[138px]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-black text-run-muted">{stat.label}</p>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">
                {stat.icon}
              </span>
            </div>
            <p className="mt-5 text-4xl font-black text-run-lime">{stat.value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
