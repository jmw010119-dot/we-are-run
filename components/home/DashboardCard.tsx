"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/common/ui/Card";
import type { DashboardStat } from "@/types";

type DashboardCardProps = {
  stat: DashboardStat;
  index: number;
};

export function DashboardCard({ stat, index }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
    >
      <Card
        variant="hover"
        padding="lg"
        radius="lg"
        className="group relative overflow-hidden backdrop-blur-xl hover:-translate-y-[3px]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-run-lime/10 blur-3xl transition duration-200 group-hover:bg-run-lime/16" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),transparent_42%)]" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] text-run-lime">{stat.accent}</p>
            <h3 className="mt-3 text-xl font-black text-run-text">{stat.title}</h3>
          </div>
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-run-lime shadow-[0_0_18px_rgba(183,255,42,0.8)]" />
        </div>

        <div className="relative mt-7 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-run-border pt-5">
          <div>
            <p className="text-sm font-bold text-run-muted">{stat.primaryLabel}</p>
            <p className="mt-2 text-4xl font-black leading-none tracking-normal text-run-text md:text-[42px]">
              {stat.primaryValue}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-run-muted">{stat.secondaryLabel}</p>
            <p className="mt-2 text-2xl font-black leading-none text-run-lime">{stat.secondaryValue}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
