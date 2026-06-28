"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { PopularCourseCard } from "@/components/home/PopularCourseCard";
import { popularCourses } from "@/lib/mock";

export function PopularCourses() {
  return (
    <Section id="courses" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-[28rem] w-[28rem] rounded-full bg-run-lime/7 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeader
          label="인기 러닝 코스"
          title="러너들이 많이 찾는 코스"
          description="거리, 풍경, 난이도, 평점을 기준으로 추천되는 인기 코스입니다."
          actionText="코스 전체보기"
          actionHref="/courses"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {popularCourses.map((course, index) => (
          <PopularCourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </Section>
  );
}
