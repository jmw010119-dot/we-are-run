import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/common/ui/Button";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { isGoogleEnabled } from "@/lib/auth/checkProvider";

const pendingProviders = [
  {
    label: "Kakao로 계속하기",
    status: "준비 중",
  },
  {
    label: "Naver로 계속하기",
    status: "준비 중",
  },
];

export default function LoginPage() {
  const googleEnabled = isGoogleEnabled();

  return (
    <main className="min-h-screen bg-run-bg px-5 py-20 text-run-text">
      <section className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[520px] flex-col justify-center">
        <div className="rounded-[28px] border border-run-border bg-run-card p-6 sm:p-8">
          <Link
            href="/"
            className="inline-flex text-lg font-black tracking-[0.16em] text-run-text"
            aria-label="WE ARE RUN 홈으로 이동"
          >
            WE ARE <span className="ml-2 text-run-lime">RUN</span>
          </Link>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-run-lime">
              LOGIN
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-run-text sm:text-4xl">
              WE ARE RUN에 로그인
            </h1>
            <p className="mt-4 text-base leading-7 text-run-muted">
              러닝 코스 저장, 크루 가입, 인증 피드를 사용하려면 로그인이 필요합니다.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {googleEnabled ? (
              <Suspense
                fallback={
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    loading
                    className="w-full justify-between bg-[#151C22] text-left"
                  >
                    Google 로그인 준비 중
                  </Button>
                }
              >
                <GoogleSignInButton />
              </Suspense>
            ) : (
              <div className="rounded-2xl border border-run-border bg-[#151C22] p-5">
                <p className="font-bold text-run-text">
                  Google 로그인이 아직 설정되지 않았습니다.
                </p>
                <p className="mt-2 text-sm leading-6 text-run-muted">
                  Google Cloud Console에서 OAuth Client를 만들고
                  `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`을 설정하면
                  로그인 버튼이 활성화됩니다.
                </p>
              </div>
            )}

            {pendingProviders.map((provider) => (
              <Button
                key={provider.label}
                type="button"
                variant="secondary"
                size="lg"
                disabled
                className="w-full justify-between bg-[#151C22] text-left"
                aria-label={provider.label}
              >
                <span>{provider.label}</span>
                <span className="text-xs font-semibold text-run-muted">
                  {provider.status}
                </span>
              </Button>
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-run-muted">
            Kakao와 Naver 로그인은 이후 Sprint에서 연결합니다.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-run-border text-sm font-bold text-run-muted transition duration-200 hover:border-run-lime/50 hover:text-run-lime"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
