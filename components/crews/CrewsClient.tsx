"use client";

import { useMemo, useState } from "react";
import { CrewFilterBar, type CrewFilters } from "@/components/crews/CrewFilterBar";
import { CrewList } from "@/components/crews/CrewList";
import { CrewSummary } from "@/components/crews/CrewSummary";
import { CrewsPageHero } from "@/components/crews/CrewsPageHero";
import { Section } from "@/components/common/ui/Section";
import { runningCrews } from "@/lib/mock";
import type { RunningCrew } from "@/types";

const initialFilters: CrewFilters = {
  region: "전체",
  runType: "전체",
  day: "전체",
  level: "전체",
  sort: "추천순",
};

function sortCrews(crews: RunningCrew[], sort: string) {
  const sorted = [...crews];

  if (sort === "멤버 많은순") {
    return sorted.sort((a, b) => b.memberCount - a.memberCount);
  }

  if (sort === "모집중 우선") {
    return sorted.sort((a, b) => Number(b.isRecruiting) - Number(a.isRecruiting) || b.memberCount - a.memberCount);
  }

  return sorted;
}

export function CrewsClient() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CrewFilters>(initialFilters);

  const filteredCrews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextCrews = runningCrews.filter((crew) => {
      const searchableText = [
        crew.name,
        crew.region,
        crew.city,
        crew.level,
        crew.description,
        crew.nextSchedule,
        ...crew.runTypes,
        ...crew.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesRegion = filters.region === "전체" || crew.region === filters.region;
      const matchesRunType = filters.runType === "전체" || crew.runTypes.some((type) => type === filters.runType);
      const matchesDay = filters.day === "전체" || crew.regularRunDay.includes(filters.day);
      const matchesLevel = filters.level === "전체" || crew.level === filters.level;

      return matchesQuery && matchesRegion && matchesRunType && matchesDay && matchesLevel;
    });

    return sortCrews(nextCrews, filters.sort);
  }, [filters, query]);

  const handleFilterChange = (key: keyof CrewFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setQuery("");
    setFilters(initialFilters);
  };

  return (
    <>
      <CrewsPageHero query={query} onQueryChange={setQuery} />
      <Section spacing="lg" className="border-b-0 pt-8 md:pt-10">
        <div className="grid gap-5">
          <CrewSummary crews={runningCrews} />
          <CrewFilterBar
            filters={filters}
            resultCount={filteredCrews.length}
            totalCount={runningCrews.length}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
          <CrewList crews={filteredCrews} totalCount={runningCrews.length} onReset={handleReset} />
        </div>
      </Section>
    </>
  );
}

