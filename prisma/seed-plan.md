# Seed Plan

WE ARE RUN의 Mock Data를 Neon PostgreSQL 초기 데이터로 입력하기 위한 seed 계획입니다.

## 현재 상태

- `tsx` 설치 완료
- `package.json`에 `prisma:seed` 스크립트 추가 완료
- `prisma/seed.ts` 실행 가능 상태
- Neon PostgreSQL 초기 seed 입력 완료
- Seed는 중복 실행 가능하도록 reset 후 insert 방식으로 동작

## 실행 명령

```bash
npm run prisma:seed
```

## Seed 순서

1. User
2. RunningCourse
3. RunningFacility
4. RunningCrew
5. EquipmentItem
6. CommunityPost
7. CrewSchedule
8. CrewMember
9. RunningRecord
10. Review
11. Comment
12. Bookmark
13. Like
14. Report
15. AdminLog

## Reset 순서

관계 제약 때문에 자식 테이블부터 삭제합니다.

1. Like
2. Bookmark
3. Comment
4. Review
5. RunningRecord
6. CrewMember
7. CrewSchedule
8. Report
9. AdminLog
10. CommunityPost
11. EquipmentItem
12. RunningCrew
13. RunningFacility
14. RunningCourse
15. User

## Mock Data 매핑

| Mock Data | Prisma Model | 비고 |
| --- | --- | --- |
| `runningCourses` | `RunningCourse` | 거리 문자열을 `distanceKm` 숫자로 변환 |
| `courseDetails.reviews` | `Review` | `targetType: COURSE`로 연결 |
| `runningFacilities` | `RunningFacility` | 시설 유형/운영 상태를 enum으로 변환 |
| `facilityDetails.reviews` | `Review` | `targetType: FACILITY`로 연결 |
| `runningCrews` | `RunningCrew` | 크루 기본 정보 생성 |
| `crewDetails.schedules` | `CrewSchedule` | 상세 일정 mock을 DB 일정으로 변환 |
| `runningCrews` + seed users | `CrewMember` | 크루별 기본 멤버 생성 |
| `equipmentRecommendations` | `EquipmentItem` | 카테고리/레벨을 enum으로 변환 |
| `equipmentDetails.reviews` | `Review` | `targetType: EQUIPMENT`로 연결 |
| `communityPosts` | `CommunityPost` | 카테고리를 enum으로 변환 |
| `communityPosts.runningRecord` | `RunningRecord` | 인증 기록이 있는 게시글과 연결 |
| `communityPostDetails.commentsPreview` | `Comment` | 댓글 preview를 실제 댓글로 변환 |
| `adminActivities` | `AdminLog` | 관리자 활동 로그로 변환 |
| `adminReports` | `Report` | 신고 대기 데이터로 변환 |

## Seed 데이터 기준

- User 4명
- RunningCourse 8개
- RunningFacility 8개
- RunningCrew 8개
- EquipmentItem 8개
- CommunityPost 12개
- CrewSchedule 24개
- CrewMember 24개
- RunningRecord 4개
- Review 72개
- Comment 60개
- Bookmark 6개
- Like 4개
- Report 3개
- AdminLog 5개

## TODO

- 실제 서비스 가입 사용자와 OAuth User 연결
- 실제 위도/경도 데이터 확정 후 `latitude`, `longitude` 입력
- 실제 이미지 저장소 연동 후 `imageUrl` 입력
- 운영 DB와 개발 DB seed 범위 분리
- API 연결 후 seed 데이터가 화면에 표시되는지 검증
