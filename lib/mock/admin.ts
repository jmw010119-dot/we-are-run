import type {
  AdminActivity,
  AdminMemo,
  AdminPendingApproval,
  AdminQuickAction,
  AdminReport,
  AdminServiceStatus,
  AdminStat,
} from "@/types";

export const adminStats: AdminStat[] = [
  { id: 1, label: "전체 회원", value: "18,420", change: "+248 이번 주", tone: "green" },
  { id: 2, label: "등록 코스", value: "642", change: "+18 신규", tone: "blue" },
  { id: 3, label: "등록 시설", value: "318", change: "+7 수정 요청", tone: "blue" },
  { id: 4, label: "활동 크루", value: "126", change: "+12 모집중", tone: "green" },
  { id: 5, label: "커뮤니티 게시글", value: "24,680", change: "+128 오늘", tone: "yellow" },
  { id: 6, label: "신고 대기", value: "17", change: "5건 긴급", tone: "red" },
];

export const adminActivities: AdminActivity[] = [
  { id: 1, type: "course", title: "새 코스 등록", description: "성수 서울숲 6K 코스가 등록 요청되었습니다.", createdAt: "방금 전", status: "승인 대기" },
  { id: 2, type: "crew", title: "새 크루 생성", description: "잠실 선데이 러너스 크루가 개설되었습니다.", createdAt: "12분 전", status: "검토 필요" },
  { id: 3, type: "report", title: "게시글 신고", description: "커뮤니티 게시글 3건이 반복 신고되었습니다.", createdAt: "28분 전", status: "대응 대기" },
  { id: 4, type: "facility", title: "시설 정보 수정 요청", description: "여의도공원 화장실 위치 정보 수정 요청이 접수되었습니다.", createdAt: "1시간 전", status: "확인중" },
  { id: 5, type: "member", title: "신규 회원 가입", description: "오늘 신규 가입자가 42명 추가되었습니다.", createdAt: "2시간 전", status: "정상" },
];

export const adminPendingApprovals: AdminPendingApproval[] = [
  { id: 1, title: "성수 서울숲 리커버리 6K", type: "코스", author: "서울러너01", date: "오늘 10:24" },
  { id: 2, title: "광교 호수공원 조명 정보", type: "시설", author: "수원페이서", date: "오늘 09:52" },
  { id: 3, title: "잠실 선데이 러너스", type: "크루", author: "롱런리더", date: "어제" },
  { id: 4, title: "입문자용 데일리 러닝화 추천", type: "장비 추천", author: "기어랩", date: "어제" },
];

export const adminReports: AdminReport[] = [
  { id: 1, title: "반복 홍보성 게시글", reportType: "게시글 신고", count: 8, status: "대기" },
  { id: 2, title: "부적절한 댓글 표현", reportType: "댓글 신고", count: 4, status: "검토중" },
  { id: 3, title: "허위 모집 일정", reportType: "크루 신고", count: 5, status: "대기" },
];

export const adminServiceStatus: AdminServiceStatus[] = [
  { id: 1, label: "서버 상태", value: "99.98%", status: "정상", description: "최근 24시간 장애 없음" },
  { id: 2, label: "DB 상태", value: "준비중", status: "정상", description: "운영 데이터 연동 준비 중" },
  { id: 3, label: "이미지 저장소", value: "대기", status: "주의", description: "실제 업로드 연동 전 UI 상태" },
  { id: 4, label: "최근 빌드", value: "Success", status: "정상", description: "프로덕션 빌드 통과" },
];

export const adminQuickActions: AdminQuickAction[] = [
  { id: 1, label: "코스 관리", description: "러닝 코스 등록과 노출 상태를 관리합니다.", href: "/courses" },
  { id: 2, label: "시설 관리", description: "러닝 시설 정보와 편의시설을 확인합니다.", href: "/facilities" },
  { id: 3, label: "크루 관리", description: "크루 개설과 모집 상태를 검토합니다.", href: "/crews" },
  { id: 4, label: "게시글 관리", description: "커뮤니티 글과 댓글 상태를 확인합니다.", href: "/community" },
  { id: 5, label: "회원 관리", description: "회원 활동 상태를 살펴봅니다.", href: "/profile" },
  { id: 6, label: "신고 관리", description: "접수된 신고를 우선순위별로 처리합니다.", href: "/admin" },
];

export const adminMemo: AdminMemo = {
  title: "오늘의 운영 메모",
  content: "신규 코스 승인 요청은 오전 중 우선 확인하고, 신고 누적 5회 이상 항목은 커뮤니티 노출 상태를 먼저 점검하세요.",
  updatedAt: "오늘 09:30 업데이트",
};
