import { EquipmentClient } from "@/components/equipment/EquipmentClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { equipmentRecommendations } from "@/lib/mock";
import { getEquipmentItems } from "@/lib/queries/equipment";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  let equipment = equipmentRecommendations;

  try {
    equipment = await getEquipmentItems();
  } catch {
    equipment = equipmentRecommendations;
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <EquipmentClient equipment={equipment} />
      <Footer />
    </main>
  );
}
