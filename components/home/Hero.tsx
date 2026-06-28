"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroCTA } from "@/components/home/HeroCTA";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroStats } from "@/components/home/HeroStats";
import { HeroVisual } from "@/components/home/HeroVisual";

const heroContent = {
  eyebrow: "대한민국 러닝 플랫폼",
  titleTop: "RUN YOUR WAY",
  titleMiddle: "WITH",
  titleAccent: "WE ARE RUN",
  description: ["코스부터 커뮤니티까지", "러너를 위한 모든 것", "대한민국 러닝 플랫폼"],
  primaryCta: "러닝 코스 찾기",
  secondaryCta: "크루 둘러보기",
  searchPlaceholder: "지역, 코스, 크루를 검색해보세요",
  searchButton: "검색",
};

const heroStats = [
  { label: "등록 코스", value: "428" },
  { label: "활동 크루", value: "1.2K" },
  { label: "인증 기록", value: "42K" },
];

export function Hero() {
  return (
    <section className="relative min-h-[680px] overflow-hidden border-b border-white/[0.05] md:min-h-[760px] lg:min-h-[900px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-[680px] w-full max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-7 md:min-h-[760px] md:py-20 lg:min-h-[900px] lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: "easeOut" }}
          className="max-w-[760px] pt-4 lg:pt-0"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-run-lime/25 bg-run-lime/10 px-4 py-2 text-xs font-black tracking-[0.18em] text-run-lime backdrop-blur-xl">
            <Activity size={15} />
            {heroContent.eyebrow}
          </div>

          <h1 className="text-[52px] font-black leading-[0.95] tracking-[-0.045em] text-run-text sm:text-[64px] md:text-[72px] lg:text-[82px] xl:text-[96px]">
            <span className="block">{heroContent.titleTop}</span>
            <span className="mt-2 block">{heroContent.titleMiddle}</span>
            <span className="mt-2 block text-run-lime drop-shadow-[0_0_34px_rgba(183,255,42,0.28)]">
              {heroContent.titleAccent}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg font-semibold leading-8 text-run-muted md:text-xl">
            {heroContent.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <HeroCTA primaryLabel={heroContent.primaryCta} secondaryLabel={heroContent.secondaryCta} />
          <HeroSearch placeholder={heroContent.searchPlaceholder} buttonLabel={heroContent.searchButton} />
          <HeroStats items={heroStats} />
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
