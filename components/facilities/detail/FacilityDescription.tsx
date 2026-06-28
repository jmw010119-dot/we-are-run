import { AlertTriangle, CheckCircle2, Target } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/common/ui/Card";
import type { FacilityDetail } from "@/types";

type FacilityDescriptionProps = { facility: FacilityDetail };

export function FacilityDescription({ facility }: FacilityDescriptionProps) {
  const groups = [
    { title: "이용 추천 포인트", icon: <CheckCircle2 size={18} />, items: facility.recommendPoints },
    { title: "주의사항", icon: <AlertTriangle size={18} />, items: facility.cautions },
    { title: "이런 러너에게 추천", icon: <Target size={18} />, items: facility.recommendedFor },
  ];

  return (
    <div className="pt-2">
      <SectionHeader label="FACILITY GUIDE" title="이용 전에 확인하면 좋은 정보" description={facility.description} compact className="mb-5" />
      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.title} variant="hover" padding="lg" radius="xl" className="h-full">
            <div className="mb-5 flex items-center gap-2 text-run-lime">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10">{group.icon}</span>
              <h3 className="break-keep text-lg font-black text-run-text">{group.title}</h3>
            </div>
            <ul className="grid gap-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-run-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-run-lime" />
                  <span className="break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
