import type { ReactNode } from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import type { FacilityAmenityStatus, FacilityDetail } from "@/types";

type FacilityAmenitiesPanelProps = { facility: FacilityDetail };

const statusStyles: Record<FacilityAmenityStatus, { className: string; icon: ReactNode }> = {
  가능: { className: "border-run-lime/25 bg-run-lime/10 text-run-lime", icon: <CheckCircle2 size={15} /> },
  불가: { className: "border-red-400/25 bg-red-400/10 text-red-300", icon: <XCircle size={15} /> },
  "확인 필요": { className: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300", icon: <HelpCircle size={15} /> },
};

export function FacilityAmenitiesPanel({ facility }: FacilityAmenitiesPanelProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="h-full">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">AMENITIES</p>
      <h2 className="mt-2 break-keep text-2xl font-black text-run-text">편의시설 상태</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {facility.amenityStatus.map((amenity) => {
          const style = statusStyles[amenity.status];
          return (
            <div key={amenity.label} className="min-h-[112px] rounded-[18px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card-hover">
              <div className="flex h-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-black text-run-text">{amenity.label}</p>
                  <p className="mt-2 break-keep text-xs font-bold leading-5 text-run-muted">{amenity.note}</p>
                </div>
                <span className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-black ${style.className}`}>
                  {style.icon}{amenity.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
