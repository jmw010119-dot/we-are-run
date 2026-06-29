# Auth Route & Middleware Plan

WE ARE RUN에서 로그인, 세션 유지, 보호 라우트, 관리자 라우트를 안전하게 구성하기 위한 설계 문서입니다.

현재 단계에서는 실제 `auth.ts`, `route.ts`, `middleware.ts` 파일을 만들지 않습니다.

## 목표

WE ARE RUN에서 아래 인증 흐름을 안전하게 구성합니다.

- 로그인
- 세션 유지
- 보호 라우트 접근 제어
- 관리자 라우트 접근 제어
- 로그인 후 원래 페이지로 돌아가기
- 권한 없는 사용자의 redirect 처리

## 예정 파일 구조

실제 Auth.js 구현 Sprint에서 아래 파일 구조를 검토합니다.

```text
auth.ts
app/api/auth/[...nextauth]/route.ts
middleware.ts
```

선택적으로 추가할 수 있는 파일:

```text
lib/auth.ts
lib/session.ts
lib/permissions.ts
```

역할:

- `auth.ts`: Auth.js 설정의 중심 파일
- `app/api/auth/[...nextauth]/route.ts`: Auth.js API route
- `middleware.ts`: 보호 라우트와 관리자 라우트 접근 제어
- `lib/session.ts`: 서버에서 세션을 읽는 helper
- `lib/permissions.ts`: Guest, Member, Admin 권한 체크 helper

## Auth.js v5 기본 구조

`auth.ts`에서 관리할 예정인 항목:

- providers
- adapter
- session strategy
- callbacks
- pages

예상 구성:

```text
providers -> Google, Kakao, Naver
adapter -> Prisma Adapter
session -> Database Session
callbacks -> role, user id, redirect 정책
pages -> login, error
```

`app/api/auth/[...nextauth]/route.ts`에서 export할 예정인 항목:

```text
GET
POST
```

`middleware.ts`에서 처리할 예정인 항목:

- 로그인 필요 라우트 접근 제어
- 관리자 필요 라우트 접근 제어
- 로그인 사용자의 `/login` 접근 redirect

## 보호 라우트 기준

### 공개 라우트

아래 라우트는 Guest도 접근할 수 있습니다.

- `/`
- `/courses`
- `/courses/[id]`
- `/facilities`
- `/facilities/[id]`
- `/crews`
- `/crews/[id]`
- `/equipment`
- `/equipment/[id]`
- `/community`
- `/community/[id]`

### 로그인 필요 라우트

아래 라우트는 Member 이상만 접근할 수 있습니다.

- `/profile`
- `/community/write`
- `/bookmarks`
- `/settings`

### 관리자 필요 라우트

아래 라우트는 Admin만 접근할 수 있습니다.

- `/admin`
- `/admin/*`

## 권한 체크

### Guest

- 공개 페이지 조회 가능
- 북마크, 좋아요, 댓글, 크루 가입 불가
- `/profile`, `/admin` 접근 불가

### Member

- `/profile` 접근 가능
- 북마크 가능
- 좋아요 가능
- 댓글 작성 가능
- 크루 가입 가능

### Admin

- `/admin` 접근 가능
- 승인/반려 처리 가능
- 신고 처리 가능
- 운영 로그 확인 가능

Admin 권한은 `UserRole.ADMIN` 기준으로 판단합니다.

## Redirect 전략

비로그인 사용자가 보호 라우트 접근:

```text
/login?callbackUrl=...
```

로그인 사용자가 `/login` 접근:

```text
/profile
```

Admin이 아닌 사용자가 `/admin` 접근:

```text
/
```

또는 추후 아래 페이지로 이동합니다.

```text
/403
```

## 추후 만들 페이지

아래 페이지는 이번 Sprint에서 만들지 않습니다.

```text
app/login/page.tsx
app/auth/error/page.tsx
app/403/page.tsx
```

역할:

- `/login`: 로그인 제공자 선택
- `/auth/error`: OAuth 또는 세션 오류 안내
- `/403`: 권한 없음 안내

## 세션 사용 위치

### Header

- 로그인 상태에 따라 프로필 버튼 또는 로그인 버튼 표시 예정
- 알림 기능은 로그인 이후 활성화 예정

### Profile

- 실제 로그인 사용자 정보 사용 예정
- 저장한 코스, 가입한 크루, 작성한 글은 User 기준으로 조회 예정

### Admin

- `UserRole.ADMIN` 체크 예정
- Admin이 아니면 접근 차단 예정

### Community

- 글쓰기, 댓글, 좋아요는 로그인 필요 예정
- 목록과 상세 조회는 공개 유지 예정

## Middleware 설계 주의사항

- middleware에서 너무 많은 DB 호출을 하지 않도록 설계합니다.
- Admin 권한은 session 또는 JWT에 role을 포함하는 방향을 검토합니다.
- Database Session을 쓰더라도 middleware에서 필요한 최소 정보만 확인합니다.
- 권한이 필요한 실제 데이터 변경은 API 또는 Server Action에서도 다시 검증해야 합니다.
- OAuth provider callback URL은 Auth.js 설정과 provider console에서 정확히 맞춰야 합니다.

## 구현하지 않는 항목

이번 Sprint에서는 아래 항목을 만들지 않습니다.

- `auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `middleware.ts`
- `app/login/page.tsx`
- `app/auth/error/page.tsx`
- `app/403/page.tsx`
- Auth.js 설치
- Prisma Adapter 설치
- OAuth provider 설정

## 다음 구현 순서 제안

1. Auth.js 패키지 설치
2. Prisma Adapter 설치
3. Prisma Auth 모델 추가
4. Google provider 환경변수 설정
5. `auth.ts` 생성
6. Auth route 생성
7. `/login` 페이지 생성
8. `/profile` 보호
9. `/admin` 보호
10. Kakao/Naver provider 추가
