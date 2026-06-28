import { AlertTriangle, CheckCircle2, Target } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/common/ui/Card";
import type { CourseDetail } from "@/types";

type CourseDescriptionProps = {
  course: CourseDetail;
};

export function CourseDescription({ course }: CourseDescriptionProps) {
  const groups = [
    { title: "추천 포인트", icon: <CheckCircle2 size={18} />, items: course.recommendPoints },
    { title: "주의사항", icon: <AlertTriangle size={18} />, items: course.cautions },
    { title: "이런 러너에게 추천", icon: <Target size={18} />, items: course.recommendedFor },
  ];

  return (
    <div className="pt-2">
      <SectionHeader
        label="COURSE GUIDE"
        title="달리기 전에 알아두면 좋은 정보"
        description={course.description}
        compact
        className="mb-5"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.title} variant="hover" padding="lg" radius="xl" className="h-full">
            <div className="mb-5 flex items-center gap-2 text-run-lime">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10">{group.icon}</span>
              <h3 className="text-lg font-black text-run-text">{group.title}</h3>
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
