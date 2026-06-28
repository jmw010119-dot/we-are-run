"use client";

import { useMemo, useState } from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileTabPanel } from "@/components/profile/ProfileTabPanel";
import { ProfileTabs, type ProfileTab } from "@/components/profile/ProfileTabs";
import { Section } from "@/components/common/ui/Section";
import {
  profileActivities,
  profileJoinedCrews,
  profileMyPosts,
  profileSavedCourses,
  profileSavedEquipment,
  profileSavedFacilities,
} from "@/lib/mock";

export function ProfileClient() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("활동 요약");

  const counts = useMemo<Record<ProfileTab, number>>(
    () => ({
      "활동 요약": profileActivities.length,
      "저장한 코스": profileSavedCourses.length,
      "저장한 시설": profileSavedFacilities.length,
      "가입한 크루": profileJoinedCrews.length,
      "관심 장비": profileSavedEquipment.length,
      "작성한 글": profileMyPosts.length,
    }),
    [],
  );

  return (
    <>
      <ProfileTabs activeTab={activeTab} counts={counts} onTabChange={setActiveTab} />
      <Section spacing="lg" className="border-b-0 pt-3 md:pt-5" containerClassName="max-w-[1320px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)] lg:items-start xl:gap-7">
          <ProfileTabPanel activeTab={activeTab} />
          <ProfileSidebar />
        </div>
      </Section>
    </>
  );
}
