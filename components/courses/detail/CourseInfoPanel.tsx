import { Bus, Car, CheckCircle2, Lightbulb, Store, Toilet, TrendingUp } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import type { CourseDetail } from "@/types";

type CourseInfoPanelProps = {
  course: CourseDetail;
};

export function CourseInfoPanel({ course }: CourseInfoPanelProps) {
  const infoItems = [
    { label: "화장실", value: course.amenities.toilet, icon: <Toilet size={17} /> },
    { label: "주차", value: course.amenities.parking, icon: <Car size={17} /> },
    { label: "야간 조명", value: course.amenities.nightLight, icon: <Lightbulb size={17} /> },
    { label: "편의점", value: course.amenities.convenienceStore, icon: <Store size={17} /> },
    { label: "대중교통", value: course.amenities.transit, icon: <Bus size={17} /> },
    { label: "난이도 설명", value: course.amenities.difficultyNote, icon: <TrendingUp size={17} /> },
  ];

  return (
    <Card variant="glass" padding="lg" radius="xl" className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">COURSE INFO</p>
          <h2 className="mt-2 break-keep text-2xl font-black text-run-text">시설과 접근성</h2>
        </div>
        <span className="hidden rounded-full border border-run-lime/25 bg-run-lime/10 px-3 py-1 text-xs font-black text-run-lime sm:inline-flex">
          VERIFIED
        </span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {infoItems.map((item) => (
          <div key={item.label} className="min-h-[112px] rounded-[18px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card-hover">
            <p className="flex items-center justify-between gap-2 text-xs font-black tracking-[0.12em] text-run-muted">
              <span className="flex items-center gap-2">
                <span className="text-run-lime">{item.icon}</span>
                {item.label}
              </span>
              <CheckCircle2 size={14} className="text-run-lime" />
            </p>
            <p className="mt-3 break-keep text-sm font-bold leading-6 text-run-text">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
