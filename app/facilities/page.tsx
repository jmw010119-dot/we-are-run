import { FacilitiesClient } from "@/components/facilities/FacilitiesClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { runningFacilities } from "@/lib/mock";
import { getRunningFacilities } from "@/lib/queries/facilities";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  let facilities = runningFacilities;

  try {
    facilities = await getRunningFacilities();
  } catch {
    facilities = runningFacilities;
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <FacilitiesClient facilities={facilities} />
      <Footer />
    </main>
  );
}
