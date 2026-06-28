import { Building2 } from "lucide-react";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { FacilityListCard } from "@/components/facilities/FacilityListCard";
import type { RunningFacility } from "@/types";

type FacilityListProps = {
  facilities: RunningFacility[];
  totalCount: number;
  onReset: () => void;
};

export function FacilityList({ facilities, totalCount, onReset }: FacilityListProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">FACILITY LIST</p>
          <h2 className="mt-2 text-2xl font-black text-run-text">검색된 시설 {facilities.length}곳</h2>
        </div>
        <p className="text-right text-sm font-bold text-run-muted">전체 {totalCount}곳</p>
      </div>

      {facilities.length > 0 ? (
        <div className="grid gap-4">
          {facilities.map((facility) => (
            <FacilityListCard key={facility.id} facility={facility} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Building2 size={24} />}
          title="조건에 맞는 시설이 없습니다"
          description="지역, 시설 유형, 편의시설 또는 검색어를 조금 넓혀 다시 찾아보세요."
          actionLabel="필터 초기화"
          onAction={onReset}
        />
      )}
    </div>
  );
}
