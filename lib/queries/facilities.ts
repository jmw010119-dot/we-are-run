import "server-only";

import { FacilityStatus as DbFacilityStatus, FacilityType as DbFacilityType } from "@/generated/prisma";
import { db } from "@/lib/db";
import type {
  CourseDifficulty,
  FacilityAmenityStatus,
  FacilityDetail,
  FacilityReview,
  FacilityStatus,
  FacilityType,
  RunningFacility,
} from "@/types";

const facilityPositions = [
  { top: "30%", left: "43%" },
  { top: "70%", left: "68%" },
  { top: "55%", left: "58%" },
  { top: "84%", left: "35%" },
  { top: "39%", left: "39%" },
  { top: "33%", left: "47%" },
  { top: "67%", left: "65%" },
  { top: "35%", left: "41%" },
];

const facilityGradients = [
  "from-run-lime/24 via-white/[0.035] to-transparent",
  "from-sky-400/24 via-white/[0.035] to-transparent",
  "from-cyan-300/20 via-white/[0.035] to-transparent",
  "from-lime-300/20 via-white/[0.035] to-transparent",
  "from-blue-300/18 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
  "from-yellow-300/18 via-white/[0.035] to-transparent",
  "from-purple-300/18 via-white/[0.035] to-transparent",
];

function mapFacilityType(value: DbFacilityType): FacilityType {
  const typeMap: Record<DbFacilityType, FacilityType> = {
    TRACK: "트랙",
    PARK: "공원",
    INDOOR: "실내 러닝장",
    STADIUM: "육상경기장",
    WALKWAY: "산책로",
  };

  return typeMap[value];
}

function mapFacilityStatus(value: DbFacilityStatus): FacilityStatus {
  const statusMap: Record<DbFacilityStatus, FacilityStatus> = {
    OPEN: "운영중",
    CLOSED: "운영 종료",
    ALWAYS_OPEN: "24시간",
  };

  return statusMap[value];
}

function getNumericId(id: string, slug: string) {
  const matched = slug.match(/(\d+)$/) ?? id.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
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

async function getDbRunningFacilities() {
  return db.runningFacility.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      type: true,
      status: true,
      amenities: true,
      address: true,
      hours: true,
      description: true,
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

async function getDbRunningFacilityById(id: string) {
  const numericId = Number.parseInt(id, 10);

  return db.runningFacility.findFirst({
    where: {
      OR: [
        { id },
        { id: `seed-facility-${id}` },
        ...(Number.isFinite(numericId) ? [{ slug: `facility-${numericId}` }] : []),
      ],
    },
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      type: true,
      status: true,
      amenities: true,
      address: true,
      hours: true,
      description: true,
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

type DbRunningFacility = Awaited<ReturnType<typeof getDbRunningFacilities>>[number];
type DbRunningFacilityDetail = NonNullable<Awaited<ReturnType<typeof getDbRunningFacilityById>>>;

export function mapDbFacilityToFacilityCard(facility: DbRunningFacility): RunningFacility {
  const numericId = getNumericId(facility.id, facility.slug);
  const fallbackIndex = Math.max(numericId - 1, 0) % facilityPositions.length;

  return {
    id: numericId,
    name: facility.name,
    region: facility.region,
    city: facility.city,
    type: mapFacilityType(facility.type),
    status: mapFacilityStatus(facility.status),
    rating: getAverageRating(facility.reviews),
    reviewCount: facility.reviews.length,
    amenities: facility.amenities,
    address: facility.address,
    hours: facility.hours,
    description: facility.description,
    isSaved: facility.bookmarks.length > 0,
    position: facilityPositions[fallbackIndex],
    gradient: facilityGradients[fallbackIndex],
  };
}

function amenityStatus(facility: RunningFacility, label: string): FacilityAmenityStatus {
  if (facility.amenities.includes(label)) {
    return "가능";
  }

  if (["샤워실", "보관함", "조명", "음수대", "탈의실", "매점"].includes(label)) {
    return "확인 필요";
  }

  return "불가";
}

function getFallbackReviews(facility: RunningFacility): FacilityReview[] {
  return [
    {
      id: 1,
      author: "시설러너",
      rating: Math.max(facility.rating, 4),
      content: `${facility.name}은 러닝 전후로 이용하기 좋은 기본 편의성이 갖춰져 있습니다.`,
      date: "2026.06.18",
    },
    {
      id: 2,
      author: "러닝메이트",
      rating: Math.max(facility.rating - 0.2, 4),
      content: "접근성이 좋아 정기적으로 방문하기 편했습니다.",
      date: "2026.06.12",
    },
    {
      id: 3,
      author: "코스수집가",
      rating: Math.max(facility.rating - 0.3, 4),
      content: "주변 러닝 코스와 함께 이용하면 만족도가 높습니다.",
      date: "2026.06.04",
    },
  ];
}

function mapDbReviewsToFacilityReviews(
  facility: RunningFacility,
  reviews: DbRunningFacilityDetail["reviews"],
): FacilityReview[] {
  if (reviews.length === 0) {
    return getFallbackReviews(facility);
  }

  return reviews.map((review, index) => ({
    id: index + 1,
    author: review.user.nickname ?? "러너",
    rating: review.rating,
    content: review.content,
    date: formatReviewDate(review.createdAt),
  }));
}

export function mapDbFacilityToFacilityDetail(facility: DbRunningFacilityDetail): FacilityDetail {
  const facilityCard = mapDbFacilityToFacilityCard(facility);
  const cityLabel = `${facility.region} ${facility.city}`;
  const isTrack = facilityCard.type === "트랙" || facilityCard.type === "육상경기장";
  const isIndoor = facilityCard.type === "실내 러닝장";
  const courseDifficulty: CourseDifficulty = isTrack ? "Normal" : facilityCard.type === "산책로" ? "Hard" : "Easy";

  return {
    ...facilityCard,
    coverLabel: `${facility.region.toUpperCase()} RUNNING BASE`,
    mapLabel: `${facility.city} 시설 위치`,
    recommendPoints: [
      `${facilityCard.type} 특성에 맞춰 러닝 전후 루틴을 구성하기 좋습니다.`,
      `${cityLabel} 러너들이 접근하기 쉬운 위치입니다.`,
      facilityCard.amenities.length > 0
        ? `${facilityCard.amenities.slice(0, 2).join(", ")} 편의시설을 활용할 수 있습니다.`
        : "방문 전 운영 정보와 편의시설을 한 번 더 확인하세요.",
    ],
    cautions: [
      "운영 시간과 대관 일정은 방문 전 다시 확인하는 것이 좋습니다.",
      facilityCard.status === "운영 종료"
        ? "현재 운영 종료 상태이므로 재개 공지를 확인하세요."
        : "혼잡 시간대에는 다른 이용자와 동선을 나누어 사용하세요.",
    ],
    recommendedFor: [
      `${cityLabel} 근처에서 러닝 거점을 찾는 러너`,
      isIndoor ? "날씨와 시간에 관계없이 훈련 루틴을 유지하고 싶은 러너" : "야외 러닝 전후 편의시설이 필요한 러너",
      isTrack ? "페이스 훈련과 반복주를 계획하는 러너" : "가볍게 시작할 데일리 러너",
    ],
    amenityStatus: ["화장실", "주차", "샤워실", "조명", "보관함", "음수대", "탈의실", "매점"].map((label) => ({
      label,
      status: amenityStatus(facilityCard, label),
      note: facilityCard.amenities.includes(label)
        ? `${facilityCard.name}에서 이용 가능`
        : "방문 전 운영 여부 확인 필요",
    })),
    nearbyCourses: [
      {
        id: 1,
        name: `${facility.city} 데일리 러닝 루프`,
        distance: isIndoor ? "4.8km" : "5.2km",
        difficulty: "Easy",
        walkingDistance: "도보 5분",
      },
      {
        id: 2,
        name: `${facility.region} 대표 트레이닝 코스`,
        distance: isTrack ? "8.0km" : "7.4km",
        difficulty: courseDifficulty,
        walkingDistance: "차량 12분",
      },
      {
        id: 3,
        name: `${facility.city} 주말 롱런 코스`,
        distance: "10.6km",
        difficulty: facilityCard.type === "산책로" ? "Hard" : "Normal",
        walkingDistance: "차량 18분",
      },
    ],
    reviews: mapDbReviewsToFacilityReviews(facilityCard, facility.reviews),
  };
}

export async function getRunningFacilities(): Promise<RunningFacility[]> {
  const facilities = await getDbRunningFacilities();

  return facilities.map(mapDbFacilityToFacilityCard);
}

export async function getRunningFacilityById(id: string): Promise<FacilityDetail | null> {
  const facility = await getDbRunningFacilityById(id);

  return facility ? mapDbFacilityToFacilityDetail(facility) : null;
}

export async function getRunningFacilityIds(): Promise<string[]> {
  const facilities = await db.runningFacility.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      slug: "asc",
    },
  });

  return facilities
    .map((facility) => facility.slug.match(/(\d+)$/)?.[1])
    .filter((id): id is string => Boolean(id));
}
