import Link from "next/link";
import { Bell, Search, UserCircle, X } from "lucide-react";
import type { NavigationItem } from "@/components/layout/Navigation";

type MobileMenuProps = {
  items: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const rootClassName = ["lg:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none"].join(" ");
  const overlayClassName = [
    "fixed inset-0 top-[84px] z-40 bg-run-bg/70 backdrop-blur-md transition-opacity duration-200",
    isOpen ? "opacity-100" : "opacity-0",
  ].join(" ");
  const panelClassName = [
    "fixed right-4 top-[100px] z-50 w-[calc(100%-32px)] max-w-sm overflow-hidden rounded-md border border-white/[0.07] bg-[#0b1014]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-200 sm:right-6",
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
  ].join(" ");

  return (
    <div className={rootClassName} aria-hidden={!isOpen}>
      <div className={overlayClassName} onClick={onClose} />

      <aside className={panelClassName}>
        <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
          <p className="text-sm font-black tracking-[0.16em] text-run-text">MENU</p>
          <button
            type="button"
            aria-label="모바일 메뉴 닫기"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/[0.06] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="모바일 주요 메뉴" className="grid gap-1 p-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-md px-4 py-4 text-base font-extrabold text-run-text transition duration-200 hover:scale-[1.01] hover:bg-run-lime hover:text-run-bg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-3 gap-2 border-t border-white/[0.05] p-3">
          <button type="button" aria-label="검색" className="grid min-h-16 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime">
            <Search size={21} />
          </button>
          <button type="button" aria-label="알림" className="grid min-h-16 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime">
            <Bell size={21} />
          </button>
          <Link href="/profile" onClick={onClose} aria-label="프로필" className="grid min-h-16 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-run-muted transition duration-200 hover:scale-[1.03] hover:border-run-lime/50 hover:text-run-lime">
            <UserCircle size={21} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
