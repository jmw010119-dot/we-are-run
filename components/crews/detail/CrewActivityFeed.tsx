import { ArrowUpRight, Gauge, MessageCircle, ThumbsUp } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail } from "@/types";

type CrewActivityFeedProps = { crew: CrewDetail };

export function CrewActivityFeed({ crew }: CrewActivityFeedProps) {
  return (
    <div>
      <SectionHeader label="CREW FEED" title="최근 활동과 러닝 인증" description="크루 멤버들이 남긴 최근 러닝 기록과 인증입니다." compact className="mb-5" />
      <div className="grid gap-4 lg:grid-cols-3">
        {crew.activities.map((activity) => (
          <Card key={activity.id} variant="hover" padding="sm" radius="xl" className="overflow-hidden">
            <div className={["relative h-44 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br", activity.gradient].join(" ")}>
              <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px]" />
              <div className="absolute left-4 top-[60%] h-[3px] w-[72%] -rotate-[10deg] rounded-full bg-run-lime/70" />
              <Badge variant="green" className="absolute left-4 top-4">{activity.distance}</Badge>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-run-bg/80 px-3 py-1 text-xs font-black text-run-muted backdrop-blur-xl">
                <Gauge size={13} className="text-run-lime" />{activity.pace}
              </span>
            </div>
            <div className="p-2 pt-4">
              <p className="text-sm font-black text-run-text">{activity.author}</p>
              <p className="mt-2 break-keep text-sm font-semibold leading-6 text-run-muted">{activity.message}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-run-muted">
                <span>CREW ACTIVITY</span>
                <span className="flex gap-3">
                  <span className="inline-flex items-center gap-1"><ThumbsUp size={13} />{activity.likes}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle size={13} />{activity.comments}</span>
                </span>
              </div>
              <Button href={`/community/${activity.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-4 w-full">
                상세보기
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
