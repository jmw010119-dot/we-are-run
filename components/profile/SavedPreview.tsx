import { ArrowUpRight, Star, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { profileJoinedCrews, profileSavedCourses, profileSavedEquipment } from "@/lib/mock";

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function SavedPreview() {
  return (
    <div>
      <SectionHeader
        label="SAVED"
        title="저장하고 참여 중인 항목"
        description="관심 있는 코스, 크루, 장비를 빠르게 다시 확인할 수 있습니다."
        compact
        className="mb-5"
      />
      <div className="grid gap-5">
        <Card variant="glass" padding="lg" radius="xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-run-lime">COURSES</p>
              <h3 className="mt-2 text-xl font-black text-run-text">저장한 코스</h3>
            </div>
            <Button href="/courses" variant="ghost" size="sm" rightIcon={<ArrowUpRight size={15} />}>전체보기</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {profileSavedCourses.map((course) => (
              <div key={course.id} className="rounded-[20px] border border-run-border bg-run-bg/70 p-4">
                <div className={["mb-4 h-20 rounded-[16px] border border-white/[0.08] bg-gradient-to-br", course.gradient].join(" ")} />
                <h4 className="break-keep text-base font-black text-run-text">{course.name}</h4>
                <p className="mt-2 text-xs font-bold text-run-muted">{course.region} {course.city} · {course.distance}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-black text-run-lime"><Star size={13} fill="currentColor" />{course.rating}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5 xl:grid-cols-2">
          <Card variant="glass" padding="lg" radius="xl">
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">CREWS</p>
            <h3 className="mt-2 text-xl font-black text-run-text">가입한 크루</h3>
            <div className="mt-5 grid gap-3">
              {profileJoinedCrews.map((crew) => (
                <div key={crew.id} className="flex items-center gap-3 rounded-[18px] border border-run-border bg-run-bg/70 p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime"><Users size={16} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-run-text">{crew.name}</p>
                    <p className="mt-1 text-xs font-bold text-run-muted">{crew.region} {crew.city} · {crew.nextSchedule}</p>
                  </div>
                  <Badge variant="green">{crew.level}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" padding="lg" radius="xl">
            <p className="text-xs font-black tracking-[0.18em] text-run-lime">EQUIPMENT</p>
            <h3 className="mt-2 text-xl font-black text-run-text">관심 장비</h3>
            <div className="mt-5 grid gap-3">
              {profileSavedEquipment.map((item) => (
                <div key={item.id} className="rounded-[18px] border border-run-border bg-run-bg/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-run-text">{item.name}</p>
                      <p className="mt-1 text-xs font-bold text-run-muted">{item.brand} · {item.category}</p>
                    </div>
                    <span className="shrink-0 text-xs font-black text-run-lime">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
