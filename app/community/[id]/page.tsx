import { notFound } from "next/navigation";
import { CommunityActionBar } from "@/components/community/detail/CommunityActionBar";
import { CommunityComments } from "@/components/community/detail/CommunityComments";
import { CommunityPostContent } from "@/components/community/detail/CommunityPostContent";
import { CommunityPostHeader } from "@/components/community/detail/CommunityPostHeader";
import { CommunityPostSidebar } from "@/components/community/detail/CommunityPostSidebar";
import { CommunityRelatedPosts } from "@/components/community/detail/CommunityRelatedPosts";
import { Section } from "@/components/common/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { communityPostDetails } from "@/lib/mock";

type CommunityPostDetailPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return communityPostDetails.map((post) => ({ id: String(post.id) }));
}

export default async function CommunityPostDetailPage({ params }: CommunityPostDetailPageProps) {
  const { id } = await params;
  const post = communityPostDetails.find((item) => item.id === Number(id));

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <Section spacing="lg" className="overflow-hidden border-b-0 pt-12 md:pt-20" containerClassName="max-w-[1320px]">
        <div className="pointer-events-none absolute right-[-14rem] top-28 h-[30rem] w-[30rem] rounded-full bg-run-lime/8 blur-[120px]" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start xl:gap-7">
          <div className="grid min-w-0 gap-5 md:gap-6">
            <CommunityPostHeader post={post} />
            <CommunityPostContent post={post} />
            <CommunityActionBar post={post} />
            <CommunityComments post={post} />
            <CommunityRelatedPosts post={post} />
          </div>
          <CommunityPostSidebar post={post} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
