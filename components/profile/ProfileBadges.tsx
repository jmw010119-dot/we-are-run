import { Award } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { profileBadges } from "@/lib/mock";
import type { ProfileBadge } from "@/types";

const toneClass = {
  green: "border-run-lime/25 bg-run-lime/10 text-run-lime",
  blue: "border-sky-300/25 bg-sky-300/10 text-sky-300",
  yellow: "border-yellow-300/25 bg-yellow-300/10 text-yellow-300",
};

type ProfileBadgesProps = {
  badges?: ProfileBadge[];
};

export function ProfileBadges({ badges = profileBadges }: ProfileBadgesProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">BADGES</p>
      <h2 className="mt-2 text-xl font-black text-run-text">러닝 배지</h2>
      <div className="mt-5 grid gap-3">
        {badges.map((badge) => (
          <div key={badge.id} className="flex gap-3 rounded-[18px] border border-run-border bg-run-bg/70 p-3">
            <span className={["grid h-10 w-10 shrink-0 place-items-center rounded-full border", toneClass[badge.tone]].join(" ")}><Award size={16} /></span>
            <div className="min-w-0">
              <p className="break-keep text-sm font-black text-run-text">{badge.name}</p>
              <p className="mt-1 break-keep text-xs font-bold leading-5 text-run-muted">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
