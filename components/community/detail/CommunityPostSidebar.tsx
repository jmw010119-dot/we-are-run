import { AuthorCard } from "@/components/community/detail/AuthorCard";
import { CommunityGuide } from "@/components/community/CommunityGuide";
import { Card } from "@/components/common/ui/Card";
import { popularTags } from "@/lib/mock";
import type { CommunityPostDetail } from "@/types";

type CommunityPostSidebarProps = { post: CommunityPostDetail };

export function CommunityPostSidebar({ post }: CommunityPostSidebarProps) {
  return (
    <aside className="grid min-w-0 gap-5 lg:sticky lg:top-28">
      <AuthorCard post={post} />
      <Card variant="glass" padding="lg" radius="xl">
        <p className="text-xs font-black tracking-[0.18em] text-run-lime">POPULAR TAGS</p>
        <h2 className="mt-2 text-xl font-black text-run-text">인기 태그</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <span key={tag} className="max-w-full break-keep rounded-full border border-run-border bg-run-bg px-3 py-2 text-xs font-black text-run-muted transition duration-200 hover:border-run-lime/50 hover:text-run-lime">
              {tag}
            </span>
          ))}
        </div>
      </Card>
      <CommunityGuide />
    </aside>
  );
}
