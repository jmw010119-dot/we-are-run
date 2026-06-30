import { ProfileClient } from "@/components/profile/ProfileClient";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { auth } from "@/auth";
import { getProfilePageData } from "@/lib/queries/profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  const profileData = await getProfilePageData(sessionUser.id);

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <ProfileHero user={profileData.user} />
      <ProfileStats stats={profileData.stats} />
      <ProfileClient data={profileData} />
      <Footer />
    </main>
  );
}
