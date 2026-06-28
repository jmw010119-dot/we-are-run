import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Chip } from "@/components/common/ui/Chip";

export type EquipmentFilters = {
  level: string;
  category: string;
  purpose: string;
  priceRange: string;
  sort: string;
};

type EquipmentFilterBarProps = {
  filters: EquipmentFilters;
  resultCount: number;
  totalCount: number;
  onFilterChange: (key: keyof EquipmentFilters, value: string) => void;
  onReset: () => void;
};

const filterGroups: Array<{
  key: keyof EquipmentFilters;
  label: string;
  options: string[];
}> = [
  { key: "level", label: "레벨", options: ["전체", "초보", "중급", "고급"] },
  { key: "category", label: "카테고리", options: ["전체", "러닝화", "러닝복", "GPS 워치", "액세서리"] },
  { key: "purpose", label: "목적", options: ["전체", "데일리런", "장거리", "스피드", "트레일", "회복런"] },
  { key: "priceRange", label: "가격대", options: ["전체", "10만원 이하", "10-20만원", "20만원 이상"] },
  { key: "sort", label: "정렬", options: ["추천순", "평점순", "가격 낮은순", "가격 높은순", "리뷰 많은순"] },
];

export function EquipmentFilterBar({ filters, resultCount, totalCount, onFilterChange, onReset }: EquipmentFilterBarProps) {
  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="text-run-lime" size={18} />
          <h2 className="text-base font-black text-run-text">장비 필터</h2>
          <Badge variant="green">{resultCount} / {totalCount}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={15} />}
          onClick={onReset}
          aria-label="장비 필터 초기화"
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
