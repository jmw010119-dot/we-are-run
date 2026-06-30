# Admin Role Guide

WE ARE RUN에서 관리자 페이지에 접근하려면 DB의 `User.role` 값이 `ADMIN`이어야 합니다.

관리자 이메일은 코드에 하드코딩하지 않습니다. 로컬 또는 배포 환경변수로만 관리합니다.

## 관리자 계정 생성 순서

1. Google 로그인으로 먼저 User를 생성합니다.

```bash
npm run dev
```

브라우저에서 `/login`에 접속해 Google 로그인을 완료합니다.

2. `.env.local`에 관리자 이메일을 추가합니다.

```env
ADMIN_EMAIL="admin@example.com"
```

실제 이메일은 GitHub에 올리지 않습니다.

3. 관리자 승격 스크립트를 실행합니다.

```bash
npm run admin:promote
```

4. `/admin`에 접속해 관리자 페이지 접근을 확인합니다.

## 접근 흐름

- 비로그인 사용자가 `/admin`에 접근하면 `/login?callbackUrl=/admin`으로 이동합니다.
- 로그인했지만 `User.role`이 `ADMIN`이 아니면 `/403`으로 이동합니다.
- `User.role`이 `ADMIN`이면 `/admin`에 접근할 수 있습니다.

## 스크립트 동작

`scripts/promote-admin.ts`는 아래 순서로 동작합니다.

1. `.env.local`에서 `ADMIN_EMAIL`과 `DATABASE_URL`을 읽습니다.
2. `ADMIN_EMAIL` 기준으로 `User`를 찾습니다.
3. 사용자가 없으면 Google 로그인을 먼저 하라는 안내를 출력합니다.
4. 사용자가 있으면 `role`을 `ADMIN`으로 업데이트합니다.
5. 성공 메시지에는 이메일 일부만 마스킹해 출력합니다.

## 운영 주의사항

- `DATABASE_URL`, `AUTH_SECRET`, OAuth Secret은 절대 출력하거나 문서에 기록하지 않습니다.
- 실제 관리자 이메일은 `.env.local` 또는 Vercel 환경변수에서만 관리합니다.
- 운영 환경에서는 관리자 권한을 부여할 이메일을 신중히 확인합니다.
- 관리자 권한 회수 방식은 별도 운영 스크립트로 분리하는 것을 권장합니다.
