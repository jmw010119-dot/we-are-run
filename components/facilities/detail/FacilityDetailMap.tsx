import { Building2, LocateFixed, MapPin, Minus, Navigation, Plus, Route } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import type { FacilityDetail } from "@/types";

type FacilityDetailMapProps = { facility: FacilityDetail };

export function FacilityDetailMap({ facility }: FacilityDetailMapProps) {
  return (
    <Card variant="glass" padding="none" radius="xl" className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-run-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">FACILITY MAP</p>
          <h2 className="mt-2 break-keep text-2xl font-black text-run-text">시설 위치와 주변 러닝 포인트</h2>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<Navigation size={15} />} className="w-full sm:w-auto">길찾기</Button>
      </div>
      <div className="relative min-h-[430px] overflow-hidden bg-run-card p-4 sm:min-h-[500px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_24%,rgba(183,255,42,0.13),transparent_18rem),radial-gradient(circle_at_70%_62%,rgba(56,189,248,0.12),transparent_18rem)]" />
        <div className="absolute inset-0 opacity-[0.23] bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:36px_36px] sm:bg-[size:42px_42px]" />
        <div className="absolute left-[12%] top-[42%] h-[3px] w-[72%] -rotate-[10deg] rounded-full bg-run-lime/55 shadow-[0_0_24px_rgba(183,255,42,0.38)]" />
        <div className="absolute left-[24%] top-[58%] h-[2px] w-[46%] rotate-[21deg] rounded-full bg-sky-400/45" />
        <div className="absolute left-1/2 top-[45%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-run-bg bg-run-lime text-run-bg shadow-[0_0_34px_rgba(183,255,42,0.65)] sm:top-1/2">
          <Building2 size={22} />
          <span className="absolute -bottom-8 max-w-[11rem] truncate whitespace-nowrap rounded-full border border-run-lime/25 bg-run-bg/86 px-3 py-1 text-xs font-black text-run-lime backdrop-blur-xl">{facility.mapLabel}</span>
        </div>
        {facility.nearbyCourses.map((course, index) => (
          <div key={course.id} className="absolute max-w-[9.5rem] truncate rounded-full border border-white/[0.08] bg-run-bg/82 px-2.5 py-1 text-[11px] font-black text-run-muted backdrop-blur-xl sm:max-w-none sm:px-3" style={{ top: `${20 + index * 17}%`, left: `${14 + index * 22}%` }}>
            <Route size={12} className="mr-1 inline text-run-lime" />{course.name}
          </div>
        ))}
        {facility.amenities.slice(0, 3).map((amenity, index) => (
          <div key={amenity} className="absolute max-w-[7rem] truncate rounded-full border border-sky-300/20 bg-run-bg/78 px-2.5 py-1 text-[11px] font-black text-sky-300 backdrop-blur-xl sm:max-w-none sm:px-3" style={{ top: `${58 + index * 8}%`, left: `${58 - index * 15}%` }}>
            <MapPin size={12} className="mr-1 inline" />{amenity}
          </div>
        ))}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-[18px] border border-white/[0.08] bg-run-bg/86 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-24 sm:flex-row sm:items-center sm:justify-between sm:rounded-[20px]">
          <div className="min-w-0">
            <p className="break-keep text-sm font-black leading-6 text-run-text">{facility.name}</p>
            <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-run-muted">{facility.address}</p>
          </div>
          <span className="shrink-0 rounded-full border border-run-lime/25 bg-run-lime/10 px-3 py-1 text-xs font-black text-run-lime">{facility.status}</span>
        </div>
        <div className="absolute bottom-5 right-5 hidden gap-2 sm:grid">
          <IconButton aria-label="현재 위치" icon={<LocateFixed size={18} />} className="bg-run-bg/82 backdrop-blur-xl" />
          <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-run-bg/82 backdrop-blur-xl">
            <IconButton aria-label="지도 확대" icon={<Plus size={18} />} className="rounded-none border-0 bg-transparent" />
            <IconButton aria-label="지도 축소" icon={<Minus size={18} />} className="rounded-none border-0 bg-transparent" />
          </div>
        </div>
      </div>
    </Card>
  );
}
