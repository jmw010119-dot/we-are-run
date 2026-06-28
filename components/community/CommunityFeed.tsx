import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import type { CommunityPost } from "@/types";

type CommunityFeedProps = {
  posts: CommunityPost[];
  onReset?: () => void;
};

export function CommunityFeed({ posts, onReset }: CommunityFeedProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="조건에 맞는 게시글이 없습니다"
        description="검색어, 카테고리, 선택 태그를 조금 바꿔보세요. 모든 필터를 지우면 전체 커뮤니티 피드를 다시 볼 수 있습니다."
        icon={<SearchX size={24} />}
        actionLabel="필터 초기화"
        onAction={onReset}
      />
    );
  }

  return (
    <div className="grid gap-5">
      {posts.map((post) => (
        <CommunityPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
