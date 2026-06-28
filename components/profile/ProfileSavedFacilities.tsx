import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { profileSavedFacilities } from "@/lib/mock";

export function ProfileSavedFacilities() {
  if (profileSavedFacilities.length === 0) {
    return <EmptyState title="저장한 시설이 없습니다" description="러닝 시설을 저장하면 편의시설 정보와 함께 이곳에 표시됩니다." />;
  }

  return (
    <div className="min-w-0">
      <SectionHeader label="SAVED FACILITIES" title="저장한 시설" description="자주 찾는 트랙, 공원, 경기장 정보를 모아두었습니다." compact className="mb-5" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profileSavedFacilities.map((facility) => (
          <Card key={facility.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[382px] min-w-0 flex-col overflow-hidden">
            <div className={["mb-5 h-28 shrink-0 rounded-[18px] border border-white/[0.08] bg-gradient-to-br", facility.gradient].join(" ")} />
            <Badge variant="info" className="w-fit">{facility.type}</Badge>
            <h3 className="mt-4 break-keep text-xl font-black leading-snug text-run-text">{facility.name}</h3>
            <p className="mt-2 flex min-w-0 items-center gap-1.5 break-keep text-sm font-bold text-run-muted"><MapPin size={14} className="shrink-0" />{facility.region} {facility.city}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {facility.amenities.map((amenity) => (
                <span key={amenity} className="max-w-full break-keep rounded-full border border-run-border bg-run-bg px-3 py-1 text-xs font-bold text-run-muted">{amenity}</span>
              ))}
            </div>
            <Button href={`/facilities/${facility.id}`} variant="secondary" size="sm" leftIcon={<Building2 size={15} />} rightIcon={<ArrowUpRight size={15} />} className="mt-5 w-full">상세보기</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
