"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { MapPin } from "@/components/home/MapPin";
import { mapPins } from "@/lib/mock";

export function MapMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-run-border bg-run-card p-4 md:min-h-[620px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(183,255,42,0.13),transparent_20rem),radial-gradient(circle_at_78%_58%,rgba(56,189,248,0.12),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-8 rounded-[42%_58%_48%_52%] border border-white/[0.06] bg-run-bg/70" />
      <div className="absolute left-[18%] top-[34%] h-[2px] w-[54%] rotate-[13deg] rounded-full bg-run-lime/55 shadow-[0_0_20px_rgba(183,255,42,0.38)]" />
      <div className="absolute left-[36%] top-[58%] h-[2px] w-[34%] -rotate-[34deg] rounded-full bg-sky-400/45" />
      <div className="absolute left-[24%] top-[75%] h-[2px] w-[42%] rotate-[9deg] rounded-full bg-run-lime/35" />

      {mapPins.map((pin) => (
        <MapPin key={pin.id} pin={pin} />
      ))}

      <div className="absolute left-5 top-5 rounded-full border border-run-lime/25 bg-run-lime/10 px-4 py-2 text-xs font-black tracking-[0.16em] text-run-lime backdrop-blur-xl">
        RUNNING MAP PREVIEW
      </div>

      <div className="absolute bottom-5 left-5 max-w-[calc(100%-112px)] rounded-[18px] border border-white/[0.08] bg-run-bg/82 px-4 py-3 backdrop-blur-xl">
        <p className="text-xs font-black tracking-[0.18em] text-run-lime">LIVE COURSE DATA</p>
        <p className="mt-1 break-keep text-sm font-bold text-run-muted">전국 러닝 루트 업데이트 중</p>
      </div>

      <div className="absolute bottom-5 right-5 overflow-hidden rounded-[16px] border border-white/[0.08] bg-run-bg/82 backdrop-blur-xl">
        {[Plus, Minus].map((Icon, index) => (
          <button
            key={index}
            type="button"
            aria-label={index === 0 ? "지도 확대" : "지도 축소"}
            className="grid h-11 w-11 place-items-center text-run-muted transition duration-200 hover:bg-run-lime hover:text-run-bg"
          >
            <Icon size={18} strokeWidth={2.5} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
