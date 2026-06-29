# Auth Flow

WE ARE RUN의 로그인, 회원가입, 로그아웃, 세션 유지, 접근 제어 흐름 설계 문서입니다.

현재 `/login` 페이지의 Google 버튼은 `signIn("google")` 흐름에 연결되어 있습니다. 실제 Google OAuth 앱과 환경변수는 아직 사용자가 직접 준비해야 합니다.

라우트와 미들웨어 설계는 [Auth Route & Middleware Plan](auth-route-middleware-plan.md)을 기준으로 관리합니다.

## Google 로그인 플로우

현재 구현된 최소 흐름:

```text
/login
↓
Google로 계속하기 클릭
↓
signIn("google", { callbackUrl })
↓
Auth.js Google Provider 실행
↓
Google OAuth 화면 이동
↓
Auth.js callback 처리
↓
/profile 또는 callbackUrl로 이동
```

기본 callback URL:

```text
/profile
```

`/login?callbackUrl=/community/write`처럼 접근한 경우에는 해당 `callbackUrl`을 우선 사용합니다.

## 회원가입 플로우

OAuth 로그인에서는 별도 회원가입 화면 없이 첫 로그인 시 User가 자동 생성되는 흐름을 사용할 예정입니다.

```text
처음 로그인한 사용자
↓
OAuth Provider 인증 성공
↓
Auth.js가 User 생성
↓
Account 생성
↓
기본 Profile 값 설정
↓
Member 권한 부여
↓
홈 또는 callbackUrl로 이동
```

현재는 Prisma Adapter와 DB 연결이 없으므로 실제 User 저장 흐름은 아직 연결하지 않았습니다.

## 로그아웃 플로우

추후 구현 예정 흐름:

```text
로그아웃 클릭
↓
Auth.js signOut 호출
↓
Session 삭제
↓
Session cookie 삭제
↓
Guest 상태로 전환
↓
홈으로 이동
```

## 세션 유지

현재 단계:

- 임시로 JWT session strategy 사용
- Prisma Adapter 미연결
- Database Session 미사용

최종 목표:

```text
브라우저 cookie에 session id 저장
↓
서버에서 session id 확인
↓
DB Session 조회
↓
User 정보와 권한 확인
↓
페이지/기능 접근 허용
```

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

현재는 middleware를 만들지 않았으므로 보호 라우트가 실제로 적용되지는 않습니다.

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

추후 권한 없음 페이지가 생기면 아래로 변경할 수 있습니다.

```text
/403
```

## 환경변수 없을 때 주의사항

`GOOGLE_CLIENT_ID`와 `GOOGLE_CLIENT_SECRET`이 없으면 Google Provider가 등록되지 않습니다.

이 상태에서 Google 버튼을 누르면 Auth.js provider 오류가 발생할 수 있습니다. 실제 로그인 테스트는 Google OAuth 앱과 환경변수를 준비한 뒤 진행합니다.

## 향후 구현 순서

1. Google OAuth 앱 생성
2. `.env.local`에 Google Client ID/Secret 추가
3. Vercel 환경변수 추가
4. Google 로그인 실제 테스트
5. Prisma Adapter 연결
6. DB Session 전환
7. `/profile` 보호
8. `/admin` 보호
9. Kakao OAuth 추가
10. Naver OAuth 추가

## 참고 공식 문서

- Auth.js Session Strategies: https://authjs.dev/concepts/session-strategies
- Auth.js Database Models: https://authjs.dev/concepts/database-models
