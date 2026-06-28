import { AlertTriangle, FileText, MapPinned, Route, ShieldCheck, Users } from "lucide-react";
import { Card } from "@/components/common/ui/Card";
import { Section } from "@/components/common/ui/Section";
import { adminStats } from "@/lib/mock";

const icons = [<Users key="members" size={16} />, <Route key="courses" size={16} />, <MapPinned key="facilities" size={16} />, <ShieldCheck key="crews" size={16} />, <FileText key="posts" size={16} />, <AlertTriangle key="reports" size={16} />];

const toneClass = {
  green: "text-run-lime border-run-lime/25 bg-run-lime/10",
  blue: "text-sky-300 border-sky-300/25 bg-sky-300/10",
  yellow: "text-yellow-300 border-yellow-300/25 bg-yellow-300/10",
  red: "text-red-300 border-red-300/25 bg-red-300/10",
};

export function AdminSummaryStats() {
  return (
    <Section spacing="sm" className="pt-0" containerClassName="max-w-[1320px]">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {adminStats.map((stat, index) => (
          <Card key={stat.id} variant="hover" padding="lg" radius="xl" className="flex min-h-[138px] min-w-0 flex-col justify-between sm:min-h-[148px]">
            <div className="flex items-start justify-between gap-3">
              <p className="break-keep text-xs font-black tracking-[0.12em] text-run-muted">{stat.label}</p>
              <span className={["grid h-9 w-9 shrink-0 place-items-center rounded-full border", toneClass[stat.tone]].join(" ")}>{icons[index]}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-2xl font-black text-run-text sm:text-3xl">{stat.value}</p>
              <p className="mt-2 break-keep text-xs font-bold leading-5 text-run-muted">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
