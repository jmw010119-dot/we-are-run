import { Chip } from "@/components/common/ui/Chip";

type AdminFilterTabsProps<T extends string> = {
  items: T[];
  activeItem: T;
  counts: Record<T, number>;
  onChange: (item: T) => void;
  ariaLabel: string;
};

export function AdminFilterTabs<T extends string>({ items, activeItem, counts, onChange, ariaLabel }: AdminFilterTabsProps<T>) {
  return (
    <div aria-label={ariaLabel} className="mb-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => {
        const selected = item === activeItem;

        return (
          <Chip key={item} selected={selected} onClick={() => onChange(item)} className="h-11 shrink-0 gap-2 px-4">
            <span>{item}</span>
            <span className={["grid min-w-6 place-items-center rounded-full px-2 py-0.5 text-[11px] font-black", selected ? "bg-run-bg/18 text-run-bg" : "bg-run-bg text-run-muted"].join(" ")}>
              {counts[item]}
            </span>
          </Chip>
        );
      })}
    </div>
  );
}
