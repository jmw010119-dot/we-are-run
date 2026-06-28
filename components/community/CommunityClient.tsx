"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunityPageHero } from "@/components/community/CommunityPageHero";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { CommunitySummary } from "@/components/community/CommunitySummary";
import { CommunityTabs, type CommunityCategoryFilter } from "@/components/community/CommunityTabs";
import { Button } from "@/components/common/ui/Button";
import { Section } from "@/components/common/ui/Section";
import { communityPosts } from "@/lib/mock";
import type { CommunityPost } from "@/types";

function normalizeText(value: string) {
  return value.toLowerCase().replace(/^#/, "").replace(/\s/g, "");
}

function getSearchFields(post: CommunityPost) {
  return [
    post.title,
    post.content,
    post.authorName,
    post.authorRegion,
    post.category,
    ...post.tags,
    post.runningRecord?.distance,
    post.runningRecord?.time,
    post.runningRecord?.pace,
  ]
    .filter(Boolean)
    .join(" ");
}

function matchesSelectedTag(post: CommunityPost, selectedTag: string) {
  if (!selectedTag) {
    return true;
  }

  const selected = normalizeText(selectedTag);

  return post.tags.some((tag) => {
    const postTag = normalizeText(tag);
    return postTag.includes(selected) || selected.includes(postTag);
  });
}

export function CommunityClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CommunityCategoryFilter>("전체");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());

    return communityPosts.filter((post) => {
      const matchesCategory = activeCategory === "전체" || post.category === activeCategory;
      const matchesQuery = normalizedQuery.length === 0 || normalizeText(getSearchFields(post)).includes(normalizedQuery);

      return matchesCategory && matchesQuery && matchesSelectedTag(post, selectedTag);
    });
  }, [activeCategory, query, selectedTag]);

  const hasActiveFilter = query.trim().length > 0 || activeCategory !== "전체" || selectedTag.length > 0;

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("전체");
    setSelectedTag("");
  };

  const toggleTag = (tag: string) => {
    setSelectedTag((current) => (current === tag ? "" : tag));
  };

  return (
    <>
      <CommunityPageHero query={query} onQueryChange={setQuery} />
      <CommunitySummary />
      <CommunityTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <Section spacing="lg" className="border-b-0 pt-4 md:pt-6" containerClassName="max-w-[1320px]">
        <div className="mb-5 flex flex-col gap-3 rounded-[22px] border border-run-border bg-run-card/70 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">COMMUNITY RESULTS</p>
            <p className="mt-1 break-keep text-sm font-bold text-run-muted">
              총 <span className="text-run-lime">{filteredPosts.length}</span>개의 이야기를 보고 있습니다.
              {selectedTag ? <span> 선택 태그: <span className="text-run-text">{selectedTag}</span></span> : null}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RotateCcw size={15} />}
            disabled={!hasActiveFilter}
            onClick={resetFilters}
            className="w-full sm:w-auto"
          >
            필터 초기화
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(320px,0.3fr)] lg:items-start">
          <CommunityFeed posts={filteredPosts} onReset={resetFilters} />
          <CommunitySidebar selectedTag={selectedTag} onTagClick={toggleTag} />
        </div>
      </Section>
    </>
  );
}
