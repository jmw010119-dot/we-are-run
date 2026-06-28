import { CrewsClient } from "@/components/crews/CrewsClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CrewsPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CrewsClient />
      <Footer />
    </main>
  );
}
