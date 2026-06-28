"use client";

import { motion } from "framer-motion";
import type { MapPinItem } from "@/types";

type MapPinProps = {
  pin: MapPinItem;
};

export function MapPin({ pin }: MapPinProps) {
  const isGreen = pin.tone === "green";
  const pinColor = isGreen ? "bg-run-lime" : "bg-sky-400";
  const textColor = isGreen ? "text-run-lime" : "text-sky-300";
  const borderColor = isGreen ? "border-run-lime/30" : "border-sky-400/30";

  return (
    <motion.div
      className="absolute"
      style={{ top: pin.top, left: pin.left }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <span className={[
        "absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-run-bg shadow-[0_0_22px_rgba(183,255,42,0.55)]",
        pinColor,
      ].join(" ")}
      />
      <motion.span
        className={[
          "absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-60",
          borderColor,
        ].join(" ")}
        animate={{ scale: [1, 1.55, 1], opacity: [0.42, 0.08, 0.42] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className={[
        "ml-4 whitespace-nowrap rounded-full border bg-run-bg/86 px-3 py-1 text-[11px] font-black backdrop-blur-md",
        borderColor,
        textColor,
      ].join(" ")}
      >
        {pin.city}
      </span>
    </motion.div>
  );
}
