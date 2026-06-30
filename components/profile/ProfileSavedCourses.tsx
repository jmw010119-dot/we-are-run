import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { profileSavedCourses } from "@/lib/mock";
import type { RunningCourse } from "@/types";

type ProfileSavedCoursesProps = {
  courses?: Pick<RunningCourse, "id" | "name" | "region" | "city" | "distance" | "difficulty" | "rating" | "gradient">[];
};

export function ProfileSavedCourses({ courses = profileSavedCourses }: ProfileSavedCoursesProps) {
  if (courses.length === 0) {
    return <EmptyState title="저장한 코스가 없습니다" description="마음에 드는 러닝 코스를 저장하면 이곳에서 볼 수 있습니다." />;
  }

  return (
    <div className="min-w-0">
      <SectionHeader label="SAVED COURSES" title="저장한 코스" description="다시 달리고 싶은 러닝 루트를 모아두었습니다." compact className="mb-5" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[360px] min-w-0 flex-col overflow-hidden">
            <div className={["mb-5 h-28 shrink-0 rounded-[18px] border border-white/[0.08] bg-gradient-to-br", course.gradient].join(" ")} />
            <Badge variant="green" className="w-fit">{course.difficulty}</Badge>
            <h3 className="mt-4 break-keep text-xl font-black leading-snug text-run-text">{course.name}</h3>
            <p className="mt-2 flex min-w-0 items-center gap-1.5 break-keep text-sm font-bold text-run-muted"><MapPin size={14} className="shrink-0" />{course.region} {course.city}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm font-black">
              <span className="text-run-text">{course.distance}</span>
              <span className="inline-flex items-center gap-1 text-run-lime"><Star size={14} fill="currentColor" />{course.rating}</span>
            </div>
            <Button href={`/courses/${course.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-5 w-full">상세보기</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
