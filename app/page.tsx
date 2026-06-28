import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DashboardCards } from "@/components/home/DashboardCards";
import { Hero } from "@/components/home/Hero";
import { MapPreview } from "@/components/home/MapPreview";
import { PopularCourses } from "@/components/home/PopularCourses";
import { QuickMenu } from "@/components/home/QuickMenu";
import { RecommendedCrews } from "@/components/home/RecommendedCrews";
import { RunningFeed } from "@/components/home/RunningFeed";

export default function Home() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <Hero />
      <DashboardCards />
      <QuickMenu />
      <MapPreview />
      <PopularCourses />
      <RecommendedCrews />
      <RunningFeed />
      <Footer />
    </main>
  );
}
