import { ActivityOverview } from "@/components/profile/ActivityOverview";
import { ProfileJoinedCrews } from "@/components/profile/ProfileJoinedCrews";
import { ProfileMyPosts } from "@/components/profile/ProfileMyPosts";
import { ProfileSavedCourses } from "@/components/profile/ProfileSavedCourses";
import { ProfileSavedEquipment } from "@/components/profile/ProfileSavedEquipment";
import { ProfileSavedFacilities } from "@/components/profile/ProfileSavedFacilities";
import { SavedPreview } from "@/components/profile/SavedPreview";
import type { ProfileTab } from "@/components/profile/ProfileTabs";
import type { ProfilePageData } from "@/types";

type ProfileTabPanelProps = {
  activeTab: ProfileTab;
  data: Pick<
    ProfilePageData,
    "activities" | "savedCourses" | "savedFacilities" | "joinedCrews" | "savedEquipment" | "myPosts"
  >;
};

export function ProfileTabPanel({ activeTab, data }: ProfileTabPanelProps) {
  if (activeTab === "저장한 코스") {
    return <ProfileSavedCourses courses={data.savedCourses} />;
  }

  if (activeTab === "저장한 시설") {
    return <ProfileSavedFacilities facilities={data.savedFacilities} />;
  }

  if (activeTab === "가입한 크루") {
    return <ProfileJoinedCrews crews={data.joinedCrews} />;
  }

  if (activeTab === "관심 장비") {
    return <ProfileSavedEquipment equipment={data.savedEquipment} />;
  }

  if (activeTab === "작성한 글") {
    return <ProfileMyPosts posts={data.myPosts} />;
  }

  return (
    <div className="grid min-w-0 gap-8">
      <ActivityOverview activities={data.activities} />
      <SavedPreview courses={data.savedCourses} crews={data.joinedCrews} equipment={data.savedEquipment} />
    </div>
  );
}
