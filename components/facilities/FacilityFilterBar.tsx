import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Chip } from "@/components/common/ui/Chip";

export type FacilityFilters = {
  region: string;
  type: string;
  amenity: string;
  status: string;
  sort: string;
};

type FacilityFilterBarProps = {
  filters: FacilityFilters;
  resultCount: number;
  totalCount: number;
  onFilterChange: (key: keyof FacilityFilters, value: string) => void;
  onReset: () => void;
};

const filterGroups: Array<{
  key: keyof FacilityFilters;
  label: string;
  options: string[];
}> = [
  { key: "region", label: "지역", options: ["전체", "서울", "부산", "대구", "제주", "경기"] },
  { key: "type", label: "시설 유형", options: ["전체", "트랙", "공원", "실내 러닝장", "육상경기장", "산책로"] },
  { key: "amenity", label: "편의시설", options: ["전체", "주차", "화장실", "샤워실", "조명", "보관함"] },
  { key: "status", label: "운영 상태", options: ["전체", "운영중", "운영 종료", "24시간"] },
  { key: "sort", label: "정렬", options: ["추천순", "평점순", "가까운순", "리뷰 많은순"] },
];

export function FacilityFilterBar({
  filters,
  resultCount,
  totalCount,
  onFilterChange,
  onReset,
}: FacilityFilterBarProps) {
  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="text-run-lime" size={18} />
          <h2 className="text-base font-black text-run-text">시설 필터</h2>
          <Badge variant="green">{resultCount} / {totalCount}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={15} />}
          onClick={onReset}
          aria-label="시설 필터 초기화"
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
