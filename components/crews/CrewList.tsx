import { Users } from "lucide-react";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { CrewListCard } from "@/components/crews/CrewListCard";
import type { RunningCrew } from "@/types";

type CrewListProps = {
  crews: RunningCrew[];
  totalCount: number;
  onReset: () => void;
};

export function CrewList({ crews, totalCount, onReset }: CrewListProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">CREW LIST</p>
          <h2 className="mt-2 text-2xl font-black text-run-text">검색된 크루 {crews.length}팀</h2>
        </div>
        <p className="text-right text-sm font-bold text-run-muted">전체 {totalCount}팀</p>
      </div>

      {crews.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {crews.map((crew) => (
            <CrewListCard key={crew.id} crew={crew} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Users size={24} />}
          title="조건에 맞는 크루가 없습니다"
          description="지역, 러닝 유형, 요일, 레벨 또는 검색어를 조금 넓혀 다시 찾아보세요."
          actionLabel="필터 초기화"
          onAction={onReset}
        />
      )}
    </div>
  );
}
