import { EquipmentClient } from "@/components/equipment/EquipmentClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <EquipmentClient />
      <Footer />
    </main>
  );
}
