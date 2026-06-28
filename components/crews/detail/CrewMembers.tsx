import { Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import type { CrewDetail, CrewMember } from "@/types";

type CrewMembersProps = { crew: CrewDetail };

function MemberRow({ member }: { member: CrewMember }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-[16px] border border-run-border bg-run-bg/70 p-3 transition duration-200 hover:border-run-lime/35 hover:bg-run-card-hover">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-run-lime text-sm font-black text-run-bg">{member.id}</span>
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-run-text">{member.name}</p>
        <p className="truncate text-xs font-bold text-run-muted">{member.role} · {member.area}</p>
      </div>
    </div>
  );
}

export function CrewMembers({ crew }: CrewMembersProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl" className="h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-run-lime">CREW MEMBERS</p>
          <h2 className="mt-2 break-keep text-2xl font-black text-run-text">운영진과 최근 멤버</h2>
        </div>
        <span className="inline-flex w-fit rounded-full border border-run-lime/25 bg-run-lime/10 px-3 py-1 text-xs font-black text-run-lime">
          <Users size={13} className="mr-1" />{crew.memberCount}명
        </span>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-black tracking-[0.14em] text-run-muted">운영진</p>
          <div className="grid gap-3">{crew.operators.map((member) => <MemberRow key={member.id} member={member} />)}</div>
        </div>
        <div>
          <p className="mb-3 text-xs font-black tracking-[0.14em] text-run-muted">최근 가입 멤버</p>
          <div className="grid gap-3">{crew.recentMembers.map((member) => <MemberRow key={member.id} member={member} />)}</div>
        </div>
      </div>
      <Button variant="secondary" className="mt-5 w-full sm:w-auto">전체 멤버 보기</Button>
    </Card>
  );
}
