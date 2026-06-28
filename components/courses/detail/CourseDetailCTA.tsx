import { Bookmark, Camera, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CourseDetail } from "@/types";

type CourseDetailCTAProps = {
  course: CourseDetail;
};

export function CourseDetailCTA({ course }: CourseDetailCTAProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative grid gap-6 xl:grid-cols-[1fr_auto] xl:items-center">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-run-lime/10 blur-[70px]" />
        <div className="relative min-w-0">
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">NEXT ACTION</p>
          <h2 className="mt-3 max-w-3xl break-keep text-2xl font-black leading-tight text-run-text sm:text-3xl">
            {course.name}에서 다음 러닝을 시작하세요
          </h2>
          <p className="mt-3 max-w-2xl break-keep text-sm font-semibold leading-6 text-run-muted">
            코스를 저장하고, 근처 크루를 찾거나 러닝 인증으로 오늘의 기록을 남겨보세요.
          </p>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-3 xl:min-w-[520px]">
          <Button className="w-full" leftIcon={<Bookmark size={17} />}>이 코스 저장하기</Button>
          <Button href="/crews" className="w-full" variant="secondary" leftIcon={<Users size={17} />}>근처 크루 보기</Button>
          <Button href="/community" className="w-full" variant="outline" leftIcon={<Camera size={17} />}>러닝 인증 남기기</Button>
        </div>
      </div>
    </Card>
  );
}
