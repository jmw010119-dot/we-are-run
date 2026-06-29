# Database Design

WE ARE RUN의 Mock Data를 실제 데이터베이스로 이전하기 위한 Prisma 모델 초안입니다.

이 문서는 백엔드 구현 전 협업용 설계 문서이며, 아직 실제 DB 연결, Prisma migrate, Prisma Client generate, API Route, Server Action은 실행하지 않습니다.

## ER 구조

핵심 구조는 사용자 중심으로 코스, 시설, 크루, 장비, 커뮤니티 활동이 연결되는 형태입니다.

```text
User
  ├─ CommunityPost
  │    ├─ Comment
  │    └─ Like
  ├─ Bookmark
  │    ├─ RunningCourse
  │    ├─ RunningFacility
  │    ├─ RunningCrew
  │    ├─ EquipmentItem
  │    └─ CommunityPost
  ├─ Review
  │    ├─ RunningCourse
  │    ├─ RunningFacility
  │    └─ EquipmentItem
  ├─ CrewMember ─ RunningCrew ─ CrewSchedule
  ├─ RunningRecord ─ RunningCourse
  ├─ Like
  └─ Report

AdminLog
  └─ User(admin)
```

신고와 저장, 좋아요는 여러 대상에 걸쳐 사용되므로 `targetType + targetId`를 기본 식별 방식으로 두고, 자주 조회할 대상에는 선택적 relation field를 함께 둡니다.

## 핵심 모델

### User

서비스 사용자를 나타냅니다.

- 게시글, 댓글, 리뷰, 좋아요, 북마크, 러닝 기록을 가집니다.
- 크루 멤버 또는 크루 운영자가 될 수 있습니다.
- `UserRole`로 일반 사용자, 관리자, 운영자를 구분합니다.
- `UserLevel`로 초보, 중급, 고급, 누구나 레벨을 표현합니다.

### RunningCourse

전국 러닝 코스입니다.

- 지역, 도시, 거리, 난이도, 코스 유형, 예상 시간, 설명, 태그를 가집니다.
- 리뷰와 북마크 대상입니다.
- 러닝 기록과 연결될 수 있습니다.
- 관리자 승인 흐름을 위해 `ApprovalStatus`를 둡니다.

### RunningFacility

러닝 시설입니다.

- 트랙, 공원, 실내 러닝장, 육상경기장, 산책로 유형을 가집니다.
- 운영 상태, 주소, 운영 시간, 편의시설을 저장합니다.
- 리뷰와 북마크 대상입니다.
- 관리자 승인 흐름을 위해 `ApprovalStatus`를 둡니다.

### RunningCrew

러닝 크루입니다.

- 지역, 도시, 러닝 유형, 레벨, 정기런 시간, 번개런 가능 여부, 모집 상태를 가집니다.
- `CrewMember`로 가입 사용자를 관리합니다.
- `CrewSchedule`로 정기런과 번개런 일정을 관리합니다.
- 북마크와 신고 대상입니다.

### EquipmentItem

장비 추천 항목입니다.

- 브랜드, 카테고리, 추천 레벨, 목적, 가격, 설명, 추천 이유를 가집니다.
- 리뷰와 북마크 대상입니다.
- 실제 구매 링크나 결제 정보는 아직 포함하지 않습니다.

### CommunityPost

커뮤니티 게시글입니다.

- 러닝 인증, 자유게시판, 질문, 정보공유, 후기, 크루모집 카테고리를 가집니다.
- 댓글과 좋아요를 가집니다.
- 북마크와 신고 대상입니다.
- 러닝 인증 게시글은 `RunningRecord`와 연결될 수 있습니다.

### Comment

게시글 댓글입니다.

- 작성자와 게시글에 연결됩니다.
- 대댓글을 위해 자기 참조 관계를 둡니다.
- 좋아요와 신고 대상입니다.

### Bookmark

사용자의 저장 항목입니다.

- 코스, 시설, 크루, 장비, 게시글을 저장할 수 있습니다.
- `BookmarkTargetType`과 `targetId`로 공통 저장 구조를 유지합니다.
- 대상별 조회를 위해 `courseId`, `facilityId`, `crewId`, `equipmentId`, `postId`를 선택적으로 둡니다.
- 같은 사용자가 같은 대상을 중복 저장하지 못하도록 unique 제약을 둡니다.

### Like

좋아요 데이터입니다.

- 게시글, 댓글, 러닝 기록에 사용할 수 있습니다.
- `LikeTargetType`과 `targetId`로 공통 좋아요 구조를 유지합니다.
- 대상별 조회를 위해 `postId`, `commentId`, `runningRecordId`를 선택적으로 둡니다.
- 같은 사용자가 같은 대상에 중복 좋아요를 누르지 못하도록 unique 제약을 둡니다.

### Review

리뷰 데이터입니다.

- 작성자(User)와 연결됩니다.
- 코스, 시설, 장비를 리뷰 대상으로 둡니다.
- `ReviewTargetType + targetId`와 선택적 relation field를 함께 둬 통합 조회와 대상별 조회를 모두 고려합니다.

### CrewSchedule

크루 일정입니다.

- 정기런, 번개런, 장거리런, 초보런 유형을 가집니다.
- 날짜, 장소, 거리, 페이스, 모집 인원을 저장합니다.

### CrewMember

크루 가입 관계입니다.

- 사용자와 크루를 연결합니다.
- 크루장, 리더, 일반 멤버 역할을 구분합니다.
- 가입 대기, 활동 중, 탈퇴, 차단 상태를 표현합니다.
- 한 사용자가 같은 크루에 중복 가입하지 못하도록 unique 제약을 둡니다.

### RunningRecord

러닝 인증 기록입니다.

- 사용자, 거리, 소요 시간, 페이스, 메모, 이미지 URL을 가집니다.
- 선택적으로 코스와 연결됩니다.
- 커뮤니티 인증 게시글과 1:1로 연결될 수 있습니다.
- 좋아요 대상이 될 수 있습니다.

### Report

신고 데이터입니다.

- 게시글, 댓글, 크루, 사용자, 리뷰를 신고 대상으로 둘 수 있습니다.
- `ReportStatus`로 대기, 검토중, 처리 완료, 반려 상태를 관리합니다.
- 관리자 페이지의 신고 대기 목록으로 확장하기 위한 기반 모델입니다.

### AdminLog

관리자 활동 기록입니다.

- 승인, 반려, 수정, 삭제, 신고 처리 같은 운영 이벤트를 기록합니다.
- 관리자 User와 선택적으로 연결됩니다.

## 관계

- User 1:N CommunityPost
- User 1:N Comment
- User 1:N Review
- User 1:N Bookmark
- User 1:N Like
- User 1:N RunningRecord
- User N:M RunningCrew through CrewMember
- RunningCrew 1:N CrewSchedule
- RunningCrew 1:N CrewMember
- CommunityPost 1:N Comment
- CommunityPost 1:N Like
- CommunityPost 1:1 RunningRecord
- RunningCourse 1:N Review
- RunningCourse 1:N Bookmark
- RunningFacility 1:N Review
- RunningFacility 1:N Bookmark
- EquipmentItem 1:N Review
- EquipmentItem 1:N Bookmark
- Report N:1 User(reporter)
- AdminLog N:1 User(admin)

## Enum 설명

- `UserRole`: 사용자 권한. `USER`, `ADMIN`, `MODERATOR`
- `UserLevel`: 러닝 레벨. `BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `ANYONE`
- `CourseDifficulty`: 코스 난이도. `EASY`, `NORMAL`, `HARD`
- `FacilityType`: 시설 유형. `TRACK`, `PARK`, `INDOOR`, `STADIUM`, `WALKWAY`
- `CrewLevel`: 크루 레벨. `BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `ANYONE`
- `CrewRunType`: 크루 러닝 유형. `REGULAR`, `FLASH`, `LONG`, `BEGINNER`
- `EquipmentCategory`: 장비 카테고리. `SHOES`, `APPAREL`, `GPS_WATCH`, `ACCESSORY`
- `PostCategory`: 게시글 카테고리. `RUN_CERTIFICATION`, `FREE_BOARD`, `QUESTION`, `INFORMATION`, `REVIEW`, `CREW_RECRUITING`
- `ReportStatus`: 신고 처리 상태. `PENDING`, `REVIEWING`, `RESOLVED`, `REJECTED`
- `ApprovalStatus`: 운영 승인 상태. `DRAFT`, `PENDING`, `APPROVED`, `REJECTED`

추가로 실제 운영을 위해 아래 Enum도 포함했습니다.

- `FacilityStatus`
- `BookmarkTargetType`
- `LikeTargetType`
- `ReviewTargetType`
- `ReportTargetType`
- `CrewMemberRole`
- `CrewMemberStatus`
- `AdminLogAction`

## 추후 구현 순서

1. 실제 DB 서비스 결정
2. `DATABASE_URL` 환경변수 준비
3. Prisma 패키지 설치 여부 결정
4. `prisma format`으로 schema 문법 검증
5. `prisma validate`로 관계 검증
6. 초기 migration 생성
7. seed 데이터 설계
8. 현재 Mock Data를 seed 데이터로 이전
9. 읽기 전용 API 또는 Server Action부터 설계
10. 목록 페이지를 DB 조회 기반으로 전환
11. 상세 페이지를 DB 조회 기반으로 전환
12. 인증/권한 도입
13. 북마크, 좋아요, 리뷰 쓰기 기능 연결
14. 관리자 승인/신고 처리 플로우 연결

## TODO

- 실제 DB 선택: Supabase, Neon, Railway 등
- 위치 데이터 전략 결정: Decimal 위도/경도 유지 또는 PostGIS 도입
- 이미지 저장소 결정: Vercel Blob, S3, Cloudflare R2 등
- 북마크/좋아요/신고의 다형성 관계를 현재 통합 구조로 유지할지, 대상별 테이블로 분리할지 결정
- 리뷰를 통합 테이블로 유지할지, 코스/시설/장비별 테이블로 분리할지 결정
- 승인 상태와 관리자 권한 범위 세분화
- 러닝 기록의 공개 범위 설정
- 크루 가입 승인 정책 결정
