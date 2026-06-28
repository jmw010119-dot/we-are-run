import { CalendarDays, MapPin, Radio, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { RunningCrew } from "@/types";

type CrewListCardProps = { crew: RunningCrew };

function AvatarGroup({ count }: { count: number }) {
  const visibleCount = Math.min(count, 5);
  const avatars = Array.from({ length: visibleCount }, (_, index) => index + 1);

  return (
    <div className="flex items-center">
      {avatars.map((avatar) => (
        <span
          key={avatar}
          className="-ml-2 grid h-8 w-8 first:ml-0 place-items-center rounded-full border-2 border-run-card bg-run-lime text-xs font-black text-run-bg"
        >
          {avatar}
        </span>
      ))}
      {count > visibleCount ? (
        <span className="-ml-2 grid h-8 w-8 place-items-center rounded-full border-2 border-run-card bg-run-bg text-[11px] font-black text-run-muted">
          +{count - visibleCount}
        </span>
      ) : null}
    </div>
  );
}

export function CrewListCard({ crew }: CrewListCardProps) {
  return (
    <Card variant="hover" padding="none" radius="xl" className="group overflow-hidden">
      <div className={["relative min-h-[190px] overflow-hidden border-b border-white/[0.06] bg-gradient-to-br p-5", crew.gradient].join(" ")}>
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
        <div className="absolute right-[-3rem] top-[-3rem] h-36 w-36 rounded-full bg-run-lime/10 blur-[55px]" />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant={crew.isRecruiting ? "green" : "warning"}>{crew.isRecruiting ? "모집중" : "모집 마감"}</Badge>
                {crew.isJoined ? <Badge variant="success">참여중</Badge> : null}
                {crew.hasFlashRun ? <Badge variant="info">번개런 가능</Badge> : null}
              </div>
              <h3 className="mt-4 break-keep text-2xl font-black leading-tight text-run-text transition duration-200 group-hover:text-run-lime">
                {crew.name}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-run-muted">
                <MapPin size={15} />
                {crew.region} {crew.city}
              </p>
            </div>
            <AvatarGroup count={crew.avatarCount} />
          </div>
          <p className="relative max-w-xl break-keep text-sm font-semibold leading-6 text-run-muted">{crew.description}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatChip label="멤버" value={`${crew.memberCount}명`} icon={<Users size={13} />} accent />
          <StatChip label="레벨" value={crew.level} icon={<UserCheck size={13} />} />
          <StatChip label="정기런" value={`${crew.regularRunDay} ${crew.regularRunTime}`} icon={<CalendarDays size={13} />} />
          <StatChip label="번개런" value={crew.hasFlashRun ? "가능" : "미운영"} icon={<Radio size={13} />} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {crew.runTypes.map((type) => (
            <Badge key={type} variant="info">{type}</Badge>
          ))}
          {crew.tags.map((tag) => (
            <Badge key={tag} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">#{tag}</Badge>
          ))}
        </div>

        <div className="mt-5 rounded-[18px] border border-run-border bg-run-bg/70 p-4">
          <p className="text-xs font-black tracking-[0.14em] text-run-lime">NEXT RUN</p>
          <p className="mt-2 break-keep text-sm font-bold leading-6 text-run-text">{crew.nextSchedule}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr]">
          <Button href={`/crews/${crew.id}`} variant="secondary" className="w-full">상세보기</Button>
          <Button className="w-full" disabled={!crew.isRecruiting}>{crew.isJoined ? "참여중" : "가입하기"}</Button>
        </div>
      </div>
    </Card>
  );
}

