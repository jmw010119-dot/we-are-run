# Auth Environment Guide

WE ARE RUN에서 Auth.js와 OAuth 로그인을 도입하기 전에 필요한 환경변수 설계 문서입니다.

현재 Google Provider는 환경변수가 있을 때만 활성화됩니다. 실제 Google OAuth 앱은 사용자가 Google Cloud Console에서 직접 생성해야 합니다.

## 필수 환경변수

```env
AUTH_SECRET=
AUTH_URL=
DATABASE_URL=
```

역할:

- `AUTH_SECRET`: Auth.js 세션, 토큰, 보안 처리를 위한 비밀 값
- `AUTH_URL`: Auth.js가 사용할 서비스 기준 URL
- `DATABASE_URL`: Prisma와 Auth.js Prisma Adapter가 사용할 DB 연결 문자열

## Google OAuth

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Google Provider는 두 값이 모두 있을 때만 활성화됩니다.

두 값이 없으면 프로젝트 빌드는 통과하지만, `/login`에서는 아래 안내가 표시됩니다.

```text
Google 로그인이 아직 설정되지 않았습니다.
```

## Google Cloud Console에서 필요한 항목

Google Cloud Console에서 OAuth Client를 만들 때 아래 정보를 준비합니다.

### OAuth Client

- Application type: Web application
- Name 예시: `WE ARE RUN Web`

### Authorized JavaScript origins

로컬:

```text
http://localhost:3000
```

배포:

```text
https://we-are-run.vercel.app
```

### Authorized redirect URIs

로컬 callback:

```text
http://localhost:3000/api/auth/callback/google
```

배포 callback:

```text
https://we-are-run.vercel.app/api/auth/callback/google
```

주의:

- callback 경로는 `/api/auth/callback/google`입니다.
- URL 끝에 불필요한 `/`를 붙이지 않습니다.
- 로컬과 배포 URL을 모두 등록해야 개발과 배포 환경에서 테스트할 수 있습니다.

## Kakao OAuth

```env
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
```

Kakao는 아직 연결하지 않았습니다.

## Naver OAuth

```env
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
```

Naver는 아직 연결하지 않았습니다.

## 로컬 환경변수

로컬 개발에서는 프로젝트 루트에 아래 파일을 사용합니다.

```text
.env.local
```

예시:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
AUTH_SECRET="replace-with-generated-secret"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/wearerun"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

KAKAO_CLIENT_ID=""
KAKAO_CLIENT_SECRET=""

NAVER_CLIENT_ID=""
NAVER_CLIENT_SECRET=""
```

주의:

- `.env.local`은 GitHub에 올리지 않습니다.
- 실제 secret 값은 README나 문서에 적지 않습니다.
- `.env.example`에는 예시 값만 둡니다.

## Vercel 환경변수 설정

Vercel에서 아래 경로로 이동합니다.

```text
Vercel -> Project Settings -> Environment Variables
```

등록할 환경:

- Production
- Preview
- Development

등록할 Key:

- `NEXT_PUBLIC_SITE_URL`
- `AUTH_URL`
- `AUTH_SECRET`
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `KAKAO_CLIENT_ID`
- `KAKAO_CLIENT_SECRET`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`

Secret 계열 값은 Vercel에서 Sensitive 값으로 관리합니다.

## URL 기준

로컬:

```env
AUTH_URL="http://localhost:3000"
```

배포:

```env
AUTH_URL="https://we-are-run.vercel.app"
```

`AUTH_URL`과 `NEXT_PUBLIC_SITE_URL`은 같은 값을 사용할 수 있지만 역할이 다릅니다.

- `AUTH_URL`: Auth.js 서버 인증 흐름 기준 URL
- `NEXT_PUBLIC_SITE_URL`: 브라우저에도 공개 가능한 사이트 URL

## 보안 주의사항

- `AUTH_SECRET`은 절대 공개하지 않습니다.
- `GOOGLE_CLIENT_SECRET`, `KAKAO_CLIENT_SECRET`, `NAVER_CLIENT_SECRET`은 GitHub에 올리지 않습니다.
- `DATABASE_URL`은 서버 전용 비밀 값입니다.
- `NEXT_PUBLIC_` 접두사는 브라우저에 공개되어도 되는 값에만 사용합니다.
- OAuth Secret에는 절대 `NEXT_PUBLIC_`을 붙이지 않습니다.
- 실제 secret을 문서, README, GitHub Issue, 채팅에 붙여넣지 않습니다.
- 환경변수를 Vercel에 등록한 뒤에는 재배포가 필요할 수 있습니다.
