import { CommunityGuide } from "@/components/community/CommunityGuide";
import { PopularRunners } from "@/components/community/PopularRunners";
import { PopularTags } from "@/components/community/PopularTags";
import { TrendingPosts } from "@/components/community/TrendingPosts";

type CommunitySidebarProps = {
  selectedTag: string;
  onTagClick: (tag: string) => void;
};

export function CommunitySidebar({ selectedTag, onTagClick }: CommunitySidebarProps) {
  return (
    <aside className="grid gap-5 lg:sticky lg:top-28">
      <PopularTags selectedTag={selectedTag} onTagClick={onTagClick} />
      <PopularRunners />
      <TrendingPosts />
      <CommunityGuide />
    </aside>
  );
}
