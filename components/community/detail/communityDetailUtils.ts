import type { CommunityCategory } from "@/types";

export const communityCategoryVariant: Record<CommunityCategory, "green" | "info" | "warning" | "success"> = {
  "러닝 인증": "green",
  자유게시판: "info",
  질문: "warning",
  정보공유: "success",
  후기: "info",
  크루모집: "green",
};
