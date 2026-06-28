import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";

type HeroCTAProps = {
  primaryLabel: string;
  secondaryLabel: string;
};

export function HeroCTA({ primaryLabel, secondaryLabel }: HeroCTAProps) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <Button
        href="/courses"
        size="lg"
        rightIcon={<ArrowRight size={18} strokeWidth={2.5} />}
        className="text-sm hover:scale-[1.03]"
      >
        {primaryLabel}
      </Button>
      <Button
        href="/crews"
        variant="outline"
        size="lg"
        leftIcon={<Users size={18} strokeWidth={2.4} />}
        className="border-white/[0.09] bg-white/[0.025] text-sm backdrop-blur-xl hover:scale-[1.03] hover:bg-white/[0.025]"
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}
