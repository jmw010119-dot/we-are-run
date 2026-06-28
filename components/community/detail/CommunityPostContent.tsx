import { Activity, Timer } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { StatChip } from "@/components/common/ui/StatChip";
import type { CommunityPostDetail } from "@/types";

type CommunityPostContentProps = { post: CommunityPostDetail };

export function CommunityPostContent({ post }: CommunityPostContentProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className={["relative min-h-[300px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-gradient-to-br sm:rounded-[24px]", post.gradient].join(" ")}>
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute left-[-2rem] top-8 h-36 w-36 rounded-full bg-run-lime/14 blur-[54px]" />
        <div className="absolute right-[-3rem] top-0 h-40 w-40 rounded-full bg-sky-300/12 blur-[62px]" />
        <div className="absolute left-8 top-10 h-24 w-24 rounded-full border border-run-lime/30 bg-run-lime/10 shadow-[0_0_52px_rgba(183,255,42,0.22)]" />
        <div className="absolute left-[18%] top-[54%] h-[4px] w-[68%] -rotate-6 rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
        <div className="absolute left-[24%] top-[48%] h-4 w-4 rounded-full border border-run-lime/70 bg-run-bg shadow-[0_0_20px_rgba(183,255,42,0.42)]" />
        <div className="absolute right-[20%] top-[38%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_20px_rgba(125,211,252,0.55)]" />
        <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/[0.08] bg-run-bg/82 p-4 backdrop-blur-xl">
          <p className="flex items-center gap-2 text-xs font-black tracking-[0.18em] text-run-lime">
            <Activity size={14} />
            COMMUNITY MOMENT
          </p>
          <p className="mt-1 break-keep text-sm font-bold leading-6 text-run-muted">
            러닝 기록과 피드 이미지를 다크 그라디언트 mock으로 표현했습니다.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:gap-6">
        {post.fullContent.map((paragraph) => (
          <p key={paragraph} className="break-keep text-[15px] font-semibold leading-8 text-run-muted md:text-base md:leading-8">
            {paragraph}
          </p>
        ))}
      </div>

      {post.runningRecord ? (
        <div className="mt-7 rounded-[22px] border border-run-border bg-run-bg/70 p-4">
          <p className="mb-3 text-xs font-black tracking-[0.18em] text-run-lime">RUNNING RECORD</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatChip label="거리" value={post.runningRecord.distance} accent className="min-h-[82px] bg-run-card/80" />
            <StatChip label="시간" value={post.runningRecord.time} icon={<Timer size={12} />} className="min-h-[82px] bg-run-card/80" />
            <StatChip label="페이스" value={post.runningRecord.pace} accent className="min-h-[82px] bg-run-card/80" />
          </div>
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="max-w-full break-keep rounded-full border border-run-border bg-run-bg px-3 py-2 text-xs font-black text-run-muted">
            #{tag}
          </span>
        ))}
      </div>
    </Card>
  );
}
