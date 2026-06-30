import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { profileSavedEquipment } from "@/lib/mock";
import type { EquipmentItem } from "@/types";

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

type ProfileSavedEquipmentProps = {
  equipment?: Pick<EquipmentItem, "id" | "name" | "brand" | "category" | "level" | "price" | "rating" | "gradient">[];
};

export function ProfileSavedEquipment({ equipment = profileSavedEquipment }: ProfileSavedEquipmentProps) {
  if (equipment.length === 0) {
    return <EmptyState title="관심 장비가 없습니다" description="관심 있는 장비를 저장하면 가격과 평점을 함께 볼 수 있습니다." />;
  }

  return (
    <div className="min-w-0">
      <SectionHeader label="SAVED EQUIPMENT" title="관심 장비" description="러닝 목적에 맞춰 저장해 둔 장비 목록입니다." compact className="mb-5" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {equipment.map((item) => (
          <Card key={item.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[372px] min-w-0 flex-col overflow-hidden">
            <div className={["mb-5 h-28 shrink-0 rounded-[18px] border border-white/[0.08] bg-gradient-to-br", item.gradient].join(" ")} />
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">{item.category}</Badge>
              <Badge variant="green">{item.level}</Badge>
            </div>
            <h3 className="mt-4 break-keep text-xl font-black leading-snug text-run-text">{item.name}</h3>
            <p className="mt-2 break-keep text-sm font-bold text-run-muted">{item.brand}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm font-black">
              <span className="break-keep text-run-text">{formatPrice(item.price)}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-run-lime"><Star size={14} fill="currentColor" />{item.rating}</span>
            </div>
            <Button href={`/equipment/${item.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-5 w-full">상세보기</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
