# Seed Plan

WE ARE RUN의 Mock Data를 실제 데이터베이스로 옮기기 위한 seed 설계 문서입니다.

현재 단계에서는 `prisma/seed.ts` 초안만 준비했습니다. 아직 DB 연결, migrate, generate, seed 실행은 하지 않습니다.

## 목적

- Mock Data 기반 프론트 프로토타입을 실제 DB 초기 데이터로 옮길 준비를 합니다.
- 도메인별 seed 순서와 관계 연결 방식을 미리 정리합니다.
- 실제 DB 연결 전에 누락된 필드, enum 매핑, 관계 정책을 확인합니다.

## Seed Runner 결정

WE ARE RUN의 seed runner는 **tsx 사용 예정**입니다.

나중에 설치할 명령어:

```bash
npm install -D tsx
```

나중에 `package.json`에 추가할 script:

```json
"prisma:seed": "tsx prisma/seed.ts"
```

이번 Sprint에서는 새 패키지를 설치하지 않고, `package.json` script도 추가하지 않습니다.

## 실행 전 필수 준비

- [ ] `DATABASE_URL` 설정
- [ ] Prisma 7 adapter/driver 결정
- [ ] Prisma Client 생성 전략 확정
- [ ] `prisma generate` 실행
- [ ] 초기 migration 완료
- [ ] seed runner `tsx` 설치
- [ ] `prisma:seed` script 추가
- [ ] 개발 DB와 운영 DB 분리 확인
- [ ] 중복 데이터 방지 전략 확정
- [ ] 초기화/reset 범위 확정

## Seed 순서

1. Users
2. Courses
3. Facilities
4. Crews
5. Equipment
6. CommunityPosts
7. Comments
8. Reviews
9. Bookmarks
10. Likes
11. AdminLogs

## Seed 함수 구조

`prisma/seed.ts`는 아래 함수 구조를 기준으로 작성되어 있습니다.

- `main()`
- `seedUsers()`
- `seedCourses()`
- `seedFacilities()`
- `seedCrews()`
- `seedEquipment()`
- `seedCommunity()`
- `seedReviews()`
- `seedBookmarks()`
- `seedLikes()`
- `seedAdminLogs()`
- `resetSeedData()`

`resetSeedData()`는 아직 실행하지 않으며, 실제 DB 초기화 정책이 정해진 뒤 주석을 해제합니다.

## Mock Data 매핑

| Mock Data | Prisma Model | 비고 |
| --- | --- | --- |
| `runningCourses` | `RunningCourse` | 거리 문자열을 `distanceKm` 숫자로 변환 |
| `courseDetails.reviews` | `Review` | `targetType: COURSE`로 연결 |
| `runningFacilities` | `RunningFacility` | 시설 유형/운영 상태 enum 변환 |
| `facilityDetails.reviews` | `Review` | `targetType: FACILITY`로 연결 |
| `runningCrews` | `RunningCrew` | `CrewMember`, `CrewSchedule` 함께 생성 |
| `equipmentRecommendations` | `EquipmentItem` | 카테고리/레벨 enum 변환 |
| `equipmentDetails.reviews` | `Review` | `targetType: EQUIPMENT`로 연결 |
| `communityPosts` | `CommunityPost` | 카테고리 enum 변환 |
| `communityPostDetails.commentsPreview` | `Comment` | 게시글 상세 댓글 preview를 댓글로 변환 |
| `adminActivities` | `AdminLog` | 관리자 활동 로그로 변환 |

## 중복 데이터 방지 전략

초안에서는 `upsert`를 사용합니다.

- User: `email` 기준
- 나머지 모델: seed 전용 고정 ID 기준
- 예: `seed-course-1`, `seed-facility-1`, `seed-post-1`

실제 운영 전에는 slug, 외부 ID, 생성자 정책을 다시 확인해야 합니다.

## TODO

- 실제 위도/경도 데이터 확정 후 `position` 값을 `latitude`, `longitude`로 변환
- 실제 userId 연결 정책 확정
- 러닝 기록이 있는 게시글의 `RunningRecord` 생성 및 연결 정책 확정
- 장비 스펙/적합도 데이터를 JSON 필드로 둘지 별도 모델로 분리할지 결정
- 카테고리, 난이도, 레벨 enum 매핑 최종 검수
- Prisma 7 adapter/driver 도입 여부 결정
- seed runner `tsx` 설치
- reset/deleteMany 활성화 범위 결정

## 아직 실행하지 않는 명령어

아래 명령은 다음 단계에서 DB 준비가 끝난 뒤 실행합니다.

```bash
npm install -D tsx
```

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma db push
```

```bash
npm run prisma:seed
```
