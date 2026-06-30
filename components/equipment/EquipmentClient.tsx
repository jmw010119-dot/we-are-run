"use client";

import { useMemo, useState } from "react";
import { EquipmentFilterBar, type EquipmentFilters } from "@/components/equipment/EquipmentFilterBar";
import { EquipmentGrid } from "@/components/equipment/EquipmentGrid";
import { EquipmentPageHero } from "@/components/equipment/EquipmentPageHero";
import { EquipmentSummary } from "@/components/equipment/EquipmentSummary";
import { FeaturedEquipment } from "@/components/equipment/FeaturedEquipment";
import { Section } from "@/components/common/ui/Section";
import type { EquipmentItem } from "@/types";

const initialFilters: EquipmentFilters = {
  level: "전체",
  category: "전체",
  purpose: "전체",
  priceRange: "전체",
  sort: "추천순",
};

function matchesPriceRange(item: EquipmentItem, priceRange: string) {
  if (priceRange === "10만원 이하") {
    return item.price <= 100000;
  }

  if (priceRange === "10-20만원") {
    return item.price > 100000 && item.price < 200000;
  }

  if (priceRange === "20만원 이상") {
    return item.price >= 200000;
  }

  return true;
}

function sortEquipment(items: EquipmentItem[], sort: string) {
  const sorted = [...items];

  if (sort === "평점순") {
    return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  if (sort === "가격 낮은순") {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sort === "가격 높은순") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  if (sort === "리뷰 많은순") {
    return sorted.sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
  }

  return sorted;
}

type EquipmentClientProps = {
  equipment: EquipmentItem[];
};

export function EquipmentClient({ equipment }: EquipmentClientProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<EquipmentFilters>(initialFilters);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextItems = equipment.filter((item) => {
      const searchableText = [
        item.name,
        item.brand,
        item.category,
        item.level,
        item.description,
        item.recommendReason,
        ...item.purposes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesLevel = filters.level === "전체" || item.level === filters.level;
      const matchesCategory = filters.category === "전체" || item.category === filters.category;
      const matchesPurpose = filters.purpose === "전체" || item.purposes.some((purpose) => purpose === filters.purpose);

      return matchesQuery && matchesLevel && matchesCategory && matchesPurpose && matchesPriceRange(item, filters.priceRange);
    });

    return sortEquipment(nextItems, filters.sort);
  }, [equipment, filters, query]);

  const handleFilterChange = (key: keyof EquipmentFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setQuery("");
    setFilters(initialFilters);
  };

  return (
    <>
      <EquipmentPageHero query={query} onQueryChange={setQuery} />
      <Section spacing="lg" className="border-b-0 pt-8 md:pt-10">
        <div className="grid gap-5">
          <EquipmentSummary items={equipment} />
          <EquipmentFilterBar
            filters={filters}
            resultCount={filteredItems.length}
            totalCount={equipment.length}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
          {filteredItems[0] ? <FeaturedEquipment item={filteredItems[0]} /> : null}
          <EquipmentGrid items={filteredItems} totalCount={equipment.length} onReset={handleReset} />
        </div>
      </Section>
    </>
  );
}
