import { AlertTriangle, Bell, ShieldCheck } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail } from "@/types";

type CrewRulesNoticeProps = { crew: CrewDetail };

export function CrewRulesNotice({ crew }: CrewRulesNoticeProps) {
  const groups = [
    { title: "크루 공지", icon: <Bell size={18} />, items: crew.notices },
    { title: "참여 규칙", icon: <ShieldCheck size={18} />, items: crew.rules },
    { title: "안전 수칙", icon: <AlertTriangle size={18} />, items: crew.safetyRules },
  ];

  return (
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
  );
}
