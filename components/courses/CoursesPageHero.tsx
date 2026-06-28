import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { SearchInput } from "@/components/common/ui/SearchInput";
import { Section } from "@/components/common/ui/Section";

type CoursesPageHeroProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function CoursesPageHero({ query, onQueryChange }: CoursesPageHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-16 md:pt-20">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[32rem] w-[32rem] rounded-full bg-run-lime/10 blur-[120px]" />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-run-lime">RUNNING COURSE</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-run-text md:text-6xl lg:text-7xl">전국 러닝 코스를 한눈에</h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-run-muted md:text-lg">지역, 거리, 난이도, 유형별로 나에게 맞는 러닝 루트를 찾아보세요.</p>
        </div>
        <SearchInput
          aria-label="러닝 코스 검색"
          placeholder="지역, 코스명, 태그를 검색하세요"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          buttonSlot={<Button rightIcon={<ArrowRight size={17} strokeWidth={2.5} />} className="h-12 rounded-[17px] px-6 text-sm sm:h-14">검색</Button>}
        />
      </div>
    </Section>
  );
}
