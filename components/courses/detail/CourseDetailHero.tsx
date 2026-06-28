import { Bookmark, MapPin, Share2, Star } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { IconButton } from "@/components/common/ui/IconButton";
import { Section } from "@/components/common/ui/Section";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CourseDetail, CourseDifficulty } from "@/types";

const difficultyLabels: Record<CourseDifficulty, string> = {
  Easy: "쉬움",
  Normal: "보통",
  Hard: "어려움",
};

type CourseDetailHeroProps = {
  course: CourseDetail;
};

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-18" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute right-[-12rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />
      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.56fr)] lg:items-end xl:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green">RUNNING COURSE</Badge>
            <Badge variant="info">{course.type}</Badge>
            <Badge variant="success">리뷰 {course.reviewCount}</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-[1.02] tracking-normal text-run-text sm:text-5xl md:text-6xl xl:text-7xl">
            {course.name}
          </h1>
          <p className="mt-5 flex max-w-3xl flex-wrap items-center gap-2 text-sm font-bold leading-6 text-run-muted sm:text-base md:text-lg">
            <MapPin size={18} className="shrink-0 text-run-lime" />
            <span>{course.region} {course.city}</span>
            <span className="text-run-border">/</span>
            <span>{course.startPoint}</span>
          </p>

          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="거리" value={course.distance} accent className="min-h-[82px]" />
            <StatChip label="난이도" value={difficultyLabels[course.difficulty]} className="min-h-[82px]" />
            <StatChip label="예상 시간" value={course.estimatedTime} className="min-h-[82px]" />
            <StatChip label="평점" value={`${course.rating}`} icon={<Star size={13} fill="currentColor" />} accent className="min-h-[82px]" />
          </div>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button className="w-full sm:w-auto" leftIcon={<Bookmark size={17} fill={course.isSaved ? "currentColor" : "none"} />}>
              이 코스 저장하기
            </Button>
            <Button className="w-full sm:w-auto" variant="secondary" leftIcon={<Share2 size={17} />}>
              공유하기
            </Button>
          </div>
        </div>

        <div className={["relative min-h-[320px] overflow-hidden rounded-[24px] border border-run-border bg-gradient-to-br p-4 sm:min-h-[360px] sm:rounded-[28px] sm:p-5", course.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute left-[10%] top-[56%] h-[4px] w-[80%] -rotate-[13deg] rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
          <div className="absolute left-[18%] top-[34%] h-24 w-24 rounded-full border border-run-lime/20 bg-run-lime/10 blur-sm" />
          <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/[0.08] bg-run-bg/82 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-[22px] sm:p-5">
            <p className="truncate text-xs font-black tracking-[0.18em] text-run-lime">{course.coverLabel}</p>
            <p className="mt-2 text-xl font-black text-run-text sm:text-2xl">{course.distance} Premium Route</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-run-muted">러너 리뷰를 기반으로 추천되는 대표 코스입니다.</p>
          </div>
          <div className="absolute right-4 top-4 flex gap-2 sm:right-5 sm:top-5">
            <IconButton aria-label="코스 저장" icon={<Bookmark size={18} fill={course.isSaved ? "currentColor" : "none"} />} />
            <IconButton aria-label="코스 공유" icon={<Share2 size={18} />} />
          </div>
        </div>
      </div>
    </Section>
  );
}
