import { Award, Dumbbell, Map, MapPin, Users } from "lucide-react";
import type { DashboardStat, QuickMenuItem } from "@/types";

export const quickMenus: QuickMenuItem[] = [
  { id: 1, label: "러닝 코스", description: "전국 인기 러닝 루트", href: "/courses", icon: Map },
  { id: 2, label: "러닝 시설", description: "트랙, 공원, 편의시설", href: "/facilities", icon: MapPin },
  { id: 3, label: "러닝 크루", description: "함께 달릴 사람 찾기", href: "/crews", icon: Users },
  { id: 4, label: "장비 추천", description: "러너를 위한 장비 큐레이션", href: "/equipment", icon: Dumbbell },
  { id: 5, label: "러닝 인증", description: "오늘의 기록과 피드", href: "/community", icon: Award },
];

export const dashboardStats: DashboardStat[] = [
  {
    id: 1,
    title: "전국 러닝 코스",
    primaryLabel: "총 등록 코스 수",
    primaryValue: "428",
    secondaryLabel: "오늘 추천 코스 수",
    secondaryValue: "24",
    accent: "COURSE",
  },
  {
    id: 2,
    title: "러닝 크루",
    primaryLabel: "활동 중 크루 수",
    primaryValue: "1,284",
    secondaryLabel: "오늘 모집 중",
    secondaryValue: "86",
    accent: "CREW",
  },
  {
    id: 3,
    title: "이번 주 러닝",
    primaryLabel: "이번 주 등록 러닝 수",
    primaryValue: "312",
    secondaryLabel: "참여 인원",
    secondaryValue: "6,920",
    accent: "WEEKLY",
  },
  {
    id: 4,
    title: "러닝 인증",
    primaryLabel: "오늘 업로드 수",
    primaryValue: "742",
    secondaryLabel: "좋아요 수",
    secondaryValue: "18.6K",
    accent: "FEED",
  },
];
