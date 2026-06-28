import type { CommunityPost, CommunityPostDetail, CommunityStats, PopularRunner, TrendingPost } from "@/types";

export const communityStats: CommunityStats = {
  todayCertifications: "128",
  totalPosts: "24,680",
  weeklyComments: "3,942",
  activeRunners: "8,710",
};

export const communityPosts: CommunityPost[] = [
  {
    id: 1,
    category: "러닝 인증",
    authorName: "한강페이서",
    authorRegion: "서울 영등포",
    authorAvatarLabel: "한",
    createdAt: "방금 전",
    title: "퇴근 후 여의도 8K, 오늘 바람이 딱 좋았어요",
    content: "서강대교 방향으로 돌고 마포대교에서 마무리했습니다. 초반은 천천히 열고 마지막 2km만 페이스를 올렸더니 기분 좋게 끝났어요.",
    runningRecord: { distance: "8.2km", time: "43:18", pace: "5'16\"" },
    likes: 342,
    comments: 28,
    views: 1840,
    isSaved: true,
    tags: ["한강", "퇴근런", "8K"],
    gradient: "from-lime-300/24 via-emerald-400/12 to-sky-500/16",
  },
  {
    id: 2,
    category: "질문",
    authorName: "첫풀도전",
    authorRegion: "경기 성남",
    authorAvatarLabel: "첫",
    createdAt: "12분 전",
    title: "첫 하프 준비 중인데 주 3회 훈련으로 충분할까요?",
    content: "평일 2회 조깅, 주말 1회 장거리로 잡고 있습니다. 부상 없이 완주가 목표라서 강도 배분 조언을 듣고 싶어요.",
    likes: 86,
    comments: 41,
    views: 920,
    isSaved: false,
    tags: ["하프마라톤", "훈련", "초보"],
    gradient: "from-sky-400/20 via-cyan-300/10 to-run-card",
  },
  {
    id: 3,
    category: "정보공유",
    authorName: "러닝기어랩",
    authorRegion: "서울 강남",
    authorAvatarLabel: "기",
    createdAt: "26분 전",
    title: "여름 야간런 필수 체크리스트 정리",
    content: "라이트, 반사 밴드, 수분 보충, 밝은 색 상의는 꼭 챙기세요. 특히 공원 코스는 자전거와 보행자 흐름을 미리 확인하는 것이 좋습니다.",
    likes: 214,
    comments: 17,
    views: 2640,
    isSaved: true,
    tags: ["야간런", "안전", "장비"],
    gradient: "from-amber-300/18 via-lime-300/10 to-run-card",
  },
  {
    id: 4,
    category: "후기",
    authorName: "부산오션런",
    authorRegion: "부산 수영",
    authorAvatarLabel: "부",
    createdAt: "44분 전",
    title: "광안리 해안 코스 새벽런 후기",
    content: "해가 뜨기 전 6시에 출발하면 사람이 적어서 달리기 편합니다. 다만 주말에는 사진 찍는 분들이 많아 페이스런보다는 조깅 추천이에요.",
    runningRecord: { distance: "6.4km", time: "36:02", pace: "5'38\"" },
    likes: 178,
    comments: 19,
    views: 1370,
    isSaved: false,
    tags: ["부산", "해안", "새벽런"],
    gradient: "from-blue-400/24 via-cyan-300/12 to-run-card",
  },
  {
    id: 5,
    category: "크루모집",
    authorName: "토요롱런클럽",
    authorRegion: "서울 잠실",
    authorAvatarLabel: "토",
    createdAt: "1시간 전",
    title: "토요일 오전 18K 롱런 함께하실 분 모집합니다",
    content: "잠실종합운동장 출발, 한강 방향 왕복 코스입니다. 평균 페이스 6분 초반으로 편하게 대화 가능한 강도로 진행해요.",
    runningRecord: { distance: "18km", time: "예정", pace: "6'10\"" },
    likes: 121,
    comments: 34,
    views: 1680,
    isSaved: false,
    tags: ["롱런", "잠실", "모집"],
    gradient: "from-run-lime/22 via-emerald-300/12 to-run-card",
  },
  {
    id: 6,
    category: "자유게시판",
    authorName: "대구런데이",
    authorRegion: "대구 수성",
    authorAvatarLabel: "대",
    createdAt: "2시간 전",
    title: "러닝 끝나고 먹는 국밥이 왜 이렇게 맛있죠",
    content: "오늘은 기록보다 회복이 먼저였습니다. 다들 러닝 후 최애 메뉴 하나씩 추천해 주세요. 저는 뜨끈한 국밥에 한 표입니다.",
    likes: 267,
    comments: 56,
    views: 2210,
    isSaved: false,
    tags: ["일상", "회복", "러닝후"],
    gradient: "from-orange-300/18 via-red-300/10 to-run-card",
  },
  {
    id: 7,
    category: "러닝 인증",
    authorName: "제주바람",
    authorRegion: "제주 애월",
    authorAvatarLabel: "제",
    createdAt: "3시간 전",
    title: "바람이 강해도 애월 해안 5K 완료",
    content: "맞바람 구간은 힘들었지만 돌아오는 길은 거의 밀어주는 느낌이었습니다. 제주 러너분들 오늘도 안전런 하세요.",
    runningRecord: { distance: "5.0km", time: "27:44", pace: "5'33\"" },
    likes: 198,
    comments: 22,
    views: 1540,
    isSaved: true,
    tags: ["제주", "5K", "해안런"],
    gradient: "from-cyan-300/22 via-sky-400/12 to-run-card",
  },
  {
    id: 8,
    category: "정보공유",
    authorName: "회복런마스터",
    authorRegion: "경기 고양",
    authorAvatarLabel: "회",
    createdAt: "4시간 전",
    title: "인터벌 다음날 회복런은 어느 정도가 좋을까요?",
    content: "개인적으로는 호흡이 완전히 편한 강도로 30~45분 정도가 가장 좋았습니다. 심박을 낮게 유지하는 게 핵심이에요.",
    likes: 154,
    comments: 24,
    views: 1320,
    isSaved: false,
    tags: ["회복런", "인터벌", "훈련팁"],
    gradient: "from-purple-300/16 via-sky-300/10 to-run-card",
  },
  {
    id: 9,
    category: "질문",
    authorName: "무릎관리중",
    authorRegion: "서울 마포",
    authorAvatarLabel: "무",
    createdAt: "5시간 전",
    title: "다운힐에서 무릎 부담 줄이는 방법이 있을까요?",
    content: "오르막보다 내리막에서 무릎이 더 민감합니다. 보폭을 줄이는 것 말고 자세나 보강운동 팁이 있을까요?",
    likes: 74,
    comments: 38,
    views: 980,
    isSaved: false,
    tags: ["부상예방", "다운힐", "질문"],
    gradient: "from-rose-300/16 via-amber-200/10 to-run-card",
  },
  {
    id: 10,
    category: "후기",
    authorName: "트랙러버",
    authorRegion: "서울 송파",
    authorAvatarLabel: "트",
    createdAt: "6시간 전",
    title: "종합운동장 트랙에서 400m 반복주 해봤습니다",
    content: "혼자 하니 쉽지 않았지만 랩이 명확해서 집중하기 좋았습니다. 다음에는 크루랑 같이 해보고 싶네요.",
    runningRecord: { distance: "7.6km", time: "41:09", pace: "5'25\"" },
    likes: 203,
    comments: 31,
    views: 1760,
    isSaved: true,
    tags: ["트랙", "반복주", "송파"],
    gradient: "from-run-lime/20 via-yellow-300/10 to-run-card",
  },
  {
    id: 11,
    category: "크루모집",
    authorName: "초보환영런",
    authorRegion: "경기 수원",
    authorAvatarLabel: "초",
    createdAt: "어제",
    title: "수원 광교 초보런 매주 수요일 함께해요",
    content: "5~6km를 대화 가능한 속도로 달립니다. 처음 오시는 분도 걱정 없이 합류할 수 있게 워밍업부터 같이 진행합니다.",
    runningRecord: { distance: "6km", time: "예정", pace: "6'40\"" },
    likes: 166,
    comments: 29,
    views: 1420,
    isSaved: false,
    tags: ["초보런", "수원", "정기런"],
    gradient: "from-emerald-300/20 via-lime-300/10 to-run-card",
  },
  {
    id: 12,
    category: "자유게시판",
    authorName: "새벽알람",
    authorRegion: "부산 해운대",
    authorAvatarLabel: "새",
    createdAt: "어제",
    title: "새벽런 성공하는 작은 루틴 공유합니다",
    content: "전날 러닝복을 의자에 걸어두고 물 한 잔을 침대 옆에 둡니다. 알람을 끄자마자 바로 물부터 마시면 몸이 빨리 깨어나요.",
    likes: 241,
    comments: 44,
    views: 2320,
    isSaved: true,
    tags: ["새벽런", "루틴", "동기부여"],
    gradient: "from-slate-300/14 via-sky-300/10 to-run-card",
  },
];

export const popularTags = ["#한강런", "#초보러너", "#오운완", "#러닝화", "#크루모집", "#하프준비", "#야간런", "#회복런"];

export const popularRunners: PopularRunner[] = [
  { id: 1, name: "한강페이서", region: "서울", avatarLabel: "한", weeklyDistance: "54.8km", posts: 9 },
  { id: 2, name: "부산오션런", region: "부산", avatarLabel: "부", weeklyDistance: "42.1km", posts: 7 },
  { id: 3, name: "트랙러버", region: "서울", avatarLabel: "트", weeklyDistance: "38.6km", posts: 6 },
  { id: 4, name: "제주바람", region: "제주", avatarLabel: "제", weeklyDistance: "33.2km", posts: 5 },
];

export const trendingPosts: TrendingPost[] = [
  { id: 1, title: "첫 하프 준비 중인데 주 3회 훈련으로 충분할까요?", category: "질문", comments: 41, views: 920 },
  { id: 5, title: "토요일 오전 18K 롱런 함께하실 분 모집합니다", category: "크루모집", comments: 34, views: 1680 },
  { id: 12, title: "새벽런 성공하는 작은 루틴 공유합니다", category: "자유게시판", comments: 44, views: 2320 },
  { id: 3, title: "여름 야간런 필수 체크리스트 정리", category: "정보공유", comments: 17, views: 2640 },
];

const commentTemplates = [
  { authorName: "페이스메이커", authorAvatarLabel: "페", content: "글 덕분에 오늘 코스 선택에 도움이 됐어요. 다음 인증도 기대할게요.", likes: 18 },
  { authorName: "새벽러너", authorAvatarLabel: "새", content: "저도 비슷한 코스로 달려봤는데 말씀하신 구간이 정말 좋더라고요.", likes: 12 },
  { authorName: "러닝초보", authorAvatarLabel: "초", content: "자세한 설명 감사합니다. 이번 주말에 천천히 따라 달려보려고요.", likes: 9 },
  { authorName: "롱런러버", authorAvatarLabel: "롱", content: "기록보다 꾸준함이 더 멋집니다. 안전런 하세요.", likes: 15 },
  { authorName: "코스수집가", authorAvatarLabel: "코", content: "태그 저장해두겠습니다. 이런 후기 더 많이 올라오면 좋겠어요.", likes: 7 },
];

function buildFullContent(post: CommunityPost) {
  return [
    post.content,
    "처음부터 무리하기보다는 몸이 풀리는 흐름을 보면서 페이스를 조절했습니다. 주변 러너들과 보행자 동선도 함께 살피며 안전하게 마무리했어요.",
    "같은 코스를 준비하는 러너라면 출발 전 날씨와 조명, 보급 가능 여부를 한 번 더 확인해보면 좋겠습니다. 오늘의 경험이 다음 러닝을 고르는 데 작은 힌트가 되길 바랍니다.",
  ];
}

function findRelatedPostIds(post: CommunityPost) {
  return communityPosts
    .filter((candidate) => {
      if (candidate.id === post.id) {
        return false;
      }

      const sameCategory = candidate.category === post.category;
      const sameTag = candidate.tags.some((tag) => post.tags.includes(tag));

      return sameCategory || sameTag;
    })
    .slice(0, 3)
    .map((candidate) => candidate.id);
}

export const communityPostDetails: CommunityPostDetail[] = communityPosts.map((post, index) => ({
  ...post,
  fullContent: buildFullContent(post),
  commentsPreview: commentTemplates.map((comment, commentIndex) => ({
    id: post.id * 10 + commentIndex + 1,
    ...comment,
    createdAt: commentIndex === 0 ? "방금 전" : `${commentIndex + 1}시간 전`,
  })),
  relatedPostIds: findRelatedPostIds(post),
  authorStats: {
    posts: 18 + index * 3,
    totalDistance: `${124 + index * 17}km`,
    followers: `${1.2 + index / 10}k`,
  },
}));

