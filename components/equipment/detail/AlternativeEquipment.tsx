import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type AlternativeEquipmentProps = { item: EquipmentDetail };

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function AlternativeEquipment({ item }: AlternativeEquipmentProps) {
  return (
    <div>
      <SectionHeader
        label="ALTERNATIVES"
        title="비슷하게 볼 만한 장비"
        description="목적과 가격대를 함께 고려한 대체 추천 장비입니다."
        compact
        className="mb-5"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {item.alternatives.map((alt) => (
          <Card key={alt.id} variant="hover" padding="lg" radius="xl" className="flex h-full min-w-0 flex-col">
            <p className="text-xs font-black tracking-[0.14em] text-run-lime">{alt.brand}</p>
            <h3 className="mt-3 min-w-0 break-keep text-lg font-black leading-snug text-run-text">{alt.name}</h3>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-run-border pt-4">
              <span className="break-keep text-sm font-black text-run-text">{formatPrice(alt.price)}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-black text-run-lime">
                <Star size={14} fill="currentColor" />
                {alt.rating}
              </span>
            </div>
            <Button
              href={`/equipment/${alt.id}`}
              variant="secondary"
              size="sm"
              rightIcon={<ArrowUpRight size={15} />}
              className="mt-5 w-full"
            >
              상세보기
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
