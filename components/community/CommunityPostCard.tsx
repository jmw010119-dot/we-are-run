import { ArrowUpRight, Bookmark, Eye, Heart, MessageCircle, Timer } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CommunityCategory, CommunityPost } from "@/types";

type CommunityPostCardProps = { post: CommunityPost };

const categoryVariant: Record<CommunityCategory, "green" | "info" | "warning" | "success"> = {
  "러닝 인증": "green",
  자유게시판: "info",
  질문: "warning",
  정보공유: "success",
  후기: "info",
  크루모집: "green",
};

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <Card variant="hover" padding="lg" radius="xl" className="overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-sm font-black text-run-lime">
            {post.authorAvatarLabel}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={categoryVariant[post.category]}>{post.category}</Badge>
              <span className="text-xs font-bold text-run-muted">{post.createdAt}</span>
            </div>
            <p className="mt-2 break-keep text-sm font-black text-run-text">{post.authorName}</p>
            <p className="mt-0.5 text-xs font-bold text-run-muted">{post.authorRegion}</p>
          </div>
        </div>
        <IconButton
          aria-label={post.isSaved ? "저장된 게시글" : "게시글 저장"}
          icon={<Bookmark size={18} fill={post.isSaved ? "currentColor" : "none"} />}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-stretch">
        <div className="min-w-0">
          <h2 className="break-keep text-2xl font-black leading-snug text-run-text">{post.title}</h2>
          <p className="mt-3 break-keep text-sm font-semibold leading-6 text-run-muted">{post.content}</p>

          {post.runningRecord ? (
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <StatChip label="거리" value={post.runningRecord.distance} accent />
              <StatChip label="시간" value={post.runningRecord.time} icon={<Timer size={12} />} />
              <StatChip label="페이스" value={post.runningRecord.pace} accent />
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-run-border bg-run-bg px-3 py-1 text-xs font-bold text-run-muted">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className={["relative min-h-[190px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-gradient-to-br", post.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] bg-[size:26px_26px]" />
          <div className="absolute left-6 top-7 h-16 w-16 rounded-full border border-run-lime/30 bg-run-lime/10 blur-[1px]" />
          <div className="absolute bottom-7 left-6 right-6 h-[3px] -rotate-6 rounded-full bg-run-lime/70 shadow-[0_0_22px_rgba(183,255,42,0.4)]" />
          <div className="absolute bottom-4 left-4 right-4 rounded-[16px] border border-white/[0.08] bg-run-bg/78 p-3 backdrop-blur-xl">
            <p className="text-xs font-black tracking-[0.16em] text-run-lime">COMMUNITY MOMENT</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-run-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-run-muted">
          <span className="inline-flex items-center gap-1.5"><Heart size={16} />{post.likes}</span>
          <span className="inline-flex items-center gap-1.5"><MessageCircle size={16} />{post.comments}</span>
          <span className="inline-flex items-center gap-1.5"><Eye size={16} />{post.views}</span>
        </div>
        <Button href={`/community/${post.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="w-full sm:w-auto">
          상세보기
        </Button>
      </div>
    </Card>
  );
}

