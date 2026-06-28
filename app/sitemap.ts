import type { MetadataRoute } from "next";
import {
  communityPosts,
  equipmentRecommendations,
  runningCourses,
  runningCrews,
  runningFacilities,
} from "@/lib/mock";
import { siteConfig } from "@/lib/site";

function createRoute(path: string, priority = 0.8): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    createRoute("/", 1),
    createRoute("/courses"),
    createRoute("/facilities"),
    createRoute("/crews"),
    createRoute("/equipment"),
    createRoute("/community"),
    createRoute("/profile", 0.6),
  ];

  return [
    ...staticRoutes,
    ...runningCourses.map((course) => createRoute(`/courses/${course.id}`, 0.7)),
    ...runningFacilities.map((facility) => createRoute(`/facilities/${facility.id}`, 0.7)),
    ...runningCrews.map((crew) => createRoute(`/crews/${crew.id}`, 0.7)),
    ...equipmentRecommendations.map((item) => createRoute(`/equipment/${item.id}`, 0.7)),
    ...communityPosts.map((post) => createRoute(`/community/${post.id}`, 0.6)),
  ];
}
