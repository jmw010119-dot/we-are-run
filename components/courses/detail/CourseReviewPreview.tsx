import { Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CourseDetail } from "@/types";

type CourseReviewPreviewProps = {
  course: CourseDetail;
};

export function CourseReviewPreview({ course }: CourseReviewPreviewProps) {
  return (
    <div className="h-full">
      <SectionHeader
        label="RUNNER REVIEW"
        title="이 코스를 달린 러너들의 후기"
        description="페이스, 분위기, 접근성에 대한 실제 러너들의 짧은 리뷰입니다."
        compact
        className="mb-5"
      />
      <div className="grid gap-3">
        {course.reviews.map((review) => (
          <Card key={review.id} variant="hover" padding="md" radius="xl" className="min-h-[132px]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-black text-run-text">{review.author}</p>
                <p className="mt-1 text-xs font-bold text-run-muted">{review.date}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-run-lime/25 bg-run-lime/10 px-3 py-1 text-sm font-black text-run-lime">
                <Star size={14} fill="currentColor" />
                {review.rating}
              </span>
            </div>
            <p className="mt-4 break-keep text-sm font-semibold leading-6 text-run-muted">{review.content}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Button variant="secondary" className="w-full sm:w-auto">전체 리뷰 보기</Button>
      </div>
    </div>
  );
}
