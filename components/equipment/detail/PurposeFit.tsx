import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type PurposeFitProps = { item: EquipmentDetail };

export function PurposeFit({ item }: PurposeFitProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="h-full min-w-0">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">PURPOSE FIT</p>
      <h2 className="mt-2 break-keep text-2xl font-black text-run-text">목적별 적합도</h2>

      <div className="mt-6 grid gap-4">
        {item.purposeFit.map((fit) => (
          <div key={fit.purpose} className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black">
              <span className="min-w-0 break-keep text-run-text">{fit.purpose}</span>
              <span className="shrink-0 text-run-lime">{fit.score}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-white/[0.04] bg-run-bg">
              <div
                className="h-full rounded-full bg-run-lime shadow-[0_0_18px_rgba(183,255,42,0.35)]"
                style={{ width: `${fit.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
