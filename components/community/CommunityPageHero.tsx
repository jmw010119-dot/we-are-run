import { PenLine, Search } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { SearchInput } from "@/components/common/ui/SearchInput";
import { Section } from "@/components/common/ui/Section";

type CommunityPageHeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function CommunityPageHero({ query, onQueryChange }: CommunityPageHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute left-[-14rem] top-10 h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-12rem] top-0 h-[34rem] w-[34rem] rounded-full bg-run-lime/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.11)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.55fr)] lg:items-end">
        <div className="min-w-0">
          <p className="text-xs font-black tracking-[0.24em] text-run-lime">RUNNING COMMUNITY</p>
          <h1 className="mt-5 max-w-5xl break-keep text-4xl font-black leading-[1.02] tracking-normal text-run-text sm:text-5xl md:text-6xl xl:text-7xl">
            오늘도 달리는 러너들의 이야기
          </h1>
          <p className="mt-5 max-w-3xl break-keep text-base font-semibold leading-7 text-run-muted md:text-lg">
            러닝 인증, 코스 후기, 장비 팁, 크루 모집까지 러너들의 이야기를 만나보세요.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchInput
              aria-label="커뮤니티 검색"
              placeholder="러닝 인증, 코스 후기, 장비 팁을 검색해보세요"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              icon={<Search size={22} strokeWidth={2.3} />}
              buttonSlot={
                <Button className="w-full sm:w-auto" leftIcon={<Search size={17} />}>
                  검색
                </Button>
              }
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-run-border bg-run-card/80 p-5 backdrop-blur-xl">
          <div className="absolute right-[-4rem] top-[-4rem] h-44 w-44 rounded-full bg-run-lime/14 blur-[70px]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(183,255,42,0.22),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(56,189,248,0.18),transparent_26%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.18em] text-run-lime">LIVE FEED</p>
                <h2 className="mt-2 break-keep text-2xl font-black text-run-text">러닝 인증이 올라오는 중</h2>
              </div>
              <Button size="sm" leftIcon={<PenLine size={15} />}>글쓰기</Button>
            </div>
            <div className="mt-6 grid gap-3">
              {["오운완 10K", "첫 하프 준비", "토요 롱런 모집"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-[18px] border border-white/[0.08] bg-run-bg/72 p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-sm font-black text-run-lime">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-run-text">{item}</p>
                    <p className="mt-1 text-xs font-bold text-run-muted">지금 커뮤니티에서 대화 중</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
