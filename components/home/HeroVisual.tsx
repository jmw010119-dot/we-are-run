"use client";

import { motion } from "framer-motion";
import { Activity, MapPin, Route, ShieldCheck, Users, Zap } from "lucide-react";

const routePoints = [
  { label: "SEOUL", top: "28%", left: "26%" },
  { label: "DAEJEON", top: "54%", left: "46%" },
  { label: "BUSAN", top: "72%", left: "68%" },
];

const runningMetrics = [
  { label: "DIST", value: "8.42 km" },
  { label: "PACE", value: "5분32초" },
  { label: "GAIN", value: "124 m" },
];

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto h-[520px] w-full max-w-[650px] md:h-[600px] lg:mx-0"
    >
      <div className="absolute inset-8 rounded-full bg-run-lime/10 blur-[80px]" />

      <div className="absolute left-0 top-10 w-[78%] overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#10161B]/72 p-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-run-muted">LIVE MAP</p>
            <h3 className="mt-2 text-2xl font-black text-run-text">오늘의 추천 루트</h3>
          </div>
          <span className="rounded-full bg-run-lime px-3 py-1 text-xs font-black text-run-bg">ACTIVE</span>
        </div>

        <div className="relative mt-5 h-[260px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#070B0E]">
          <div className="absolute inset-0 opacity-[0.23] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:38px_38px]" />
          <div className="absolute left-[18%] top-[64%] h-[3px] w-[64%] -rotate-[18deg] rounded-full bg-run-lime shadow-[0_0_22px_rgba(183,255,42,0.72)]" />
          <div className="absolute left-[35%] top-[47%] h-[3px] w-[40%] rotate-[26deg] rounded-full bg-run-lime/75" />
          {routePoints.map((point) => (
            <div key={point.label} className="absolute" style={{ top: point.top, left: point.left }}>
              <span className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-run-bg bg-run-lime shadow-[0_0_20px_rgba(183,255,42,0.9)]" />
              <span className="ml-3 rounded-full border border-run-lime/25 bg-run-bg/80 px-2 py-1 text-[10px] font-black tracking-[0.12em] text-run-lime">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 w-[250px] rounded-[26px] border border-white/[0.08] bg-white/[0.045] p-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black tracking-[0.2em] text-run-muted">RUNNING</p>
          <Activity className="text-run-lime" size={22} />
        </div>
        <p className="mt-4 text-4xl font-black text-run-text">42,810</p>
        <p className="mt-1 text-sm font-bold text-run-muted">오늘 인증한 러너</p>
      </div>

      <div className="absolute bottom-20 right-4 w-[300px] rounded-[28px] border border-white/[0.08] bg-[#10161B]/86 p-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-run-muted">CREW MATCH</p>
            <h3 className="mt-2 text-xl font-black text-run-text">서울 나이트 러너스</h3>
          </div>
          <Users className="text-run-lime" size={24} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {runningMetrics.map((metric) => (
            <div key={metric.label} className="rounded-[16px] border border-white/[0.06] bg-run-bg/70 p-3">
              <p className="text-[10px] font-black tracking-[0.16em] text-run-muted">{metric.label}</p>
              <p className="mt-1 text-sm font-black text-run-text">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-10 w-[260px] rounded-[26px] border border-run-lime/25 bg-run-lime p-5 text-run-bg">
        <div className="flex items-center justify-between">
          <ShieldCheck size={25} />
          <Zap size={20} />
        </div>
        <p className="mt-5 text-sm font-black">검증된 코스 데이터</p>
        <p className="mt-1 text-3xl font-black">1,284+</p>
      </div>

      <div className="absolute left-3 top-[390px] hidden rounded-[22px] border border-white/[0.08] bg-[#10161B]/82 px-5 py-4 backdrop-blur-2xl sm:flex sm:items-center sm:gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-run-lime text-run-bg">
          <Route size={20} />
        </span>
        <div>
          <p className="text-sm font-black text-run-text">잠실 루프</p>
          <p className="text-xs font-bold text-run-muted">8.4km · 평지 · 야경</p>
        </div>
      </div>

      <MapPin className="absolute right-16 top-[360px] text-run-lime drop-shadow-[0_0_18px_rgba(183,255,42,0.8)]" size={34} />
    </motion.div>
  );
}
