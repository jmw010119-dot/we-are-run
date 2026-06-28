import { CommunityClient } from "@/components/community/CommunityClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CommunityClient />
      <Footer />
    </main>
  );
}
