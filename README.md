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

## Seed 준비 상태

`prisma/seed.ts`에 seed 초안이 준비되어 있습니다.

현재는 DB 연결 전 단계이므로 seed를 실행하지 않습니다. 실제 실행은 `DATABASE_URL`, `prisma generate`, migration, seed 실행 도구가 준비된 뒤 진행합니다.

`tsx` 또는 `ts-node` 같은 실행 도구를 아직 설치하지 않았기 때문에 `prisma:seed` 스크립트는 추가하지 않았습니다.

## Auth.js 준비 상태

Auth.js v5 기본 구조가 준비되어 있습니다.

- `next-auth` 설치 완료
- `auth.ts` 생성 완료
- `app/api/auth/[...nextauth]/route.ts` 생성 완료
- 현재 providers는 비어 있습니다.
- Google Provider는 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`이 있을 때만 활성화됩니다.
- `/login`의 Google 버튼은 `signIn("google")` 흐름에 연결되어 있습니다.
- 현재 session strategy는 임시로 `jwt`를 사용합니다.
- `/login` 페이지와 `/auth/error` 페이지가 준비되어 있습니다.

`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`이 없으면 실제 Google 로그인은 동작하지 않습니다.

아직 실제 Google OAuth 앱, Kakao/Naver Provider, Prisma Adapter, DB Session, middleware, 보호 라우트는 연결하지 않았습니다.

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

## 아직 구현하지 않은 것

- 로그인
- DB
- API
- 실제 지도
- 이미지 업로드
- 결제/구매 연동
- 실시간 알림

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

## 배포 준비 안내

GitHub에 업로드하기 전 `.env` 파일이 포함되지 않도록 확인하세요. 배포 환경에서는 `.env.example`을 참고해 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 설정합니다.

Vercel에 연결한 뒤 아래 경로를 확인하세요.

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/icon`
- 존재하지 않는 주소의 404 화면
