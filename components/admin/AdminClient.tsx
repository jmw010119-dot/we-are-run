"use client";

import { useMemo, useState } from "react";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";
import { AdminMemoCard } from "@/components/admin/AdminMemoCard";
import { AdminPendingApprovals, type AdminApprovalFilter } from "@/components/admin/AdminPendingApprovals";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";
import { AdminReports, type AdminReportFilter } from "@/components/admin/AdminReports";
import { AdminServiceStatus } from "@/components/admin/AdminServiceStatus";
import { Section } from "@/components/common/ui/Section";
import { adminPendingApprovals, adminReports } from "@/lib/mock";

const approvalFilters: AdminApprovalFilter[] = ["전체", "코스", "시설", "크루", "장비"];
const reportFilters: AdminReportFilter[] = ["전체", "게시글", "댓글", "크루", "사용자"];

function getApprovalFilterType(filter: AdminApprovalFilter) {
  return filter === "장비" ? "장비 추천" : filter;
}

function getReportFilterKeyword(filter: AdminReportFilter) {
  return filter === "전체" ? "" : filter;
}

export function AdminClient() {
  const [approvalFilter, setApprovalFilter] = useState<AdminApprovalFilter>("전체");
  const [reportFilter, setReportFilter] = useState<AdminReportFilter>("전체");

  const approvalCounts = useMemo<Record<AdminApprovalFilter, number>>(() => {
    return approvalFilters.reduce((acc, filter) => {
      acc[filter] = filter === "전체"
        ? adminPendingApprovals.length
        : adminPendingApprovals.filter((item) => item.type === getApprovalFilterType(filter)).length;
      return acc;
    }, {} as Record<AdminApprovalFilter, number>);
  }, []);

  const reportCounts = useMemo<Record<AdminReportFilter, number>>(() => {
    return reportFilters.reduce((acc, filter) => {
      const keyword = getReportFilterKeyword(filter);
      acc[filter] = filter === "전체"
        ? adminReports.length
        : adminReports.filter((item) => item.reportType.includes(keyword)).length;
      return acc;
    }, {} as Record<AdminReportFilter, number>);
  }, []);

  const filteredApprovals = useMemo(() => {
    if (approvalFilter === "전체") {
      return adminPendingApprovals;
    }

    return adminPendingApprovals.filter((item) => item.type === getApprovalFilterType(approvalFilter));
  }, [approvalFilter]);

  const filteredReports = useMemo(() => {
    if (reportFilter === "전체") {
      return adminReports;
    }

    return adminReports.filter((item) => item.reportType.includes(getReportFilterKeyword(reportFilter)));
  }, [reportFilter]);

  return (
    <Section spacing="lg" className="border-b-0 pt-3 md:pt-5" containerClassName="max-w-[1320px]">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start xl:gap-7">
        <div className="grid min-w-0 gap-5 md:gap-6">
          <AdminActivityLog />
          <AdminPendingApprovals
            items={filteredApprovals}
            activeFilter={approvalFilter}
            filters={approvalFilters}
            counts={approvalCounts}
            onFilterChange={setApprovalFilter}
          />
          <AdminReports
            items={filteredReports}
            activeFilter={reportFilter}
            filters={reportFilters}
            counts={reportCounts}
            onFilterChange={setReportFilter}
          />
        </div>
        <aside className="grid min-w-0 gap-5 lg:sticky lg:top-28">
          <AdminServiceStatus />
          <AdminQuickActions />
          <AdminMemoCard />
        </aside>
      </div>
    </Section>
  );
}
