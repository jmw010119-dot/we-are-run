"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { QuickMenuCard } from "@/components/home/QuickMenuCard";
import { quickMenus } from "@/lib/mock";

export function QuickMenu() {
  return (
    <Section spacing="md">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <SectionHeader
          label="QUICK ACCESS"
          title="러닝을 바로 시작하세요"
          description="코스, 시설, 크루, 장비, 인증까지 가장 많이 쓰는 기능을 빠르게 이동합니다."
          compact
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {quickMenus.map((item, index) => (
          <QuickMenuCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
