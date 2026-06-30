import { CommunityClient } from "@/components/community/CommunityClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCommunityPosts } from "@/lib/queries/community";

export default async function CommunityPage() {
  const posts = await getCommunityPosts();

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CommunityClient posts={posts} />
      <Footer />
    </main>
  );
}
