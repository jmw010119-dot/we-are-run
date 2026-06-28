import { Bookmark, MapPin, Share2, Star } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { IconButton } from "@/components/common/ui/IconButton";
import { Section } from "@/components/common/ui/Section";
import { StatChip } from "@/components/common/ui/StatChip";
import type { FacilityDetail, FacilityStatus } from "@/types";

type FacilityDetailHeroProps = { facility: FacilityDetail };

const statusVariants: Record<FacilityStatus, "success" | "warning" | "info"> = {
  운영중: "success",
  "운영 종료": "warning",
  "24시간": "info",
};

export function FacilityDetailHero({ facility }: FacilityDetailHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />
      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.56fr)] lg:items-end xl:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green">RUNNING FACILITY</Badge>
            <Badge variant={statusVariants[facility.status]}>{facility.status}</Badge>
            <Badge variant="info">{facility.type}</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-[1.02] tracking-normal text-run-text sm:text-5xl md:text-6xl xl:text-7xl">
            {facility.name}
          </h1>
          <p className="mt-5 flex max-w-3xl flex-wrap items-start gap-x-2 gap-y-1 text-sm font-bold leading-6 text-run-muted sm:text-base md:text-lg">
            <MapPin size={18} className="mt-1 shrink-0 text-run-lime" />
            <span className="shrink-0">{facility.region} {facility.city}</span>
            <span className="text-run-border">/</span>
            <span className="min-w-0 break-keep">{facility.address}</span>
          </p>
          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="시설 유형" value={facility.type} accent className="min-h-[86px]" />
            <StatChip label="운영 상태" value={facility.status} className="min-h-[86px]" />
            <StatChip label="평점" value={String(facility.rating)} icon={<Star size={13} fill="currentColor" />} accent className="min-h-[86px]" />
            <StatChip label="리뷰" value={`${facility.reviewCount}개`} className="min-h-[86px]" />
          </div>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button className="w-full sm:w-auto" leftIcon={<Bookmark size={17} fill={facility.isSaved ? "currentColor" : "none"} />}>이 시설 저장하기</Button>
            <Button className="w-full sm:w-auto" variant="secondary" leftIcon={<Share2 size={17} />}>공유하기</Button>
          </div>
        </div>
        <div className={["relative min-h-[340px] overflow-hidden rounded-[24px] border border-run-border bg-gradient-to-br p-4 sm:min-h-[380px] sm:rounded-[28px] sm:p-5", facility.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute left-[12%] top-[56%] h-[4px] w-[78%] -rotate-[12deg] rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
          <div className="absolute right-[12%] top-[18%] h-28 w-28 rounded-full border border-run-lime/20 bg-run-lime/10 blur-sm" />
          <div className="absolute left-[16%] top-[28%] h-20 w-20 rounded-full border border-sky-300/15 bg-sky-300/10 blur-sm" />
          <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/[0.08] bg-run-bg/84 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-[22px] sm:p-5">
            <p className="truncate text-xs font-black tracking-[0.18em] text-run-lime">{facility.coverLabel}</p>
            <p className="mt-2 break-keep text-xl font-black text-run-text sm:text-2xl">{facility.mapLabel}</p>
            <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-run-muted">{facility.description}</p>
          </div>
          <div className="absolute right-4 top-4 flex gap-2 sm:right-5 sm:top-5">
            <IconButton aria-label="시설 저장" icon={<Bookmark size={18} fill={facility.isSaved ? "currentColor" : "none"} />} />
            <IconButton aria-label="시설 공유" icon={<Share2 size={18} />} />
          </div>
        </div>
      </div>
    </Section>
  );
}
