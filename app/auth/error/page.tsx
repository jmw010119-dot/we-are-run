import Link from "next/link";

type AuthErrorCode =
  | "Configuration"
  | "AccessDenied"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "Default";

const errorMessages: Record<AuthErrorCode, { title: string; description: string }> = {
  Configuration: {
    title: "인증 설정을 확인해 주세요",
    description:
      "OAuth 환경변수나 Auth.js 설정이 아직 준비되지 않았을 수 있습니다.",
  },
  AccessDenied: {
    title: "접근이 거부되었습니다",
    description:
      "Google 계정 권한 승인 과정에서 접근이 거부되었습니다. 다시 시도해 주세요.",
  },
  OAuthSignin: {
    title: "Google 로그인 시작에 실패했습니다",
    description:
      "OAuth 로그인 화면으로 이동하지 못했습니다. Client ID와 Redirect URI를 확인해 주세요.",
  },
  OAuthCallback: {
    title: "로그인 응답 처리에 실패했습니다",
    description:
      "Google에서 돌아온 인증 응답을 처리하지 못했습니다. Callback URL 설정을 확인해 주세요.",
  },
  OAuthCreateAccount: {
    title: "계정 생성에 실패했습니다",
    description:
      "OAuth 계정을 WE ARE RUN 사용자와 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  },
  Default: {
    title: "로그인 중 문제가 발생했습니다",
    description:
      "인증 요청을 처리하는 동안 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.",
  },
};

function normalizeErrorCode(error?: string): AuthErrorCode {
  if (
    error === "Configuration" ||
    error === "AccessDenied" ||
    error === "OAuthSignin" ||
    error === "OAuthCallback" ||
    error === "OAuthCreateAccount"
  ) {
    return error;
  }

  return "Default";
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorCode = normalizeErrorCode(params?.error);
  const message = errorMessages[errorCode];

  return (
    <main className="min-h-screen bg-run-bg px-5 py-20 text-run-text">
      <section className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[560px] flex-col justify-center">
        <div className="rounded-[28px] border border-run-border bg-run-card p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-run-lime">
            AUTH ERROR
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-run-text sm:text-4xl">
            {message.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-run-muted">
            {message.description}
          </p>

          <div className="mt-6 rounded-2xl border border-run-border bg-[#151C22] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-run-muted">
              Error Code
            </p>
            <p className="mt-2 font-mono text-sm text-run-text">{errorCode}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-run-lime px-5 text-sm font-black text-[#071004] transition duration-200 hover:scale-[1.02]"
            >
              다시 로그인하기
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-run-border px-5 text-sm font-bold text-run-muted transition duration-200 hover:border-run-lime/50 hover:text-run-lime"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
