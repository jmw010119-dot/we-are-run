import { Server } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Card } from "@/components/common/ui/Card";
import { adminServiceStatus } from "@/lib/mock";

const statusVariant = {
  정상: "green",
  주의: "warning",
  점검: "danger",
} as const;

export function AdminServiceStatus() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">SERVICE STATUS</p>
      <h2 className="mt-2 text-xl font-black text-run-text">서비스 상태</h2>
      <div className="mt-5 grid gap-3">
        {adminServiceStatus.map((item) => (
          <div key={item.id} className="rounded-[18px] border border-run-border bg-run-bg/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="flex min-w-0 items-center gap-2 break-keep text-sm font-black text-run-text"><Server size={14} className="shrink-0 text-run-lime" />{item.label}</p>
                <p className="mt-1 break-keep text-xs font-bold leading-5 text-run-muted">{item.description}</p>
              </div>
              <Badge variant={statusVariant[item.status]} className="shrink-0 tracking-[0.04em]">{item.status}</Badge>
            </div>
            <p className="mt-3 truncate text-lg font-black text-run-lime">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
