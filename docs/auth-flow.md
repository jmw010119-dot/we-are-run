# Auth Flow

WE ARE RUN의 로그인, 세션 유지, 로그아웃, 접근 제어 흐름을 정리한 문서입니다.

현재 상태는 Auth.js v5, Google Provider, Prisma Adapter, Database Session을 사용하는 구조입니다. `/profile`과 `/admin`에는 최소 보호 흐름이 적용되어 있습니다.

## Google 로그인 흐름

현재 구현된 기본 흐름:

```text
/login
-> Google로 계속하기 클릭
-> signIn("google", { callbackUrl })
-> Auth.js Google Provider 실행
-> Google OAuth 화면 이동
-> Auth.js callback 처리
-> User / Account / Session DB 저장
-> /profile 또는 callbackUrl로 이동
```

기본 callback URL:

```text
/profile
```

`/login?callbackUrl=/community/write`처럼 접근한 경우에는 전달된 `callbackUrl`을 우선 사용할 수 있도록 설계되어 있습니다.

## 회원가입 흐름

OAuth 로그인에서는 별도 회원가입 화면 없이 첫 로그인 시 Auth.js Prisma Adapter가 사용자를 생성합니다.

```text
처음 로그인한 사용자
-> OAuth Provider 인증 성공
-> User 생성
-> Account 생성
-> Session 생성
-> Member 권한으로 서비스 이용
```

## 로그아웃 흐름

Header와 모바일 메뉴의 로그아웃 버튼은 Auth.js `signOut`을 호출합니다.

```text
로그아웃 클릭
-> signOut({ callbackUrl: "/" })
-> Session 제거
-> Session cookie 제거
-> 홈으로 이동
```

## 세션 유지

현재 세션 전략:

- Prisma Adapter 연결 완료
- Database Session 사용
- `session.user.id` 제공
- `session.user.role` 제공

서버에서는 `auth()`로 세션을 읽습니다. Header는 서버 컴포넌트에서 세션을 읽고, 클라이언트 Header UI에는 필요한 사용자 표시 정보만 전달합니다.

## Header 로그인 상태

비로그인 상태:

- 데스크톱 Header에 `로그인` 버튼 표시
- 모바일 메뉴에 `로그인` 아이콘 표시

로그인 상태:

- 사용자 이름 또는 이메일 표시
- 마이페이지 이동 버튼 표시
- 로그아웃 버튼 표시
- 모바일 메뉴에도 마이페이지와 로그아웃 표시

## 실제 DB 생성 확인 방법

Google OAuth 환경변수를 설정한 뒤 아래 순서로 확인합니다.

```bash
npm run dev
```

1. 브라우저에서 `/login` 접속
2. Google로 계속하기 클릭
3. Google 로그인 완료
4. `/profile` 이동 확인
5. 새 터미널에서 Prisma Studio 실행

```bash
npx prisma studio
```

6. Prisma Studio에서 아래 테이블 확인
   - `User`
   - `Account`
   - `Session`

주의:

- `DATABASE_URL`, `AUTH_SECRET`, OAuth Client Secret은 화면이나 문서에 노출하지 않습니다.
- `.env.local`은 GitHub에 올리지 않습니다.

## 보호 라우트

로그인이 필요한 라우트:

- `/profile`
- `/community/write`
- `/bookmarks`
- `/settings`

관리자 권한이 필요한 라우트:

- `/admin`
- `/admin/*`

공개 라우트:

- `/`
- `/courses`
- `/facilities`
- `/crews`
- `/equipment`
- `/community`
- 각 상세 페이지

현재 middleware는 보호 경로에 세션 쿠키가 없으면 `/login?callbackUrl=...`로 이동시킵니다.

`/profile`과 `/admin` 페이지는 서버에서 `auth()`를 다시 확인합니다. `/admin`은 `session.user.role`이 `ADMIN`이 아니면 `/403`으로 이동합니다.

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
/403
```

`/403` 페이지는 관리자 권한이 필요한 페이지에 접근했을 때 보여주는 권한 안내 페이지입니다.

## 환경변수 주의사항

`GOOGLE_CLIENT_ID`와 `GOOGLE_CLIENT_SECRET`이 없으면 Google Provider가 등록되지 않습니다.

실제 로그인 테스트는 Google OAuth 앱과 환경변수를 준비한 뒤 진행합니다.

## 관리자 role 부여

관리자 권한은 DB의 `User.role` 값이 `ADMIN`인지로 판단합니다.

Google 로그인으로 User를 먼저 생성한 뒤 `.env.local`에 `ADMIN_EMAIL`을 설정하고 아래 명령어를 실행합니다.

```bash
npm run admin:promote
```

자세한 절차는 [Admin Role Guide](admin-role-guide.md)를 참고합니다.

## 향후 구현 순서

1. Google OAuth 실제 로그인 검증
2. Prisma Studio에서 User / Account / Session 확인
3. Header 로그인 상태 QA
4. 관리자 role 부여 실행 및 `/admin` 접근 확인
5. 관리자 role 회수 스크립트 검토
6. `/community/write`, `/bookmarks`, `/settings` 실제 페이지 구현
7. Kakao OAuth 추가
8. Naver OAuth 추가

## 참고 공식 문서

- Auth.js Session Strategies: https://authjs.dev/concepts/session-strategies
- Auth.js Database Models: https://authjs.dev/concepts/database-models
