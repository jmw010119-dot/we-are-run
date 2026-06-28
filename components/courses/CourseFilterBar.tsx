import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Chip } from "@/components/common/ui/Chip";

export type CourseFilters = {
  region: string;
  distance: string;
  difficulty: string;
  type: string;
  sort: string;
};

type CourseFilterBarProps = {
  filters: CourseFilters;
  resultCount: number;
  totalCount: number;
  onFilterChange: (key: keyof CourseFilters, value: string) => void;
  onReset: () => void;
};

const filterGroups: Array<{
  key: keyof CourseFilters;
  label: string;
  options: string[];
}> = [
  { key: "region", label: "지역", options: ["전체", "서울", "부산", "대구", "제주", "경기"] },
  { key: "distance", label: "거리", options: ["전체", "5km 이하", "5-10km", "10km 이상"] },
  { key: "difficulty", label: "난이도", options: ["전체", "쉬움", "보통", "어려움"] },
  { key: "type", label: "유형", options: ["전체", "공원", "한강", "트랙", "도심", "해안", "산책로"] },
  { key: "sort", label: "정렬", options: ["추천순", "평점순", "거리 짧은순", "거리 긴순", "리뷰 많은순"] },
];

export function CourseFilterBar({
  filters,
  resultCount,
  totalCount,
  onFilterChange,
  onReset,
}: CourseFilterBarProps) {
  return (
    <Card variant="glass" padding="md" radius="xl" className="mb-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-run-lime" size={18} />
          <h2 className="text-base font-black text-run-text">코스 필터</h2>
          <Badge variant="green">{resultCount} / {totalCount}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={15} />}
          onClick={onReset}
          aria-label="코스 필터 초기화"
          className="w-full sm:w-auto"
        >
          필터 초기화
        </Button>
      </div>

      <div className="grid gap-4">
        {filterGroups.map((group) => (
          <div key={group.key} className="grid gap-2 md:grid-cols-[72px_1fr] md:items-center">
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
