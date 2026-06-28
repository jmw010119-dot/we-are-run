import { Heart, Send } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import type { CommunityPostDetail } from "@/types";

type CommunityCommentsProps = { post: CommunityPostDetail };

export function CommunityComments({ post }: CommunityCommentsProps) {
  return (
    <div>
      <SectionHeader
        label="COMMENTS"
        title="러너들의 댓글"
        description="댓글 작성은 아직 저장되지 않는 UI 상태입니다."
        compact
        className="mb-5"
      />
      <Card variant="glass" padding="lg" radius="xl">
        <div className="grid gap-4">
          {post.commentsPreview.map((comment) => (
            <div key={comment.id} className="rounded-[20px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card/70">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-xs font-black text-run-lime">
                    {comment.authorAvatarLabel}
                  </span>
                  <div className="min-w-0">
                    <p className="break-keep text-sm font-black text-run-text">{comment.authorName}</p>
                    <p className="mt-1 text-xs font-bold text-run-muted">{comment.createdAt}</p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-run-border bg-run-card px-2.5 py-1 text-xs font-black text-run-muted">
                  <Heart size={13} />
                  {comment.likes}
                </span>
              </div>
              <p className="mt-4 break-keep text-sm font-semibold leading-6 text-run-muted">{comment.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[22px] border border-run-border bg-run-bg/70 p-3 sm:p-4">
          <p className="mb-3 text-xs font-black tracking-[0.16em] text-run-lime">WRITE COMMENT</p>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input aria-label="댓글 입력" placeholder="댓글을 남겨보세요" inputSize="lg" className="bg-run-card/80" />
            <Button leftIcon={<Send size={17} />} className="w-full sm:w-auto">
              댓글 작성
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
