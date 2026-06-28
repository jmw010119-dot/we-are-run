import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/common/ui/Card";

const guides = ["서로의 페이스를 존중하기", "개인정보와 위치 정보는 신중하게 공유하기", "크루 모집 시 일정과 난이도 명확히 적기", "부상 조언은 의료 상담을 대신하지 않기"];

export function CommunityGuide() {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">
          <ShieldCheck size={18} />
        </span>
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">GUIDE</p>
          <h2 className="mt-1 text-xl font-black text-run-text">커뮤니티 가이드</h2>
        </div>
      </div>
      <ul className="mt-5 grid gap-3">
        {guides.map((guide) => (
          <li key={guide} className="flex gap-3 text-sm font-semibold leading-6 text-run-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-run-lime" />
            <span className="break-keep">{guide}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
