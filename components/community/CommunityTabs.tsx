import { Chip } from "@/components/common/ui/Chip";
import { Section } from "@/components/common/ui/Section";
import type { CommunityCategory } from "@/types";

export type CommunityCategoryFilter = "전체" | CommunityCategory;

const categories: CommunityCategoryFilter[] = ["전체", "러닝 인증", "자유게시판", "질문", "정보공유", "후기", "크루모집"];

type CommunityTabsProps = {
  activeCategory: CommunityCategoryFilter;
  onCategoryChange: (category: CommunityCategoryFilter) => void;
};

export function CommunityTabs({ activeCategory, onCategoryChange }: CommunityTabsProps) {
  return (
    <Section spacing="sm" className="py-6 md:py-8" containerClassName="max-w-[1320px]">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <Chip
            key={category}
            selected={category === activeCategory}
            onClick={() => onCategoryChange(category)}
            className="shrink-0"
          >
            {category}
          </Chip>
        ))}
      </div>
    </Section>
  );
}
