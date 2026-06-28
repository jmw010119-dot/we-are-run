import { Bookmark, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { EquipmentDetail } from "@/types";

type EquipmentDetailCTAProps = { item: EquipmentDetail };

export function EquipmentDetailCTA({ item }: EquipmentDetailCTAProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="overflow-hidden">
      <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.7fr)] xl:items-center">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-run-lime/10 blur-[70px]" />

        <div className="relative min-w-0">
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">NEXT ACTION</p>
          <h2 className="mt-3 max-w-3xl break-keep text-2xl font-black leading-tight text-run-text sm:text-3xl">
            {item.name}를 내 장비 리스트에 담아보세요
          </h2>
          <p className="mt-3 max-w-2xl break-keep text-sm font-semibold leading-6 text-run-muted">
            저장하고, 비슷한 장비를 비교하거나 직접 사용 후기를 남겨보세요.
          </p>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-3 xl:min-w-[520px]">
          <Button className="w-full" leftIcon={<Bookmark size={17} />}>
            장비 저장하기
          </Button>
          <Button href="/equipment" className="w-full" variant="secondary" leftIcon={<Search size={17} />}>
            비슷한 장비 보기
          </Button>
          <Button href="/community" className="w-full" variant="outline" leftIcon={<MessageSquare size={17} />}>
            장비 후기 남기기
          </Button>
        </div>
      </div>
    </Card>
  );
}
