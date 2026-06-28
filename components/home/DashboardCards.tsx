"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Section } from "@/components/common/ui/Section";
import { DashboardCard } from "@/components/home/DashboardCard";
import { dashboardStats } from "@/lib/mock";

export function DashboardCards() {
  return (
    <Section spacing="md" className="z-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <SectionHeader
          label="RUNNING DASHBOARD"
          title="오늘의 러닝 현황"
          description="전국 코스, 크루, 정기런, 인증 피드를 실시간 플랫폼 지표처럼 한눈에 확인합니다."
          compact
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <DashboardCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </Section>
  );
}
