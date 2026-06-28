"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/common/ui/Card";
import type { QuickMenuItem } from "@/types";

type QuickMenuCardProps = {
  item: QuickMenuItem;
  index: number;
};

export function QuickMenuCard({ item, index }: QuickMenuCardProps) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.07 }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="block"
    >
      <Card padding="md" radius="lg" className="group relative min-h-[174px] overflow-hidden transition-colors duration-200 hover:bg-run-card-hover">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-run-lime/0 blur-3xl transition duration-200 group-hover:bg-run-lime/10" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-[16px] border border-run-border bg-run-bg text-run-muted transition duration-200 group-hover:border-run-lime/45 group-hover:text-run-lime">
            <Icon size={23} strokeWidth={2.2} />
          </span>
          <ArrowUpRight className="text-run-muted transition duration-200 group-hover:text-run-lime" size={20} strokeWidth={2.3} />
        </div>

        <div className="relative mt-8">
          <h3 className="text-xl font-black text-run-text transition duration-200 group-hover:text-run-lime">
            {item.label}
          </h3>
          <p className="mt-3 text-sm font-semibold leading-6 text-run-muted">
            {item.description}
          </p>
        </div>
      </Card>
    </motion.a>
  );
}
