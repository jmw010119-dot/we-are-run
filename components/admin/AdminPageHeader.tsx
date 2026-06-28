import { RefreshCw, SquarePen } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Section } from "@/components/common/ui/Section";

export function AdminPageHeader() {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[34rem] w-[34rem] rounded-full bg-run-lime/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-[-12rem] top-24 h-[28rem] w-[28rem] rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="relative grid gap-6 overflow-hidden rounded-[26px] border border-run-border bg-run-card/80 p-5 backdrop-blur-xl sm:rounded-[28px] md:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="pointer-events-none absolute bottom-8 left-[20%] h-[3px] w-[58%] -rotate-2 rounded-full bg-run-lime/45 shadow-[0_0_24px_rgba(183,255,42,0.34)]" />
        <div className="relative min-w-0">
          <p className="text-xs font-black tracking-[0.24em] text-run-lime">ADMIN DASHBOARD</p>
          <h1 className="mt-4 max-w-5xl break-keep text-4xl font-black leading-tight tracking-normal text-run-text md:text-6xl">WE ARE RUN 운영 대시보드</h1>
          <p className="mt-4 max-w-3xl break-keep text-sm font-semibold leading-6 text-run-muted md:text-base md:leading-7">
            코스, 시설, 크루, 장비, 커뮤니티 운영 현황을 확인하고 관리하세요.
          </p>
        </div>
        <div className="relative grid gap-3 sm:flex lg:shrink-0">
          <Button leftIcon={<SquarePen size={17} />} className="w-full sm:w-auto">새 공지 작성</Button>
          <Button variant="secondary" leftIcon={<RefreshCw size={17} />} className="w-full sm:w-auto">데이터 새로고침</Button>
        </div>
      </div>
    </Section>
  );
}
