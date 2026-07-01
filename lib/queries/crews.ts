import "server-only";

import { CrewLevel as DbCrewLevel, CrewRunType as DbCrewRunType } from "@/generated/prisma";
import { db } from "@/lib/db";
import type { CrewDetail, CrewLevel, CrewRunType, RunningCrew } from "@/types";

const crewGradients = [
  "from-run-lime/24 via-white/[0.035] to-transparent",
  "from-sky-400/24 via-white/[0.035] to-transparent",
  "from-cyan-300/20 via-white/[0.035] to-transparent",
  "from-lime-300/20 via-white/[0.035] to-transparent",
  "from-blue-300/18 via-white/[0.035] to-transparent",
  "from-yellow-300/18 via-white/[0.035] to-transparent",
  "from-purple-300/18 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
];

function mapCrewLevel(value: DbCrewLevel): CrewLevel {
  const levelMap: Record<DbCrewLevel, CrewLevel> = {
    BEGINNER: "초보",
    INTERMEDIATE: "중급",
    ADVANCED: "고급",
    ANYONE: "누구나",
  };

  return levelMap[value];
}

function mapCrewRunType(value: DbCrewRunType): CrewRunType {
  const runTypeMap: Record<DbCrewRunType, CrewRunType> = {
    REGULAR: "정기런",
    FLASH: "번개런",
    LONG: "장거리런",
    BEGINNER: "초보런",
  };

  return runTypeMap[value];
}

function getNumericId(id: string, slug: string) {
  const matched = slug.match(/(\d+)$/) ?? id.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatScheduleDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function formatScheduleTime(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDistance(value: { toString(): string } | null) {
  if (!value) {
    return "6km";
  }

  const distance = Number.parseFloat(value.toString());

  return `${Number.isInteger(distance) ? distance.toFixed(0) : distance.toFixed(1)}km`;
}

async function getDbRunningCrews() {
  return db.runningCrew.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      description: true,
      level: true,
      runTypes: true,
      regularRunDay: true,
      regularRunTime: true,
      hasFlashRun: true,
      isRecruiting: true,
      tags: true,
      members: {
        select: {
          id: true,
        },
      },
      schedules: {
        select: {
          title: true,
          date: true,
          place: true,
        },
        orderBy: {
          date: "asc",
        },
        take: 1,
      },
    },
    orderBy: {
      slug: "asc",
    },
  });
}

async function getDbRunningCrewById(id: string) {
  const numericId = Number.parseInt(id, 10);

  return db.runningCrew.findFirst({
    where: {
      OR: [
        { id },
        { id: `seed-crew-${id}` },
        ...(Number.isFinite(numericId) ? [{ slug: `crew-${numericId}` }] : []),
      ],
    },
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      city: true,
      description: true,
      level: true,
      runTypes: true,
      regularRunDay: true,
      regularRunTime: true,
      hasFlashRun: true,
      isRecruiting: true,
      tags: true,
      members: {
        select: {
          id: true,
          role: true,
          user: {
            select: {
              nickname: true,
              region: true,
              city: true,
            },
          },
        },
        orderBy: {
          joinedAt: "asc",
        },
      },
      schedules: {
        select: {
          id: true,
          title: true,
          runType: true,
          date: true,
          place: true,
          distanceKm: true,
          pace: true,
          capacity: true,
        },
        orderBy: {
          date: "asc",
        },
        take: 3,
      },
    },
  });
}

type DbRunningCrew = Awaited<ReturnType<typeof getDbRunningCrews>>[number];
type DbRunningCrewDetail = NonNullable<Awaited<ReturnType<typeof getDbRunningCrewById>>>;

export function mapDbCrewToCrewCard(crew: DbRunningCrew): RunningCrew {
  const numericId = getNumericId(crew.id, crew.slug);
  const fallbackIndex = Math.max(numericId - 1, 0) % crewGradients.length;
  const nextSchedule = crew.schedules[0]
    ? `${formatScheduleDate(crew.schedules[0].date)} ${formatScheduleTime(crew.schedules[0].date)} · ${crew.schedules[0].place}`
    : `${crew.regularRunDay ?? "요일 미정"} ${crew.regularRunTime ?? "시간 미정"} · ${crew.city}`;

  return {
    id: numericId,
    name: crew.name,
    region: crew.region,
    city: crew.city,
    memberCount: crew.members.length,
    runTypes: crew.runTypes.map(mapCrewRunType),
    regularRunDay: crew.regularRunDay ?? "",
    regularRunTime: crew.regularRunTime ?? "",
    hasFlashRun: crew.hasFlashRun,
    level: mapCrewLevel(crew.level),
    description: crew.description,
    tags: crew.tags,
    nextSchedule,
    isRecruiting: crew.isRecruiting,
    isJoined: false,
    avatarCount: Math.max(crew.members.length, 3),
    gradient: crewGradients[fallbackIndex],
  };
}

function memberRoleLabel(role: string) {
  const roleMap: Record<string, string> = {
    OWNER: "Crew Leader",
    LEADER: "Pace Leader",
    MEMBER: "Member",
  };

  return roleMap[role] ?? "Member";
}

export function mapDbCrewToCrewDetail(crew: DbRunningCrewDetail): CrewDetail {
  const crewCard = mapDbCrewToCrewCard({
    ...crew,
    schedules: crew.schedules.slice(0, 1),
    members: crew.members.map((member) => ({ id: member.id })),
  });
  const location = `${crew.region} ${crew.city}`;
  const isBeginner = crewCard.level === "초보";
  const isAdvanced = crewCard.level === "고급";
  const averagePace = isBeginner ? "6분30초 - 7분30초" : isAdvanced ? "4분50초 - 5분40초" : "5분40초 - 6분40초";
  const operators = crew.members.slice(0, 3).map((member, index) => ({
    id: index + 1,
    name: member.user.nickname ?? "러너",
    role: memberRoleLabel(member.role),
    area: member.user.city ?? member.user.region ?? crew.city,
  }));
  const recentMembers = crew.members.slice(-3).map((member, index) => ({
    id: index + 1,
    name: member.user.nickname ?? "러너",
    role: "Recent Member",
    area: member.user.city ?? member.user.region ?? crew.city,
  }));

  return {
    ...crewCard,
    averagePace,
    operationStyle: [
      `${crewCard.regularRunDay || "정기 요일"} ${crewCard.regularRunTime || "시간 협의"} 정기런을 중심으로 운영합니다.`,
      crewCard.hasFlashRun
        ? "평일 저녁과 주말 아침에 번개런 공지가 함께 올라옵니다."
        : "정기런 중심으로 안정적인 참여 흐름을 유지합니다.",
      "러닝 전후 워밍업, 스트레칭, 짧은 회고를 함께 진행합니다.",
    ],
    joinCondition: [
      `${crewCard.level} 레벨 러너를 중심으로 환영합니다.`,
      "첫 참여 전 크루 공지와 안전 수칙 확인이 필요합니다.",
      "무리한 기록 경쟁보다 꾸준한 참여와 배려를 중요하게 봅니다.",
    ],
    recommendedFor: [
      `${location} 근처에서 함께 달릴 사람을 찾는 러너`,
      isBeginner ? "혼자 시작하기 부담스러운 입문 러너" : "꾸준한 훈련 루틴을 만들고 싶은 러너",
      "러닝 인증과 커뮤니티 활동을 함께 즐기고 싶은 러너",
    ],
    cautions: [
      "개인 컨디션에 맞지 않는 무리한 페이스 참여는 피해주세요.",
      "야간런 참여 시 밝은 색 의류와 안전등 착용을 권장합니다.",
      "우천 또는 기상 악화 시 일정이 변경될 수 있습니다.",
    ],
    schedules: crew.schedules.map((schedule, index) => ({
      id: index + 1,
      title: schedule.title,
      type: mapCrewRunType(schedule.runType),
      date: formatScheduleDate(schedule.date),
      time: formatScheduleTime(schedule.date),
      place: schedule.place,
      distance: formatDistance(schedule.distanceKm),
      pace: schedule.pace ?? averagePace,
      capacity: `${schedule.capacity ?? 12}명 모집`,
    })),
    operators: operators.length > 0 ? operators : [{ id: 1, name: "크루 운영진", role: "Crew Leader", area: crew.city }],
    recentMembers:
      recentMembers.length > 0
        ? recentMembers
        : [{ id: 1, name: "신규 멤버", role: "Recent Member", area: crew.region }],
    activities: [
      {
        id: 1,
        author: "페이스 리더",
        distance: crew.schedules[0] ? formatDistance(crew.schedules[0].distanceKm) : "7.2km",
        pace: crew.schedules[0]?.pace ?? averagePace,
        message: `${crew.name}의 최근 정기런을 안정적인 페이스로 마무리했습니다.`,
        likes: 42,
        comments: 8,
        gradient: crewCard.gradient,
      },
      {
        id: 2,
        author: "크루 멤버",
        distance: "5.0km",
        pace: isBeginner ? "6분40초" : "5분55초",
        message: "첫 참여였는데 분위기가 좋아서 다음 일정도 신청했습니다.",
        likes: 31,
        comments: 5,
        gradient: "from-sky-400/20 via-white/[0.035] to-transparent",
      },
      {
        id: 3,
        author: "운영진",
        distance: "10.4km",
        pace: isAdvanced ? "5분05초" : "6분00초",
        message: "다음 러닝 코스와 집결지를 미리 점검했습니다.",
        likes: 55,
        comments: 11,
        gradient: "from-run-lime/20 via-white/[0.035] to-transparent",
      },
    ],
    notices: [
      "정기런 10분 전까지 집결지에 도착해주세요.",
      "기상 상황에 따라 일정은 당일 공지로 변경될 수 있습니다.",
    ],
    rules: [
      "서로의 페이스를 존중하며 무리한 경쟁을 지양합니다.",
      "불참 시 사전에 댓글 또는 메시지로 알려주세요.",
      "처음 참여하는 러너를 적극적으로 환영합니다.",
    ],
    safetyRules: [
      "야간런은 반사 소재 또는 안전등 착용을 권장합니다.",
      "통증이나 이상 징후가 있으면 즉시 페이스 리더에게 알려주세요.",
      "도로 횡단 구간에서는 반드시 신호를 준수합니다.",
    ],
  };
}

export async function getRunningCrews(): Promise<RunningCrew[]> {
  const crews = await getDbRunningCrews();

  return crews.map(mapDbCrewToCrewCard);
}

export async function getRunningCrewById(id: string): Promise<CrewDetail | null> {
  const crew = await getDbRunningCrewById(id);

  return crew ? mapDbCrewToCrewDetail(crew) : null;
}

export async function getRunningCrewIds(): Promise<string[]> {
  const crews = await db.runningCrew.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      slug: "asc",
    },
  });

  return crews
    .map((crew) => crew.slug.match(/(\d+)$/)?.[1])
    .filter((id): id is string => Boolean(id));
}
