import { Bookmark, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import { communityCategoryVariant } from "@/components/community/detail/communityDetailUtils";
import type { CommunityPostDetail } from "@/types";

type CommunityPostHeaderProps = { post: CommunityPostDetail };

export function CommunityPostHeader({ post }: CommunityPostHeaderProps) {
  return (
    <div className="rounded-[24px] border border-run-border bg-run-card/82 p-5 backdrop-blur-xl sm:rounded-[28px] md:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={communityCategoryVariant[post.category]} className="tracking-[0.04em]">
              {post.category}
            </Badge>
            <span className="rounded-full border border-run-border bg-run-bg/70 px-3 py-1 text-xs font-bold text-run-muted">
              {post.createdAt}
            </span>
          </div>

          <h1 className="mt-5 max-w-5xl break-keep text-3xl font-black leading-tight tracking-normal text-run-text sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex min-w-0 flex-wrap items-center gap-3 text-sm">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-sm font-black text-run-lime">
              {post.authorAvatarLabel}
            </span>
            <div className="min-w-0">
              <p className="break-keep font-black text-run-text">{post.authorName}</p>
              <p className="mt-1 break-keep text-xs font-bold text-run-muted">{post.authorRegion}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 self-start">
          <IconButton
            aria-label={post.isSaved ? "저장된 게시글" : "게시글 저장"}
            icon={<Bookmark size={18} fill={post.isSaved ? "currentColor" : "none"} />}
          />
          <IconButton aria-label="게시글 공유" icon={<Share2 size={18} />} />
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <StatChip label="조회수" value={post.views.toLocaleString("ko-KR")} icon={<Eye size={12} />} className="min-h-[76px] bg-run-bg/70" />
        <StatChip label="좋아요" value={post.likes.toLocaleString("ko-KR")} icon={<Heart size={12} />} accent className="min-h-[76px] bg-run-bg/70" />
        <StatChip label="댓글" value={post.comments.toLocaleString("ko-KR")} icon={<MessageCircle size={12} />} className="min-h-[76px] bg-run-bg/70" />
      </div>
    </div>
  );
}
