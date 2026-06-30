import {
  AdminLogAction,
  ApprovalStatus,
  BookmarkTargetType,
  CourseDifficulty,
  CrewLevel,
  CrewMemberRole,
  CrewMemberStatus,
  CrewRunType,
  EquipmentCategory,
  FacilityStatus,
  FacilityType,
  LikeTargetType,
  PostCategory,
  PrismaClient,
  ReportStatus,
  ReportTargetType,
  ReviewTargetType,
  UserLevel,
  UserRole,
} from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { adminActivities, adminReports } from "../lib/mock/admin";
import { communityPostDetails, communityPosts } from "../lib/mock/community";
import { courseDetails, runningCourses } from "../lib/mock/courses";
import { crewDetails, runningCrews } from "../lib/mock/crews";
import { equipmentDetails, equipmentRecommendations } from "../lib/mock/equipment";
import { facilityDetails, runningFacilities } from "../lib/mock/facilities";

function loadEnvFile(fileName: string) {
  const filePath = resolve(process.cwd(), fileName);

  if (!existsSync(filePath)) {
    return;
  }

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run Prisma seed.");
}

const adapter = new PrismaNeon({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const seedUsers = [
  {
    id: "seed-user-runner-1",
    email: "hangang.pacer@wearerun.local",
    nickname: "한강페이서",
    region: "서울",
    city: "영등포구",
    bio: "퇴근 후 한강을 달리고 주말에는 크루와 롱런을 즐기는 러너입니다.",
    role: UserRole.USER,
    level: UserLevel.INTERMEDIATE,
  },
  {
    id: "seed-user-runner-2",
    email: "crew.leader@wearerun.local",
    nickname: "크루리더민준",
    region: "서울",
    city: "송파구",
    bio: "정기런과 번개런을 운영하며 함께 달리는 문화를 만드는 크루 리더입니다.",
    role: UserRole.MODERATOR,
    level: UserLevel.ADVANCED,
  },
  {
    id: "seed-user-runner-3",
    email: "jeju.runner@wearerun.local",
    nickname: "제주바람",
    region: "제주",
    city: "제주시",
    bio: "오름과 해안 코스를 즐기는 트레일 러너입니다.",
    role: UserRole.USER,
    level: UserLevel.ADVANCED,
  },
  {
    id: "seed-user-admin-1",
    email: "admin@wearerun.local",
    nickname: "WEARERUN관리자",
    region: "서울",
    city: "강남구",
    bio: "WE ARE RUN 운영 관리자 계정입니다.",
    role: UserRole.ADMIN,
    level: UserLevel.ANYONE,
  },
] as const;

function parseKm(value: string): number {
  const parsed = Number.parseFloat(value.replace(/km|K/gi, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseDurationToSeconds(value: string): number {
  const [minutes, seconds] = value.split(":").map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) {
    return 0;
  }

  return minutes * 60 + seconds;
}

function slugify(prefix: string, id: number): string {
  return `${prefix}-${id}`;
}

function mapCourseDifficulty(value: string): CourseDifficulty {
  const difficultyMap: Record<string, CourseDifficulty> = {
    Easy: CourseDifficulty.EASY,
    Normal: CourseDifficulty.NORMAL,
    Hard: CourseDifficulty.HARD,
  };

  return difficultyMap[value] ?? CourseDifficulty.NORMAL;
}

function mapFacilityType(value: string): FacilityType {
  const typeMap: Record<string, FacilityType> = {
    트랙: FacilityType.TRACK,
    공원: FacilityType.PARK,
    "실내 러닝장": FacilityType.INDOOR,
    육상경기장: FacilityType.STADIUM,
    산책로: FacilityType.WALKWAY,
  };

  return typeMap[value] ?? FacilityType.PARK;
}

function mapFacilityStatus(value: string): FacilityStatus {
  const statusMap: Record<string, FacilityStatus> = {
    운영중: FacilityStatus.OPEN,
    "운영 종료": FacilityStatus.CLOSED,
    "24시간": FacilityStatus.ALWAYS_OPEN,
  };

  return statusMap[value] ?? FacilityStatus.OPEN;
}

function mapCrewLevel(value: string): CrewLevel {
  const levelMap: Record<string, CrewLevel> = {
    초보: CrewLevel.BEGINNER,
    중급: CrewLevel.INTERMEDIATE,
    고급: CrewLevel.ADVANCED,
    누구나: CrewLevel.ANYONE,
  };

  return levelMap[value] ?? CrewLevel.ANYONE;
}

function mapCrewRunType(value: string): CrewRunType {
  const runTypeMap: Record<string, CrewRunType> = {
    정기런: CrewRunType.REGULAR,
    번개런: CrewRunType.FLASH,
    장거리런: CrewRunType.LONG,
    초보런: CrewRunType.BEGINNER,
  };

  return runTypeMap[value] ?? CrewRunType.REGULAR;
}

function mapEquipmentCategory(value: string): EquipmentCategory {
  const categoryMap: Record<string, EquipmentCategory> = {
    러닝화: EquipmentCategory.SHOES,
    러닝복: EquipmentCategory.APPAREL,
    "GPS 워치": EquipmentCategory.GPS_WATCH,
    액세서리: EquipmentCategory.ACCESSORY,
  };

  return categoryMap[value] ?? EquipmentCategory.ACCESSORY;
}

function mapUserLevel(value: string): UserLevel {
  const levelMap: Record<string, UserLevel> = {
    초보: UserLevel.BEGINNER,
    중급: UserLevel.INTERMEDIATE,
    고급: UserLevel.ADVANCED,
    누구나: UserLevel.ANYONE,
  };

  return levelMap[value] ?? UserLevel.BEGINNER;
}

function mapPostCategory(value: string): PostCategory {
  const categoryMap: Record<string, PostCategory> = {
    "러닝 인증": PostCategory.RUN_CERTIFICATION,
    자유게시판: PostCategory.FREE_BOARD,
    질문: PostCategory.QUESTION,
    정보공유: PostCategory.INFORMATION,
    후기: PostCategory.REVIEW,
    크루모집: PostCategory.CREW_RECRUITING,
  };

  return categoryMap[value] ?? PostCategory.FREE_BOARD;
}

function authorIdByIndex(index: number): string {
  return seedUsers[index % 3].id;
}

async function resetSeedData() {
  await prisma.like.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.runningRecord.deleteMany();
  await prisma.crewMember.deleteMany();
  await prisma.crewSchedule.deleteMany();
  await prisma.report.deleteMany();
  await prisma.adminLog.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.equipmentItem.deleteMany();
  await prisma.runningCrew.deleteMany();
  await prisma.runningFacility.deleteMany();
  await prisma.runningCourse.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUserData() {
  for (const user of seedUsers) {
    await prisma.user.create({ data: user });
  }

  return seedUsers.length;
}

async function seedCourseData() {
  for (const course of runningCourses) {
    await prisma.runningCourse.create({
      data: {
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
        approvalStatus: ApprovalStatus.APPROVED,
        authorId: authorIdByIndex(course.id),
      },
    });
  }

  return runningCourses.length;
}

async function seedFacilityData() {
  for (const facility of runningFacilities) {
    await prisma.runningFacility.create({
      data: {
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
        approvalStatus: ApprovalStatus.APPROVED,
        authorId: authorIdByIndex(facility.id),
      },
    });
  }

  return runningFacilities.length;
}

async function seedCrewData() {
  for (const crew of runningCrews) {
    await prisma.runningCrew.create({
      data: {
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
        approvalStatus: ApprovalStatus.APPROVED,
      },
    });
  }

  return runningCrews.length;
}

async function seedEquipmentData() {
  for (const item of equipmentRecommendations) {
    await prisma.equipmentItem.create({
      data: {
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
        approvalStatus: ApprovalStatus.APPROVED,
        authorId: authorIdByIndex(item.id),
      },
    });
  }

  return equipmentRecommendations.length;
}

async function seedCommunityPostData() {
  for (const post of communityPosts) {
    await prisma.communityPost.create({
      data: {
        id: `seed-post-${post.id}`,
        title: post.title,
        content: communityPostDetails.find((detail) => detail.id === post.id)?.fullContent.join("\n\n") ?? post.content,
        category: mapPostCategory(post.category),
        tags: post.tags,
        authorId: authorIdByIndex(post.id),
      },
    });
  }

  return communityPosts.length;
}

async function seedCrewScheduleData() {
  let count = 0;

  for (const crew of crewDetails) {
    for (const schedule of crew.schedules) {
      await prisma.crewSchedule.create({
        data: {
          id: `seed-crew-schedule-${crew.id}-${schedule.id}`,
          crewId: `seed-crew-${crew.id}`,
          title: schedule.title,
          runType: mapCrewRunType(schedule.type),
          date: new Date(Date.UTC(2026, 6, Math.min(28, crew.id + schedule.id), 10 + schedule.id, 0, 0)),
          place: schedule.place,
          distanceKm: parseKm(schedule.distance),
          pace: schedule.pace,
          capacity: Number.parseInt(schedule.capacity, 10) || 12,
        },
      });
      count += 1;
    }
  }

  return count;
}

async function seedCrewMemberData() {
  let count = 0;

  for (const crew of runningCrews) {
    const members = [
      { userId: "seed-user-runner-2", role: CrewMemberRole.OWNER },
      { userId: "seed-user-runner-1", role: CrewMemberRole.MEMBER },
      { userId: "seed-user-runner-3", role: CrewMemberRole.MEMBER },
    ];

    for (const member of members) {
      await prisma.crewMember.create({
        data: {
          id: `seed-crew-member-${crew.id}-${member.userId}`,
          crewId: `seed-crew-${crew.id}`,
          userId: member.userId,
          role: member.role,
          status: CrewMemberStatus.ACTIVE,
        },
      });
      count += 1;
    }
  }

  return count;
}

async function seedRunningRecordData() {
  let count = 0;

  for (const post of communityPosts) {
    if (!post.runningRecord || post.runningRecord.time === "예정") {
      continue;
    }

    const recordId = `seed-running-record-${post.id}`;

    await prisma.runningRecord.create({
      data: {
        id: recordId,
        userId: authorIdByIndex(post.id),
        courseId: runningCourses[post.id % runningCourses.length] ? `seed-course-${runningCourses[post.id % runningCourses.length].id}` : null,
        distanceKm: parseKm(post.runningRecord.distance),
        durationSec: parseDurationToSeconds(post.runningRecord.time),
        pace: post.runningRecord.pace,
        memo: post.title,
        recordedAt: new Date(Date.UTC(2026, 5, Math.min(28, post.id + 1), 21, 0, 0)),
      },
    });

    await prisma.communityPost.update({
      where: { id: `seed-post-${post.id}` },
      data: { runningRecordId: recordId },
    });

    count += 1;
  }

  return count;
}

async function seedReviewData() {
  let count = 0;

  for (const course of courseDetails) {
    for (const review of course.reviews) {
      await prisma.review.create({
        data: {
          id: `seed-review-course-${course.id}-${review.id}`,
          userId: authorIdByIndex(review.id),
          targetType: ReviewTargetType.COURSE,
          targetId: `seed-course-${course.id}`,
          courseId: `seed-course-${course.id}`,
          rating: review.rating,
          content: review.content,
        },
      });
      count += 1;
    }
  }

  for (const facility of facilityDetails) {
    for (const review of facility.reviews) {
      await prisma.review.create({
        data: {
          id: `seed-review-facility-${facility.id}-${review.id}`,
          userId: authorIdByIndex(review.id),
          targetType: ReviewTargetType.FACILITY,
          targetId: `seed-facility-${facility.id}`,
          facilityId: `seed-facility-${facility.id}`,
          rating: review.rating,
          content: review.content,
        },
      });
      count += 1;
    }
  }

  for (const item of equipmentDetails) {
    for (const review of item.reviews) {
      await prisma.review.create({
        data: {
          id: `seed-review-equipment-${item.id}-${review.id}`,
          userId: authorIdByIndex(review.id),
          targetType: ReviewTargetType.EQUIPMENT,
          targetId: `seed-equipment-${item.id}`,
          equipmentId: `seed-equipment-${item.id}`,
          rating: review.rating,
          content: review.content,
        },
      });
      count += 1;
    }
  }

  return count;
}

async function seedCommentData() {
  let count = 0;

  for (const detail of communityPostDetails) {
    for (const comment of detail.commentsPreview) {
      await prisma.comment.create({
        data: {
          id: `seed-comment-${detail.id}-${comment.id}`,
          content: comment.content,
          authorId: authorIdByIndex(comment.id),
          postId: `seed-post-${detail.id}`,
        },
      });
      count += 1;
    }
  }

  return count;
}

async function seedBookmarkData() {
  const targets = [
    { targetType: BookmarkTargetType.COURSE, targetId: "seed-course-1", courseId: "seed-course-1" },
    { targetType: BookmarkTargetType.COURSE, targetId: "seed-course-4", courseId: "seed-course-4" },
    { targetType: BookmarkTargetType.FACILITY, targetId: "seed-facility-1", facilityId: "seed-facility-1" },
    { targetType: BookmarkTargetType.CREW, targetId: "seed-crew-1", crewId: "seed-crew-1" },
    { targetType: BookmarkTargetType.EQUIPMENT, targetId: "seed-equipment-1", equipmentId: "seed-equipment-1" },
    { targetType: BookmarkTargetType.POST, targetId: "seed-post-1", postId: "seed-post-1" },
  ];

  for (const [index, target] of targets.entries()) {
    await prisma.bookmark.create({
      data: {
        id: `seed-bookmark-${index + 1}`,
        userId: seedUsers[index % 3].id,
        ...target,
      },
    });
  }

  return targets.length;
}

async function seedLikeData() {
  const targets = [
    { targetType: LikeTargetType.POST, targetId: "seed-post-1", postId: "seed-post-1" },
    { targetType: LikeTargetType.POST, targetId: "seed-post-3", postId: "seed-post-3" },
    { targetType: LikeTargetType.COMMENT, targetId: "seed-comment-1-11", commentId: "seed-comment-1-11" },
    { targetType: LikeTargetType.RUNNING_RECORD, targetId: "seed-running-record-1", runningRecordId: "seed-running-record-1" },
  ];

  for (const [index, target] of targets.entries()) {
    await prisma.like.create({
      data: {
        id: `seed-like-${index + 1}`,
        userId: seedUsers[index % 3].id,
        ...target,
      },
    });
  }

  return targets.length;
}

async function seedReportData() {
  const reports = [
    {
      id: "seed-report-1",
      reporterId: "seed-user-runner-1",
      targetType: ReportTargetType.POST,
      targetId: "seed-post-6",
      targetPostId: "seed-post-6",
      reason: adminReports[0]?.title ?? "게시글 신고",
      status: ReportStatus.PENDING,
    },
    {
      id: "seed-report-2",
      reporterId: "seed-user-runner-3",
      targetType: ReportTargetType.COMMENT,
      targetId: "seed-comment-2-21",
      targetCommentId: "seed-comment-2-21",
      reason: adminReports[1]?.title ?? "댓글 신고",
      status: ReportStatus.REVIEWING,
    },
    {
      id: "seed-report-3",
      reporterId: "seed-user-runner-1",
      targetType: ReportTargetType.CREW,
      targetId: "seed-crew-3",
      targetCrewId: "seed-crew-3",
      reason: adminReports[2]?.title ?? "크루 신고",
      status: ReportStatus.PENDING,
    },
  ];

  for (const report of reports) {
    await prisma.report.create({ data: report });
  }

  return reports.length;
}

async function seedAdminLogData() {
  for (const activity of adminActivities) {
    await prisma.adminLog.create({
      data: {
        id: `seed-admin-log-${activity.id}`,
        adminId: "seed-user-admin-1",
        action: activity.type === "report" ? AdminLogAction.REPORT_RESOLVE : AdminLogAction.UPDATE,
        targetType: activity.type,
        targetId: String(activity.id),
        message: `${activity.title} - ${activity.description}`,
      },
    });
  }

  return adminActivities.length;
}

async function main() {
  console.log("Resetting existing seed data...");
  await resetSeedData();

  const counts = {
    users: await seedUserData(),
    courses: await seedCourseData(),
    facilities: await seedFacilityData(),
    crews: await seedCrewData(),
    equipment: await seedEquipmentData(),
    posts: await seedCommunityPostData(),
    crewSchedules: await seedCrewScheduleData(),
    crewMembers: await seedCrewMemberData(),
    runningRecords: await seedRunningRecordData(),
    reviews: await seedReviewData(),
    comments: await seedCommentData(),
    bookmarks: await seedBookmarkData(),
    likes: await seedLikeData(),
    reports: await seedReportData(),
    adminLogs: await seedAdminLogData(),
  };

  console.log("Seed completed.");
  for (const [key, value] of Object.entries(counts)) {
    console.log(`Seeded ${key}: ${value}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
