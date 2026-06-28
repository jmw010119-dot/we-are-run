import type { CourseDetail, MapPinItem, MapPreviewCourse, PopularCourse, RunningCourse } from "@/types";

export const mapPins: MapPinItem[] = [
  { id: 1, city: "서울", label: "한강 잠실", top: "28%", left: "43%", tone: "green" },
  { id: 2, city: "대구", label: "신천 러닝", top: "55%", left: "58%", tone: "blue" },
  { id: 3, city: "부산", label: "광안리", top: "70%", left: "67%", tone: "green" },
  { id: 4, city: "제주", label: "오름 트레일", top: "84%", left: "34%", tone: "blue" },
];

export const mapPreviewCourses: MapPreviewCourse[] = [
  { id: 1, rank: 1, title: "한강 잠실 루프", location: "서울 송파구", distance: "8.4km", difficulty: "Normal", rating: 4.9, gradient: "from-run-lime/24 via-white/[0.04] to-transparent" },
  { id: 2, rank: 2, title: "광안리 해변 러닝", location: "부산 수영구", distance: "5.2km", difficulty: "Easy", rating: 4.8, gradient: "from-sky-400/24 via-white/[0.04] to-transparent" },
  { id: 3, rank: 3, title: "제주 오름 트레일", location: "제주 제주시", distance: "11.6km", difficulty: "Hard", rating: 4.7, gradient: "from-emerald-300/20 via-white/[0.04] to-transparent" },
];

export const popularCourses: PopularCourse[] = [
  { id: 1, title: "한강 잠실 루프", location: "서울 송파구", distance: "8.4km", difficulty: "Normal", duration: "48분", rating: 4.9, tags: ["야경", "평지"], gradient: "from-run-lime/22 via-white/[0.035] to-transparent" },
  { id: 2, title: "광안리 해변 러닝", location: "부산 수영구", distance: "5.2km", difficulty: "Easy", duration: "32분", rating: 4.8, tags: ["오션뷰", "초보"], gradient: "from-sky-400/22 via-white/[0.035] to-transparent" },
  { id: 3, title: "대전 갑천 리버 코스", location: "대전 유성구", distance: "10.0km", difficulty: "Hard", duration: "62분", rating: 4.7, tags: ["장거리", "훈련"], gradient: "from-emerald-300/18 via-white/[0.035] to-transparent" },
  { id: 4, title: "제주 오름 트레일", location: "제주 제주시", distance: "11.6km", difficulty: "Hard", duration: "78분", rating: 4.8, tags: ["트레일", "풍경"], gradient: "from-lime-300/20 via-white/[0.035] to-transparent" },
];

export const runningCourses: RunningCourse[] = [
  { id: 1, name: "한강 잠실 루프", region: "서울", city: "송파구", distance: "8.4km", difficulty: "Normal", type: "한강", estimatedTime: "48분", rating: 4.9, reviewCount: 284, tags: ["야경", "평지", "퇴근런"], description: "한강을 따라 부드럽게 이어지는 대표 도심 러닝 루트입니다.", isSaved: true, position: { top: "29%", left: "42%" }, gradient: "from-run-lime/24 via-white/[0.035] to-transparent" },
  { id: 2, name: "광안리 해변 러닝", region: "부산", city: "수영구", distance: "5.2km", difficulty: "Easy", type: "해안", estimatedTime: "32분", rating: 4.8, reviewCount: 196, tags: ["오션뷰", "초보", "새벽런"], description: "바다와 도시 야경을 함께 즐길 수 있는 부산 대표 해안 코스입니다.", isSaved: false, position: { top: "71%", left: "68%" }, gradient: "from-sky-400/24 via-white/[0.035] to-transparent" },
  { id: 3, name: "대구 신천 이지런", region: "대구", city: "중구", distance: "6.8km", difficulty: "Easy", type: "도심", estimatedTime: "41분", rating: 4.6, reviewCount: 98, tags: ["초보", "평지", "도심"], description: "접근성이 좋고 노면이 안정적인 데일리 러닝 코스입니다.", isSaved: false, position: { top: "56%", left: "59%" }, gradient: "from-cyan-300/20 via-white/[0.035] to-transparent" },
  { id: 4, name: "제주 오름 트레일", region: "제주", city: "제주시", distance: "11.6km", difficulty: "Hard", type: "산책로", estimatedTime: "78분", rating: 4.8, reviewCount: 121, tags: ["트레일", "풍경", "업힐"], description: "오름 능선과 숲길을 함께 달리는 프리미엄 트레일 코스입니다.", isSaved: true, position: { top: "84%", left: "35%" }, gradient: "from-lime-300/20 via-white/[0.035] to-transparent" },
  { id: 5, name: "서울 남산 업힐", region: "서울", city: "중구", distance: "7.4km", difficulty: "Hard", type: "도심", estimatedTime: "55분", rating: 4.7, reviewCount: 172, tags: ["업힐", "훈련", "전망"], description: "짧지만 강도 높은 업힐로 심폐 훈련에 좋은 코스입니다.", isSaved: false, position: { top: "31%", left: "45%" }, gradient: "from-yellow-300/18 via-white/[0.035] to-transparent" },
  { id: 6, name: "경기 호수공원 트랙", region: "경기", city: "수원시", distance: "4.9km", difficulty: "Easy", type: "공원", estimatedTime: "29분", rating: 4.5, reviewCount: 87, tags: ["공원", "초보", "가족"], description: "공원 산책로를 따라 부담 없이 달리기 좋은 짧은 루트입니다.", isSaved: false, position: { top: "38%", left: "39%" }, gradient: "from-blue-300/18 via-white/[0.035] to-transparent" },
  { id: 7, name: "서울 올림픽공원 트랙", region: "서울", city: "송파구", distance: "3.8km", difficulty: "Normal", type: "트랙", estimatedTime: "24분", rating: 4.8, reviewCount: 109, tags: ["트랙", "인터벌", "공원"], description: "정돈된 트랙과 공원 루프를 함께 즐길 수 있는 훈련 코스입니다.", isSaved: true, position: { top: "33%", left: "47%" }, gradient: "from-teal-300/20 via-white/[0.035] to-transparent" },
  { id: 8, name: "춘천 의암호 순환", region: "경기", city: "가평 인근", distance: "13.2km", difficulty: "Normal", type: "산책로", estimatedTime: "82분", rating: 4.8, reviewCount: 109, tags: ["호수", "장거리", "풍경"], description: "호수 풍경과 긴 호흡을 즐길 수 있는 중장거리 코스입니다.", isSaved: true, position: { top: "22%", left: "52%" }, gradient: "from-teal-300/20 via-white/[0.035] to-transparent" },
];

const detailMeta: Record<number, Omit<CourseDetail, keyof RunningCourse>> = {
  1: {
    recommendedTime: "일몰 전후 18:00-21:00",
    elevation: "24m",
    coverLabel: "SEOUL RIVER LOOP",
    startPoint: "잠실나루역 2번 출구",
    endPoint: "잠실한강공원 트랙존",
    nearbyPoints: ["잠실한강공원", "석촌호수", "종합운동장"],
    recommendPoints: ["노면이 안정적이라 페이스 유지가 쉽습니다.", "야간 조명과 편의시설 접근성이 좋습니다.", "퇴근 후 가볍게 합류하기 좋은 대표 루트입니다."],
    cautions: ["주말 저녁에는 자전거 통행량이 많습니다.", "강변 구간은 바람이 강할 수 있어 체온 관리가 필요합니다."],
    recommendedFor: ["도심 야경 러닝을 좋아하는 러너", "8km 전후 템포런을 원하는 러너", "크루 정기런 장소를 찾는 러너"],
    amenities: { toilet: "잠실한강공원 내 다수", parking: "한강공원 유료 주차장", nightLight: "주요 구간 조명 우수", convenienceStore: "출발지 인근 5분", transit: "지하철 접근 우수", difficultyNote: "평지 위주라 초중급 러너에게 적합합니다." },
    reviews: [
      { id: 1, author: "러너민", rating: 5, content: "퇴근 후 달리기 좋고 야경이 정말 깔끔합니다.", date: "2026.06.18" },
      { id: 2, author: "페이스킴", rating: 5, content: "평지라 기록 측정하기 좋았습니다. 바람만 조심하면 완벽해요.", date: "2026.06.14" },
      { id: 3, author: "서울런", rating: 4, content: "사람은 많지만 코스 관리가 잘 되어 있어요.", date: "2026.06.07" },
    ],
  },
  2: {
    recommendedTime: "새벽 05:30-07:30",
    elevation: "12m",
    coverLabel: "BUSAN OCEAN RUN",
    startPoint: "광안리 해수욕장 만남의 광장",
    endPoint: "민락수변공원",
    nearbyPoints: ["광안대교", "민락수변공원", "수영강변"],
    recommendPoints: ["바다 전망과 도심 분위기를 동시에 느낄 수 있습니다.", "초보자도 부담 없는 짧은 거리입니다.", "새벽 러닝 사진 인증에 좋은 포인트가 많습니다."],
    cautions: ["관광객이 많은 시간대에는 속도주를 피하는 것이 좋습니다.", "해안 습도가 높아 여름에는 수분 보충이 필요합니다."],
    recommendedFor: ["오션뷰 러닝을 원하는 러너", "5km 전후 이지런을 찾는 러너", "부산 여행 중 가볍게 달릴 러너"],
    amenities: { toilet: "해변 공중화장실", parking: "공영주차장 이용", nightLight: "해변 산책로 조명", convenienceStore: "해변 상권 다수", transit: "광안역 도보 이동", difficultyNote: "짧고 평탄해 입문자에게 좋습니다." },
    reviews: [
      { id: 1, author: "바다런", rating: 5, content: "새벽 광안대교 보면서 뛰면 하루가 달라집니다.", date: "2026.06.20" },
      { id: 2, author: "초보러너", rating: 5, content: "거리 부담이 없고 길 찾기도 쉬웠어요.", date: "2026.06.12" },
      { id: 3, author: "부산페이스", rating: 4, content: "주말 낮에는 사람이 많아서 아침 추천합니다.", date: "2026.06.03" },
    ],
  },
  3: {
    recommendedTime: "오전 07:00-10:00",
    elevation: "18m",
    coverLabel: "DAEGU DAILY RUN",
    startPoint: "신천둔치 중앙광장",
    endPoint: "대봉교 하단",
    nearbyPoints: ["신천둔치", "김광석길", "대봉교"],
    recommendPoints: ["일상 러닝에 맞는 안정적인 강변 루트입니다.", "초보 러너도 페이스를 잡기 쉽습니다.", "도심 접근성이 좋아 반복 훈련에 적합합니다."],
    cautions: ["여름 낮 시간대는 기온이 높아 피하는 편이 좋습니다.", "일부 구간은 보행자와 함께 사용합니다."],
    recommendedFor: ["데일리 러닝 코스를 찾는 러너", "평지 위주 훈련이 필요한 러너", "대구 도심 접근성을 중시하는 러너"],
    amenities: { toilet: "둔치 공용시설", parking: "인근 공영주차장", nightLight: "일부 구간 조명 보통", convenienceStore: "도보 5-8분", transit: "버스 접근 우수", difficultyNote: "전체적으로 쉬운 편이지만 여름 체감 난이도는 올라갑니다." },
    reviews: [
      { id: 1, author: "신천러너", rating: 5, content: "매일 뛰기 좋은 코스입니다. 길이 단순해서 좋아요.", date: "2026.06.16" },
      { id: 2, author: "대구런", rating: 4, content: "아침 시간이 가장 쾌적합니다.", date: "2026.06.08" },
      { id: 3, author: "이지페이스", rating: 4, content: "초보자에게 추천하고 싶은 코스예요.", date: "2026.05.30" },
    ],
  },
  4: {
    recommendedTime: "오전 08:00-11:00",
    elevation: "186m",
    coverLabel: "JEJU TRAIL FLOW",
    startPoint: "오름 입구 주차장",
    endPoint: "숲길 순환 데크",
    nearbyPoints: ["오름 전망대", "숲길 데크", "제주 카페거리"],
    recommendPoints: ["업힐과 숲길이 섞여 훈련 효과가 좋습니다.", "제주의 풍경을 깊게 느낄 수 있는 루트입니다.", "긴 호흡의 트레일 러닝 감각을 만들기 좋습니다."],
    cautions: ["비 온 뒤에는 노면이 미끄러울 수 있습니다.", "바람이 강한 날은 능선 구간을 조심해야 합니다."],
    recommendedFor: ["트레일 러닝을 즐기는 러너", "업힐 훈련이 필요한 러너", "여행 러닝을 특별하게 남기고 싶은 러너"],
    amenities: { toilet: "출발지 공용화장실", parking: "입구 주차장", nightLight: "야간 러닝 비추천", convenienceStore: "차량 7분", transit: "버스 배차 간격 확인 필요", difficultyNote: "업힐과 비포장 구간이 있어 경험자에게 적합합니다." },
    reviews: [
      { id: 1, author: "오름런", rating: 5, content: "힘들지만 풍경이 모든 걸 보상합니다.", date: "2026.06.19" },
      { id: 2, author: "트레일준", rating: 4, content: "신발은 접지 좋은 걸 추천합니다.", date: "2026.06.11" },
      { id: 3, author: "제주러너", rating: 5, content: "사진 찍을 포인트가 많고 코스가 지루하지 않아요.", date: "2026.06.01" },
    ],
  },
  5: {
    recommendedTime: "저녁 19:00-21:00",
    elevation: "142m",
    coverLabel: "NAMSAN HILL WORK",
    startPoint: "국립극장 앞",
    endPoint: "남산 순환로 정상부",
    nearbyPoints: ["남산타워", "국립극장", "장충단공원"],
    recommendPoints: ["짧은 거리 안에 확실한 업힐 자극이 있습니다.", "도심 전망이 좋아 동기부여가 큽니다.", "페이스보다 근지구력 훈련에 적합합니다."],
    cautions: ["초반부터 무리하면 후반 페이스가 급격히 떨어질 수 있습니다.", "내리막에서는 무릎 부담을 줄여야 합니다."],
    recommendedFor: ["업힐 훈련을 원하는 러너", "짧고 강한 코스를 찾는 러너", "도심 전망 러닝을 좋아하는 러너"],
    amenities: { toilet: "공원 공용시설", parking: "국립극장 인근", nightLight: "순환로 조명 양호", convenienceStore: "출발지 인근", transit: "버스 접근 양호", difficultyNote: "상승 구간이 길어 중상급 러너에게 추천합니다." },
    reviews: [
      { id: 1, author: "업힐러", rating: 5, content: "짧게 강하게 뛰기 최고입니다.", date: "2026.06.17" },
      { id: 2, author: "남산페이스", rating: 4, content: "내리막 조심하면 정말 좋은 훈련 코스입니다.", date: "2026.06.09" },
      { id: 3, author: "도심런", rating: 4, content: "야경이 좋아 힘든 줄 모르고 뛰었어요.", date: "2026.06.02" },
    ],
  },
  6: {
    recommendedTime: "오후 16:00-19:00",
    elevation: "9m",
    coverLabel: "PARK EASY TRACK",
    startPoint: "호수공원 중앙광장",
    endPoint: "호수 순환 산책로",
    nearbyPoints: ["호수 전망대", "잔디광장", "공원 카페"],
    recommendPoints: ["짧고 평탄해서 회복주에 좋습니다.", "가족 산책과 함께 즐기기 좋습니다.", "초보 러너가 거리 감각을 만들기 좋습니다."],
    cautions: ["산책 인구가 많은 시간에는 추월에 주의하세요.", "비 오는 날 일부 데크가 미끄러울 수 있습니다."],
    recommendedFor: ["입문 러너", "회복주를 계획하는 러너", "공원 러닝을 선호하는 러너"],
    amenities: { toilet: "공원 내 다수", parking: "공원 주차장", nightLight: "주요 산책로 조명", convenienceStore: "공원 외곽 상권", transit: "버스 정류장 인접", difficultyNote: "가장 부담이 적은 초급 코스입니다." },
    reviews: [
      { id: 1, author: "수원런", rating: 5, content: "처음 5km 도전하기 좋았습니다.", date: "2026.06.15" },
      { id: 2, author: "회복주", rating: 4, content: "천천히 돌기 좋은 코스예요.", date: "2026.06.05" },
      { id: 3, author: "공원러너", rating: 4, content: "주말에는 조금 붐비지만 분위기가 좋아요.", date: "2026.05.28" },
    ],
  },
  7: {
    recommendedTime: "오전 06:00-08:30",
    elevation: "15m",
    coverLabel: "OLYMPIC TRACK SET",
    startPoint: "올림픽공원 평화의문",
    endPoint: "몽촌토성 산책로",
    nearbyPoints: ["평화의문", "몽촌토성", "잔디마당"],
    recommendPoints: ["인터벌과 조깅을 모두 구성하기 좋습니다.", "공원 경관이 넓어 답답하지 않습니다.", "트랙성 루트라 페이스 체크가 편합니다."],
    cautions: ["행사일에는 일부 동선이 통제될 수 있습니다.", "주말 낮에는 보행자가 많습니다."],
    recommendedFor: ["인터벌 훈련을 하는 러너", "짧은 코스를 반복하고 싶은 러너", "공원 러닝을 선호하는 러너"],
    amenities: { toilet: "공원 내 다수", parking: "올림픽공원 주차장", nightLight: "일부 구간 조명 양호", convenienceStore: "역 주변 상권", transit: "올림픽공원역 인접", difficultyNote: "짧지만 속도 훈련을 넣으면 중급 난이도입니다." },
    reviews: [
      { id: 1, author: "인터벌킴", rating: 5, content: "반복주 하기 좋은 구조입니다.", date: "2026.06.13" },
      { id: 2, author: "송파러너", rating: 5, content: "아침 공기가 좋고 코스가 넓어요.", date: "2026.06.06" },
      { id: 3, author: "트랙러버", rating: 4, content: "주말은 아침 일찍 추천합니다.", date: "2026.05.31" },
    ],
  },
  8: {
    recommendedTime: "오전 07:00-11:00",
    elevation: "64m",
    coverLabel: "LAKE LONG RUN",
    startPoint: "의암호 자전거길 입구",
    endPoint: "호수 전망 데크",
    nearbyPoints: ["의암호", "호수 전망대", "카페거리"],
    recommendPoints: ["긴 호흡으로 달리기 좋은 중장거리 루트입니다.", "호수 풍경 덕분에 지루함이 적습니다.", "주말 롱런 코스로 활용하기 좋습니다."],
    cautions: ["일부 구간은 자전거와 함께 사용합니다.", "보급 지점 간격이 있어 물을 준비하는 편이 좋습니다."],
    recommendedFor: ["롱런을 준비하는 러너", "풍경 좋은 코스를 찾는 러너", "10km 이상 거리에 익숙한 러너"],
    amenities: { toilet: "주요 전망 포인트", parking: "입구 공영주차장", nightLight: "야간 러닝 비추천", convenienceStore: "출발지 인근", transit: "대중교통 이동 전 확인 필요", difficultyNote: "거리 부담이 있어 중급 이상 러너에게 좋습니다." },
    reviews: [
      { id: 1, author: "롱런러", rating: 5, content: "풍경 덕분에 13km가 길게 느껴지지 않았습니다.", date: "2026.06.10" },
      { id: 2, author: "호수페이스", rating: 4, content: "보급만 챙기면 정말 좋은 코스입니다.", date: "2026.06.04" },
      { id: 3, author: "춘천런", rating: 5, content: "주말 아침 롱런으로 강력 추천합니다.", date: "2026.05.26" },
    ],
  },
};

export const courseDetails: CourseDetail[] = runningCourses.map((course) => ({
  ...course,
  ...detailMeta[course.id],
}));
