import { notFound } from "next/navigation";
import { AlternativeEquipment } from "@/components/equipment/detail/AlternativeEquipment";
import { EquipmentDetailCTA } from "@/components/equipment/detail/EquipmentDetailCTA";
import { EquipmentDetailHero } from "@/components/equipment/detail/EquipmentDetailHero";
import { EquipmentReviewPreview } from "@/components/equipment/detail/EquipmentReviewPreview";
import { EquipmentSummaryCards } from "@/components/equipment/detail/EquipmentSummaryCards";
import { ProductSpecPanel } from "@/components/equipment/detail/ProductSpecPanel";
import { PurposeFit } from "@/components/equipment/detail/PurposeFit";
import { RecommendationReason } from "@/components/equipment/detail/RecommendationReason";
import { Section } from "@/components/common/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { equipmentDetails } from "@/lib/mock";

type EquipmentDetailPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return equipmentDetails.map((item) => ({ id: String(item.id) }));
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { id } = await params;
  const item = equipmentDetails.find((equipment) => equipment.id === Number(id));

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <EquipmentDetailHero item={item} />
      <Section spacing="md" className="border-b-0 pt-0" containerClassName="max-w-[1320px]">
        <div className="grid gap-5 md:gap-6">
          <EquipmentSummaryCards item={item} />
          <RecommendationReason item={item} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <ProductSpecPanel item={item} />
            <PurposeFit item={item} />
          </div>
          <EquipmentReviewPreview item={item} />
          <AlternativeEquipment item={item} />
          <EquipmentDetailCTA item={item} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
