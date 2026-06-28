import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CommunityPostDetail } from "@/types";

type CommunityActionBarProps = { post: CommunityPostDetail };

export function CommunityActionBar({ post }: CommunityActionBarProps) {
  return (
    <Card variant="glass" padding="md" radius="xl" className="sticky top-[88px] z-10 bg-run-card/92 lg:static lg:bg-run-card/80">
      <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
        <Button variant="secondary" leftIcon={<Heart size={17} />} className="min-h-12 w-full px-3">
          좋아요 {post.likes}
        </Button>
        <Button variant="secondary" leftIcon={<MessageCircle size={17} />} className="min-h-12 w-full px-3">
          댓글 {post.comments}
        </Button>
        <Button variant="secondary" leftIcon={<Bookmark size={17} fill={post.isSaved ? "currentColor" : "none"} />} className="min-h-12 w-full px-3">
          저장
        </Button>
        <Button variant="outline" leftIcon={<Share2 size={17} />} className="min-h-12 w-full px-3">
          공유
        </Button>
      </div>
    </Card>
  );
}
