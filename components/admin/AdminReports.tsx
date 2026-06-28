import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { AdminFilterTabs } from "@/components/admin/AdminFilterTabs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { EmptyState } from "@/components/common/ui/EmptyState";
import type { AdminReport } from "@/types";

export type AdminReportFilter = "전체" | "게시글" | "댓글" | "크루" | "사용자";

type AdminReportsProps = {
  items: AdminReport[];
  filters: AdminReportFilter[];
  activeFilter: AdminReportFilter;
  counts: Record<AdminReportFilter, number>;
  onFilterChange: (filter: AdminReportFilter) => void;
};

export function AdminReports({ items, filters, activeFilter, counts, onFilterChange }: AdminReportsProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <SectionHeader label="REPORTS" title="신고 대기 목록" description="누적 신고와 처리 상태를 유형별로 확인하세요." compact className="mb-5" />
      <AdminFilterTabs items={filters} activeItem={activeFilter} counts={counts} onChange={onFilterChange} ariaLabel="신고 대기 필터" />

      {items.length === 0 ? (
        <EmptyState title="신고 대기 항목이 없습니다" description="선택한 유형에 해당하는 신고 대기 항목이 없습니다." className="min-h-56" />
      ) : (
        <div className="grid gap-3">
          {items.map((report) => (
            <div key={report.id} className="rounded-[18px] border border-run-border bg-run-bg/70 p-4 transition duration-200 hover:border-run-lime/35 hover:bg-run-card/70">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="danger" className="tracking-[0.04em]">{report.reportType}</Badge>
                    <Badge variant={report.status === "대기" ? "warning" : "info"} className="tracking-[0.04em]">{report.status}</Badge>
                  </div>
                  <h3 className="mt-3 break-keep text-base font-black text-run-text">{report.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-run-border bg-run-card px-2.5 py-1 text-xs font-bold text-run-muted"><AlertTriangle size={13} />신고 {report.count}건</p>
                </div>
                <Button size="sm" variant="secondary" rightIcon={<ArrowUpRight size={15} />} className="w-full lg:w-auto lg:min-w-[104px]">처리하기</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
