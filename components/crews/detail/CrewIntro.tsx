import { AlertTriangle, CheckCircle2, Target, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail } from "@/types";

type CrewIntroProps = { crew: CrewDetail };

export function CrewIntro({ crew }: CrewIntroProps) {
  const groups = [
    { title: "운영 방식", icon: <Users size={18} />, items: crew.operationStyle },
    { title: "가입 조건", icon: <CheckCircle2 size={18} />, items: crew.joinCondition },
    { title: "이런 러너에게 추천", icon: <Target size={18} />, items: crew.recommendedFor },
    { title: "주의사항", icon: <AlertTriangle size={18} />, items: crew.cautions },
  ];

  return (
    <div className="pt-2">
      <SectionHeader label="CREW INTRO" title="크루 소개와 운영 방식" description={crew.description} compact className="mb-5" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
