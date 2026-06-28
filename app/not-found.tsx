import { Button } from "@/components/common/ui/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-run-bg text-run-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(183,255,42,0.14),transparent_22rem),radial-gradient(circle_at_75%_70%,rgba(56,189,248,0.1),transparent_20rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[960px] flex-col items-center justify-center px-5 py-20 text-center sm:px-7">
        <div className="mb-8 inline-flex items-center rounded-full border border-run-lime/25 bg-run-lime/10 px-5 py-2 text-xs font-black tracking-[0.22em] text-run-lime backdrop-blur-xl">
          WE ARE RUN
        </div>

        <p className="text-sm font-black tracking-[0.3em] text-run-muted">404</p>
        <h1 className="mt-5 break-keep text-4xl font-black leading-tight text-run-text sm:text-5xl md:text-6xl">
          길을 잃으셨나요?
        </h1>
        <p className="mt-5 max-w-xl break-keep text-base font-semibold leading-7 text-run-muted sm:text-lg">
          요청하신 페이지를 찾을 수 없습니다. 다시 러닝 코스로 돌아가보세요.
        </p>

        <div className="mt-9 grid w-full max-w-md gap-3 sm:grid-cols-2">
          <Button href="/" className="w-full">
            홈으로 가기
          </Button>
          <Button href="/courses" variant="secondary" className="w-full">
            코스 둘러보기
          </Button>
        </div>
      </section>
    </main>
  );
}
