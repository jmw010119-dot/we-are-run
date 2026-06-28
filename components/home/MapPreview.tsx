"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { MapCourseList } from "@/components/home/MapCourseList";
import { MapMock } from "@/components/home/MapMock";

export function MapPreview() {
  return (
    <Section spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-12rem] top-12 h-[28rem] w-[28rem] rounded-full bg-run-lime/8 blur-[110px]" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeader
          label="전국 러닝 코스 MAP"
          title="러너들이 찾는 오늘의 코스"
          description="거리, 난이도, 지역별로 나에게 맞는 러닝 루트를 찾아보세요."
          actionText="전체 지도 보기"
          actionHref="/courses"
        />
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <MapMock />
        <MapCourseList />
      </div>
    </Section>
  );
}
