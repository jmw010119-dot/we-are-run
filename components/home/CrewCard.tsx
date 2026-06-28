"use client";

import { CalendarDays, MapPin, Radio, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { RecommendedCrew } from "@/types";

type CrewCardProps = {
  crew: RecommendedCrew;
  index: number;
};

export function CrewCard({ crew, index }: CrewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
    >
      <Card variant="hover" padding="sm" radius="xl" className="group relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-run-lime/0 blur-3xl transition duration-200 group-hover:bg-run-lime/10" />

        <div className={["relative h-48 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br p-4", crew.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="absolute left-5 top-5 rounded-full border border-run-lime/25 bg-run-bg/76 px-3 py-1.5 text-xs font-black text-run-lime backdrop-blur-xl">{crew.area}</div>
          <div className="absolute bottom-4 left-4 flex -space-x-2">
            {[0, 1, 2, 3].map((avatar) => (
              <span key={avatar} className="grid h-9 w-9 place-items-center rounded-full border-2 border-run-card bg-run-lime text-xs font-black text-run-bg" style={{ opacity: 1 - avatar * 0.12 }}>{avatar + 1}</span>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 rounded-full border border-white/[0.08] bg-run-bg/76 px-3 py-1.5 text-xs font-black text-run-muted backdrop-blur-xl">
            {crew.flashRunAvailable ? "번개런 가능" : "정기런 중심"}
          </div>
        </div>

        <div className="relative pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-black text-run-text transition duration-200 group-hover:text-run-lime">{crew.name}</h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-run-muted"><MapPin size={15} />{crew.area}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-run-border bg-run-bg px-3 py-1.5 text-sm font-black text-run-lime"><Users size={15} />{crew.members}</span>
          </div>

          <div className="mt-5 grid gap-3 border-t border-run-border pt-4">
            <div className="flex flex-col gap-2 rounded-[16px] border border-run-border bg-run-bg px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-run-muted"><CalendarDays size={16} />정기런</span>
              <span className="text-sm font-black text-run-text">{crew.regularRun}</span>
            </div>
            <div className="flex flex-col gap-2 rounded-[16px] border border-run-border bg-run-bg px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-run-muted"><Radio size={16} />다음 일정</span>
              <span className="text-sm font-black text-run-text sm:text-right">{crew.nextRun}</span>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold text-run-muted">평균 페이스 {crew.pace}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {crew.tags.map((tag) => (
              <Badge key={tag} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">#{tag}</Badge>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
            <Button type="button" className="h-12 rounded-[16px] px-5 text-sm">가입하기</Button>
            <Button href={`/crews/${crew.id}`} variant="outline" className="h-12 rounded-[16px] bg-run-bg px-5 text-sm hover:bg-run-bg">상세보기</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
