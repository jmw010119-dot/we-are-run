import { Bookmark, Clock3, MapPin, Route, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CourseDifficulty, RunningCourse } from "@/types";

type CourseListCardProps = {
  course: RunningCourse;
};

const difficultyLabels: Record<CourseDifficulty, string> = {
  Easy: "쉬움",
  Normal: "보통",
  Hard: "어려움",
};

export function CourseListCard({ course }: CourseListCardProps) {
  return (
    <Card variant="hover" padding="sm" radius="xl" className="group overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className={[
          "relative h-36 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br p-4 sm:h-32 sm:w-32 sm:shrink-0",
          course.gradient,
        ].join(" ")}
        >
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <div className="absolute left-4 top-[58%] h-[3px] w-[72%] -rotate-[12deg] rounded-full bg-run-lime/70" />
          <div className="absolute bottom-4 left-4 rounded-full border border-run-lime/25 bg-run-bg/75 px-3 py-1 text-[11px] font-black text-run-lime backdrop-blur-md">
            {course.type}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-black text-run-text transition duration-200 group-hover:text-run-lime">
                {course.name}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-run-muted">
                <MapPin size={15} />
                {course.region} {course.city}
              </p>
            </div>
            <IconButton
              aria-label={`${course.name} 저장`}
              icon={<Bookmark size={18} fill={course.isSaved ? "currentColor" : "none"} />}
            />
          </div>

          <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-run-muted">{course.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <StatChip label="거리" value={course.distance} icon={<Route size={13} />} />
            <StatChip label="시간" value={course.estimatedTime} icon={<Clock3 size={13} />} />
            <StatChip label="난이도" value={difficultyLabels[course.difficulty]} icon={<TrendingUp size={13} />} />
            <StatChip label="평점" value={String(course.rating)} icon={<Star size={13} fill="currentColor" />} accent />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="info">{course.type}</Badge>
            {course.tags.map((tag) => (
              <Badge key={tag} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">
                #{tag}
              </Badge>
            ))}
            <span className="text-xs font-bold text-run-muted">리뷰 {course.reviewCount}</span>
          </div>

          <div className="mt-5 flex justify-end">
            <Button href={`/courses/${course.id}`} variant="secondary" size="sm" className="rounded-[14px]" aria-label={`${course.name} 상세보기`}>상세보기</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}


