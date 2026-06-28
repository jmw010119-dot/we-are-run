import { ActivityOverview } from "@/components/profile/ActivityOverview";
import { ProfileJoinedCrews } from "@/components/profile/ProfileJoinedCrews";
import { ProfileMyPosts } from "@/components/profile/ProfileMyPosts";
import { ProfileSavedCourses } from "@/components/profile/ProfileSavedCourses";
import { ProfileSavedEquipment } from "@/components/profile/ProfileSavedEquipment";
import { ProfileSavedFacilities } from "@/components/profile/ProfileSavedFacilities";
import { SavedPreview } from "@/components/profile/SavedPreview";
import type { ProfileTab } from "@/components/profile/ProfileTabs";

type ProfileTabPanelProps = { activeTab: ProfileTab };

export function ProfileTabPanel({ activeTab }: ProfileTabPanelProps) {
  if (activeTab === "저장한 코스") {
    return <ProfileSavedCourses />;
  }

  if (activeTab === "저장한 시설") {
    return <ProfileSavedFacilities />;
  }

  if (activeTab === "가입한 크루") {
    return <ProfileJoinedCrews />;
  }

  if (activeTab === "관심 장비") {
    return <ProfileSavedEquipment />;
  }

  if (activeTab === "작성한 글") {
    return <ProfileMyPosts />;
  }

  return (
    <div className="grid min-w-0 gap-8">
      <ActivityOverview />
      <SavedPreview />
    </div>
  );
}
