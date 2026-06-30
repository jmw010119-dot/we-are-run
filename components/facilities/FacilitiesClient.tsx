"use client";

import { useMemo, useState } from "react";
import { FacilitiesPageHero } from "@/components/facilities/FacilitiesPageHero";
import { FacilityFilterBar, type FacilityFilters } from "@/components/facilities/FacilityFilterBar";
import { FacilityList } from "@/components/facilities/FacilityList";
import { FacilityMapPanel } from "@/components/facilities/FacilityMapPanel";
import { FacilitySummary } from "@/components/facilities/FacilitySummary";
import { Section } from "@/components/common/ui/Section";
import type { RunningFacility } from "@/types";

const initialFilters: FacilityFilters = {
  region: "전체",
  type: "전체",
  amenity: "전체",
  status: "전체",
  sort: "추천순",
};

function sortFacilities(facilities: RunningFacility[], sort: string) {
  const sorted = [...facilities];

  if (sort === "평점순") {
    return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  if (sort === "리뷰 많은순") {
    return sorted.sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
  }

  return sorted;
}

type FacilitiesClientProps = {
  facilities: RunningFacility[];
};

export function FacilitiesClient({ facilities }: FacilitiesClientProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FacilityFilters>(initialFilters);

  const filteredFacilities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextFacilities = facilities.filter((facility) => {
      const searchableText = [
        facility.name,
        facility.region,
        facility.city,
        facility.type,
        facility.address,
        facility.description,
        ...facility.amenities,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesRegion = filters.region === "전체" || facility.region === filters.region;
      const matchesType = filters.type === "전체" || facility.type === filters.type;
      const matchesAmenity = filters.amenity === "전체" || facility.amenities.includes(filters.amenity);
      const matchesStatus = filters.status === "전체" || facility.status === filters.status;

      return matchesQuery && matchesRegion && matchesType && matchesAmenity && matchesStatus;
    });

    return sortFacilities(nextFacilities, filters.sort);
  }, [facilities, filters, query]);

  const handleFilterChange = (key: keyof FacilityFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setQuery("");
    setFilters(initialFilters);
  };

  return (
    <>
      <FacilitiesPageHero query={query} onQueryChange={setQuery} />
      <Section spacing="lg" className="border-b-0 pt-8 md:pt-10">
        <div className="grid gap-5">
          <FacilitySummary facilities={facilities} />
          <FacilityFilterBar
            filters={filters}
            resultCount={filteredFacilities.length}
            totalCount={facilities.length}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] lg:items-start">
            <FacilityMapPanel facilities={filteredFacilities} />
            <FacilityList facilities={filteredFacilities} totalCount={facilities.length} onReset={handleReset} />
          </div>
        </div>
      </Section>
    </>
  );
}
