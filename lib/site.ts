export const siteConfig = {
  siteName: "WE ARE RUN",
  shortName: "WE RUN",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "WE ARE RUN | 대한민국 러닝 플랫폼",
  description:
    "전국 러닝 코스, 러닝 시설, 러닝 크루, 장비 추천, 러닝 인증 커뮤니티를 한곳에서 만나는 러너 중심 플랫폼입니다.",
  openGraphDescription: "코스부터 크루, 인증까지 러너를 위한 모든 것.",
  keywords: [
    "러닝",
    "러닝코스",
    "러닝크루",
    "러닝시설",
    "러닝화",
    "러닝인증",
    "마라톤",
    "조깅",
    "달리기",
  ],
  navItems: [
    { label: "코스", href: "/courses" },
    { label: "시설", href: "/facilities" },
    { label: "크루", href: "/crews" },
    { label: "장비추천", href: "/equipment" },
    { label: "커뮤니티", href: "/community" },
  ],
  socialLinks: [
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
    { label: "Threads", href: "" },
  ],
} as const;
