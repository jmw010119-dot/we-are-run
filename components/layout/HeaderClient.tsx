"use client";

import { useEffect, useState } from "react";
import { Bell, LogIn, Menu, Search } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { UserMenu, type HeaderUser } from "@/components/auth/UserMenu";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Navigation, type NavigationItem } from "@/components/layout/Navigation";

const navigationItems: NavigationItem[] = [
  { label: "코스", href: "/courses" },
  { label: "시설", href: "/facilities" },
  { label: "크루", href: "/crews" },
  { label: "장비추천", href: "/equipment" },
  { label: "커뮤니티", href: "/community" },
];

type HeaderClientProps = {
  user: HeaderUser | null;
};

export function HeaderClient({ user }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const headerClassName = [
    "sticky top-0 z-50 h-[84px] border-b border-white/[0.05] transition duration-200",
    isScrolled ? "bg-run-bg/95 backdrop-blur-2xl" : "bg-run-bg/78 backdrop-blur-lg",
  ].join(" ");

  return (
    <header className={headerClassName}>
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-7 xl:px-10">
        <Logo />

        <Navigation items={navigationItems} />

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="검색"
            className="grid h-11 w-11 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:bg-run-lime/10 hover:text-run-lime"
          >
            <Search size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="알림"
            className="grid h-11 w-11 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:bg-run-lime/10 hover:text-run-lime"
          >
            <Bell size={20} strokeWidth={2.2} />
          </button>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button
              href="/login"
              variant="secondary"
              size="sm"
              leftIcon={<LogIn size={16} />}
              className="rounded-md border-white/[0.06] bg-white/[0.02] px-4 text-run-text hover:border-run-lime/50 hover:bg-run-lime/10 hover:text-run-lime"
            >
              로그인
            </Button>
          )}
        </div>

        <button
          type="button"
          aria-label="모바일 메뉴 열기"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-text transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime lg:hidden"
        >
          <Menu size={22} strokeWidth={2.3} />
        </button>
      </div>

      <MobileMenu
        items={navigationItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
      />
    </header>
  );
}
