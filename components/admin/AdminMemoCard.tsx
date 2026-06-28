import { StickyNote } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { adminMemo } from "@/lib/mock";

export function AdminMemoCard() {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-run-lime/10 blur-[46px]" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime"><StickyNote size={18} /></span>
          <div className="min-w-0">
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">OPERATION MEMO</p>
            <h2 className="mt-1 break-keep text-xl font-black text-run-text">{adminMemo.title}</h2>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-[18px] border border-run-border bg-run-bg/70 p-4">
        <p className="break-keep text-sm font-semibold leading-6 text-run-muted">{adminMemo.content}</p>
      </div>
      <p className="mt-4 text-xs font-bold text-run-muted">{adminMemo.updatedAt}</p>
    </Card>
  );
}
