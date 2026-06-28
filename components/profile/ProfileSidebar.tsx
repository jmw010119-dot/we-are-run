import { ProfileBadges } from "@/components/profile/ProfileBadges";
import { RecommendedActions } from "@/components/profile/RecommendedActions";
import { RunningGoalCard } from "@/components/profile/RunningGoalCard";

export function ProfileSidebar() {
  return (
    <aside className="grid min-w-0 gap-5 lg:sticky lg:top-28">
      <RunningGoalCard />
      <ProfileBadges />
      <RecommendedActions />
    </aside>
  );
}
