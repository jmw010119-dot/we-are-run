import { UserRound } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CommunityPostDetail } from "@/types";

type AuthorCardProps = { post: CommunityPostDetail };

export function AuthorCard({ post }: AuthorCardProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-run-lime/10 blur-[46px]" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-lg font-black text-run-lime">
            {post.authorAvatarLabel}
          </span>
          <div className="min-w-0">
            <p className="break-keep text-base font-black text-run-text">{post.authorName}</p>
            <p className="mt-1 break-keep text-xs font-bold text-run-muted">{post.authorRegion}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        <StatChip label="게시글" value={`${post.authorStats.posts}개`} icon={<UserRound size={12} />} className="bg-run-bg/70" />
        <StatChip label="누적 거리" value={post.authorStats.totalDistance} accent className="bg-run-bg/70" />
        <StatChip label="팔로워" value={post.authorStats.followers} className="bg-run-bg/70" />
      </div>
      <Button variant="secondary" className="mt-5 w-full">작성자 보기</Button>
    </Card>
  );
}
