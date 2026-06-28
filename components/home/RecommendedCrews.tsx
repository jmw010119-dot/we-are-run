"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { CrewCard } from "@/components/home/CrewCard";
import { recommendedCrews } from "@/lib/mock";

export function RecommendedCrews() {
  return (
    <Section id="crews" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute right-[-12rem] top-16 h-[28rem] w-[28rem] rounded-full bg-run-lime/7 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeader
          label="추천 러닝 크루"
          title="함께 달릴 사람들을 만나보세요"
          description="지역별 정기런과 번개런을 운영하는 러닝 크루를 찾아보세요."
          actionText="크루 전체보기"
          actionHref="/crews"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendedCrews.map((crew, index) => (
          <CrewCard key={crew.id} crew={crew} index={index} />
        ))}
      </div>
    </Section>
  );
}
