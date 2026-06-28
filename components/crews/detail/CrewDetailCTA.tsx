import { Radio, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail } from "@/types";

type CrewDetailCTAProps = { crew: CrewDetail };

export function CrewDetailCTA({ crew }: CrewDetailCTAProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative grid gap-6 xl:grid-cols-[1fr_auto] xl:items-center">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-run-lime/10 blur-[70px]" />
        <div className="relative min-w-0">
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">JOIN CREW</p>
          <h2 className="mt-3 max-w-3xl break-keep text-2xl font-black leading-tight text-run-text sm:text-3xl">
            {crew.name}와 함께 다음 러닝을 시작하세요
          </h2>
          <p className="mt-3 max-w-2xl break-keep text-sm font-semibold leading-6 text-run-muted">
            크루에 가입하고 정기런을 신청하거나 직접 번개런을 만들어보세요.
          </p>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-3 xl:min-w-[520px]">
          <Button className="w-full" leftIcon={<UserPlus size={17} />}>크루 가입하기</Button>
          <Button className="w-full" variant="secondary" leftIcon={<Radio size={17} />}>정기런 신청하기</Button>
          <Button className="w-full" variant="outline" leftIcon={<Zap size={17} />}>번개런 만들기</Button>
        </div>
      </div>
    </Card>
  );
}
