import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { communityCategoryVariant } from "@/components/community/detail/communityDetailUtils";
import { communityPosts } from "@/lib/mock";
import type { CommunityPostDetail } from "@/types";

type CommunityRelatedPostsProps = { post: CommunityPostDetail };

export function CommunityRelatedPosts({ post }: CommunityRelatedPostsProps) {
  const relatedPosts = post.relatedPostIds
    .map((id) => communityPosts.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <div>
      <SectionHeader
        label="RELATED"
        title="함께 보면 좋은 게시글"
        description="같은 카테고리 또는 태그를 기준으로 고른 관련 게시글입니다."
        compact
        className="mb-5"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {relatedPosts.map((item) => item ? (
          <Card key={item.id} variant="hover" padding="lg" radius="xl" className="flex h-full min-w-0 flex-col">
            <div className="flex items-center justify-between gap-3">
              <Badge variant={communityCategoryVariant[item.category]} className="shrink-0 tracking-[0.04em]">{item.category}</Badge>
            </div>
            <h3 className="mt-4 min-w-0 break-keep text-lg font-black leading-snug text-run-text">{item.title}</h3>
            <div className="mt-4 flex flex-wrap gap-4 border-t border-run-border pt-4 text-xs font-bold text-run-muted">
              <span className="inline-flex items-center gap-1"><Heart size={13} />{item.likes}</span>
              <span className="inline-flex items-center gap-1"><MessageCircle size={13} />{item.comments}</span>
            </div>
            <Button href={`/community/${item.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-5 w-full">
              상세보기
            </Button>
          </Card>
        ) : null)}
      </div>
    </div>
  );
}
