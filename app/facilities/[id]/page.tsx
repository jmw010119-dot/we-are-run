import { notFound } from "next/navigation";
import { FacilityAmenitiesPanel } from "@/components/facilities/detail/FacilityAmenitiesPanel";
import { FacilityDescription } from "@/components/facilities/detail/FacilityDescription";
import { FacilityDetailCTA } from "@/components/facilities/detail/FacilityDetailCTA";
import { FacilityDetailHero } from "@/components/facilities/detail/FacilityDetailHero";
import { FacilityDetailMap } from "@/components/facilities/detail/FacilityDetailMap";
import { FacilityNearbyCourses } from "@/components/facilities/detail/FacilityNearbyCourses";
import { FacilityReviewPreview } from "@/components/facilities/detail/FacilityReviewPreview";
import { FacilitySummaryCards } from "@/components/facilities/detail/FacilitySummaryCards";
import { Section } from "@/components/common/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { facilityDetails } from "@/lib/mock";

type FacilityDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return facilityDetails.map((facility) => ({ id: String(facility.id) }));
}

export default async function FacilityDetailPage({ params }: FacilityDetailPageProps) {
  const { id } = await params;
  const facility = facilityDetails.find((item) => item.id === Number(id));

  if (!facility) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <FacilityDetailHero facility={facility} />
      <Section spacing="md" className="border-b-0 pt-0" containerClassName="max-w-[1320px]">
        <div className="grid gap-5 md:gap-6">
          <FacilitySummaryCards facility={facility} />
          <FacilityDetailMap facility={facility} />
          <FacilityDescription facility={facility} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <FacilityAmenitiesPanel facility={facility} />
            <FacilityReviewPreview facility={facility} />
          </div>
          <FacilityNearbyCourses facility={facility} />
          <FacilityDetailCTA facility={facility} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
