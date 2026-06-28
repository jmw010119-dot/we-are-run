import { Bath, CircleParking, Dumbbell, Map, Trees, Warehouse } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { RunningFacility } from "@/types";

type FacilitySummaryProps = {
  facilities: RunningFacility[];
};

export function FacilitySummary({ facilities }: FacilitySummaryProps) {
  const trackCount = facilities.filter((facility) => facility.type === "트랙" || facility.type === "육상경기장").length;
  const parkCount = facilities.filter((facility) => facility.type === "공원" || facility.type === "산책로").length;
  const indoorCount = facilities.filter((facility) => facility.type === "실내 러닝장").length;
  const premiumCount = facilities.filter(
    (facility) => facility.amenities.includes("샤워실") || facility.amenities.includes("주차"),
  ).length;

  const items = [
    { label: "등록 시설", value: `${facilities.length}곳`, icon: <Map size={14} />, accent: true },
    { label: "트랙", value: `${trackCount}곳`, icon: <Dumbbell size={14} /> },
    { label: "공원", value: `${parkCount}곳`, icon: <Trees size={14} /> },
    { label: "실내 러닝장", value: `${indoorCount}곳`, icon: <Warehouse size={14} /> },
    { label: "샤워/주차", value: `${premiumCount}곳`, icon: <Bath size={14} />, accent: true },
    { label: "주차 가능", value: `${facilities.filter((facility) => facility.amenities.includes("주차")).length}곳`, icon: <CircleParking size={14} /> },
  ];

  return (
    <Card variant="glass" padding="md" radius="xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <StatChip key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} className="min-h-[92px] bg-run-bg/70" />
        ))}
      </div>
    </Card>
  );
}
