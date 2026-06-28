import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-black tracking-[0.14em] text-run-text">{title}</h3>
      <ul className="mt-5 grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith("/") ? (
              <Link href={link.href} className="text-sm font-semibold text-run-muted transition duration-200 hover:text-run-lime">
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className="text-sm font-semibold text-run-muted transition duration-200 hover:text-run-lime">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
