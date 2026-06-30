import { AdminClient } from "@/components/admin/AdminClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSummaryStats } from "@/components/admin/AdminSummaryStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== UserRole.ADMIN) {
    redirect("/403");
  }

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
