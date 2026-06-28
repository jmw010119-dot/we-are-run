import { Bookmark, ExternalLink, Share2, Star } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { IconButton } from "@/components/common/ui/IconButton";
import { Section } from "@/components/common/ui/Section";
import { StatChip } from "@/components/common/ui/StatChip";
import type { EquipmentDetail } from "@/types";

type EquipmentDetailHeroProps = { item: EquipmentDetail };

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function EquipmentDetailHero({ item }: EquipmentDetailHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute left-[-12rem] top-24 h-[26rem] w-[26rem] rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.56fr)] lg:items-end xl:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green">RUNNING EQUIPMENT</Badge>
            <Badge variant="info">{item.category}</Badge>
            <Badge variant="green">{item.level}</Badge>
          </div>

          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-[1.02] tracking-normal text-run-text sm:text-5xl md:text-6xl xl:text-7xl">
            {item.name}
          </h1>
          <p className="mt-5 break-keep text-base font-black text-run-lime md:text-lg">{item.brand}</p>
          <p className="mt-3 max-w-3xl break-keep text-sm font-semibold leading-6 text-run-muted md:text-base">
            {item.description}
          </p>

          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="가격" value={formatPrice(item.price)} accent className="min-h-[88px]" />
            <StatChip
              label="평점"
              value={String(item.rating)}
              icon={<Star size={13} fill="currentColor" />}
              accent
              className="min-h-[88px]"
            />
            <StatChip label="리뷰" value={`${item.reviewCount}개`} className="min-h-[88px]" />
            <StatChip label="추천 목적" value={item.purposes[0]} className="min-h-[88px]" />
          </div>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button className="w-full sm:w-auto" leftIcon={<ExternalLink size={17} />}>
              구매 링크 보기
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="secondary"
              leftIcon={<Bookmark size={17} fill={item.isSaved ? "currentColor" : "none"} />}
            >
              장비 저장
            </Button>
            <Button className="w-full sm:w-auto" variant="outline" leftIcon={<Share2 size={17} />}>
              공유하기
            </Button>
          </div>
        </div>

        <div
          className={[
            "relative min-h-[380px] overflow-hidden rounded-[24px] border border-run-border bg-gradient-to-br p-5 sm:min-h-[430px] sm:rounded-[28px]",
            item.gradient,
          ].join(" ")}
        >
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute inset-x-6 top-10 h-40 rounded-full bg-run-lime/15 blur-[70px]" />
          <div className="absolute left-[8%] top-[56%] h-[4px] w-[84%] -rotate-[13deg] rounded-full bg-run-lime/75 shadow-[0_0_28px_rgba(183,255,42,0.45)]" />
          <div className="absolute left-[18%] top-[30%] h-44 w-[64%] rotate-[-10deg] rounded-[44px] border border-white/15 bg-run-bg/45 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-md" />
          <div className="absolute left-[28%] top-[38%] h-16 w-[42%] rotate-[-10deg] rounded-full border border-run-lime/30 bg-run-lime/10 shadow-[0_0_42px_rgba(183,255,42,0.26)]" />
          <div className="absolute left-[22%] top-[61%] h-5 w-5 rounded-full border border-run-lime/50 bg-run-bg shadow-[0_0_24px_rgba(183,255,42,0.34)]" />
          <div className="absolute right-[20%] top-[24%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.55)]" />

          <div className="absolute right-5 top-5 flex gap-2">
            <IconButton
              aria-label="장비 저장"
              icon={<Bookmark size={18} fill={item.isSaved ? "currentColor" : "none"} />}
            />
            <IconButton aria-label="장비 공유" icon={<Share2 size={18} />} />
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/[0.08] bg-run-bg/84 p-5 backdrop-blur-xl">
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">PRODUCT MOCK</p>
            <p className="mt-2 break-keep text-2xl font-black text-run-text">
              {item.category} · {item.level}
            </p>
            <p className="mt-2 break-keep text-sm font-semibold leading-6 text-run-muted">
              실제 구매 연동 없이 추천 정보와 비교용 UI만 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
