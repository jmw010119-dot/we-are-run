import { Bookmark, Clock3, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { FacilityStatus, RunningFacility } from "@/types";

type FacilityListCardProps = {
  facility: RunningFacility;
};

const statusVariants: Record<FacilityStatus, "success" | "warning" | "info"> = {
  운영중: "success",
  "운영 종료": "warning",
  "24시간": "info",
};

export function FacilityListCard({ facility }: FacilityListCardProps) {
  return (
    <Card variant="hover" padding="sm" radius="xl" className="group overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className={[
          "relative h-36 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br p-4 sm:h-32 sm:w-32 sm:shrink-0",
          facility.gradient,
        ].join(" ")}
        >
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <div className="absolute left-4 top-[58%] h-[3px] w-[72%] -rotate-[12deg] rounded-full bg-run-lime/70" />
          <div className="absolute bottom-4 left-4 rounded-full border border-run-lime/25 bg-run-bg/75 px-3 py-1 text-[11px] font-black text-run-lime backdrop-blur-md">
            {facility.type}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariants[facility.status]}>{facility.status}</Badge>
                <Badge variant="info">{facility.type}</Badge>
              </div>
              <h3 className="mt-3 truncate text-xl font-black text-run-text transition duration-200 group-hover:text-run-lime">
                {facility.name}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-run-muted">
                <MapPin size={15} />
                {facility.region} {facility.city}
              </p>
            </div>
            <IconButton
              aria-label={`${facility.name} 저장`}
              icon={<Bookmark size={18} fill={facility.isSaved ? "currentColor" : "none"} />}
            />
          </div>

          <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-run-muted">{facility.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <StatChip label="평점" value={String(facility.rating)} icon={<Star size={13} fill="currentColor" />} accent />
            <StatChip label="리뷰" value={`${facility.reviewCount}개`} />
            <StatChip label="영업시간" value={facility.hours} icon={<Clock3 size={13} />} />
          </div>

          <p className="mt-4 text-xs font-bold leading-5 text-run-muted">{facility.address}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {facility.amenities.map((amenity) => (
              <Badge key={amenity} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">
                {amenity}
              </Badge>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Button href={`/facilities/${facility.id}`} variant="secondary" size="sm" className="rounded-[14px]" aria-label={`${facility.name} 상세보기`}>상세보기</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

