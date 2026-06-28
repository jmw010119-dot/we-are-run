import { AdminClient } from "@/components/admin/AdminClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSummaryStats } from "@/components/admin/AdminSummaryStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <AdminPageHeader />
      <AdminSummaryStats />
      <AdminClient />
      <Footer />
    </main>
  );
}
