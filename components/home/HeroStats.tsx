type StatItem = {
  label: string;
  value: string;
};

type HeroStatsProps = {
  items: StatItem[];
};

export function HeroStats({ items }: HeroStatsProps) {
  return (
    <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-4 py-4 backdrop-blur-xl">
          <p className="text-xl font-black text-run-text sm:text-2xl">{item.value}</p>
          <p className="mt-1 text-xs font-bold text-run-muted sm:text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
