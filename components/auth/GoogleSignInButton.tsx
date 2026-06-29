"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/common/ui/Button";

export function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signIn("google", { callbackUrl });
    } catch {
      setErrorMessage(
        "Google 로그인 요청을 시작하지 못했습니다. 환경변수 설정을 확인해 주세요.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        loading={isLoading}
        onClick={handleGoogleSignIn}
        className="w-full justify-between bg-[#151C22] text-left"
        aria-label="Google로 계속하기"
      >
        <span>Google로 계속하기</span>
        <span className="text-xs font-semibold text-run-muted">
          {isLoading ? "이동 중" : "로그인"}
        </span>
      </Button>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
