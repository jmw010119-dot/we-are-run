import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="WE ARE RUN 홈으로 이동"
      className="group inline-flex items-center text-[20px] font-black tracking-[0.18em] text-run-text transition duration-200 hover:scale-[1.03]"
    >
      <span>WE ARE&nbsp;</span>
      <span className="text-run-lime drop-shadow-[0_0_18px_rgba(183,255,42,0.34)]">RUN</span>
    </Link>
  );
}
