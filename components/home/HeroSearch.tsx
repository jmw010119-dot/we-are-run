import { Button } from "@/components/common/ui/Button";
import { SearchInput } from "@/components/common/ui/SearchInput";

type HeroSearchProps = {
  placeholder: string;
  buttonLabel: string;
};

export function HeroSearch({ placeholder, buttonLabel }: HeroSearchProps) {
  return (
    <SearchInput
      aria-label="러닝 정보 검색"
      placeholder={placeholder}
      className="mt-10 max-w-[720px]"
      buttonSlot={
        <Button size="md" className="h-12 rounded-[17px] px-7 text-sm hover:scale-[1.03] sm:h-14">
          {buttonLabel}
        </Button>
      }
    />
  );
}
