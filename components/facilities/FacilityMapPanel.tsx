import { Building2, LocateFixed, Minus, Plus, Trees, Warehouse } from "lucide-react";
import { IconButton } from "@/components/common/ui/IconButton";
import type { FacilityType, RunningFacility } from "@/types";

type FacilityMapPanelProps = {
  facilities: RunningFacility[];
};

const typeStyles: Record<FacilityType, { pinClassName: string; labelClassName: string; icon: typeof Building2 }> = {
  트랙: { pinClassName: "bg-run-lime", labelClassName: "text-run-lime border-run-lime/25", icon: Building2 },
  공원: { pinClassName: "bg-emerald-300", labelClassName: "text-emerald-300 border-emerald-300/25", icon: Trees },
  "실내 러닝장": { pinClassName: "bg-sky-300", labelClassName: "text-sky-300 border-sky-300/25", icon: Warehouse },
  육상경기장: { pinClassName: "bg-yellow-300", labelClassName: "text-yellow-300 border-yellow-300/25", icon: Building2 },
  산책로: { pinClassName: "bg-teal-300", labelClassName: "text-teal-300 border-teal-300/25", icon: Trees },
};

export function FacilityMapPanel({ facilities }: FacilityMapPanelProps) {
  return (
    <div className="sticky top-[104px] min-h-[520px] overflow-hidden rounded-[28px] border border-run-border bg-run-card p-4 lg:min-h-[720px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(183,255,42,0.13),transparent_20rem),radial-gradient(circle_at_78%_58%,rgba(56,189,248,0.12),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-8 rounded-[42%_58%_48%_52%] border border-white/[0.06] bg-run-bg/70" />
      <div className="absolute left-[16%] top-[36%] h-[2px] w-[62%] rotate-[11deg] rounded-full bg-run-lime/45 shadow-[0_0_20px_rgba(183,255,42,0.32)]" />
      <div className="absolute left-[34%] top-[60%] h-[2px] w-[38%] -rotate-[30deg] rounded-full bg-sky-400/45" />
      <div className="absolute left-[22%] top-[76%] h-[2px] w-[44%] rotate-[7deg] rounded-full bg-emerald-300/35" />

      {facilities.map((facility) => {
        const style = typeStyles[facility.type];
        const PinIcon = style.icon;

        return (
          <div key={facility.id} className="absolute" style={{ top: facility.position.top, left: facility.position.left }}>
            <span className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-run-bg ${style.pinClassName} shadow-[0_0_22px_rgba(183,255,42,0.42)]`}>
              <PinIcon size={14} className="text-run-bg" />
            </span>
            <span className={`ml-5 whitespace-nowrap rounded-full border bg-run-bg/86 px-3 py-1 text-[11px] font-black backdrop-blur-md ${style.labelClassName}`}>
              {facility.region}
            </span>
          </div>
        );
      })}

      <div className="absolute left-5 top-5 rounded-full border border-run-lime/25 bg-run-lime/10 px-4 py-2 text-xs font-black tracking-[0.16em] text-run-lime backdrop-blur-xl">
        FACILITY MAP PREVIEW
      </div>
      <div className="absolute bottom-5 left-5 rounded-[18px] border border-white/[0.08] bg-run-bg/82 px-4 py-3 backdrop-blur-xl">
        <p className="text-xs font-black tracking-[0.18em] text-run-lime">FACILITY DATA</p>
        <p className="mt-1 text-sm font-bold text-run-muted">{facilities.length}개 시설 표시 중</p>
      </div>
      <div className="absolute bottom-5 right-5 grid gap-2">
        <IconButton aria-label="현재 위치" icon={<LocateFixed size={18} />} className="bg-run-bg/82 backdrop-blur-xl" />
        <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-run-bg/82 backdrop-blur-xl">
          <IconButton aria-label="지도 확대" icon={<Plus size={18} />} className="rounded-none border-0 bg-transparent" />
          <IconButton aria-label="지도 축소" icon={<Minus size={18} />} className="rounded-none border-0 bg-transparent" />
        </div>
      </div>
    </div>
  );
}
