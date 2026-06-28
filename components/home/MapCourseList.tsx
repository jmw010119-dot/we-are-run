import { MapCourseCard } from "@/components/home/MapCourseCard";
import { mapPreviewCourses } from "@/lib/mock";

export function MapCourseList() {
  return (
    <aside className="rounded-[28px] border border-run-border bg-[#10161B]/86 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">POPULAR</p>
          <h3 className="mt-2 text-2xl font-black text-run-text">인기 코스 TOP 3</h3>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-run-bg px-3 py-1 text-xs font-black text-run-muted">
          LIVE
        </span>
      </div>

      <div className="grid gap-3">
        {mapPreviewCourses.map((course, index) => (
          <MapCourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </aside>
  );
}
