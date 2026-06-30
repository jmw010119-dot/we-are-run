# WE ARE RUN

WE ARE RUN은 전국 러닝 코스, 러닝 시설, 러닝 크루, 장비 추천, 러닝 인증 커뮤니티를 제공하는 러닝 플랫폼입니다.

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Mock Data 기반 프론트 프로토타입

## 실행 방법

```bash
npm install
```

```bash
npm run dev
```

로컬 실행 주소:

```text
http://localhost:3000
```

## 빌드

```bash
npm run build
```

## 환경변수

`.env.example` 파일을 참고하세요.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/wearerun"
```

배포 시에는 실제 도메인으로 변경합니다.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/wearerun"
```

## Prisma 개발 준비

Prisma는 실제 DB 연결 전 개발 도구만 준비되어 있습니다.

Prisma 설정은 `prisma.config.ts`와 `prisma/schema.prisma`에서 관리합니다.

설치 명령:

```bash
npm install @prisma/client
```

```bash
npm install -D prisma
```

스키마 확인:

```bash
npm run prisma:validate
```

스키마 정리:

```bash
npm run prisma:format
```

## DB 연결 상태

Neon PostgreSQL 연결, Prisma 초기 migration, 초기 seed 입력이 완료되었습니다.

- `DATABASE_URL`은 `.env.local`에서만 관리합니다.
- Prisma migration `init` 적용 완료
- Prisma migration `add_auth_models` 적용 완료
- Prisma Client generate 완료
- 초기 seed 데이터 입력 완료
- `/courses` 목록은 Server Query를 통해 DB 데이터 기반으로 전환 시작
- `/courses/[id]` 상세 페이지도 DB 데이터 기반으로 전환 시작
- `/facilities` 목록은 Server Query를 통해 DB 데이터 기반으로 전환 시작
- `/facilities/[id]` 상세 페이지도 DB 데이터 기반으로 전환 시작
- `/crews` 목록은 Server Query를 통해 DB 데이터 기반으로 전환 시작
- `/crews/[id]` 상세 페이지도 DB 데이터 기반으로 전환 시작
- `/equipment` 목록은 Server Query를 통해 DB 데이터 기반으로 전환 시작
- `/equipment/[id]` 상세 페이지도 DB 데이터 기반으로 전환 시작
- `/community` 목록은 Server Query를 통해 DB 데이터 기반으로 전환 시작
- `/community/[id]` 상세 페이지도 DB 데이터 기반으로 전환 시작
- `/profile` 페이지는 Auth 세션과 DB User 데이터를 받을 수 있는 구조로 전환 시작
- `/profile`은 로그인한 사용자만 접근할 수 있도록 보호됩니다.
- `/admin`은 `ADMIN` 권한 사용자만 접근할 수 있도록 보호됩니다.
- `npm run build` 통과
- API 연결은 아직 하지 않았습니다.
- 코스 상세의 추천 시간대, 상승고도, 출발/도착 지점, 주변 포인트 같은 보조 정보는 DTO fallback을 사용합니다.
- 시설 상세의 커버 라벨, 지도 라벨, 추천 포인트, 편의시설 상태, 근처 코스 같은 보조 정보는 DTO fallback을 사용합니다.
- 크루 상세의 평균 페이스, 운영 방식, 가입 조건, 활동 피드, 공지/규칙 같은 보조 정보는 DTO fallback을 사용합니다.
- 장비 상세의 추천 대상, 장점/아쉬운 점, 제품 스펙, 목적별 적합도 같은 보조 정보는 DTO fallback을 사용합니다.
- 커뮤니티 상세의 작성자 통계, 이미지/그라디언트 표현 같은 보조 정보는 DTO fallback을 사용합니다.
- Auth.js Prisma Adapter용 `Account`, `Session`, `VerificationToken` DB 모델은 반영되었습니다.
- Auth.js는 `auth.ts`에서 Prisma Adapter와 database session을 사용합니다.
- `/profile`은 세션 user id가 있으면 DB User 기준으로 조회하고, 없으면 seed 사용자/fallback 데이터를 사용합니다.
- 커뮤니티 사이드바 일부 데이터는 아직 Mock Data를 유지합니다.
- 다른 도메인 화면은 아직 Mock Data를 유지합니다.

## Seed 준비 상태

`prisma/seed.ts`는 실제 실행 가능한 seed 파일입니다.

Seed는 중복 실행이 가능하도록 기존 seed 데이터를 reset한 뒤 다시 insert합니다.

```bash
npm run prisma:seed
```

## Auth.js 준비 상태

Auth.js v5 기본 구조가 준비되어 있습니다.

- `next-auth` 설치 완료
- `@auth/prisma-adapter` 설치 완료
- `auth.ts` 생성 완료
- `app/api/auth/[...nextauth]/route.ts` 생성 완료
- Google Provider는 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`이 있을 때만 활성화됩니다.
- `/login`의 Google 버튼은 `signIn("google")` 흐름에 연결되어 있습니다.
- 현재 session strategy는 `database`를 사용합니다.
- Auth.js용 `Account`, `Session`, `VerificationToken` Prisma 모델과 migration이 반영되었습니다.
- `auth.ts`에 Prisma Adapter가 연결되었습니다.
- database session strategy를 사용합니다.
- session callback에서 `session.user.id`, `session.user.role`을 제공합니다.
- Header는 Auth.js 세션을 읽어 로그인/비로그인 상태를 표시합니다.
- 로그인 후에는 Header와 모바일 메뉴에 마이페이지, 사용자 정보, 로그아웃 버튼이 표시됩니다.
- `/profile` 접근 시 로그인이 필요합니다.
- `/admin` 접근 시 로그인이 필요하며, `ADMIN` role이 아니면 `/403`으로 이동합니다.
- `ADMIN_EMAIL` 기준으로 관리자 권한을 부여하는 `admin:promote` 스크립트가 준비되어 있습니다.
- `/login` 페이지와 `/auth/error` 페이지가 준비되어 있습니다.

`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`이 없으면 실제 Google 로그인은 동작하지 않습니다.

아직 실제 Google OAuth 앱, Kakao/Naver Provider, middleware, 보호 라우트는 연결하지 않았습니다.

## Google 로그인 후 DB 확인 방법

Google OAuth 환경변수를 설정한 뒤 아래 순서로 확인합니다.

```bash
npm run dev
```

브라우저에서 `/login`에 접속한 뒤 Google 로그인을 완료합니다. 로그인이 끝나면 `/profile`로 이동하는지 확인합니다.

그 다음 새 터미널에서 Prisma Studio를 실행합니다.

```bash
npx prisma studio
```

Prisma Studio에서 아래 테이블에 데이터가 생성되었는지 확인합니다.

- `User`
- `Account`
- `Session`

주의: `DATABASE_URL`, `AUTH_SECRET`, OAuth Client Secret은 README나 GitHub에 기록하지 않습니다.

## 관리자 role 부여 방법

Google 로그인으로 User를 먼저 생성한 뒤 `.env.local`에 관리자 이메일을 추가합니다.

```env
ADMIN_EMAIL="admin@example.com"
```

그 다음 아래 명령어를 실행합니다.

```bash
npm run admin:promote
```

자세한 순서는 [Admin Role Guide](docs/admin-role-guide.md)를 참고하세요.

## Google OAuth 설정 준비

Google Cloud Console에서 OAuth Client를 만들 때 아래 값을 등록합니다.

Authorized JavaScript origins:

```text
http://localhost:3000
```

```text
https://we-are-run.vercel.app
```

Authorized redirect URIs:

```text
http://localhost:3000/api/auth/callback/google
```

```text
https://we-are-run.vercel.app/api/auth/callback/google
```

발급받은 값은 `.env.local` 또는 Vercel 환경변수에만 저장합니다.

```env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## 현재 구현된 페이지

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
- `/login`
- `/profile`
- `/admin`
- `/403`

## 아직 구현하지 않은 것

- API
- 실제 지도
- 이미지 업로드
- 결제/구매 연동
- 실시간 알림
- Kakao/Naver 로그인

## 운영 준비 파일

- `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`
- `app/not-found.tsx`
- `app/icon.tsx`
- `lib/site.ts`

## DB 준비 문서

- [Database Design](docs/database-design.md)
- [Database Setup Plan](docs/database-setup-plan.md)
- [Database Provider Decision](docs/database-provider-decision.md)
- [Database Environment Consistency](docs/database-env-consistency.md)
- [Neon Environment Checklist](docs/neon-env-checklist.md)
- [Neon Command Guide](docs/neon-command-guide.md)
- [Prisma Runtime Strategy](docs/prisma-runtime-strategy.md)
- [Seed Mapping](docs/seed-mapping.md)
- [Seed Plan](prisma/seed-plan.md)

## Authentication 준비 문서

- [Authentication Architecture](docs/auth-architecture.md)
- [Auth Flow](docs/auth-flow.md)
- [Auth Environment Guide](docs/auth-env-guide.md)
- [Auth Prisma Model Plan](docs/auth-prisma-model-plan.md)
- [Auth Route & Middleware Plan](docs/auth-route-middleware-plan.md)
- [Admin Role Guide](docs/admin-role-guide.md)

## 배포 준비 안내

GitHub에 업로드하기 전 `.env` 파일이 포함되지 않도록 확인하세요. 배포 환경에서는 `.env.example`을 참고해 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 설정합니다.

Vercel에 연결한 뒤 아래 경로를 확인하세요.

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/icon`
- 존재하지 않는 주소의 404 화면
