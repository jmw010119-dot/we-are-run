import { SearchX } from "lucide-react";
import { CourseListCard } from "@/components/courses/CourseListCard";
import { EmptyState } from "@/components/common/ui/EmptyState";
import type { RunningCourse } from "@/types";

type CourseListProps = {
  courses: RunningCourse[];
  totalCount: number;
  onReset: () => void;
};

export function CourseList({ courses, totalCount, onReset }: CourseListProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">COURSE LIST</p>
          <h2 className="mt-2 text-2xl font-black text-run-text">검색된 코스 {courses.length}개</h2>
        </div>
        <p className="text-right text-sm font-bold text-run-muted">전체 {totalCount}개</p>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-4">
          {courses.map((course) => (
            <CourseListCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX size={24} />}
          title="조건에 맞는 코스가 없습니다"
          description="지역, 거리, 난이도 또는 검색어를 조금 넓혀 다시 찾아보세요."
          actionLabel="필터 초기화"
          onAction={onReset}
        />
      )}
    </div>
  );
}
