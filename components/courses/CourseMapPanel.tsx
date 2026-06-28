import { LocateFixed, Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/common/ui/IconButton";
import type { RunningCourse } from "@/types";

type CourseMapPanelProps = {
  courses: RunningCourse[];
};

export function CourseMapPanel({ courses }: CourseMapPanelProps) {
  return (
    <div className="sticky top-[104px] min-h-[520px] overflow-hidden rounded-[28px] border border-run-border bg-run-card p-4 lg:min-h-[720px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(183,255,42,0.13),transparent_20rem),radial-gradient(circle_at_78%_58%,rgba(56,189,248,0.12),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-8 rounded-[42%_58%_48%_52%] border border-white/[0.06] bg-run-bg/70" />
      <div className="absolute left-[18%] top-[34%] h-[2px] w-[58%] rotate-[13deg] rounded-full bg-run-lime/55 shadow-[0_0_20px_rgba(183,255,42,0.38)]" />
      <div className="absolute left-[36%] top-[58%] h-[2px] w-[36%] -rotate-[34deg] rounded-full bg-sky-400/45" />
      <div className="absolute left-[24%] top-[75%] h-[2px] w-[42%] rotate-[9deg] rounded-full bg-run-lime/35" />

      {courses.map((course) => (
        <div key={course.id} className="absolute" style={{ top: course.position.top, left: course.position.left }}>
          <span className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-run-bg bg-run-lime shadow-[0_0_22px_rgba(183,255,42,0.75)]" />
          <span className="ml-4 whitespace-nowrap rounded-full border border-run-lime/25 bg-run-bg/86 px-3 py-1 text-[11px] font-black text-run-lime backdrop-blur-md">
            {course.region}
          </span>
        </div>
      ))}

      <div className="absolute left-5 top-5 rounded-full border border-run-lime/25 bg-run-lime/10 px-4 py-2 text-xs font-black tracking-[0.16em] text-run-lime backdrop-blur-xl">
        COURSE MAP PREVIEW
      </div>
      <div className="absolute bottom-5 left-5 rounded-[18px] border border-white/[0.08] bg-run-bg/82 px-4 py-3 backdrop-blur-xl">
        <p className="text-xs font-black tracking-[0.18em] text-run-lime">LIVE ROUTE DATA</p>
        <p className="mt-1 text-sm font-bold text-run-muted">{courses.length}개 코스 표시 중</p>
      </div>
      <div className="absolute bottom-5 right-5 grid gap-2">
        <IconButton aria-label="현재 위치" icon={<LocateFixed size={18} />} className="bg-run-bg/82 backdrop-blur-xl" />
        <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-run-bg/82 backdrop-blur-xl">
          <IconButton aria-label="지도 확대" icon={<Plus size={18} />} className="rounded-none border-0 bg-transparent" />
          <IconButton aria-label="지도 축소" icon={<Minus size={18} />} className="rounded-none border-0 bg-transparent" />
        </div>
      </div>
    </div>
  );
}
