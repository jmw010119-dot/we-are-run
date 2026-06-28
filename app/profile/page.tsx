import { ProfileClient } from "@/components/profile/ProfileClient";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <ProfileHero />
      <ProfileStats />
      <ProfileClient />
      <Footer />
    </main>
  );
}
