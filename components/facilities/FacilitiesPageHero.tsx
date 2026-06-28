import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { SearchInput } from "@/components/common/ui/SearchInput";
import { Section } from "@/components/common/ui/Section";

type FacilitiesPageHeroProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function FacilitiesPageHero({ query, onQueryChange }: FacilitiesPageHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-16 md:pt-20">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-run-lime">RUNNING FACILITY</p>
          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-[0.98] tracking-normal text-run-text md:text-6xl lg:text-7xl">
            내 주변 러닝 시설을 찾아보세요
          </h1>
          <p className="mt-6 max-w-2xl break-keep text-base font-semibold leading-7 text-run-muted md:text-lg">
            트랙, 공원, 실내 러닝장, 육상경기장까지 러너에게 필요한 시설 정보를 확인하세요.
          </p>
        </div>
        <SearchInput
          aria-label="러닝 시설 검색"
          placeholder="지역, 시설명, 편의시설을 검색하세요"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          icon={<Building2 size={22} strokeWidth={2.2} />}
          buttonSlot={<Button rightIcon={<ArrowRight size={17} strokeWidth={2.5} />} className="h-12 rounded-[17px] px-6 text-sm sm:h-14">검색</Button>}
        />
      </div>
    </Section>
  );
}
