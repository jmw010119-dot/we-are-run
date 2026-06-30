import "server-only";

import { CourseDifficulty as DbCourseDifficulty } from "@prisma/client";
import { db } from "@/lib/db";
import type { CourseDetail, CourseDifficulty, CourseReview, CourseType, RunningCourse } from "@/types";

const coursePositions = [
  { top: "29%", left: "42%" },
  { top: "71%", left: "68%" },
  { top: "56%", left: "59%" },
  { top: "84%", left: "35%" },
  { top: "31%", left: "45%" },
  { top: "38%", left: "39%" },
  { top: "33%", left: "47%" },
  { top: "22%", left: "52%" },
];

const courseGradients = [
  "from-run-lime/24 via-white/[0.035] to-transparent",
  "from-sky-400/24 via-white/[0.035] to-transparent",
  "from-cyan-300/20 via-white/[0.035] to-transparent",
  "from-lime-300/20 via-white/[0.035] to-transparent",
  "from-yellow-300/18 via-white/[0.035] to-transparent",
  "from-blue-300/18 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
];

const courseTypes: CourseType[] = ["공원", "한강", "트랙", "도심", "해안", "산책로"];

function mapCourseDifficulty(value: DbCourseDifficulty): CourseDifficulty {
  const difficultyMap: Record<DbCourseDifficulty, CourseDifficulty> = {
    EASY: "Easy",
    NORMAL: "Normal",
    HARD: "Hard",
  };

  return difficultyMap[value];
}

function mapCourseType(value: string): CourseType {
  return courseTypes.includes(value as CourseType) ? (value as CourseType) : "공원";
}

function getNumericId(id: string, slug: string) {
  const matched = slug.match(/(\d+)$/) ?? id.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatDistance(value: { toString(): string }) {
  const distance = Number.parseFloat(value.toString());

  return `${Number.isInteger(distance) ? distance.toFixed(0) : distance.toFixed(1)}km`;
}

function getAverageRating(reviews: { rating: number }[]) {
  if (reviews.length === 0) {
    return 0;
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return Number(average.toFixed(1));
}

function formatReviewDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

async function getDbRunningCourses() {
  return db.runningCourse.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      distanceKm: true,
      difficulty: true,
      type: true,
      estimatedTime: true,
      description: true,
      tags: true,
      reviews: {
        select: {
          rating: true,
        },
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      slug: "asc",
    },
  });
}

async function getDbRunningCourseById(id: string) {
  const numericId = Number.parseInt(id, 10);

  return db.runningCourse.findFirst({
    where: {
      OR: [
        { id },
        { id: `seed-course-${id}` },
        ...(Number.isFinite(numericId) ? [{ slug: `course-${numericId}` }] : []),
      ],
    },
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      distanceKm: true,
      difficulty: true,
      type: true,
      estimatedTime: true,
      description: true,
      tags: true,
      startPoint: true,
      endPoint: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
    },
  });
}

type DbRunningCourse = Awaited<ReturnType<typeof getDbRunningCourses>>[number];
type DbRunningCourseDetail = NonNullable<Awaited<ReturnType<typeof getDbRunningCourseById>>>;

export function mapDbCourseToCourseCard(course: DbRunningCourse): RunningCourse {
  const numericId = getNumericId(course.id, course.slug);
  const fallbackIndex = Math.max(numericId - 1, 0) % coursePositions.length;

  return {
    id: numericId,
    name: course.name,
    region: course.region,
    city: course.city,
    distance: formatDistance(course.distanceKm),
    difficulty: mapCourseDifficulty(course.difficulty),
    type: mapCourseType(course.type),
    estimatedTime: course.estimatedTime,
    rating: getAverageRating(course.reviews),
    reviewCount: course.reviews.length,
    tags: course.tags,
    description: course.description,
    isSaved: course.bookmarks.length > 0,
    position: coursePositions[fallbackIndex],
    gradient: courseGradients[fallbackIndex],
  };
}

function getFallbackReviews(course: RunningCourse): CourseReview[] {
  return [
    {
      id: 1,
      author: "한강페이서",
      rating: Math.max(course.rating, 4),
      content: `${course.name}은 거리와 접근성이 좋아 다시 달리고 싶은 코스입니다.`,
      date: "2026.06.18",
    },
    {
      id: 2,
      author: "러닝메이트",
      rating: Math.max(course.rating - 0.2, 4),
      content: "노면과 동선이 안정적이라 페이스를 유지하기 좋았습니다.",
      date: "2026.06.12",
    },
    {
      id: 3,
      author: "코스수집가",
      rating: Math.max(course.rating - 0.3, 4),
      content: "처음 방문하는 러너도 길을 찾기 쉬운 편입니다.",
      date: "2026.06.04",
    },
  ];
}

function mapDbReviewsToCourseReviews(course: RunningCourse, reviews: DbRunningCourseDetail["reviews"]) {
  if (reviews.length === 0) {
    return getFallbackReviews(course);
  }

  return reviews.map((review, index) => ({
    id: index + 1,
    author: review.user.nickname ?? "러너",
    rating: review.rating,
    content: review.content,
    date: formatReviewDate(review.createdAt),
  }));
}

export function mapDbCourseToCourseDetail(course: DbRunningCourseDetail): CourseDetail {
  const courseCard = mapDbCourseToCourseCard(course);
  const cityLabel = `${course.region} ${course.city}`;
  const startPoint = course.startPoint ?? `${cityLabel} 러닝 포인트`;
  const endPoint = course.endPoint ?? `${cityLabel} 순환 지점`;
  const isHard = courseCard.difficulty === "Hard";
  const isEasy = courseCard.difficulty === "Easy";

  return {
    ...courseCard,
    recommendedTime: isHard ? "오전 07:00-10:00" : "일몰 전후 18:00-21:00",
    elevation: isHard ? "120m" : isEasy ? "18m" : "42m",
    coverLabel: `${course.region.toUpperCase()} PREMIUM ROUTE`,
    startPoint,
    endPoint,
    nearbyPoints: [startPoint, `${course.city} 대표 포인트`, endPoint],
    recommendPoints: [
      `${course.type} 특성이 잘 살아 있어 ${course.region} 러너들이 꾸준히 찾는 코스입니다.`,
      `${courseCard.distance} 거리 구성으로 목표 페이스를 잡기 좋습니다.`,
      "리뷰와 저장 데이터를 바탕으로 우선 추천되는 코스입니다.",
    ],
    cautions: [
      "혼잡 시간대에는 보행자와 자전거 동선을 함께 확인하세요.",
      "날씨와 노면 상태에 따라 페이스를 유연하게 조절하는 것이 좋습니다.",
    ],
    recommendedFor: [
      `${course.region} ${course.city} 근처에서 러닝 루트를 찾는 러너`,
      isEasy ? "부담 없이 시작할 초보 러너" : "꾸준한 훈련 루틴을 만들고 싶은 러너",
      "코스 저장 후 반복해서 달릴 대표 루트를 찾는 러너",
    ],
    amenities: {
      toilet: `${course.city} 주요 공원/시설 이용`,
      parking: "인근 공영주차장 확인 필요",
      nightLight: isHard ? "야간 러닝 전 조명 확인 권장" : "주요 구간 조명 양호",
      convenienceStore: "출발지 인근 상권 이용",
      transit: `${course.region} 대중교통 접근 가능`,
      difficultyNote: isHard
        ? "상승 구간과 거리 부담이 있어 경험자에게 적합합니다."
        : isEasy
          ? "평탄한 구간 위주라 입문자도 부담이 적습니다."
          : "일정한 페이스 훈련에 적합한 중간 난이도입니다.",
    },
    reviews: mapDbReviewsToCourseReviews(courseCard, course.reviews),
  };
}

export async function getRunningCourses(): Promise<RunningCourse[]> {
  const courses = await getDbRunningCourses();

  return courses.map(mapDbCourseToCourseCard);
}

export async function getRunningCourseById(id: string): Promise<CourseDetail | null> {
  const course = await getDbRunningCourseById(id);

  return course ? mapDbCourseToCourseDetail(course) : null;
}

export async function getRunningCourseIds(): Promise<string[]> {
  const courses = await db.runningCourse.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      slug: "asc",
    },
  });

  return courses
    .map((course) => course.slug.match(/(\d+)$/)?.[1])
    .filter((id): id is string => Boolean(id));
}
