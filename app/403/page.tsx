import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <section className="relative overflow-hidden px-5 py-24 sm:px-7 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(183,255,42,0.13),transparent_34%)]" />
        <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-run-lime/30 bg-run-lime/10 text-run-lime">
            <ShieldAlert size={30} />
          </div>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-run-lime">
            Access Denied
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-run-text sm:text-5xl">
            접근 권한이 없습니다
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-run-muted sm:text-lg">
            이 페이지는 관리자 권한이 필요합니다. 계정 권한을 확인한 뒤 다시 시도해 주세요.
          </p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/" size="lg" className="w-full sm:w-auto">
              홈으로 가기
            </Button>
            <Button href="/profile" variant="secondary" size="lg" className="w-full sm:w-auto">
              마이페이지로 가기
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
