import type { InputHTMLAttributes, ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  buttonSlot?: ReactNode;
  icon?: ReactNode;
};

export function SearchInput({ buttonSlot, icon, className, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3 rounded-[22px] border border-white/[0.08] bg-[#0b1115]/82 p-3 backdrop-blur-2xl sm:h-[72px] sm:flex-row sm:items-center sm:gap-0 sm:p-2",
        className,
      )}
    >
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-[17px] px-4 text-run-muted">
        {icon ?? <Search size={22} strokeWidth={2.2} />}
        <input
          type="search"
          className="w-full bg-transparent text-[15px] font-semibold text-run-text outline-none placeholder:text-run-muted"
          {...props}
        />
      </label>
      {buttonSlot}
    </div>
  );
}
