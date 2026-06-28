import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Card } from "@/components/common/ui/Card";
import { trendingPosts } from "@/lib/mock";

export function TrendingPosts() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">TRENDING</p>
      <h2 className="mt-2 text-xl font-black text-run-text">인기 게시글</h2>
      <div className="mt-5 grid gap-4">
        {trendingPosts.map((post, index) => (
          <div key={post.id} className="grid gap-2 border-b border-run-border pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-run-lime">0{index + 1}</span>
              <Badge variant="info" className="px-2 py-0.5 text-[10px]">{post.category}</Badge>
            </div>
            <p className="break-keep text-sm font-black leading-5 text-run-text">{post.title}</p>
            <p className="flex items-center gap-3 text-xs font-bold text-run-muted">
              <span className="inline-flex items-center gap-1"><MessageCircle size={13} />{post.comments}</span>
              <span>{post.views} views</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
