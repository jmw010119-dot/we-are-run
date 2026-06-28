"use client";

import { Bookmark, Heart, MessageCircle, MoreHorizontal, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { RunningFeedItem } from "@/types";

type RunningFeedCardProps = {
  item: RunningFeedItem;
  index: number;
};

export function RunningFeedCard({ item, index }: RunningFeedCardProps) {
  const stats = [
    { label: "거리", value: item.distance },
    { label: "시간", value: item.duration },
    { label: "페이스", value: item.pace },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
    >
      <Card variant="hover" padding="sm" radius="xl" className="group relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-run-lime text-sm font-black text-run-bg">{item.avatarLabel}</div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-black text-run-text">{item.author}</h3>
              <p className="truncate text-sm font-semibold text-run-muted">{item.area} · {item.uploadedAt}</p>
            </div>
          </div>
          <IconButton aria-label="피드 더보기" variant="ghost" size="sm" icon={<MoreHorizontal size={20} />} />
        </div>

        <div className={["relative h-56 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br p-4", item.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="absolute left-6 top-[58%] h-[3px] w-[70%] -rotate-[10deg] rounded-full bg-run-lime/70 shadow-[0_0_18px_rgba(183,255,42,0.45)]" />
          <div className="absolute left-[28%] top-[46%] h-3 w-3 rounded-full bg-run-lime shadow-[0_0_18px_rgba(183,255,42,0.8)]" />
          <div className="absolute right-[20%] top-[64%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.7)]" />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-run-bg/78 px-3 py-2 text-xs font-black text-run-lime backdrop-blur-xl">
            <Timer size={14} />
            RUN VERIFIED
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <StatChip key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <p className="mt-4 min-h-[56px] text-sm font-semibold leading-7 text-run-muted">{item.message}</p>

        <div className="mt-5 flex items-center justify-between border-t border-run-border pt-4">
          <div className="flex items-center gap-4 text-sm font-bold text-run-muted">
            <button type="button" aria-label="좋아요" className="inline-flex items-center gap-2 transition duration-200 hover:text-run-lime"><Heart size={18} />{item.likes}</button>
            <button type="button" aria-label="댓글 보기" className="inline-flex items-center gap-2 transition duration-200 hover:text-run-lime"><MessageCircle size={18} />{item.comments}</button>
          </div>
          <IconButton aria-label="피드 저장" size="sm" icon={<Bookmark size={18} />} className="h-10 w-10 rounded-full" />
        </div>

        <Button href={`/community/${item.id}`} variant="secondary" size="sm" className="mt-5 w-full">상세보기</Button>
      </Card>
    </motion.div>
  );
}
