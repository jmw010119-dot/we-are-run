import { FacilitiesClient } from "@/components/facilities/FacilitiesClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <FacilitiesClient />
      <Footer />
    </main>
  );
}
