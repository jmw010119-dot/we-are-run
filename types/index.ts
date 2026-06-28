import type { LucideIcon } from "lucide-react";

export type CourseDifficulty = "Easy" | "Normal" | "Hard";
export type CourseType = "공원" | "한강" | "트랙" | "도심" | "해안" | "산책로";

export type RunningCourse = {
  id: number;
  name: string;
  region: string;
  city: string;
  distance: string;
  difficulty: CourseDifficulty;
  type: CourseType;
  estimatedTime: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  description: string;
  isSaved: boolean;
  position: {
    top: string;
    left: string;
  };
  gradient: string;
};

export type CourseReview = {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
};

export type CourseAmenity = {
  toilet: string;
  parking: string;
  nightLight: string;
  convenienceStore: string;
  transit: string;
  difficultyNote: string;
};

export type CourseDetail = RunningCourse & {
  recommendedTime: string;
  elevation: string;
  coverLabel: string;
  startPoint: string;
  endPoint: string;
  nearbyPoints: string[];
  recommendPoints: string[];
  cautions: string[];
  recommendedFor: string[];
  amenities: CourseAmenity;
  reviews: CourseReview[];
};

export type PopularCourse = {
  id: number;
  title: string;
  location: string;
  distance: string;
  difficulty: CourseDifficulty;
  duration: string;
  rating: number;
  tags: [string, string];
  gradient: string;
};

export type CrewRunType = "정기런" | "번개런" | "장거리런" | "초보런";
export type CrewLevel = "초보" | "중급" | "고급" | "누구나";

export type RunningCrew = {
  id: number;
  name: string;
  region: string;
  city: string;
  memberCount: number;
  runTypes: CrewRunType[];
  regularRunDay: string;
  regularRunTime: string;
  hasFlashRun: boolean;
  level: CrewLevel;
  description: string;
  tags: string[];
  nextSchedule: string;
  isRecruiting: boolean;
  isJoined: boolean;
  avatarCount: number;
  gradient: string;
};

export type CrewScheduleItem = {
  id: number;
  title: string;
  type: CrewRunType;
  date: string;
  time: string;
  place: string;
  distance: string;
  pace: string;
  capacity: string;
};

export type CrewMember = {
  id: number;
  name: string;
  role: string;
  area: string;
};

export type CrewActivityItem = {
  id: number;
  author: string;
  distance: string;
  pace: string;
  message: string;
  likes: number;
  comments: number;
  gradient: string;
};

export type CrewDetail = RunningCrew & {
  averagePace: string;
  operationStyle: string[];
  joinCondition: string[];
  recommendedFor: string[];
  cautions: string[];
  schedules: CrewScheduleItem[];
  operators: CrewMember[];
  recentMembers: CrewMember[];
  activities: CrewActivityItem[];
  notices: string[];
  rules: string[];
  safetyRules: string[];
};
export type RecommendedCrew = {
  id: number;
  name: string;
  area: string;
  members: number;
  regularRun: string;
  flashRunAvailable: boolean;
  nextRun: string;
  pace: string;
  tags: [string, string, string];
  gradient: string;
};

export type RunningPost = {
  id: number;
  author: string;
  area: string;
  distance: string;
  message: string;
  likes: number;
};

export type RunningFeedItem = {
  id: number;
  author: string;
  area: string;
  avatarLabel: string;
  distance: string;
  duration: string;
  pace: string;
  message: string;
  likes: number;
  comments: number;
  uploadedAt: string;
  gradient: string;
};

export type QuickMenuItem = {
  id: number;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type DashboardStat = {
  id: number;
  title: string;
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  accent: string;
};

export type MapPinTone = "green" | "blue";

export type MapPinItem = {
  id: number;
  city: string;
  label: string;
  top: string;
  left: string;
  tone: MapPinTone;
};

export type MapPreviewCourse = {
  id: number;
  rank: number;
  title: string;
  location: string;
  distance: string;
  difficulty: CourseDifficulty;
  rating: number;
  gradient: string;
};

export type FacilityType = "트랙" | "공원" | "실내 러닝장" | "육상경기장" | "산책로";
export type FacilityStatus = "운영중" | "운영 종료" | "24시간";

export type RunningFacility = {
  id: number;
  name: string;
  region: string;
  city: string;
  type: FacilityType;
  status: FacilityStatus;
  rating: number;
  reviewCount: number;
  amenities: string[];
  address: string;
  hours: string;
  description: string;
  isSaved: boolean;
  position: {
    top: string;
    left: string;
  };
  gradient: string;
};


export type FacilityAmenityStatus = "가능" | "불가" | "확인 필요";

export type FacilityAmenityItem = {
  label: string;
  status: FacilityAmenityStatus;
  note: string;
};

export type FacilityNearbyCourse = {
  id: number;
  name: string;
  distance: string;
  difficulty: CourseDifficulty;
  walkingDistance: string;
};

export type FacilityReview = {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
};

export type FacilityDetail = RunningFacility & {
  coverLabel: string;
  mapLabel: string;
  recommendPoints: string[];
  cautions: string[];
  recommendedFor: string[];
  amenityStatus: FacilityAmenityItem[];
  nearbyCourses: FacilityNearbyCourse[];
  reviews: FacilityReview[];
};
export type EquipmentLevel = "초보" | "중급" | "고급";
export type EquipmentCategory = "러닝화" | "러닝복" | "GPS 워치" | "액세서리";
export type EquipmentPurpose = "데일리런" | "장거리" | "스피드" | "트레일" | "회복런";

export type EquipmentItem = {
  id: number;
  name: string;
  brand: string;
  category: EquipmentCategory;
  level: EquipmentLevel;
  purposes: EquipmentPurpose[];
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  recommendReason: string;
  isSaved: boolean;
  gradient: string;
};

export type EquipmentSpec = {
  weight: string;
  cushioning: string;
  stability: string;
  durability: string;
  breathability: string;
  recommendedDistance: string;
  useCase: string;
};

export type EquipmentPurposeFit = {
  purpose: EquipmentPurpose;
  score: number;
};

export type EquipmentReview = {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
};

export type AlternativeEquipment = {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
};

export type EquipmentDetail = EquipmentItem & {
  fitFor: string[];
  pros: string[];
  cons: string[];
  specs: EquipmentSpec;
  purposeFit: EquipmentPurposeFit[];
  reviews: EquipmentReview[];
  alternatives: AlternativeEquipment[];
};
export type EquipmentRecommendation = EquipmentItem;







export type CommunityCategory = "러닝 인증" | "자유게시판" | "질문" | "정보공유" | "후기" | "크루모집";

export type CommunityRunningRecord = {
  distance: string;
  time: string;
  pace: string;
};

export type CommunityPost = {
  id: number;
  category: CommunityCategory;
  authorName: string;
  authorRegion: string;
  authorAvatarLabel: string;
  createdAt: string;
  title: string;
  content: string;
  runningRecord?: CommunityRunningRecord;
  likes: number;
  comments: number;
  views: number;
  isSaved: boolean;
  tags: string[];
  gradient: string;
};

export type CommunityStats = {
  todayCertifications: string;
  totalPosts: string;
  weeklyComments: string;
  activeRunners: string;
};

export type PopularRunner = {
  id: number;
  name: string;
  region: string;
  avatarLabel: string;
  weeklyDistance: string;
  posts: number;
};

export type TrendingPost = {
  id: number;
  title: string;
  category: CommunityCategory;
  comments: number;
  views: number;
};

export type CommunityComment = {
  id: number;
  authorName: string;
  authorAvatarLabel: string;
  createdAt: string;
  content: string;
  likes: number;
};

export type CommunityPostDetail = CommunityPost & {
  fullContent: string[];
  commentsPreview: CommunityComment[];
  relatedPostIds: number[];
  authorStats: {
    posts: number;
    totalDistance: string;
    followers: string;
  };
};

export type ProfileUser = {
  nickname: string;
  region: string;
  level: string;
  avatarLabel: string;
  bio: string;
  followers: string;
  following: string;
};

export type ProfileStats = {
  totalDistance: string;
  monthlyDistance: string;
  averagePace: string;
  totalCertifications: string;
  joinedCrews: string;
  savedCourses: string;
};

export type ProfileActivity = {
  id: number;
  type: "running" | "post" | "schedule";
  title: string;
  description: string;
  meta: string;
  gradient?: string;
};

export type ProfileBadge = {
  id: number;
  name: string;
  description: string;
  tone: "green" | "blue" | "yellow";
};

export type ProfileGoal = {
  weeklyDistance: string;
  currentDistance: string;
  progress: number;
  message: string;
};

export type ProfileAction = {
  id: number;
  label: string;
  description: string;
  href: string;
};

export type ProfileSavedFacility = {
  id: number;
  name: string;
  region: string;
  city: string;
  type: FacilityType;
  amenities: string[];
  gradient: string;
};

export type ProfileMyPost = {
  id: number;
  title: string;
  category: CommunityCategory;
  likes: number;
  comments: number;
  createdAt: string;
};

export type AdminStat = {
  id: number;
  label: string;
  value: string;
  change: string;
  tone: "green" | "blue" | "yellow" | "red";
};

export type AdminActivity = {
  id: number;
  type: "course" | "crew" | "report" | "facility" | "member";
  title: string;
  description: string;
  createdAt: string;
  status: string;
};

export type AdminPendingApproval = {
  id: number;
  title: string;
  type: "코스" | "시설" | "크루" | "장비 추천";
  author: string;
  date: string;
};

export type AdminReport = {
  id: number;
  title: string;
  reportType: "게시글 신고" | "댓글 신고" | "크루 신고";
  count: number;
  status: "대기" | "검토중";
};

export type AdminServiceStatus = {
  id: number;
  label: string;
  value: string;
  status: "정상" | "주의" | "점검";
  description: string;
};

export type AdminQuickAction = {
  id: number;
  label: string;
  description: string;
  href: string;
};

export type AdminMemo = {
  title: string;
  content: string;
  updatedAt: string;
};
