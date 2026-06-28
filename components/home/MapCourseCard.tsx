"use client";

import { Bookmark, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { MapPreviewCourse } from "@/types";

type MapCourseCardProps = {
  course: MapPreviewCourse;
  index: number;
};

export function MapCourseCard({ course, index }: MapCourseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="group rounded-[20px] border border-run-border bg-run-card p-4 transition duration-200 hover:-translate-y-[3px] hover:border-run-lime/45 hover:bg-run-card-hover"
    >
      <div className="flex gap-4">
        <div
          className={[
            "relative h-24 w-24 shrink-0 overflow-hidden rounded-[18px] border border-white/[0.06] bg-gradient-to-br",
            course.gradient,
          ].join(" ")}
        >
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <span className="absolute left-3 top-3 rounded-full bg-run-bg/80 px-2 py-1 text-xs font-black text-run-lime">
            TOP {course.rank}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-black text-run-text group-hover:text-run-lime">{course.title}</h3>
              <p className="mt-1 text-sm font-semibold text-run-muted">{course.location}</p>
            </div>
            <button
              type="button"
              aria-label={`${course.title} 저장`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.07] text-run-muted transition duration-200 hover:border-run-lime/45 hover:text-run-lime"
            >
              <Bookmark size={17} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black">
            <span className="rounded-full border border-run-border bg-run-bg px-3 py-1 text-run-text">{course.distance}</span>
            <span className="rounded-full border border-run-border bg-run-bg px-3 py-1 text-run-muted">{course.difficulty}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-run-border bg-run-bg px-3 py-1 text-run-lime">
              <Star size={13} fill="currentColor" />
              {course.rating}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
