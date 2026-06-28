import { ArrowUpRight, Route } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CourseDifficulty, FacilityDetail } from "@/types";

type FacilityNearbyCoursesProps = { facility: FacilityDetail };

const difficultyLabels: Record<CourseDifficulty, string> = { Easy: "쉬움", Normal: "보통", Hard: "어려움" };

export function FacilityNearbyCourses({ facility }: FacilityNearbyCoursesProps) {
  return (
    <div>
      <SectionHeader label="NEARBY COURSE" title="이 시설 근처 러닝 코스" description="시설 이용 전후로 함께 달리기 좋은 러닝 코스입니다." compact className="mb-5" />
      <div className="grid gap-4 lg:grid-cols-3">
        {facility.nearbyCourses.map((course) => (
          <Card key={course.id} variant="hover" padding="lg" radius="xl" className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">
                <Route size={19} />
              </div>
              <Badge variant="green">{course.walkingDistance}</Badge>
            </div>
            <h3 className="mt-5 break-keep text-lg font-black leading-6 text-run-text">{course.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="info">{course.distance}</Badge>
              <Badge variant="green">{difficultyLabels[course.difficulty]}</Badge>
            </div>
            <Button href={`/courses/${course.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-auto w-full translate-y-5">상세보기</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
