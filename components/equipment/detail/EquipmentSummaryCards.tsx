import { BadgeCheck, Coins, Layers, MessageCircle, Star, Tags } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { EquipmentDetail } from "@/types";

type EquipmentSummaryCardsProps = { item: EquipmentDetail };

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function EquipmentSummaryCards({ item }: EquipmentSummaryCardsProps) {
  const items = [
    { label: "가격", value: formatPrice(item.price), icon: <Coins size={14} />, accent: true },
    { label: "추천 레벨", value: item.level, icon: <BadgeCheck size={14} /> },
    { label: "카테고리", value: item.category, icon: <Layers size={14} /> },
    { label: "평점", value: String(item.rating), icon: <Star size={14} fill="currentColor" />, accent: true },
    { label: "리뷰 수", value: `${item.reviewCount}개`, icon: <MessageCircle size={14} /> },
    { label: "추천 목적", value: item.purposes.join(", "), icon: <Tags size={14} /> },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((stat) => (
          <StatChip
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            accent={stat.accent}
            className="flex min-h-[98px] min-w-0 flex-col justify-between bg-run-bg/70"
          />
        ))}
      </div>
    </Card>
  );
}
