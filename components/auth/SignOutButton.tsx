"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/common/ui/Button";
import { cn } from "@/lib/utils";

type SignOutButtonProps = {
  className?: string;
  fullWidth?: boolean;
};

export function SignOutButton({ className, fullWidth = false }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      loading={isLoading}
      leftIcon={<LogOut size={16} />}
      className={cn(
        "border border-white/[0.06] bg-white/[0.02] text-run-muted hover:border-run-lime/50 hover:bg-run-lime/10 hover:text-run-lime",
        fullWidth ? "w-full justify-center" : "",
        className,
      )}
      onClick={() => {
        setIsLoading(true);
        void signOut({ callbackUrl: "/" });
      }}
    >
      로그아웃
    </Button>
  );
}
