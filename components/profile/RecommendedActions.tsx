import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { profileActions } from "@/lib/mock";
import type { ProfileAction } from "@/types";

type RecommendedActionsProps = {
  actions?: ProfileAction[];
};

export function RecommendedActions({ actions = profileActions }: RecommendedActionsProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">NEXT ACTION</p>
      <h2 className="mt-2 text-xl font-black text-run-text">추천 액션</h2>
      <div className="mt-5 grid gap-3">
        {actions.map((action) => (
          <div key={action.id} className="rounded-[18px] border border-run-border bg-run-bg/70 p-4">
            <p className="break-keep text-sm font-black text-run-text">{action.label}</p>
            <p className="mt-2 break-keep text-xs font-bold leading-5 text-run-muted">{action.description}</p>
            <Button href={action.href} variant="secondary" size="sm" rightIcon={<ArrowUpRight size={15} />} className="mt-4 w-full">
              이동하기
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
