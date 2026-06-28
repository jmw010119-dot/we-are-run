"use client";

import { Bookmark, Clock3, MapPin, Route, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { IconButton } from "@/components/common/ui/IconButton";
import { StatChip } from "@/components/common/ui/StatChip";
import type { PopularCourse } from "@/types";

type PopularCourseCardProps = {
  course: PopularCourse;
  index: number;
};

export function PopularCourseCard({ course, index }: PopularCourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
    >
      <Card variant="hover" padding="sm" radius="xl" className="group relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-run-lime/0 blur-3xl transition duration-200 group-hover:bg-run-lime/10" />

        <div className={["relative h-44 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br p-4", course.gradient].join(" ")}>
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="absolute left-5 top-[54%] h-[3px] w-[72%] -rotate-[12deg] rounded-full bg-run-lime/70 shadow-[0_0_18px_rgba(183,255,42,0.45)]" />
          <div className="absolute left-[24%] top-[42%] h-3 w-3 rounded-full bg-run-lime shadow-[0_0_18px_rgba(183,255,42,0.8)]" />
          <div className="absolute right-[22%] top-[64%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.7)]" />
          <IconButton aria-label="코스 저장" icon={<Bookmark size={18} />} className="absolute right-4 top-4 border-white/[0.08] bg-run-bg/70 backdrop-blur-xl" />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-run-bg/75 px-3 py-2 text-xs font-black text-run-lime backdrop-blur-xl">
            <Route size={14} />
            ROUTE LINE
          </div>
        </div>

        <div className="relative pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-black text-run-text transition duration-200 group-hover:text-run-lime">{course.title}</h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-run-muted"><MapPin size={15} />{course.location}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-run-border bg-run-bg px-3 py-1.5 text-sm font-black text-run-lime"><Star size={14} fill="currentColor" />{course.rating}</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-run-border pt-4">
            <StatChip label="DIST" value={course.distance} className="border-0 bg-transparent p-0" />
            <StatChip label="LEVEL" value={course.difficulty} className="border-0 bg-transparent p-0" />
            <StatChip label="TIME" value={course.duration} icon={<Clock3 size={14} />} className="border-0 bg-transparent p-0" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="green" className="border-run-border bg-run-bg text-run-muted tracking-normal">#{tag}</Badge>
            ))}
          </div>

          <Button href={`/courses/${course.id}`} variant="secondary" size="sm" className="mt-5 w-full">상세보기</Button>
        </div>
      </Card>
    </motion.div>
  );
}
