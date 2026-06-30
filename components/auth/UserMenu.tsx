import { UserCircle } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { SignOutButton } from "@/components/auth/SignOutButton";

export type HeaderUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type UserMenuProps = {
  user: HeaderUser;
};

export function UserMenu({ user }: UserMenuProps) {
  const displayName = user.name || user.email || "러너";

  return (
    <div className="flex items-center gap-2">
      <Button
        href="/profile"
        aria-label="마이페이지로 이동"
        variant="ghost"
        className="h-11 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 text-run-text hover:border-run-lime/50 hover:bg-run-lime/10 hover:text-run-lime"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-run-lime/25 bg-run-lime/10 text-run-lime">
          <UserCircle size={18} />
        </span>
        <span className="hidden max-w-[120px] truncate text-sm font-extrabold xl:inline">
          {displayName}
        </span>
      </Button>
      <SignOutButton />
    </div>
  );
}
