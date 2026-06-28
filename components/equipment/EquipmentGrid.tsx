import { ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import type { EquipmentItem } from "@/types";

type EquipmentGridProps = {
  items: EquipmentItem[];
  totalCount: number;
  onReset: () => void;
};

export function EquipmentGrid({ items, totalCount, onReset }: EquipmentGridProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">EQUIPMENT LIST</p>
          <h2 className="mt-2 text-2xl font-black text-run-text">검색된 장비 {items.length}개</h2>
        </div>
        <p className="text-right text-sm font-bold text-run-muted">전체 {totalCount}개</p>
      </div>
      {items.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => <EquipmentCard key={item.id} item={item} />)}
        </div>
      ) : (
        <EmptyState
          icon={<ShoppingBag size={24} />}
          title="조건에 맞는 장비가 없습니다"
          description="레벨, 카테고리, 목적, 가격대 또는 검색어를 조금 넓혀 다시 찾아보세요."
          actionLabel="필터 초기화"
          onAction={onReset}
        />
      )}
    </div>
  );
}
