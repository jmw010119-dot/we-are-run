import { Bath, Car, Clock3, Star, Tags, MessageCircle } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { FacilityDetail } from "@/types";

type FacilitySummaryCardsProps = { facility: FacilityDetail };

function hasAmenity(facility: FacilityDetail, amenity: string) {
  return facility.amenities.includes(amenity) ? "가능" : "확인 필요";
}

export function FacilitySummaryCards({ facility }: FacilitySummaryCardsProps) {
  const items = [
    { label: "운영 시간", value: facility.hours, icon: <Clock3 size={14} />, accent: true },
    { label: "시설 유형", value: facility.type, icon: <Tags size={14} /> },
    { label: "평점", value: String(facility.rating), icon: <Star size={14} fill="currentColor" />, accent: true },
    { label: "리뷰 수", value: `${facility.reviewCount}개`, icon: <MessageCircle size={14} /> },
    { label: "주차 여부", value: hasAmenity(facility, "주차"), icon: <Car size={14} /> },
    { label: "샤워실 여부", value: hasAmenity(facility, "샤워실"), icon: <Bath size={14} /> },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <StatChip key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} className="flex min-h-[94px] flex-col justify-between bg-run-bg/70" />
        ))}
      </div>
    </Card>
  );
}
