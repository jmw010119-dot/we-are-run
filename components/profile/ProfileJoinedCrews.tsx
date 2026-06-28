import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { profileJoinedCrews } from "@/lib/mock";

export function ProfileJoinedCrews() {
  if (profileJoinedCrews.length === 0) {
    return <EmptyState title="가입한 크루가 없습니다" description="함께 달릴 크루를 찾으면 이곳에서 확인할 수 있습니다." />;
  }

  return (
    <div className="min-w-0">
      <SectionHeader label="JOINED CREWS" title="가입한 크루" description="정기런과 번개런을 함께하는 크루 목록입니다." compact className="mb-5" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profileJoinedCrews.map((crew) => (
          <Card key={crew.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[372px] min-w-0 flex-col overflow-hidden">
            <div className={["mb-5 h-28 shrink-0 rounded-[18px] border border-white/[0.08] bg-gradient-to-br", crew.gradient].join(" ")} />
            <Badge variant="green" className="w-fit">{crew.level}</Badge>
            <h3 className="mt-4 break-keep text-xl font-black leading-snug text-run-text">{crew.name}</h3>
            <p className="mt-2 break-keep text-sm font-bold text-run-muted">{crew.region} {crew.city}</p>
            <div className="mt-4 grid gap-2 text-sm font-bold text-run-muted">
              <span className="inline-flex min-w-0 items-center gap-2"><Users size={14} className="shrink-0" />멤버 {crew.memberCount}명</span>
              <span className="inline-flex min-w-0 items-center gap-2 break-keep"><CalendarDays size={14} className="shrink-0" />{crew.nextSchedule}</span>
            </div>
            <Button href={`/crews/${crew.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-5 w-full">상세보기</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
