import Link from "next/link";
import { MessageCircle, Music2, Send } from "lucide-react";
import { FooterLinkGroup } from "@/components/layout/FooterLinkGroup";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";

const footerLinkGroups = [
  {
    title: "서비스",
    links: [
      { label: "러닝 코스", href: "/courses" },
      { label: "러닝 시설", href: "/facilities" },
      { label: "러닝 크루", href: "/crews" },
      { label: "장비 추천", href: "/equipment" },
    ],
  },
  {
    title: "커뮤니티",
    links: [
      { label: "러닝 인증", href: "/community" },
      { label: "자유게시판", href: "/community" },
      { label: "정기런", href: "/crews" },
      { label: "번개런", href: "/crews" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "공지사항", href: "/community" },
      { label: "문의하기", href: "/community" },
      { label: "이용약관", href: "/" },
      { label: "개인정보처리방침", href: "/" },
    ],
  },
];

const socialLinks = [
  { label: "소식 공유", icon: Send },
  { label: "커뮤니티", icon: MessageCircle },
  { label: "러닝 숏폼", icon: Music2 },
];

export function Footer() {
  return (
    <footer className="border-t border-run-border bg-run-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-7 md:py-16 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.4fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="WE ARE RUN 홈으로 이동"
              className="inline-flex text-2xl font-black tracking-[0.18em] text-run-text transition duration-200 hover:text-run-lime"
            >
              WE ARE&nbsp;<span className="text-run-lime">RUN</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-run-muted">
              코스부터 크루, 인증까지 러너를 위한 모든 것.
            </p>

            <div className="mt-7 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-run-border bg-run-card text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime"
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>

            <p className="mt-8 text-xs font-semibold text-run-muted">
              © 2026 WE ARE RUN. All rights reserved.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinkGroups.map((group) => (
              <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
            ))}
          </div>

          <FooterNewsletter />
        </div>
      </div>
    </footer>
  );
}
