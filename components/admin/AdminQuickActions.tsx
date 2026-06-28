import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { adminQuickActions } from "@/lib/mock";

const uiOnlyActions = new Set(["회원 관리", "신고 관리"]);

export function AdminQuickActions() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">QUICK ACTIONS</p>
      <h2 className="mt-2 text-xl font-black text-run-text">빠른 작업</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {adminQuickActions.map((action) => {
          const isUiOnly = uiOnlyActions.has(action.label);

          return (
            <div key={action.id} className="flex min-w-0 flex-col rounded-[18px] border border-run-border bg-run-bg/70 p-4">
              <p className="break-keep text-sm font-black text-run-text">{action.label}</p>
              <p className="mt-2 break-keep text-xs font-bold leading-5 text-run-muted">{action.description}</p>
              <Button
                href={isUiOnly ? undefined : action.href}
                type="button"
                variant="secondary"
                size="sm"
                rightIcon={<ArrowUpRight size={15} />}
                className="mt-4 w-full"
              >
                이동
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
