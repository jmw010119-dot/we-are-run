import { AlertCircle, CheckCircle2, Target } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type RecommendationReasonProps = { item: EquipmentDetail };

export function RecommendationReason({ item }: RecommendationReasonProps) {
  const groups = [
    {
      title: "어떤 러너에게 맞나요",
      icon: <Target size={18} />,
      items: item.fitFor,
      tone: "text-run-lime bg-run-lime/10 border-run-lime/25",
      dot: "bg-run-lime",
    },
    {
      title: "장점",
      icon: <CheckCircle2 size={18} />,
      items: item.pros,
      tone: "text-run-lime bg-run-lime/10 border-run-lime/25",
      dot: "bg-run-lime",
    },
    {
      title: "아쉬운 점",
      icon: <AlertCircle size={18} />,
      items: item.cons,
      tone: "text-amber-200 bg-amber-300/10 border-amber-200/20",
      dot: "bg-amber-200",
    },
  ];

  return (
    <div className="pt-2">
      <SectionHeader
        label="WHY RECOMMENDED"
        title="왜 이 장비를 추천하나요"
        description={item.recommendReason}
        compact
        className="mb-5"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.title} variant="hover" padding="lg" radius="xl" className="h-full">
            <div className="mb-5 flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${group.tone}`}>
                {group.icon}
              </span>
              <h3 className="break-keep text-lg font-black text-run-text">{group.title}</h3>
            </div>

            <ul className="grid gap-3">
              {group.items.map((text) => (
                <li key={text} className="flex gap-3 text-sm font-semibold leading-6 text-run-muted">
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${group.dot}`} />
                  <span className="min-w-0 break-keep">{text}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
