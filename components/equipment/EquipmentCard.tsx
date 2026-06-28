import { Bookmark, Star } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { EquipmentItem } from "@/types";

type EquipmentCardProps = { item: EquipmentItem };

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <Card variant="hover" padding="none" radius="xl" className="group overflow-hidden">
      <div className={["relative h-48 overflow-hidden border-b border-white/[0.06] bg-gradient-to-br p-5", item.gradient].join(" ")}>
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute left-5 top-[58%] h-[3px] w-[72%] -rotate-[12deg] rounded-full bg-run-lime/70" />
        <div className="absolute right-4 top-4">
          <IconButton aria-label={`${item.name} 저장`} icon={<Bookmark size={18} fill={item.isSaved ? "currentColor" : "none"} />} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <Badge variant="green">{item.category}</Badge>
          <span className="text-xs font-black text-run-muted">{item.brand}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">{item.level}</Badge>
          {item.purposes.slice(0, 2).map((purpose) => (
            <Badge key={purpose} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">{purpose}</Badge>
          ))}
        </div>
        <h3 className="mt-4 line-clamp-2 break-keep text-xl font-black leading-7 text-run-text transition duration-200 group-hover:text-run-lime">{item.name}</h3>
        <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-run-muted">{item.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatChip label="가격" value={formatPrice(item.price)} accent />
          <StatChip label="평점" value={String(item.rating)} icon={<Star size={13} fill="currentColor" />} />
        </div>
        <p className="mt-3 text-xs font-bold text-run-muted">리뷰 {item.reviewCount}개</p>
        <Button href={`/equipment/${item.id}`} variant="secondary" size="sm" className="mt-5 w-full rounded-[14px]">상세보기</Button>
      </div>
    </Card>
  );
}

