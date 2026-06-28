import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { EquipmentItem } from "@/types";

type FeaturedEquipmentProps = { item: EquipmentItem };

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function FeaturedEquipment({ item }: FeaturedEquipmentProps) {
  return (
    <div>
      <SectionHeader
        label="TODAY PICK"
        title="오늘의 추천 장비"
        description="러닝 입문과 꾸준한 데일리런에 가장 균형 좋은 장비를 먼저 추천합니다."
        compact
        className="mb-5"
      />
      <Card variant="glass" padding="none" radius="xl" className="overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)]">
          <div className={["relative min-h-[360px] overflow-hidden bg-gradient-to-br p-6", item.gradient].join(" ")}>
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-[12%] top-[58%] h-[4px] w-[76%] -rotate-[13deg] rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
            <div className="absolute right-[-3rem] top-[-3rem] h-44 w-44 rounded-full bg-run-lime/12 blur-[70px]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[22px] border border-white/[0.08] bg-run-bg/82 p-5 backdrop-blur-xl">
              <p className="text-xs font-black tracking-[0.18em] text-run-lime">FEATURED GEAR</p>
              <p className="mt-2 text-2xl font-black text-run-text">{item.brand}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-run-muted">러너를 위한 큐레이션 픽</p>
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">{item.category}</Badge>
              <Badge variant="info">{item.level}</Badge>
              {item.purposes.map((purpose) => <Badge key={purpose} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">{purpose}</Badge>)}
            </div>
            <h3 className="mt-5 break-keep text-3xl font-black leading-tight text-run-text md:text-4xl">{item.name}</h3>
            <p className="mt-4 break-keep text-sm font-semibold leading-6 text-run-muted">{item.recommendReason}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatChip label="가격" value={formatPrice(item.price)} accent />
              <StatChip label="평점" value={String(item.rating)} icon={<Star size={13} fill="currentColor" />} accent />
              <StatChip label="리뷰" value={`${item.reviewCount}개`} />
            </div>
            <Button href={`/equipment/${item.id}`} className="mt-7 w-full sm:w-auto" rightIcon={<ArrowUpRight size={17} />}>상세보기</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
