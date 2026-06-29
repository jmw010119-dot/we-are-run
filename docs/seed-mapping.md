# Seed Mapping

현재 `lib/mock`에 있는 Mock Data를 Prisma seed 데이터로 이전하기 위한 매핑표입니다.

아직 seed script는 작성하지 않습니다.

## Mapping Table

| Mock file | Mock export | Prisma model | Notes |
| --- | --- | --- | --- |
| `lib/mock/courses.ts` | `runningCourses` | `RunningCourse` | 코스 목록 기본 정보. `distance`는 `distanceKm`로 숫자 변환 필요 |
| `lib/mock/courses.ts` | `courseDetails` | `RunningCourse`, `Review` | 상세 필드는 코스 확장 데이터로 반영, `reviews`는 `Review`로 분리 |
| `lib/mock/courses.ts` | `mapPins` | `RunningCourse` 또는 별도 지도 메타 | 현재는 지도 UI용 데이터. 실제 DB에서는 코스 좌표로 흡수 가능 |
| `lib/mock/courses.ts` | `mapPreviewCourses` | `RunningCourse` | 홈 미리보기용 랭킹 데이터. 추후 조회 로직으로 대체 |
| `lib/mock/courses.ts` | `popularCourses` | `RunningCourse` | 인기 코스 카드용 데이터. 실제 DB에서는 평점/저장 수 기반으로 계산 |
| `lib/mock/facilities.ts` | `runningFacilities` | `RunningFacility` | 시설 목록 기본 정보 |
| `lib/mock/facilities.ts` | `facilityDetails` | `RunningFacility`, `Review` | 편의시설 상태는 추후 별도 JSON 또는 정규화 검토 |
| `lib/mock/crews.ts` | `runningCrews` | `RunningCrew` | 크루 목록 기본 정보 |
| `lib/mock/crews.ts` | `crewDetails` | `RunningCrew`, `CrewSchedule`, `CrewMember`, `RunningRecord` | 일정은 `CrewSchedule`, 운영진/멤버는 `CrewMember` seed 후보 |
| `lib/mock/crews.ts` | `recommendedCrews` | `RunningCrew` | 홈 추천용 데이터. 실제 DB에서는 추천 쿼리로 대체 |
| `lib/mock/equipment.ts` | `equipmentRecommendations` | `EquipmentItem` | 장비 목록 기본 정보 |
| `lib/mock/equipment.ts` | `equipmentDetails` | `EquipmentItem`, `Review` | 장점/아쉬운 점/스펙은 추후 JSON 필드 또는 별도 모델 검토 |
| `lib/mock/community.ts` | `communityPosts` | `CommunityPost`, `RunningRecord` | 러닝 기록이 있으면 `RunningRecord` 생성 후 연결 |
| `lib/mock/community.ts` | `communityPostDetails` | `CommunityPost`, `Comment` | `commentsPreview`는 `Comment`로 이전 |
| `lib/mock/community.ts` | `popularTags` | query result 또는 별도 Tag 모델 | 현재는 UI 데이터. 실제 DB에서는 게시글 태그 집계로 대체 |
| `lib/mock/community.ts` | `popularRunners` | `User`, `RunningRecord` | 실제 DB에서는 유저 활동 집계로 계산 |
| `lib/mock/community.ts` | `trendingPosts` | `CommunityPost` | 실제 DB에서는 조회수/댓글 수 기준으로 계산 |
| `lib/mock/profile.ts` | `profileUser` | `User` | 데모 사용자 seed |
| `lib/mock/profile.ts` | `profileStats` | query result | 실제 DB에서는 러닝 기록, 게시글, 저장 수 집계 |
| `lib/mock/profile.ts` | `profileActivities` | `RunningRecord`, `CommunityPost`, `CrewSchedule` | 활동 유형별로 분리 필요 |
| `lib/mock/profile.ts` | `profileSavedCourses` | `Bookmark` | `targetType=COURSE` |
| `lib/mock/profile.ts` | `profileSavedFacilities` | `Bookmark` | `targetType=FACILITY` |
| `lib/mock/profile.ts` | `profileJoinedCrews` | `CrewMember` | 데모 사용자의 크루 가입 관계 |
| `lib/mock/profile.ts` | `profileSavedEquipment` | `Bookmark` | `targetType=EQUIPMENT` |
| `lib/mock/profile.ts` | `profileMyPosts` | `CommunityPost` | 데모 사용자가 작성한 게시글 |
| `lib/mock/profile.ts` | `profileBadges` | future model | 배지 모델은 아직 schema에 없음 |
| `lib/mock/profile.ts` | `profileGoals` | future model | 목표 모델은 아직 schema에 없음 |
| `lib/mock/profile.ts` | `profileActions` | UI config | DB 이전 대상 아님 |
| `lib/mock/admin.ts` | `adminStats` | query result | 실제 DB에서는 집계 쿼리 |
| `lib/mock/admin.ts` | `adminActivities` | `AdminLog` | 관리자 활동 로그 |
| `lib/mock/admin.ts` | `adminPendingApprovals` | `ApprovalStatus` 기반 query | 코스/시설/크루/장비 승인 대기 데이터 |
| `lib/mock/admin.ts` | `adminReports` | `Report` | 신고 대기 데이터 |
| `lib/mock/admin.ts` | `adminServiceStatus` | 운영 모니터링 | DB seed 대상 아님 |
| `lib/mock/admin.ts` | `adminQuickActions` | UI config | DB 이전 대상 아님 |
| `lib/mock/admin.ts` | `adminMemo` | future model 또는 config | 운영 메모 모델은 아직 schema에 없음 |

## Conversion Notes

- 거리 문자열 예: `8.4km` -> `8.4`
- 시간 문자열 예: `48분` -> 그대로 `estimatedTime`에 저장하거나 초 단위 필드 추가 검토
- 평점은 seed 시 `Review`의 평균으로 계산할지, 별도 캐시 필드를 둘지 결정 필요
- 태그는 현재 `String[]`로 저장
- 이미지 mock은 실제 URL이 생기기 전까지 `imageUrl`을 비워둠
- 위치 mock의 `top`, `left`는 실제 지도 좌표가 아니므로 DB에는 넣지 않음

## Seed Order

1. User
2. RunningCourse
3. RunningFacility
4. RunningCrew
5. EquipmentItem
6. CrewMember
7. CrewSchedule
8. RunningRecord
9. CommunityPost
10. Comment
11. Review
12. Bookmark
13. Like
14. Report
15. AdminLog
