import { Chip } from "@/components/common/ui/Chip";
import { Section } from "@/components/common/ui/Section";

export type ProfileTab = "활동 요약" | "저장한 코스" | "저장한 시설" | "가입한 크루" | "관심 장비" | "작성한 글";

export const profileTabs: ProfileTab[] = ["활동 요약", "저장한 코스", "저장한 시설", "가입한 크루", "관심 장비", "작성한 글"];

type ProfileTabsProps = {
  activeTab: ProfileTab;
  counts: Record<ProfileTab, number>;
  onTabChange: (tab: ProfileTab) => void;
};

export function ProfileTabs({ activeTab, counts, onTabChange }: ProfileTabsProps) {
  return (
    <Section spacing="sm" className="py-5 md:py-7" containerClassName="max-w-[1320px]">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {profileTabs.map((tab) => {
          const selected = tab === activeTab;

          return (
            <Chip key={tab} selected={selected} onClick={() => onTabChange(tab)} className="h-11 shrink-0 gap-2 px-4">
              <span>{tab}</span>
              <span className={['grid min-w-6 place-items-center rounded-full px-2 py-0.5 text-[11px] font-black', selected ? 'bg-run-bg/18 text-run-bg' : 'bg-run-bg text-run-muted'].join(' ')}>
                {counts[tab]}
              </span>
            </Chip>
          );
        })}
      </div>
    </Section>
  );
}
