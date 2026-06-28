import { CalendarDays, Gauge, MapPin, Route, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail } from "@/types";

type CrewScheduleProps = { crew: CrewDetail };

export function CrewSchedule({ crew }: CrewScheduleProps) {
  return (
    <div>
      <SectionHeader label="CREW SCHEDULE" title="정기런과 번개런 일정" description="이번 주 참여 가능한 크루 러닝 일정을 확인하세요." compact className="mb-5" />
      <div className="grid gap-4 lg:grid-cols-3">
        {crew.schedules.map((schedule) => (
          <Card key={schedule.id} variant="hover" padding="lg" radius="xl" className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <Badge variant={schedule.type === "번개런" ? "info" : "green"}>{schedule.type}</Badge>
              <span className="rounded-full border border-run-border bg-run-bg px-3 py-1 text-xs font-black text-run-muted">{schedule.date}</span>
            </div>
            <h3 className="mt-5 break-keep text-xl font-black leading-7 text-run-text">{schedule.title}</h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-run-muted">
              <p className="flex items-center gap-2"><CalendarDays size={15} className="shrink-0 text-run-lime" />{schedule.time}</p>
              <p className="flex items-center gap-2"><MapPin size={15} className="shrink-0 text-run-lime" />{schedule.place}</p>
              <p className="flex items-center gap-2"><Route size={15} className="shrink-0 text-run-lime" />{schedule.distance}</p>
              <p className="flex items-center gap-2"><Gauge size={15} className="shrink-0 text-run-lime" />{schedule.pace}</p>
              <p className="flex items-center gap-2"><Users size={15} className="shrink-0 text-run-lime" />{schedule.capacity}</p>
            </div>
            <Button className="mt-6 w-full">참가 신청</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
