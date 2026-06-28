import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";

export function FooterNewsletter() {
  return (
    <Card radius="xl" className="p-5 md:p-6">
      <h3 className="text-xl font-black text-run-text">러닝 소식을 받아보세요</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-run-muted">
        인기 코스, 크루 모집, 러닝 팁을 가장 먼저 알려드립니다.
      </p>

      <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
        <Input
          type="email"
          aria-label="이메일 주소"
          placeholder="runner@example.com"
          leftIcon={<Mail size={18} />}
          className="h-12 rounded-[16px] bg-run-bg"
        />
        <Button type="button" rightIcon={<ArrowRight size={17} strokeWidth={2.5} />} className="h-12 rounded-[16px] px-5 text-sm">
          구독
        </Button>
      </form>
    </Card>
  );
}
