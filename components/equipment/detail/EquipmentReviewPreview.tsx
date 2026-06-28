import { Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type EquipmentReviewPreviewProps = { item: EquipmentDetail };

export function EquipmentReviewPreview({ item }: EquipmentReviewPreviewProps) {
  return (
    <div>
      <SectionHeader
        label="RUNNER REVIEW"
        title="러너들의 장비 후기"
        description="실제 러너 관점에서 남긴 착용감, 활용도, 만족도 리뷰입니다."
        compact
        className="mb-5"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {item.reviews.map((review) => (
          <Card key={review.id} variant="hover" padding="lg" radius="xl" className="h-full">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-keep text-base font-black text-run-text">{review.author}</p>
                <p className="mt-1 text-xs font-bold text-run-muted">{review.date}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-run-lime/25 bg-run-lime/10 px-3 py-1 text-sm font-black text-run-lime">
                <Star size={14} fill="currentColor" />
                {review.rating}
              </span>
            </div>
            <p className="mt-5 break-keep text-sm font-semibold leading-6 text-run-muted">{review.content}</p>
          </Card>
        ))}
      </div>

      <Button variant="secondary" className="mt-5 w-full sm:w-auto">
        전체 리뷰 보기
      </Button>
    </div>
  );
}
