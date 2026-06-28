import Link from "next/link";

export type NavigationItem = {
  label: string;
  href: string;
};

type NavigationProps = {
  items: NavigationItem[];
  activeHref?: string;
};

export function Navigation({ items, activeHref }: NavigationProps) {
  return (
    <nav aria-label="주요 메뉴" className="hidden items-center gap-9 lg:flex">
      {items.map((item) => {
        const isActive = activeHref ? item.href === activeHref : false;
        const underlineClassName = [
          "absolute bottom-0 left-0 h-[2px] rounded-full bg-run-lime transition-all duration-200",
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
        ].join(" ");

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className="group relative py-3 text-[15px] font-bold text-run-muted transition duration-200 hover:scale-[1.03] hover:text-run-lime"
          >
            {item.label}
            <span className={underlineClassName} />
          </Link>
        );
      })}
    </nav>
  );
}
