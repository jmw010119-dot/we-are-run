import "server-only";

import {
  CourseDifficulty as DbCourseDifficulty,
  CrewLevel as DbCrewLevel,
  EquipmentCategory as DbEquipmentCategory,
  FacilityType as DbFacilityType,
  PostCategory as DbPostCategory,
  UserLevel as DbUserLevel,
} from "@prisma/client";
import { db } from "@/lib/db";
import {
  profileActions,
  profileActivities as fallbackActivities,
  profileBadges,
  profileGoals,
  profileJoinedCrews as fallbackJoinedCrews,
  profileMyPosts as fallbackMyPosts,
  profileSavedCourses as fallbackSavedCourses,
  profileSavedEquipment as fallbackSavedEquipment,
  profileSavedFacilities as fallbackSavedFacilities,
  profileStats as fallbackStats,
  profileUser as fallbackUser,
} from "@/lib/mock";
import type {
  CommunityCategory,
  CourseDifficulty,
  EquipmentCategory,
  EquipmentLevel,
  FacilityType,
  ProfileActivity,
  ProfileMyPost,
  ProfilePageData,
  ProfileSavedFacility,
  ProfileStats,
  ProfileUser,
  RunningCourse,
  RunningCrew,
} from "@/types";

const gradients = [
  "from-lime-300/24 via-emerald-400/12 to-sky-500/16",
  "from-sky-400/18 via-run-card to-run-card",
  "from-run-lime/18 via-yellow-300/10 to-run-card",
  "from-purple-300/16 via-sky-300/10 to-run-card",
  "from-amber-300/16 via-run-card to-run-card",
  "from-cyan-300/18 via-run-card to-run-card",
  "from-emerald-300/18 via-lime-300/10 to-run-card",
  "from-blue-400/20 via-cyan-300/10 to-run-card",
];

function getNumericId(id: string, slug?: string | null) {
  const matched = slug?.match(/(\d+)$/) ?? id.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function mapUserLevel(value: DbUserLevel): string {
  const levelMap: Record<DbUserLevel, string> = {
    BEGINNER: "초보 러너",
    INTERMEDIATE: "중급 러너",
    ADVANCED: "고급 러너",
    ANYONE: "러너",
  };

  return levelMap[value];
}

function mapCourseDifficulty(value: DbCourseDifficulty): CourseDifficulty {
  const difficultyMap: Record<DbCourseDifficulty, CourseDifficulty> = {
    EASY: "Easy",
    NORMAL: "Normal",
    HARD: "Hard",
  };

  return difficultyMap[value];
}

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

function mapCrewLevel(value: DbCrewLevel): RunningCrew["level"] {
  const levelMap: Record<DbCrewLevel, RunningCrew["level"]> = {
    BEGINNER: "초보",
    INTERMEDIATE: "중급",
    ADVANCED: "고급",
    ANYONE: "누구나",
  };

  return levelMap[value];
}

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

function mapPostCategory(value: DbPostCategory): CommunityCategory {
  const categoryMap: Record<DbPostCategory, CommunityCategory> = {
    RUN_CERTIFICATION: "러닝 인증",
    FREE_BOARD: "자유게시판",
    QUESTION: "질문",
    INFORMATION: "정보공유",
    REVIEW: "후기",
    CREW_RECRUITING: "크루모집",
  };

  return categoryMap[value];
}

function formatDistance(value: { toString: () => string }) {
  const numeric = Number(value.toString());

  if (!Number.isFinite(numeric)) {
    return "0km";
  }

  return `${numeric.toFixed(numeric % 1 === 0 ? 0 : 1)}km`;
}

function formatRelativeDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
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

function getAuthorRegion(user: { region: string | null; city: string | null }) {
  return [user.region, user.city].filter(Boolean).join(" ") || fallbackUser.region;
}

function buildFallbackProfileData(): ProfilePageData {
  return {
    user: fallbackUser,
    stats: fallbackStats,
    activities: fallbackActivities,
    savedCourses: fallbackSavedCourses,
    savedFacilities: fallbackSavedFacilities,
    joinedCrews: fallbackJoinedCrews,
    savedEquipment: fallbackSavedEquipment,
    myPosts: fallbackMyPosts,
    badges: profileBadges,
    goal: profileGoals,
    actions: profileActions,
  };
}

async function getProfileUser(userId?: string) {
  const select = {
    id: true,
    name: true,
    nickname: true,
    region: true,
    city: true,
    bio: true,
    level: true,
    bookmarks: {
      select: {
        course: {
          select: {
            id: true,
            slug: true,
            name: true,
            region: true,
            city: true,
            distanceKm: true,
            difficulty: true,
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
        facility: {
          select: {
            id: true,
            slug: true,
            name: true,
            region: true,
            city: true,
            type: true,
            amenities: true,
          },
        },
        equipment: {
          select: {
            id: true,
            slug: true,
            name: true,
            brand: true,
            category: true,
            level: true,
            price: true,
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc" as const,
      },
    },
    crewMembers: {
      select: {
        crew: {
          select: {
            id: true,
            slug: true,
            name: true,
            region: true,
            city: true,
            level: true,
            members: {
              select: {
                id: true,
              },
            },
            schedules: {
              take: 1,
              orderBy: {
                date: "asc" as const,
              },
              select: {
                date: true,
                place: true,
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: "desc" as const,
      },
    },
    runningRecords: {
      take: 9,
      orderBy: {
        recordedAt: "desc" as const,
      },
      select: {
        id: true,
        distanceKm: true,
        pace: true,
        memo: true,
        recordedAt: true,
      },
    },
    posts: {
      take: 9,
      orderBy: {
        createdAt: "desc" as const,
      },
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    },
  };

  if (userId) {
    const sessionUser = await db.user.findUnique({
      where: {
        id: userId,
      },
      select,
    });

    if (sessionUser) {
      return sessionUser;
    }
  }

  return db.user.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    select,
  });
}

type DbProfileUser = NonNullable<Awaited<ReturnType<typeof getProfileUser>>>;

function mapUser(user: DbProfileUser): ProfileUser {
  const displayName = user.nickname ?? user.name ?? fallbackUser.nickname;

  return {
    nickname: displayName,
    region: getAuthorRegion(user),
    level: mapUserLevel(user.level),
    avatarLabel: displayName.charAt(0) || "러",
    bio: user.bio ?? fallbackUser.bio,
    followers: fallbackUser.followers,
    following: fallbackUser.following,
  };
}

function mapSavedCourses(user: DbProfileUser): ProfilePageData["savedCourses"] {
  const courses = user.bookmarks
    .map((bookmark) => bookmark.course)
    .filter((course): course is NonNullable<typeof course> => Boolean(course))
    .map((course, index) => ({
      id: getNumericId(course.id, course.slug),
      name: course.name,
      region: course.region,
      city: course.city,
      distance: formatDistance(course.distanceKm),
      difficulty: mapCourseDifficulty(course.difficulty),
      rating: getAverageRating(course.reviews),
      gradient: gradients[index % gradients.length],
    }));

  return courses.length > 0 ? courses : fallbackSavedCourses;
}

function mapSavedFacilities(user: DbProfileUser): ProfileSavedFacility[] {
  const facilities = user.bookmarks
    .map((bookmark) => bookmark.facility)
    .filter((facility): facility is NonNullable<typeof facility> => Boolean(facility))
    .map((facility, index) => ({
      id: getNumericId(facility.id, facility.slug),
      name: facility.name,
      region: facility.region,
      city: facility.city,
      type: mapFacilityType(facility.type),
      amenities: facility.amenities,
      gradient: gradients[(index + 1) % gradients.length],
    }));

  return facilities.length > 0 ? facilities : fallbackSavedFacilities;
}

function mapJoinedCrews(user: DbProfileUser): ProfilePageData["joinedCrews"] {
  const crews = user.crewMembers.map((member, index) => {
    const nextSchedule = member.crew.schedules[0]
      ? `${formatRelativeDate(member.crew.schedules[0].date)} · ${member.crew.schedules[0].place}`
      : "일정 준비 중";

    return {
      id: getNumericId(member.crew.id, member.crew.slug),
      name: member.crew.name,
      region: member.crew.region,
      city: member.crew.city,
      memberCount: member.crew.members.length,
      level: mapCrewLevel(member.crew.level),
      nextSchedule,
      gradient: gradients[(index + 2) % gradients.length],
    };
  });

  return crews.length > 0 ? crews : fallbackJoinedCrews;
}

function mapSavedEquipment(user: DbProfileUser): ProfilePageData["savedEquipment"] {
  const equipment = user.bookmarks
    .map((bookmark) => bookmark.equipment)
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item, index) => ({
      id: getNumericId(item.id, item.slug),
      name: item.name,
      brand: item.brand,
      category: mapEquipmentCategory(item.category),
      level: mapEquipmentLevel(item.level),
      price: item.price,
      rating: getAverageRating(item.reviews),
      gradient: gradients[(index + 3) % gradients.length],
    }));

  return equipment.length > 0 ? equipment : fallbackSavedEquipment;
}

function mapMyPosts(user: DbProfileUser): ProfileMyPost[] {
  const posts = user.posts.map((post) => ({
    id: getNumericId(post.id),
    title: post.title,
    category: mapPostCategory(post.category),
    likes: post._count.likes,
    comments: post._count.comments,
    createdAt: formatRelativeDate(post.createdAt),
  }));

  return posts.length > 0 ? posts : fallbackMyPosts;
}

function mapActivities(user: DbProfileUser): ProfileActivity[] {
  const runningActivities: ProfileActivity[] = user.runningRecords.map((record, index) => ({
    id: index + 1,
    type: "running",
    title: record.memo ?? "러닝 기록",
    description: `${formatDistance(record.distanceKm)} 러닝을 기록했습니다.`,
    meta: `${formatRelativeDate(record.recordedAt)} · ${formatDistance(record.distanceKm)} · ${record.pace}`,
    gradient: gradients[index % gradients.length],
  }));

  const postActivities: ProfileActivity[] = user.posts.slice(0, 3).map((post, index) => ({
    id: 100 + index,
    type: "post",
    title: post.title,
    description: `${mapPostCategory(post.category)} 게시글을 작성했습니다.`,
    meta: `${formatRelativeDate(post.createdAt)} · ${mapPostCategory(post.category)}`,
    gradient: gradients[(index + 3) % gradients.length],
  }));

  const crewActivities: ProfileActivity[] = user.crewMembers.slice(0, 3).map((member, index) => ({
    id: 200 + index,
    type: "schedule",
    title: `${member.crew.name} 참여 중`,
    description: "함께 달릴 크루 활동을 이어가고 있습니다.",
    meta: member.crew.schedules[0] ? `${formatRelativeDate(member.crew.schedules[0].date)} · ${member.crew.city}` : member.crew.city,
    gradient: gradients[(index + 5) % gradients.length],
  }));

  const activities = [...runningActivities, ...postActivities, ...crewActivities].slice(0, 9);

  return activities.length > 0 ? activities : fallbackActivities;
}

function mapStats(user: DbProfileUser, savedCourses: ProfilePageData["savedCourses"], joinedCrews: ProfilePageData["joinedCrews"]): ProfileStats {
  const totalDistance = user.runningRecords.reduce((sum, record) => sum + Number(record.distanceKm.toString()), 0);
  const latestRecord = user.runningRecords[0];

  return {
    totalDistance: totalDistance > 0 ? `${Math.round(totalDistance).toLocaleString("ko-KR")}km` : fallbackStats.totalDistance,
    monthlyDistance: totalDistance > 0 ? `${Math.round(totalDistance).toLocaleString("ko-KR")}km` : fallbackStats.monthlyDistance,
    averagePace: latestRecord?.pace ?? fallbackStats.averagePace,
    totalCertifications: String(user.runningRecords.length || fallbackStats.totalCertifications),
    joinedCrews: String(joinedCrews.length),
    savedCourses: String(savedCourses.length),
  };
}

function mapGoal(user: DbProfileUser): ProfilePageData["goal"] {
  const currentDistance = user.runningRecords.reduce((sum, record) => sum + Number(record.distanceKm.toString()), 0);
  const weeklyTarget = 45;
  const progress = Math.min(Math.round((currentDistance / weeklyTarget) * 100), 100);
  const remaining = Math.max(weeklyTarget - currentDistance, 0);

  if (currentDistance === 0) {
    return profileGoals;
  }

  return {
    weeklyDistance: `${weeklyTarget}km`,
    currentDistance: `${currentDistance.toFixed(1)}km`,
    progress,
    message: remaining > 0 ? `이번 주 목표까지 ${remaining.toFixed(1)}km 남았습니다.` : "이번 주 목표를 달성했습니다.",
  };
}

export async function getProfilePageData(userId?: string): Promise<ProfilePageData> {
  const user = await getProfileUser(userId);

  if (!user) {
    return buildFallbackProfileData();
  }

  const savedCourses = mapSavedCourses(user);
  const joinedCrews = mapJoinedCrews(user);

  return {
    user: mapUser(user),
    stats: mapStats(user, savedCourses, joinedCrews),
    activities: mapActivities(user),
    savedCourses,
    savedFacilities: mapSavedFacilities(user),
    joinedCrews,
    savedEquipment: mapSavedEquipment(user),
    myPosts: mapMyPosts(user),
    badges: profileBadges,
    goal: mapGoal(user),
    actions: profileActions,
  };
}
