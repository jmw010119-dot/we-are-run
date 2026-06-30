import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import { profileMyPosts } from "@/lib/mock";
import type { CommunityCategory, ProfileMyPost } from "@/types";

const categoryVariant: Record<CommunityCategory, "green" | "info" | "warning" | "success"> = {
  "러닝 인증": "green",
  자유게시판: "info",
  질문: "warning",
  정보공유: "success",
  후기: "info",
  크루모집: "green",
};

type ProfileMyPostsProps = {
  posts?: ProfileMyPost[];
};

export function ProfileMyPosts({ posts = profileMyPosts }: ProfileMyPostsProps) {
  if (posts.length === 0) {
    return <EmptyState title="작성한 글이 없습니다" description="커뮤니티에 러닝 인증과 이야기를 남기면 이곳에 표시됩니다." />;
  }

  return (
    <div className="min-w-0">
      <SectionHeader label="MY POSTS" title="작성한 글" description="내가 커뮤니티에 남긴 러닝 인증과 게시글입니다." compact className="mb-5" />
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} variant="hover" padding="lg" radius="xl" className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={categoryVariant[post.category]}>{post.category}</Badge>
                  <span className="rounded-full border border-run-border bg-run-bg px-3 py-1 text-xs font-bold text-run-muted">{post.createdAt}</span>
                </div>
                <h3 className="mt-4 break-keep text-xl font-black leading-snug text-run-text">{post.title}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-run-muted">
                  <span className="inline-flex items-center gap-1.5"><Heart size={15} />{post.likes}</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle size={15} />{post.comments}</span>
                </div>
              </div>
              <Button href={`/community/${post.id}`} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="w-full shrink-0 sm:w-auto">상세보기</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
