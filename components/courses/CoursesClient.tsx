"use client";

import { useMemo, useState } from "react";
import { CourseFilterBar, type CourseFilters } from "@/components/courses/CourseFilterBar";
import { CourseList } from "@/components/courses/CourseList";
import { CourseMapPanel } from "@/components/courses/CourseMapPanel";
import { CoursesPageHero } from "@/components/courses/CoursesPageHero";
import { Section } from "@/components/common/ui/Section";
import type { CourseDifficulty, RunningCourse } from "@/types";

const initialFilters: CourseFilters = {
  region: "전체",
  distance: "전체",
  difficulty: "전체",
  type: "전체",
  sort: "추천순",
};

const difficultyMap: Record<string, CourseDifficulty> = {
  쉬움: "Easy",
  보통: "Normal",
  어려움: "Hard",
};

function parseDistance(distance: string) {
  return Number.parseFloat(distance.replace("km", ""));
}

function matchesDistance(course: RunningCourse, selectedDistance: string) {
  const distance = parseDistance(course.distance);

  if (selectedDistance === "5km 이하") {
    return distance <= 5;
  }

  if (selectedDistance === "5-10km") {
    return distance > 5 && distance < 10;
  }

  if (selectedDistance === "10km 이상") {
    return distance >= 10;
  }

  return true;
}

function sortCourses(courses: RunningCourse[], sort: string) {
  const sorted = [...courses];

  if (sort === "평점순") {
    return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  if (sort === "거리 짧은순") {
    return sorted.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
  }

  if (sort === "거리 긴순") {
    return sorted.sort((a, b) => parseDistance(b.distance) - parseDistance(a.distance));
  }

  if (sort === "리뷰 많은순") {
    return sorted.sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
  }

  return sorted.sort(
    (a, b) => Number(b.isSaved) - Number(a.isSaved) || b.rating - a.rating || b.reviewCount - a.reviewCount,
  );
}

type CoursesClientProps = {
  courses: RunningCourse[];
};

export function CoursesClient({ courses }: CoursesClientProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CourseFilters>(initialFilters);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextCourses = courses.filter((course) => {
      const searchableText = [
        course.name,
        course.region,
        course.city,
        course.description,
        course.type,
        ...course.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesRegion = filters.region === "전체" || course.region === filters.region;
      const matchesDifficulty =
        filters.difficulty === "전체" || course.difficulty === difficultyMap[filters.difficulty];
      const matchesType = filters.type === "전체" || course.type === filters.type;

      return (
        matchesQuery &&
        matchesRegion &&
        matchesDistance(course, filters.distance) &&
        matchesDifficulty &&
        matchesType
      );
    });

    return sortCourses(nextCourses, filters.sort);
  }, [courses, filters, query]);

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setQuery("");
    setFilters(initialFilters);
  };

  return (
    <>
      <CoursesPageHero query={query} onQueryChange={setQuery} />
      <Section spacing="lg" className="border-b-0 pt-8 md:pt-10">
        <CourseFilterBar
          filters={filters}
          resultCount={filteredCourses.length}
          totalCount={courses.length}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] lg:items-start">
          <CourseMapPanel courses={filteredCourses} />
          <CourseList courses={filteredCourses} totalCount={courses.length} onReset={handleReset} />
        </div>
      </Section>
    </>
  );
}
