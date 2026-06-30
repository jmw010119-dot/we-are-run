import { ProfileBadges } from "@/components/profile/ProfileBadges";
import { RecommendedActions } from "@/components/profile/RecommendedActions";
import { RunningGoalCard } from "@/components/profile/RunningGoalCard";
import type { ProfileAction, ProfileBadge, ProfileGoal } from "@/types";

type ProfileSidebarProps = {
  badges?: ProfileBadge[];
  goal?: ProfileGoal;
  actions?: ProfileAction[];
};

export function ProfileSidebar({ badges, goal, actions }: ProfileSidebarProps) {
  return (
    <aside className="grid min-w-0 gap-5 lg:sticky lg:top-28">
      <RunningGoalCard goal={goal} />
      <ProfileBadges badges={badges} />
      <RecommendedActions actions={actions} />
    </aside>
  );
}
