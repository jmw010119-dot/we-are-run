import type {
  EquipmentItem,
  ProfileAction,
  ProfileActivity,
  ProfileBadge,
  ProfileGoal,
  ProfileMyPost,
  ProfileSavedFacility,
  ProfileStats,
  ProfileUser,
  RunningCourse,
  RunningCrew,
} from "@/types";

export const profileUser: ProfileUser = {
  nickname: "한강페이서",
  region: "서울 영등포",
  level: "중급 러너",
  avatarLabel: "한",
  bio: "퇴근 후 한강을 달리고, 주말에는 크루와 롱런을 즐기는 러너입니다.",
  followers: "1.8k",
  following: "248",
};

export const profileStats: ProfileStats = {
  totalDistance: "1,284km",
  monthlyDistance: "186km",
  averagePace: "5'24\"",
  totalCertifications: "142",
  joinedCrews: "4",
  savedCourses: "28",
};

export const profileActivities: ProfileActivity[] = [
  {
    id: 1,
    type: "running",
    title: "여의도 한강 8.2K 인증",
    description: "마지막 2km 페이스 업. 컨디션이 꽤 좋았습니다.",
    meta: "오늘 · 8.2km · 5'16\"",
    gradient: "from-lime-300/24 via-emerald-400/12 to-sky-500/16",
  },
  {
    id: 2,
    type: "post",
    title: "야간런 안전 체크리스트 댓글 참여",
    description: "반사 밴드와 밝은 상의 추천 의견을 남겼습니다.",
    meta: "2시간 전 · 정보공유",
    gradient: "from-sky-400/18 via-run-card to-run-card",
  },
  {
    id: 3,
    type: "schedule",
    title: "토요 롱런 크루 일정 참여 예정",
    description: "잠실 출발 18K, 대화 가능한 강도로 진행합니다.",
    meta: "이번 토요일 · 18km",
    gradient: "from-run-lime/18 via-yellow-300/10 to-run-card",
  },
  {
    id: 4,
    type: "running",
    title: "트랙 400m 반복주 완료",
    description: "페이스를 일정하게 유지하는 연습을 했습니다.",
    meta: "어제 · 7.6km · 5'25\"",
    gradient: "from-purple-300/16 via-sky-300/10 to-run-card",
  },
  {
    id: 5,
    type: "post",
    title: "첫 하프 준비 질문 저장",
    description: "주 3회 훈련 루틴 참고용으로 저장했습니다.",
    meta: "어제 · 질문",
    gradient: "from-amber-300/16 via-run-card to-run-card",
  },
  {
    id: 6,
    type: "schedule",
    title: "수요일 회복런 참석",
    description: "대화 가능한 속도로 6K 회복런을 진행했습니다.",
    meta: "이번 주 · 6km",
    gradient: "from-cyan-300/18 via-run-card to-run-card",
  },
  {
    id: 7,
    type: "running",
    title: "새벽 조깅 루틴 유지",
    description: "30분 가볍게 뛰고 스트레칭으로 마무리했습니다.",
    meta: "3일 전 · 5.4km",
    gradient: "from-slate-300/14 via-sky-300/10 to-run-card",
  },
  {
    id: 8,
    type: "post",
    title: "러닝화 추천 글 작성",
    description: "데일리런용 쿠션화 선택 기준을 공유했습니다.",
    meta: "4일 전 · 장비 팁",
    gradient: "from-orange-300/16 via-run-card to-run-card",
  },
  {
    id: 9,
    type: "schedule",
    title: "한강 브릿지런 번개런 참여",
    description: "짧지만 리듬감 있게 달린 번개런이었습니다.",
    meta: "지난주 · 10km",
    gradient: "from-run-lime/18 via-emerald-300/10 to-run-card",
  },
];

export const profileSavedCourses: Pick<RunningCourse, "id" | "name" | "region" | "city" | "distance" | "difficulty" | "rating" | "gradient">[] = [
  { id: 1, name: "여의도 한강 루프", region: "서울", city: "영등포", distance: "8.2km", difficulty: "Normal", rating: 4.9, gradient: "from-lime-300/24 via-emerald-400/12 to-sky-500/16" },
  { id: 4, name: "광안리 오션 코스", region: "부산", city: "수영", distance: "6.4km", difficulty: "Easy", rating: 4.8, gradient: "from-blue-400/24 via-cyan-300/12 to-run-card" },
  { id: 7, name: "서울 올림픽공원 트랙", region: "서울", city: "송파구", distance: "3.8km", difficulty: "Normal", rating: 4.8, gradient: "from-run-lime/20 via-yellow-300/10 to-run-card" },
];

export const profileJoinedCrews: Pick<RunningCrew, "id" | "name" | "region" | "city" | "memberCount" | "level" | "nextSchedule" | "gradient">[] = [
  { id: 1, name: "한강 나이트 러너스", region: "서울", city: "여의도", memberCount: 182, level: "누구나", nextSchedule: "수요일 20:00", gradient: "from-run-lime/20 via-emerald-300/10 to-run-card" },
  { id: 3, name: "잠실 롱런 클럽", region: "서울", city: "송파", memberCount: 96, level: "중급", nextSchedule: "토요일 08:00", gradient: "from-sky-400/18 via-run-card to-run-card" },
  { id: 7, name: "초보 환영런", region: "경기", city: "수원", memberCount: 141, level: "초보", nextSchedule: "수요일 19:30", gradient: "from-emerald-300/18 via-lime-300/10 to-run-card" },
];

export const profileSavedEquipment: Pick<EquipmentItem, "id" | "name" | "brand" | "category" | "level" | "price" | "rating" | "gradient">[] = [
  { id: 1, name: "AirFlow Daily Trainer", brand: "Runova", category: "러닝화", level: "초보", price: 129000, rating: 4.8, gradient: "from-lime-300/20 via-emerald-300/10 to-run-card" },
  { id: 5, name: "GPS Pace Watch X", brand: "MetricFit", category: "GPS 워치", level: "중급", price: 329000, rating: 4.7, gradient: "from-sky-400/20 via-cyan-300/10 to-run-card" },
  { id: 8, name: "Carbon Race Edge", brand: "Runova", category: "러닝화", level: "고급", price: 289000, rating: 4.9, gradient: "from-yellow-300/18 via-run-card to-run-card" },
];

export const profileBadges: ProfileBadge[] = [
  { id: 1, name: "월간 100K", description: "이번 달 100km 이상 달성", tone: "green" },
  { id: 2, name: "새벽 러너", description: "오전 7시 이전 러닝 10회", tone: "blue" },
  { id: 3, name: "커뮤니티 스타", description: "인증글 좋아요 1,000개", tone: "yellow" },
];

export const profileGoals: ProfileGoal = {
  weeklyDistance: "45km",
  currentDistance: "31.4km",
  progress: 70,
  message: "이번 주 목표까지 13.6km 남았습니다.",
};

export const profileActions: ProfileAction[] = [
  { id: 1, label: "코스 찾아보기", description: "이번 주 달릴 새로운 루트를 찾아보세요.", href: "/courses" },
  { id: 2, label: "크루 가입하기", description: "함께 달릴 러너들을 만나보세요.", href: "/crews" },
  { id: 3, label: "인증 남기기", description: "오늘의 러닝 기록을 커뮤니티에 공유해보세요.", href: "/community" },
];
export const profileSavedFacilities: ProfileSavedFacility[] = [
  {
    id: 1,
    name: "여의도공원 러닝 트랙",
    region: "서울",
    city: "영등포",
    type: "트랙",
    amenities: ["화장실", "조명", "주차"],
    gradient: "from-lime-300/20 via-emerald-300/10 to-run-card",
  },
  {
    id: 3,
    name: "잠실종합운동장 보조경기장",
    region: "서울",
    city: "송파",
    type: "육상경기장",
    amenities: ["샤워실", "보관함", "조명"],
    gradient: "from-sky-400/20 via-cyan-300/10 to-run-card",
  },
  {
    id: 6,
    name: "광교 호수공원 러닝존",
    region: "경기",
    city: "수원",
    type: "공원",
    amenities: ["화장실", "음수대", "주차"],
    gradient: "from-emerald-300/18 via-lime-300/10 to-run-card",
  },
];

export const profileMyPosts: ProfileMyPost[] = [
  { id: 1, title: "퇴근 후 여의도 8K, 오늘 바람이 딱 좋았어요", category: "러닝 인증", likes: 342, comments: 28, createdAt: "오늘" },
  { id: 8, title: "인터벌 다음날 회복런은 어느 정도가 좋을까요?", category: "정보공유", likes: 154, comments: 24, createdAt: "4시간 전" },
  { id: 12, title: "새벽런 성공하는 작은 루틴 공유합니다", category: "자유게시판", likes: 241, comments: 44, createdAt: "어제" },
];

