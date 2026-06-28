import { notFound } from "next/navigation";
import { CrewActivityFeed } from "@/components/crews/detail/CrewActivityFeed";
import { CrewDetailCTA } from "@/components/crews/detail/CrewDetailCTA";
import { CrewDetailHero } from "@/components/crews/detail/CrewDetailHero";
import { CrewIntro } from "@/components/crews/detail/CrewIntro";
import { CrewMembers } from "@/components/crews/detail/CrewMembers";
import { CrewRulesNotice } from "@/components/crews/detail/CrewRulesNotice";
import { CrewSchedule } from "@/components/crews/detail/CrewSchedule";
import { CrewSummaryCards } from "@/components/crews/detail/CrewSummaryCards";
import { Section } from "@/components/common/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { crewDetails } from "@/lib/mock";

type CrewDetailPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return crewDetails.map((crew) => ({ id: String(crew.id) }));
}

export default async function CrewDetailPage({ params }: CrewDetailPageProps) {
  const { id } = await params;
  const crew = crewDetails.find((item) => item.id === Number(id));

  if (!crew) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CrewDetailHero crew={crew} />
      <Section spacing="md" className="border-b-0 pt-0" containerClassName="max-w-[1320px]">
        <div className="grid gap-5 md:gap-6">
          <CrewSummaryCards crew={crew} />
          <CrewIntro crew={crew} />
          <CrewSchedule crew={crew} />
          <CrewMembers crew={crew} />
          <CrewActivityFeed crew={crew} />
          <CrewRulesNotice crew={crew} />
          <CrewDetailCTA crew={crew} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
