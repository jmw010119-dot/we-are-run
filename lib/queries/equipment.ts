import "server-only";

import { EquipmentCategory as DbEquipmentCategory, UserLevel as DbUserLevel } from "@prisma/client";
import { db } from "@/lib/db";
import type {
  AlternativeEquipment,
  EquipmentCategory,
  EquipmentDetail,
  EquipmentItem,
  EquipmentLevel,
  EquipmentPurpose,
  EquipmentPurposeFit,
  EquipmentReview,
  EquipmentSpec,
} from "@/types";

const equipmentGradients = [
  "from-run-lime/24 via-white/[0.035] to-transparent",
  "from-sky-400/24 via-white/[0.035] to-transparent",
  "from-emerald-300/20 via-white/[0.035] to-transparent",
  "from-cyan-300/20 via-white/[0.035] to-transparent",
  "from-purple-300/18 via-white/[0.035] to-transparent",
  "from-blue-300/18 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
  "from-yellow-300/18 via-white/[0.035] to-transparent",
];

const equipmentPurposes: EquipmentPurpose[] = ["데일리런", "장거리", "스피드", "트레일", "회복런"];

const fallbackReviews: EquipmentReview[] = [
  {
    id: 1,
    author: "서울 러너",
    rating: 4.8,
    content: "데일리 러닝에서 부담 없이 쓰기 좋고, 착용감이 안정적입니다.",
    date: "2026.06.10",
  },
  {
    id: 2,
    author: "한강 페이서",
    rating: 4.7,
    content: "장거리에서도 피로감이 크게 올라오지 않아 꾸준히 손이 갑니다.",
    date: "2026.06.14",
  },
  {
    id: 3,
    author: "모닝 크루",
    rating: 4.6,
    content: "처음 장비를 고르는 러너에게 추천하기 좋은 균형감입니다.",
    date: "2026.06.18",
  },
];

function mapEquipmentCategory(value: DbEquipmentCategory): EquipmentCategory {
  const categoryMap: Record<DbEquipmentCategory, EquipmentCategory> = {
    SHOES: "러닝화",
    APPAREL: "러닝복",
    GPS_WATCH: "GPS 워치",
    ACCESSORY: "액세서리",
  };

  return categoryMap[value];
}

function mapEquipmentLevel(value: DbUserLevel): EquipmentLevel {
  const levelMap: Partial<Record<DbUserLevel, EquipmentLevel>> = {
    BEGINNER: "초보",
    INTERMEDIATE: "중급",
    ADVANCED: "고급",
  };

  return levelMap[value] ?? "초보";
}

function mapEquipmentPurposes(values: string[]): EquipmentPurpose[] {
  const mapped = values.filter((purpose): purpose is EquipmentPurpose =>
    equipmentPurposes.includes(purpose as EquipmentPurpose),
  );

  return mapped.length > 0 ? mapped : ["데일리런"];
}

function getNumericId(id: string, slug: string) {
  const matched = id.match(/(\d+)$/) ?? slug.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll(" ", "");
}

function getAverageRating(reviews: { rating: number }[]) {
  if (reviews.length === 0) {
    return 0;
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return Number(average.toFixed(1));
}

function buildEquipmentWhere(id: string) {
  const numericId = Number.parseInt(id, 10);

  return {
    OR: [
      { id },
      { id: `seed-equipment-${id}` },
      ...(Number.isFinite(numericId) ? [{ slug: `equipment-${numericId}` }] : []),
    ],
  };
}

async function getDbEquipmentItems() {
  return db.equipmentItem.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      brand: true,
      category: true,
      level: true,
      purposes: true,
      price: true,
      description: true,
      recommendReason: true,
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

type EquipmentCardSource = Awaited<ReturnType<typeof getDbEquipmentItems>>[number];

async function getDbEquipmentItemDetail(id: string) {
  return db.equipmentItem.findFirst({
    where: buildEquipmentWhere(id),
    select: {
      id: true,
      slug: true,
      name: true,
      brand: true,
      category: true,
      level: true,
      purposes: true,
      price: true,
      description: true,
      recommendReason: true,
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
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
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
    },
  });
}

type EquipmentDetailSource = NonNullable<Awaited<ReturnType<typeof getDbEquipmentItemDetail>>>;

function mapDbEquipmentToEquipmentCard(item: EquipmentCardSource | EquipmentDetailSource): EquipmentItem {
  const numericId = getNumericId(item.id, item.slug);
  const fallbackIndex = Math.max(numericId - 1, 0) % equipmentGradients.length;

  return {
    id: numericId,
    name: item.name,
    brand: item.brand,
    category: mapEquipmentCategory(item.category),
    level: mapEquipmentLevel(item.level),
    purposes: mapEquipmentPurposes(item.purposes),
    price: item.price,
    rating: getAverageRating(item.reviews),
    reviewCount: item.reviews.length,
    description: item.description,
    recommendReason: item.recommendReason,
    isSaved: item.bookmarks.length > 0,
    gradient: equipmentGradients[fallbackIndex],
  };
}

function getFallbackFitFor(item: EquipmentItem): string[] {
  return [
    `${item.level} 러너가 부담 없이 선택하기 좋은 장비를 찾는 경우`,
    `${item.purposes.slice(0, 2).join(", ")} 중심으로 훈련하는 러너`,
    `${item.category}를 처음 비교하거나 업그레이드하려는 러너`,
  ];
}

function getFallbackPros(item: EquipmentItem): string[] {
  return [
    `${item.purposes[0]}에 필요한 기본 성능이 균형 있게 잡혀 있습니다.`,
    `${item.brand} 특유의 안정적인 마감과 활용도가 돋보입니다.`,
    "가격과 성능의 균형이 좋아 꾸준히 사용하기 좋습니다.",
  ];
}

function getFallbackCons(item: EquipmentItem): string[] {
  const categoryCons: Record<EquipmentCategory, string[]> = {
    러닝화: ["발볼이나 착지 습관에 따라 착용감 차이가 있을 수 있습니다.", "전문 레이스용 반발력을 기대한다면 아쉬울 수 있습니다."],
    러닝복: ["계절과 기온에 따라 레이어링이 필요할 수 있습니다.", "핏 선호도에 따라 사이즈 선택을 신중히 해야 합니다."],
    "GPS 워치": ["고급 운동 지표는 상위 모델보다 제한적일 수 있습니다.", "배터리 사용 시간은 설정에 따라 달라질 수 있습니다."],
    액세서리: ["러닝 스타일에 따라 체감 활용도가 달라질 수 있습니다.", "장거리 사용 전 착용감을 먼저 확인하는 편이 좋습니다."],
  };

  return categoryCons[item.category];
}

function getFallbackSpecs(item: EquipmentItem): EquipmentSpec {
  const specs: Record<EquipmentCategory, EquipmentSpec> = {
    러닝화: {
      weight: "약 240~290g",
      cushioning: item.purposes.includes("장거리") ? "높음" : "중간 이상",
      stability: "중간 이상",
      durability: "일상 훈련 기준 우수",
      breathability: "통기성 메쉬 구조",
      recommendedDistance: item.purposes.includes("장거리") ? "10km 이상" : "3~10km",
      useCase: item.purposes.join(", "),
    },
    러닝복: {
      weight: "경량 원단",
      cushioning: "해당 없음",
      stability: "활동성 중심 핏",
      durability: "반복 세탁 기준 안정적",
      breathability: "흡습 속건",
      recommendedDistance: "실내외 전 거리",
      useCase: item.purposes.join(", "),
    },
    "GPS 워치": {
      weight: "약 35~55g",
      cushioning: "해당 없음",
      stability: "손목 밀착형",
      durability: "생활 방수 기준",
      breathability: "실리콘 스트랩",
      recommendedDistance: "훈련 기록 전반",
      useCase: item.purposes.join(", "),
    },
    액세서리: {
      weight: "휴대성 중심",
      cushioning: "제품별 상이",
      stability: "러닝 중 흔들림 최소화",
      durability: "일상 훈련 기준",
      breathability: "착용 부위 기준 통기성 확보",
      recommendedDistance: "데일리런부터 장거리까지",
      useCase: item.purposes.join(", "),
    },
  };

  return specs[item.category];
}

function getFallbackPurposeFit(item: EquipmentItem): EquipmentPurposeFit[] {
  return equipmentPurposes.map((purpose) => {
    if (item.purposes.includes(purpose)) {
      return { purpose, score: purpose === item.purposes[0] ? 94 : 88 };
    }

    return { purpose, score: purpose === "트레일" ? 64 : 72 };
  });
}

function mapDbReviewsToEquipmentReviews(reviews: EquipmentDetailSource["reviews"]): EquipmentReview[] {
  if (reviews.length === 0) {
    return fallbackReviews;
  }

  return reviews.slice(0, 3).map((review, index) => ({
    id: index + 1,
    author: review.user.nickname ?? "러너",
    rating: review.rating,
    content: review.content,
    date: formatDate(review.createdAt),
  }));
}

function mapDbEquipmentToAlternative(item: EquipmentCardSource): AlternativeEquipment {
  const card = mapDbEquipmentToEquipmentCard(item);

  return {
    id: card.id,
    name: card.name,
    brand: card.brand,
    price: card.price,
    rating: card.rating,
  };
}

async function getAlternativeEquipment(item: EquipmentDetailSource): Promise<AlternativeEquipment[]> {
  const alternatives = await db.equipmentItem.findMany({
    where: {
      id: {
        not: item.id,
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      brand: true,
      category: true,
      level: true,
      purposes: true,
      price: true,
      description: true,
      recommendReason: true,
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
    orderBy: [{ category: "asc" }, { slug: "asc" }],
    take: 3,
  });

  return alternatives.map(mapDbEquipmentToAlternative);
}

function mapDbEquipmentToEquipmentDetail(
  item: EquipmentDetailSource,
  alternatives: AlternativeEquipment[],
): EquipmentDetail {
  const card = mapDbEquipmentToEquipmentCard(item);

  return {
    ...card,
    fitFor: getFallbackFitFor(card),
    pros: getFallbackPros(card),
    cons: getFallbackCons(card),
    specs: getFallbackSpecs(card),
    purposeFit: getFallbackPurposeFit(card),
    reviews: mapDbReviewsToEquipmentReviews(item.reviews),
    alternatives,
  };
}

export async function getEquipmentItems(): Promise<EquipmentItem[]> {
  const items = await getDbEquipmentItems();

  return items.map(mapDbEquipmentToEquipmentCard);
}

export async function getEquipmentItemIds(): Promise<string[]> {
  const items = await db.equipmentItem.findMany({
    select: {
      id: true,
      slug: true,
    },
    orderBy: {
      slug: "asc",
    },
  });

  return items.map((item) => {
    const numericId = getNumericId(item.id, item.slug);

    return numericId > 0 ? String(numericId) : item.id;
  });
}

export async function getEquipmentItemById(id: string): Promise<EquipmentDetail | null> {
  const item = await getDbEquipmentItemDetail(id);

  if (!item) {
    return null;
  }

  const alternatives = await getAlternativeEquipment(item);

  return mapDbEquipmentToEquipmentDetail(item, alternatives);
}
