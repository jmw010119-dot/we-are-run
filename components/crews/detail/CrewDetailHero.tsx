import { Bookmark, MapPin, Radio, Share2, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { IconButton } from "@/components/common/ui/IconButton";
import { Section } from "@/components/common/ui/Section";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CrewDetail } from "@/types";

type CrewDetailHeroProps = { crew: CrewDetail };

function AvatarGroup({ count }: { count: number }) {
  const visibleCount = Math.min(count, 6);
  const avatars = Array.from({ length: visibleCount }, (_, index) => index + 1);

  return (
    <div className="flex items-center">
      {avatars.map((avatar) => (
        <span
          key={avatar}
          className="-ml-2 grid h-9 w-9 first:ml-0 place-items-center rounded-full border-2 border-run-card bg-run-lime text-xs font-black text-run-bg shadow-[0_0_18px_rgba(183,255,42,0.18)]"
        >
          {avatar}
        </span>
      ))}
      {count > visibleCount ? (
        <span className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-run-card bg-run-bg text-xs font-black text-run-muted">
          +{count - visibleCount}
        </span>
      ) : null}
    </div>
  );
}

export function CrewDetailHero({ crew }: CrewDetailHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />
      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.56fr)] lg:items-end xl:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green">RUNNING CREW</Badge>
            <Badge variant={crew.isRecruiting ? "success" : "warning"}>{crew.isRecruiting ? "모집중" : "모집 마감"}</Badge>
            <Badge variant="info">{crew.level}</Badge>
            <Badge variant="green">{crew.memberCount}명</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-[1.02] tracking-normal text-run-text sm:text-5xl md:text-6xl xl:text-7xl">
            {crew.name}
          </h1>
          <p className="mt-5 flex max-w-3xl flex-wrap items-start gap-x-2 gap-y-1 text-sm font-bold leading-6 text-run-muted sm:text-base md:text-lg">
            <MapPin size={18} className="mt-1 shrink-0 text-run-lime" />
            <span className="shrink-0">{crew.region} {crew.city}</span>
            <span className="text-run-border">/</span>
            <span className="min-w-0 break-keep">{crew.runTypes.join(" · ")}</span>
          </p>
          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="멤버" value={`${crew.memberCount}명`} icon={<Users size={13} />} accent className="min-h-[88px]" />
            <StatChip label="정기런" value={`${crew.regularRunDay} ${crew.regularRunTime}`} className="min-h-[88px]" />
            <StatChip label="번개런" value={crew.hasFlashRun ? "가능" : "미운영"} icon={<Radio size={13} />} className="min-h-[88px]" />
            <StatChip label="레벨" value={crew.level} accent className="min-h-[88px]" />
          </div>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button className="w-full sm:w-auto" leftIcon={<UserPlus size={17} />}>{crew.isJoined ? "참여중" : "가입하기"}</Button>
            <Button className="w-full sm:w-auto" variant="secondary" leftIcon={<Bookmark size={17} />}>크루 저장</Button>
            <Button className="w-full sm:w-auto" variant="outline" leftIcon={<Share2 size={17} />}>공유하기</Button>
          </div>
        </div>

        <div className={["relative min-h-[360px] overflow-hidden rounded-[24px] border border-run-border bg-gradient-to-br p-5 sm:min-h-[400px] sm:rounded-[28px]", crew.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute right-[-3rem] top-[-3rem] h-48 w-48 rounded-full bg-run-lime/12 blur-[70px]" />
          <div className="absolute left-[10%] top-[58%] h-[4px] w-[82%] -rotate-[12deg] rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
          <div className="absolute left-[18%] top-[28%] flex -space-x-3">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className="grid h-12 w-12 place-items-center rounded-full border-2 border-run-bg bg-run-card text-sm font-black text-run-lime">
                {index + 1}
              </span>
            ))}
          </div>
          <div className="absolute right-5 top-5 flex gap-2">
            <IconButton aria-label="크루 저장" icon={<Bookmark size={18} />} />
            <IconButton aria-label="크루 공유" icon={<Share2 size={18} />} />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/[0.08] bg-run-bg/84 p-5 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <AvatarGroup count={crew.avatarCount} />
              <Badge variant="green" className="w-fit max-w-full truncate">{crew.nextSchedule}</Badge>
            </div>
            <p className="mt-4 line-clamp-3 break-keep text-lg font-black leading-7 text-run-text sm:text-xl">{crew.description}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
