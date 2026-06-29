import { adminActivities } from "../lib/mock/admin";
import { communityPostDetails, communityPosts } from "../lib/mock/community";
import { courseDetails, runningCourses } from "../lib/mock/courses";
import { crewDetails, runningCrews } from "../lib/mock/crews";
import { equipmentDetails, equipmentRecommendations } from "../lib/mock/equipment";
import { facilityDetails, runningFacilities } from "../lib/mock/facilities";

type SeedDelegate = {
  upsert(args: unknown): Promise<unknown>;
  deleteMany?(args?: unknown): Promise<unknown>;
};

type SeedPrismaClient = {
  $disconnect(): Promise<void>;
  user: SeedDelegate;
  runningCourse: SeedDelegate;
  runningFacility: SeedDelegate;
  runningCrew: SeedDelegate;
  equipmentItem: SeedDelegate;
  communityPost: SeedDelegate;
  comment: SeedDelegate;
  review: SeedDelegate;
  bookmark: SeedDelegate;
  like: SeedDelegate;
  crewMember: SeedDelegate;
  crewSchedule: SeedDelegate;
  adminLog: SeedDelegate;
};

const PRISMA_CLIENT_MODULE = "@prisma/client";
const DEFAULT_AUTHOR_ID = "seed-user-runner-1";
const DEFAULT_ADMIN_ID = "seed-user-admin-1";

const seedUsersData = [
  {
    id: DEFAULT_AUTHOR_ID,
    email: "runner@wearerun.local",
    nickname: "한강페이서",
    region: "서울",
    city: "영등포구",
    bio: "도심과 강변을 꾸준히 달리는 WE ARE RUN 러너입니다.",
    role: "USER",
    level: "INTERMEDIATE",
  },
  {
    id: "seed-user-runner-2",
    email: "crew@wearerun.local",
    nickname: "크루리더",
    region: "부산",
    city: "수영구",
    bio: "정기런과 번개런을 운영하는 크루 리더입니다.",
    role: "MODERATOR",
    level: "ADVANCED",
  },
  {
    id: DEFAULT_ADMIN_ID,
    email: "admin@wearerun.local",
    nickname: "WEARERUN관리자",
    region: "서울",
    city: "강남구",
    bio: "WE ARE RUN 운영 관리자 계정입니다.",
    role: "ADMIN",
    level: "ANYONE",
  },
] as const;

function parseKm(value: string): number {
  const parsed = Number.parseFloat(value.replace("km", "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function slugify(prefix: string, id: number): string {
  return `${prefix}-${id}`;
}

function mapCourseDifficulty(value: string): string {
  const difficultyMap: Record<string, string> = {
    Easy: "EASY",
    Normal: "NORMAL",
    Hard: "HARD",
  };

  return difficultyMap[value] ?? "NORMAL";
}

function mapFacilityType(value: string): string {
  const typeMap: Record<string, string> = {
    트랙: "TRACK",
    공원: "PARK",
    "실내 러닝장": "INDOOR",
    육상경기장: "STADIUM",
    산책로: "WALKWAY",
  };

  return typeMap[value] ?? "PARK";
}

function mapFacilityStatus(value: string): string {
  const statusMap: Record<string, string> = {
    운영중: "OPEN",
    "운영 종료": "CLOSED",
    "24시간": "ALWAYS_OPEN",
  };

  return statusMap[value] ?? "OPEN";
}

function mapCrewLevel(value: string): string {
  const levelMap: Record<string, string> = {
    초보: "BEGINNER",
    중급: "INTERMEDIATE",
    고급: "ADVANCED",
    누구나: "ANYONE",
  };

  return levelMap[value] ?? "ANYONE";
}

function mapCrewRunType(value: string): string {
  const runTypeMap: Record<string, string> = {
    정기런: "REGULAR",
    번개런: "FLASH",
    장거리런: "LONG",
    초보런: "BEGINNER",
  };

  return runTypeMap[value] ?? "REGULAR";
}

function mapEquipmentCategory(value: string): string {
  const categoryMap: Record<string, string> = {
    러닝화: "SHOES",
    러닝복: "APPAREL",
    "GPS 워치": "GPS_WATCH",
    액세서리: "ACCESSORY",
  };

  return categoryMap[value] ?? "ACCESSORY";
}

function mapUserLevel(value: string): string {
  const levelMap: Record<string, string> = {
    초보: "BEGINNER",
    중급: "INTERMEDIATE",
    고급: "ADVANCED",
    누구나: "ANYONE",
  };

  return levelMap[value] ?? "BEGINNER";
}

function mapPostCategory(value: string): string {
  const categoryMap: Record<string, string> = {
    "러닝 인증": "RUN_CERTIFICATION",
    자유게시판: "FREE_BOARD",
    질문: "QUESTION",
    정보공유: "INFORMATION",
    후기: "REVIEW",
    크루모집: "CREW_RECRUITING",
  };

  return categoryMap[value] ?? "FREE_BOARD";
}

function mapCourseMockToSeed(course: (typeof runningCourses)[number]) {
  return {
    id: `seed-course-${course.id}`,
    name: course.name,
    slug: slugify("course", course.id),
    region: course.region,
    city: course.city,
    distanceKm: parseKm(course.distance),
    difficulty: mapCourseDifficulty(course.difficulty),
    type: course.type,
    estimatedTime: course.estimatedTime,
    description: course.description,
    tags: course.tags,
    approvalStatus: "APPROVED",
    authorId: DEFAULT_AUTHOR_ID,
    // TODO: 실제 위도/경도 데이터 확정 후 position 값을 latitude/longitude로 변환합니다.
  };
}

function mapFacilityMockToSeed(facility: (typeof runningFacilities)[number]) {
  return {
    id: `seed-facility-${facility.id}`,
    name: facility.name,
    slug: slugify("facility", facility.id),
    region: facility.region,
    city: facility.city,
    type: mapFacilityType(facility.type),
    status: mapFacilityStatus(facility.status),
    address: facility.address,
    hours: facility.hours,
    description: facility.description,
    amenities: facility.amenities,
    approvalStatus: "APPROVED",
    authorId: DEFAULT_AUTHOR_ID,
    // TODO: 실제 지도 좌표 정책 확정 후 position 값을 DB 좌표로 변환합니다.
  };
}

function mapCrewMockToSeed(crew: (typeof runningCrews)[number]) {
  return {
    id: `seed-crew-${crew.id}`,
    name: crew.name,
    slug: slugify("crew", crew.id),
    region: crew.region,
    city: crew.city,
    description: crew.description,
    level: mapCrewLevel(crew.level),
    runTypes: crew.runTypes.map(mapCrewRunType),
    regularRunDay: crew.regularRunDay,
    regularRunTime: crew.regularRunTime,
    hasFlashRun: crew.hasFlashRun,
    isRecruiting: crew.isRecruiting,
    tags: crew.tags,
    ownerId: "seed-user-runner-2",
    approvalStatus: "APPROVED",
    // TODO: 실제 crew owner/user 연결 정책 확정 후 ownerId를 조정합니다.
  };
}

function mapEquipmentMockToSeed(item: (typeof equipmentRecommendations)[number]) {
  return {
    id: `seed-equipment-${item.id}`,
    name: item.name,
    slug: slugify("equipment", item.id),
    brand: item.brand,
    category: mapEquipmentCategory(item.category),
    level: mapUserLevel(item.level),
    purposes: item.purposes,
    price: item.price,
    description: item.description,
    recommendReason: item.recommendReason,
    authorId: DEFAULT_AUTHOR_ID,
    approvalStatus: "APPROVED",
    // TODO: 제품 스펙과 적합도 데이터를 JSON 필드 또는 별도 모델로 분리할지 결정합니다.
  };
}

function mapCommunityMockToSeed(post: (typeof communityPosts)[number]) {
  return {
    id: `seed-post-${post.id}`,
    title: post.title,
    content: post.content,
    category: mapPostCategory(post.category),
    tags: post.tags,
    authorId: DEFAULT_AUTHOR_ID,
    // TODO: 러닝 기록이 있는 게시글은 RunningRecord 생성 후 runningRecordId로 연결합니다.
  };
}

async function createPrismaClient(): Promise<SeedPrismaClient> {
  // PrismaClient는 prisma generate 이후 생성됩니다. 현재는 seed 초안의 타입 안전성을 위해 동적 import로 둡니다.
  const { PrismaClient } = (await import(PRISMA_CLIENT_MODULE)) as {
    PrismaClient: new () => SeedPrismaClient;
  };

  return new PrismaClient();
}

export async function seedUsers(prisma: SeedPrismaClient): Promise<void> {
  for (const user of seedUsersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
}

export async function seedCourses(prisma: SeedPrismaClient): Promise<void> {
  for (const course of runningCourses) {
    const data = mapCourseMockToSeed(course);

    await prisma.runningCourse.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function seedFacilities(prisma: SeedPrismaClient): Promise<void> {
  for (const facility of runningFacilities) {
    const data = mapFacilityMockToSeed(facility);

    await prisma.runningFacility.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function seedCrews(prisma: SeedPrismaClient): Promise<void> {
  for (const crew of runningCrews) {
    const data = mapCrewMockToSeed(crew);

    await prisma.runningCrew.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });

    await prisma.crewMember.upsert({
      where: {
        crewId_userId: {
          crewId: data.id,
          userId: "seed-user-runner-2",
        },
      },
      update: {
        role: "OWNER",
        status: "ACTIVE",
      },
      create: {
        id: `seed-crew-member-${crew.id}-owner`,
        crewId: data.id,
        userId: "seed-user-runner-2",
        role: "OWNER",
        status: "ACTIVE",
      },
    });

    await prisma.crewSchedule.upsert({
      where: { id: `seed-crew-schedule-${crew.id}` },
      update: {
        title: crew.nextSchedule,
        runType: crew.hasFlashRun ? "FLASH" : "REGULAR",
        place: `${crew.region} ${crew.city}`,
      },
      create: {
        id: `seed-crew-schedule-${crew.id}`,
        crewId: data.id,
        title: crew.nextSchedule,
        runType: crew.hasFlashRun ? "FLASH" : "REGULAR",
        date: new Date("2026-07-01T10:00:00.000Z"),
        place: `${crew.region} ${crew.city}`,
        pace: "5분30초 - 6분30초",
        // TODO: nextSchedule 문자열을 실제 날짜/시간으로 파싱하는 정책을 정합니다.
      },
    });
  }
}

export async function seedEquipment(prisma: SeedPrismaClient): Promise<void> {
  for (const item of equipmentRecommendations) {
    const data = mapEquipmentMockToSeed(item);

    await prisma.equipmentItem.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function seedCommunity(prisma: SeedPrismaClient): Promise<void> {
  for (const post of communityPosts) {
    const data = mapCommunityMockToSeed(post);

    await prisma.communityPost.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const detail of communityPostDetails) {
    for (const comment of detail.commentsPreview) {
      const data = {
        id: `seed-comment-${detail.id}-${comment.id}`,
        content: comment.content,
        authorId: DEFAULT_AUTHOR_ID,
        postId: `seed-post-${detail.id}`,
      };

      await prisma.comment.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }
  }
}

export async function seedReviews(prisma: SeedPrismaClient): Promise<void> {
  for (const course of courseDetails) {
    for (const review of course.reviews) {
      const data = {
        id: `seed-review-course-${course.id}-${review.id}`,
        userId: DEFAULT_AUTHOR_ID,
        targetType: "COURSE",
        targetId: `seed-course-${course.id}`,
        courseId: `seed-course-${course.id}`,
        rating: review.rating,
        content: review.content,
      };

      await prisma.review.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }
  }

  for (const facility of facilityDetails) {
    for (const review of facility.reviews) {
      const data = {
        id: `seed-review-facility-${facility.id}-${review.id}`,
        userId: DEFAULT_AUTHOR_ID,
        targetType: "FACILITY",
        targetId: `seed-facility-${facility.id}`,
        facilityId: `seed-facility-${facility.id}`,
        rating: review.rating,
        content: review.content,
      };

      await prisma.review.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }
  }

  for (const item of equipmentDetails) {
    for (const review of item.reviews) {
      const data = {
        id: `seed-review-equipment-${item.id}-${review.id}`,
        userId: DEFAULT_AUTHOR_ID,
        targetType: "EQUIPMENT",
        targetId: `seed-equipment-${item.id}`,
        equipmentId: `seed-equipment-${item.id}`,
        rating: review.rating,
        content: review.content,
      };

      await prisma.review.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }
  }
}

export async function seedBookmarks(prisma: SeedPrismaClient): Promise<void> {
  const bookmarkTargets = [
    { targetType: "COURSE", targetId: "seed-course-1", courseId: "seed-course-1" },
    { targetType: "FACILITY", targetId: "seed-facility-1", facilityId: "seed-facility-1" },
    { targetType: "CREW", targetId: "seed-crew-1", crewId: "seed-crew-1" },
    { targetType: "EQUIPMENT", targetId: "seed-equipment-1", equipmentId: "seed-equipment-1" },
    { targetType: "POST", targetId: "seed-post-1", postId: "seed-post-1" },
  ];

  for (const target of bookmarkTargets) {
    const data = {
      id: `seed-bookmark-${target.targetType.toLowerCase()}`,
      userId: DEFAULT_AUTHOR_ID,
      ...target,
    };

    await prisma.bookmark.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function seedLikes(prisma: SeedPrismaClient): Promise<void> {
  const likeTargets = [
    { targetType: "POST", targetId: "seed-post-1", postId: "seed-post-1" },
    { targetType: "COMMENT", targetId: "seed-comment-1-1", commentId: "seed-comment-1-1" },
  ];

  for (const target of likeTargets) {
    const data = {
      id: `seed-like-${target.targetType.toLowerCase()}`,
      userId: DEFAULT_AUTHOR_ID,
      ...target,
    };

    await prisma.like.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function seedAdminLogs(prisma: SeedPrismaClient): Promise<void> {
  for (const activity of adminActivities) {
    const data = {
      id: `seed-admin-log-${activity.id}`,
      adminId: DEFAULT_ADMIN_ID,
      action: activity.type === "report" ? "REPORT_RESOLVE" : "UPDATE",
      targetType: activity.type,
      targetId: String(activity.id),
      message: `${activity.title} - ${activity.description}`,
    };

    await prisma.adminLog.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

export async function resetSeedData(_prisma: SeedPrismaClient): Promise<void> {
  // TODO: 실제 개발 DB 초기화 정책이 정해지면 아래 순서로 deleteMany를 활성화합니다.
  // await _prisma.adminLog.deleteMany();
  // await _prisma.like.deleteMany();
  // await _prisma.bookmark.deleteMany();
  // await _prisma.review.deleteMany();
  // await _prisma.comment.deleteMany();
  // await _prisma.communityPost.deleteMany();
  // await _prisma.crewSchedule.deleteMany();
  // await _prisma.crewMember.deleteMany();
  // await _prisma.equipmentItem.deleteMany();
  // await _prisma.runningCrew.deleteMany();
  // await _prisma.runningFacility.deleteMany();
  // await _prisma.runningCourse.deleteMany();
  // await _prisma.user.deleteMany();
}

export async function main(): Promise<void> {
  const prisma = await createPrismaClient();

  try {
    await seedUsers(prisma);
    await seedCourses(prisma);
    await seedFacilities(prisma);
    await seedCrews(prisma);
    await seedEquipment(prisma);
    await seedCommunity(prisma);
    await seedReviews(prisma);
    await seedBookmarks(prisma);
    await seedLikes(prisma);
    await seedAdminLogs(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.env.ENABLE_PRISMA_SEED === "true") {
  void main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
