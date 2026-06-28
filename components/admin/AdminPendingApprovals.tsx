import { Check, X } from "lucide-react";
import { AdminFilterTabs } from "@/components/admin/AdminFilterTabs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import type { AdminPendingApproval } from "@/types";

export type AdminApprovalFilter = "전체" | "코스" | "시설" | "크루" | "장비";

type AdminPendingApprovalsProps = {
  items: AdminPendingApproval[];
  filters: AdminApprovalFilter[];
  activeFilter: AdminApprovalFilter;
  counts: Record<AdminApprovalFilter, number>;
  onFilterChange: (filter: AdminApprovalFilter) => void;
};

export function AdminPendingApprovals({ items, filters, activeFilter, counts, onFilterChange }: AdminPendingApprovalsProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <SectionHeader label="APPROVALS" title="승인 대기 목록" description="등록 요청된 운영 데이터를 유형별로 검토하세요." compact className="mb-5" />
      <AdminFilterTabs items={filters} activeItem={activeFilter} counts={counts} onChange={onFilterChange} ariaLabel="승인 대기 필터" />

      {items.length === 0 ? (
        <EmptyState title="승인 대기 항목이 없습니다" description="선택한 유형에 해당하는 승인 대기 항목이 없습니다." className="min-h-56" />
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-[18px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card/70">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="green" className="tracking-[0.04em]">{item.type}</Badge>
                    <span className="rounded-full border border-run-border bg-run-card px-2.5 py-1 text-xs font-bold text-run-muted">{item.date}</span>
                  </div>
                  <h3 className="mt-3 break-keep text-base font-black text-run-text">{item.title}</h3>
                  <p className="mt-1 break-keep text-xs font-bold text-run-muted">작성자 {item.author}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[168px] lg:shrink-0">
                  <Button size="sm" leftIcon={<Check size={15} />} className="w-full">승인</Button>
                  <Button size="sm" variant="outline" leftIcon={<X size={15} />} className="w-full">반려</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
