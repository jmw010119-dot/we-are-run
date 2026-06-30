"use client";

import { useMemo, useState } from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileTabPanel } from "@/components/profile/ProfileTabPanel";
import { ProfileTabs, type ProfileTab } from "@/components/profile/ProfileTabs";
import { Section } from "@/components/common/ui/Section";
import {
  profileActivities,
  profileActions,
  profileBadges,
  profileGoals,
  profileJoinedCrews,
  profileMyPosts,
  profileSavedCourses,
  profileSavedEquipment,
  profileSavedFacilities,
} from "@/lib/mock";
import type { ProfilePageData } from "@/types";

const fallbackProfileData: Pick<
  ProfilePageData,
  | "activities"
  | "savedCourses"
  | "savedFacilities"
  | "joinedCrews"
  | "savedEquipment"
  | "myPosts"
  | "badges"
  | "goal"
  | "actions"
> = {
  activities: profileActivities,
  savedCourses: profileSavedCourses,
  savedFacilities: profileSavedFacilities,
  joinedCrews: profileJoinedCrews,
  savedEquipment: profileSavedEquipment,
  myPosts: profileMyPosts,
  badges: profileBadges,
  goal: profileGoals,
  actions: profileActions,
};

type ProfileClientProps = {
  data?: Pick<
    ProfilePageData,
    | "activities"
    | "savedCourses"
    | "savedFacilities"
    | "joinedCrews"
    | "savedEquipment"
    | "myPosts"
    | "badges"
    | "goal"
    | "actions"
  >;
};

export function ProfileClient({ data = fallbackProfileData }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("활동 요약");

  const counts = useMemo<Record<ProfileTab, number>>(
    () => ({
      "활동 요약": data.activities.length,
      "저장한 코스": data.savedCourses.length,
      "저장한 시설": data.savedFacilities.length,
      "가입한 크루": data.joinedCrews.length,
      "관심 장비": data.savedEquipment.length,
      "작성한 글": data.myPosts.length,
    }),
    [data],
  );

  return (
    <>
      <ProfileTabs activeTab={activeTab} counts={counts} onTabChange={setActiveTab} />
      <Section spacing="lg" className="border-b-0 pt-3 md:pt-5" containerClassName="max-w-[1320px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start xl:gap-7">
          <ProfileTabPanel activeTab={activeTab} data={data} />
          <ProfileSidebar badges={data.badges} goal={data.goal} actions={data.actions} />
        </div>
      </Section>
    </>
  );
}
