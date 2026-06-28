import { Download, Flag, LocateFixed, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import type { CourseDetail } from "@/types";

type CourseDetailMapProps = {
  course: CourseDetail;
};

export function CourseDetailMap({ course }: CourseDetailMapProps) {
  return (
    <Card variant="glass" padding="none" radius="xl" className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-run-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">COURSE MAP</p>
          <h2 className="mt-2 break-keep text-2xl font-black text-run-text">코스 경로 미리보기</h2>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<Download size={15} />} className="w-full sm:w-auto">
          GPX 다운로드
        </Button>
      </div>

      <div className="relative min-h-[360px] overflow-hidden bg-run-card p-4 sm:min-h-[430px] sm:p-5 lg:min-h-[480px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_24%,rgba(183,255,42,0.13),transparent_18rem),radial-gradient(circle_at_70%_62%,rgba(56,189,248,0.12),transparent_18rem)]" />
        <div className="absolute inset-0 opacity-[0.23] bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:36px_36px] sm:bg-[size:42px_42px]" />
        <div className="absolute left-[11%] top-[48%] h-[4px] w-[78%] -rotate-[10deg] rounded-full bg-run-lime/65 shadow-[0_0_28px_rgba(183,255,42,0.42)]" />
        <div className="absolute left-[30%] top-[35%] h-[3px] w-[40%] rotate-[24deg] rounded-full bg-sky-400/45" />
        <div className="absolute left-[14%] top-[42%] grid place-items-center rounded-full border border-run-lime/30 bg-run-bg/85 p-2.5 text-run-lime backdrop-blur-xl sm:left-[18%] sm:p-3">
          <Navigation size={18} />
          <span className="absolute -bottom-7 whitespace-nowrap text-[11px] font-black text-run-lime sm:-bottom-8 sm:text-xs">START</span>
        </div>
        <div className="absolute right-[10%] top-[55%] grid place-items-center rounded-full border border-sky-300/30 bg-run-bg/85 p-2.5 text-sky-300 backdrop-blur-xl sm:right-[14%] sm:p-3">
          <Flag size={18} />
          <span className="absolute -bottom-7 whitespace-nowrap text-[11px] font-black text-sky-300 sm:-bottom-8 sm:text-xs">FINISH</span>
        </div>

        {course.nearbyPoints.map((point, index) => (
          <div
            key={point}
            className="absolute max-w-[9rem] truncate rounded-full border border-white/[0.08] bg-run-bg/82 px-2.5 py-1 text-[11px] font-black text-run-muted backdrop-blur-xl sm:max-w-none sm:px-3 sm:text-xs"
            style={{ top: `${24 + index * 18}%`, left: `${48 - index * 13}%` }}
          >
            <MapPin size={12} className="mr-1 inline text-run-lime" />
            {point}
          </div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-[18px] border border-white/[0.08] bg-run-bg/86 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:flex-row sm:items-center sm:justify-between sm:rounded-[20px]">
          <div className="min-w-0">
            <p className="break-keep text-sm font-black leading-6 text-run-text">{course.startPoint} → {course.endPoint}</p>
            <p className="mt-1 text-xs font-bold text-run-muted">실제 지도 API 없이 구성한 Mock Route UI입니다.</p>
          </div>
          <IconButton aria-label="현재 위치 보기" icon={<LocateFixed size={18} />} className="bg-run-card" />
        </div>
      </div>
    </Card>
  );
}
