import { Footprints, Gauge, ShoppingBag, Watch } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { EquipmentItem } from "@/types";

type EquipmentSummaryProps = { items: EquipmentItem[] };

export function EquipmentSummary({ items }: EquipmentSummaryProps) {
  const beginnerCount = items.filter((item) => item.level === "초보").length;
  const shoeCount = items.filter((item) => item.category === "러닝화").length;
  const gadgetCount = items.filter((item) => item.category === "GPS 워치" || item.category === "액세서리").length;
  const summaryItems = [
    { label: "추천 장비", value: `${items.length}개`, icon: <ShoppingBag size={14} />, accent: true },
    { label: "초보자 추천", value: `${beginnerCount}개`, icon: <Gauge size={14} /> },
    { label: "러닝화", value: `${shoeCount}개`, icon: <Footprints size={14} /> },
    { label: "GPS/액세서리", value: `${gadgetCount}개`, icon: <Watch size={14} />, accent: true },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summaryItems.map((item) => (
          <StatChip key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} className="min-h-[92px] bg-run-bg/70" />
        ))}
      </div>
    </Card>
  );
}
