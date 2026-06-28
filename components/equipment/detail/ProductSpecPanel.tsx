import { Activity, Gauge } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type ProductSpecPanelProps = { item: EquipmentDetail };

export function ProductSpecPanel({ item }: ProductSpecPanelProps) {
  const specs = [
    ["무게", item.specs.weight],
    ["쿠션감", item.specs.cushioning],
    ["안정성", item.specs.stability],
    ["내구성", item.specs.durability],
    ["통기성", item.specs.breathability],
    ["추천 거리", item.specs.recommendedDistance],
    ["사용 목적", item.specs.useCase],
  ];

  return (
    <Card variant="glass" padding="lg" radius="xl" className="h-full min-w-0">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">PRODUCT SPEC</p>
      <h2 className="mt-2 break-keep text-2xl font-black text-run-text">제품 스펙</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {specs.map(([label, value]) => (
          <div key={label} className="min-h-[106px] rounded-[18px] border border-run-border bg-run-bg/70 p-4">
            <p className="flex items-center gap-2 text-xs font-black tracking-[0.12em] text-run-muted">
              <Gauge size={14} className="shrink-0 text-run-lime" />
              {label}
            </p>
            <p className="mt-2 min-w-0 break-keep text-sm font-bold leading-6 text-run-text">{value}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 break-keep text-xs font-bold leading-5 text-run-muted">
        <Activity size={14} className="mt-0.5 shrink-0 text-run-lime" />
        Mock Data 기준 추천 스펙이며, 실제 착용감은 러너의 체형과 주법에 따라 달라질 수 있습니다.
      </p>
    </Card>
  );
}
