"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { RunningFeedCard } from "@/components/home/RunningFeedCard";
import { runningFeedItems } from "@/lib/mock";

export function RunningFeed() {
  return (
    <Section id="community" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute left-[-12rem] top-16 h-[28rem] w-[28rem] rounded-full bg-run-lime/7 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeader
          label="러닝 인증"
          title="오늘도 달리는 러너들"
          description="거리, 페이스, 사진과 함께 오늘의 러닝을 인증해보세요."
          actionText="인증 피드 보기"
          actionHref="/community"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {runningFeedItems.map((item, index) => (
          <RunningFeedCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
