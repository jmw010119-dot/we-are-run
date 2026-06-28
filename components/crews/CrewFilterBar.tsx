import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Chip } from "@/components/common/ui/Chip";

export type CrewFilters = {
  region: string;
  runType: string;
  day: string;
  level: string;
  sort: string;
};

type CrewFilterBarProps = {
  filters: CrewFilters;
  resultCount: number;
  totalCount: number;
  onFilterChange: (key: keyof CrewFilters, value: string) => void;
  onReset: () => void;
};

const filterGroups: Array<{
  key: keyof CrewFilters;
  label: string;
  options: string[];
}> = [
  { key: "region", label: "지역", options: ["전체", "서울", "부산", "대구", "제주", "경기"] },
  { key: "runType", label: "러닝 유형", options: ["전체", "정기런", "번개런", "장거리런", "초보런"] },
  { key: "day", label: "요일", options: ["전체", "월", "화", "수", "목", "금", "토", "일"] },
  { key: "level", label: "레벨", options: ["전체", "초보", "중급", "고급", "누구나"] },
  { key: "sort", label: "정렬", options: ["추천순", "멤버 많은순", "최근 활동순", "모집중 우선"] },
];

export function CrewFilterBar({ filters, resultCount, totalCount, onFilterChange, onReset }: CrewFilterBarProps) {
  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="text-run-lime" size={18} />
          <h2 className="text-base font-black text-run-text">크루 필터</h2>
          <Badge variant="green">{resultCount} / {totalCount}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={15} />}
          onClick={onReset}
          aria-label="크루 필터 초기화"
          className="w-full sm:w-auto"
        >
          필터 초기화
        </Button>
      </div>
      <div className="grid gap-4">
        {filterGroups.map((group) => (
          <div key={group.key} className="grid gap-2 md:grid-cols-[86px_1fr] md:items-center">
            <p className="text-xs font-black tracking-[0.12em] text-run-muted">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => (
                <Chip
                  key={option}
                  selected={filters[group.key] === option}
                  onClick={() => onFilterChange(group.key, option)}
                  aria-label={`${group.label} ${option} 필터 선택`}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
