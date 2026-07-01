import "server-only";

import { PostCategory as DbPostCategory } from "@/generated/prisma";
import { db } from "@/lib/db";
import type {
  CommunityCategory,
  CommunityComment,
  CommunityPost,
  CommunityPostDetail,
  CommunityRunningRecord,
} from "@/types";

const communityGradients = [
  "from-run-lime/24 via-white/[0.035] to-transparent",
  "from-sky-400/24 via-white/[0.035] to-transparent",
  "from-emerald-300/20 via-white/[0.035] to-transparent",
  "from-cyan-300/20 via-white/[0.035] to-transparent",
  "from-purple-300/18 via-white/[0.035] to-transparent",
  "from-blue-300/18 via-white/[0.035] to-transparent",
  "from-teal-300/20 via-white/[0.035] to-transparent",
  "from-yellow-300/18 via-white/[0.035] to-transparent",
];

function mapPostCategory(value: DbPostCategory): CommunityCategory {
  const categoryMap: Record<DbPostCategory, CommunityCategory> = {
    RUN_CERTIFICATION: "러닝 인증",
    FREE_BOARD: "자유게시판",
    QUESTION: "질문",
    INFORMATION: "정보공유",
    REVIEW: "후기",
    CREW_RECRUITING: "크루모집",
  };

  return categoryMap[value];
}

function getNumericId(id: string) {
  const matched = id.match(/(\d+)$/);
  const parsed = matched ? Number.parseInt(matched[1], 10) : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatCreatedAt(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replaceAll(" ", "");
}

function formatDistance(value: { toString: () => string }) {
  const numeric = Number(value.toString());

  if (!Number.isFinite(numeric)) {
    return "0km";
  }

  return `${numeric.toFixed(numeric % 1 === 0 ? 0 : 1)}km`;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getAvatarLabel(name: string) {
  return name.trim().charAt(0) || "러";
}

function getDisplayName(name: string | null) {
  return name ?? "러너";
}

function getAuthorRegion(author: { region: string | null; city: string | null }) {
  return [author.region, author.city].filter(Boolean).join(" ") || "대한민국";
}

function getPreviewContent(content: string) {
  const firstParagraph = content.split("\n").find((line) => line.trim().length > 0) ?? content;

  return firstParagraph.length > 110 ? `${firstParagraph.slice(0, 110)}...` : firstParagraph;
}

function buildFullContent(content: string) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : [content];
}

function buildCommunityWhere(id: string) {
  return {
    OR: [{ id }, { id: `seed-post-${id}` }],
  };
}

async function getDbCommunityPosts() {
  return db.communityPost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      createdAt: true,
      author: {
        select: {
          nickname: true,
          region: true,
          city: true,
        },
      },
      runningRecord: {
        select: {
          distanceKm: true,
          durationSec: true,
          pace: true,
        },
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

type DbCommunityPost = Awaited<ReturnType<typeof getDbCommunityPosts>>[number];

function buildRunningRecord(record: DbCommunityPost["runningRecord"]): CommunityRunningRecord | undefined {
  if (!record) {
    return undefined;
  }

  return {
    distance: formatDistance(record.distanceKm),
    time: formatDuration(record.durationSec),
    pace: record.pace,
  };
}

export function mapDbCommunityPostToPostCard(post: DbCommunityPost): CommunityPost {
  const numericId = getNumericId(post.id);
  const fallbackIndex = Math.max(numericId - 1, 0) % communityGradients.length;

  return {
    id: numericId,
    category: mapPostCategory(post.category),
    authorName: getDisplayName(post.author.nickname),
    authorRegion: getAuthorRegion(post.author),
    authorAvatarLabel: getAvatarLabel(getDisplayName(post.author.nickname)),
    createdAt: formatCreatedAt(post.createdAt),
    title: post.title,
    content: getPreviewContent(post.content),
    runningRecord: buildRunningRecord(post.runningRecord),
    likes: post._count.likes,
    comments: post._count.comments,
    views: 760 + numericId * 137,
    isSaved: post.bookmarks.length > 0,
    tags: post.tags,
    gradient: communityGradients[fallbackIndex],
  };
}

async function getDbCommunityPostDetail(id: string) {
  return db.communityPost.findFirst({
    where: buildCommunityWhere(id),
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      createdAt: true,
      authorId: true,
      author: {
        select: {
          nickname: true,
          region: true,
          city: true,
        },
      },
      runningRecord: {
        select: {
          distanceKm: true,
          durationSec: true,
          pace: true,
        },
      },
      comments: {
        take: 5,
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              nickname: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
}

type DbCommunityPostDetail = NonNullable<Awaited<ReturnType<typeof getDbCommunityPostDetail>>>;

function mapDbCommentsToPreview(comments: DbCommunityPostDetail["comments"]): CommunityComment[] {
  return comments.map((comment) => ({
    id: getNumericId(comment.id),
    authorName: getDisplayName(comment.author.nickname),
    authorAvatarLabel: getAvatarLabel(getDisplayName(comment.author.nickname)),
    createdAt: formatCreatedAt(comment.createdAt),
    content: comment.content,
    likes: comment._count.likes,
  }));
}

async function getRelatedPosts(post: DbCommunityPostDetail): Promise<CommunityPost[]> {
  const tagCondition = post.tags.length > 0 ? [{ tags: { hasSome: post.tags } }] : [];

  const relatedPosts = await db.communityPost.findMany({
    where: {
      id: {
        not: post.id,
      },
      OR: [{ category: post.category }, ...tagCondition],
    },
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      tags: true,
      createdAt: true,
      author: {
        select: {
          nickname: true,
          region: true,
          city: true,
        },
      },
      runningRecord: {
        select: {
          distanceKm: true,
          durationSec: true,
          pace: true,
        },
      },
      bookmarks: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return relatedPosts.map(mapDbCommunityPostToPostCard);
}

async function getAuthorPostCount(authorId: string) {
  return db.communityPost.count({
    where: {
      authorId,
    },
  });
}

function buildAuthorStats(post: CommunityPost, postCount: number) {
  const baseDistance = post.runningRecord ? Number.parseFloat(post.runningRecord.distance) : 34 + post.id * 3.2;

  return {
    posts: postCount,
    totalDistance: `${Math.round(baseDistance * 8)}km`,
    followers: `${1.2 + post.id / 10}천`,
  };
}

function mapDbCommunityPostToPostDetail(
  post: DbCommunityPostDetail,
  relatedPosts: CommunityPost[],
  authorPostCount: number,
): CommunityPostDetail {
  const card = mapDbCommunityPostToPostCard(post);

  return {
    ...card,
    content: getPreviewContent(post.content),
    fullContent: buildFullContent(post.content),
    commentsPreview: mapDbCommentsToPreview(post.comments),
    relatedPostIds: relatedPosts.map((relatedPost) => relatedPost.id),
    relatedPosts,
    authorStats: buildAuthorStats(card, authorPostCount),
  };
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const posts = await getDbCommunityPosts();

  return posts.map(mapDbCommunityPostToPostCard);
}

export async function getCommunityPostIds(): Promise<string[]> {
  const posts = await db.communityPost.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return posts.map((post) => {
    const numericId = getNumericId(post.id);

    return numericId > 0 ? String(numericId) : post.id;
  });
}

export async function getCommunityPostById(id: string): Promise<CommunityPostDetail | null> {
  const post = await getDbCommunityPostDetail(id);

  if (!post) {
    return null;
  }

  const [relatedPosts, authorPostCount] = await Promise.all([getRelatedPosts(post), getAuthorPostCount(post.authorId)]);

  return mapDbCommunityPostToPostDetail(post, relatedPosts, authorPostCount);
}
