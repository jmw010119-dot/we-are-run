import { Settings, UserPen } from "lucide-react";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { IconButton } from "@/components/common/ui/IconButton";
import { Section } from "@/components/common/ui/Section";
import { profileUser } from "@/lib/mock";
import type { ProfileUser } from "@/types";

type ProfileHeroProps = {
  user?: ProfileUser;
};

export function ProfileHero({ user = profileUser }: ProfileHeroProps) {
  return (
    <Section spacing="lg" className="overflow-hidden pt-12 md:pt-20" containerClassName="max-w-[1320px]">
      <div className="pointer-events-none absolute right-[-14rem] top-0 h-[34rem] w-[34rem] rounded-full bg-run-lime/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-[-12rem] top-24 h-[28rem] w-[28rem] rounded-full bg-sky-400/10 blur-[120px]" />

      <div className="relative overflow-hidden rounded-[26px] border border-run-border bg-run-card/80 p-5 backdrop-blur-xl sm:rounded-[30px] md:p-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_18%_15%,rgba(183,255,42,0.24),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(56,189,248,0.18),transparent_26%)]" />
        <div className="absolute bottom-8 left-[18%] h-[3px] w-[62%] -rotate-3 rounded-full bg-run-lime/55 shadow-[0_0_28px_rgba(183,255,42,0.36)]" />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-[26px] border border-run-lime/30 bg-run-lime/10 text-4xl font-black text-run-lime shadow-[0_0_50px_rgba(183,255,42,0.16)] md:h-32 md:w-32 md:rounded-[30px] md:text-5xl">
              <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:18px_18px]" />
              <span className="relative">{user.avatarLabel}</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="green" className="tracking-[0.04em]">MY RUNNING DASHBOARD</Badge>
                <Badge variant="info" className="tracking-[0.04em]">{user.level}</Badge>
              </div>
              <h1 className="mt-4 break-keep text-4xl font-black leading-tight tracking-normal text-run-text md:text-6xl">{user.nickname}</h1>
              <p className="mt-2 break-keep text-sm font-black text-run-lime">{user.region}</p>
              <p className="mt-3 max-w-2xl break-keep text-sm font-semibold leading-6 text-run-muted md:text-base md:leading-7">{user.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-run-muted">
                <span className="rounded-full border border-run-border bg-run-bg/70 px-3 py-1.5">팔로워 <strong className="text-run-text">{user.followers}</strong></span>
                <span className="rounded-full border border-run-border bg-run-bg/70 px-3 py-1.5">팔로잉 <strong className="text-run-text">{user.following}</strong></span>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:flex sm:gap-3 lg:shrink-0">
            <Button className="w-full sm:w-auto" leftIcon={<UserPen size={17} />}>프로필 수정</Button>
            <IconButton aria-label="프로필 설정" icon={<Settings size={19} />} className="hidden sm:inline-flex" />
            <Button variant="secondary" className="w-full sm:hidden" leftIcon={<Settings size={17} />}>설정</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
