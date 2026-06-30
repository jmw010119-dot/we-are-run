import { CrewsClient } from "@/components/crews/CrewsClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { runningCrews } from "@/lib/mock";
import { getRunningCrews } from "@/lib/queries/crews";

export const dynamic = "force-dynamic";

export default async function CrewsPage() {
  let crews = runningCrews;

  try {
    crews = await getRunningCrews();
  } catch {
    crews = runningCrews;
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CrewsClient crews={crews} />
      <Footer />
    </main>
  );
}
