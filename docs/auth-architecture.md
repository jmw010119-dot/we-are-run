# Authentication Architecture

WE ARE RUN의 인증 구조 설계 문서입니다.

현재 프로젝트에는 Auth.js v5 기본 구조와 Google Provider 조건부 설정이 준비되어 있습니다. Prisma Adapter, DB Session, middleware, 보호 라우트는 아직 연결하지 않았습니다.

관련 세부 문서:

- [Auth Prisma Model Plan](auth-prisma-model-plan.md)
- [Auth Route & Middleware Plan](auth-route-middleware-plan.md)
- [Auth Environment Guide](auth-env-guide.md)

## 현재 구현 상태

완료:

- `next-auth@5.0.0-beta.31` 설치
- `auth.ts` 생성
- `app/api/auth/[...nextauth]/route.ts` 생성
- `app/login/page.tsx` 생성
- `app/auth/error/page.tsx` 생성
- `lib/auth/checkProvider.ts` 생성
- Google Provider 조건부 등록
- `/login` Google 버튼에서 `signIn("google")` 호출
- Google Provider 비활성 상태 안내 표시
- Auth Error 페이지에서 주요 오류 코드별 안내 표시
- 임시 session strategy를 `jwt`로 설정

아직 미연결:

- 실제 Google OAuth 앱
- Kakao Provider
- Naver Provider
- Prisma Adapter
- Database Session
- DB 연결
- middleware
- 보호 라우트

## 선택 기술

WE ARE RUN의 최종 인증 기술은 아래 조합을 목표로 합니다.

- Auth.js v5
- Prisma Adapter
- Database Session
- PostgreSQL, Prisma 기반 User 모델

현재는 DB 연결 전 단계이므로 임시로 JWT session strategy를 사용합니다. Prisma Adapter와 DB가 준비되면 Database Session으로 전환합니다.

## Google Provider 조건부 전략

Google Provider는 아래 환경변수가 모두 있을 때만 providers 배열에 추가됩니다.

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

환경변수가 없으면 providers 배열은 비어 있고, 빌드는 깨지지 않습니다. `/login`에서는 “Google 로그인이 아직 설정되지 않았습니다.” 안내를 보여줍니다.

## 로그인 제공자 설계

우선 구현 순서:

1. Google
2. Kakao
3. Naver

Email Login은 OAuth 흐름이 안정화된 뒤 별도 Sprint로 검토합니다.

## User Model 연결

Auth.js Prisma Adapter를 사용할 때 필요한 모델:

- `User`
- `Account`
- `Session`
- `VerificationToken`

현재 `schema.prisma`는 아직 수정하지 않았습니다. 실제 Adapter 연결 전 [Auth Prisma Model Plan](auth-prisma-model-plan.md)을 기준으로 User 모델과 Auth 모델을 확장합니다.

## 라우트 보호 구조

라우트/미들웨어 세부 설계는 [Auth Route & Middleware Plan](auth-route-middleware-plan.md)을 따릅니다.

요약:

- 공개 라우트: 홈, 코스, 시설, 크루, 장비, 커뮤니티 조회
- 로그인 필요 라우트: `/profile`, `/community/write`, `/bookmarks`, `/settings`
- 관리자 필요 라우트: `/admin`, `/admin/*`

현재는 middleware를 만들지 않았으므로 보호 라우트가 실제로 적용되지는 않습니다.

## 권한 구조

WE ARE RUN의 권한은 3단계로 시작합니다.

```text
Guest
↓
Member
↓
Admin
```

- Guest: 공개 페이지 조회 가능
- Member: 북마크, 좋아요, 댓글, 크루 가입 가능
- Admin: 관리자 페이지와 운영 기능 접근 가능

Admin 권한은 추후 `UserRole.ADMIN`과 연결합니다.

## 구현 시 주의사항

- OAuth Client ID/Secret은 GitHub에 올리지 않습니다.
- Prisma Adapter 연결 전에는 DB Session으로 전환하지 않습니다.
- middleware에서는 과도한 DB 호출을 피합니다.
- 실제 데이터 변경 API에서도 서버 권한 검증을 다시 수행해야 합니다.

## 참고 공식 문서

- Auth.js Prisma Adapter: https://authjs.dev/getting-started/adapters/prisma
- Auth.js Session Strategies: https://authjs.dev/concepts/session-strategies
- Auth.js Database Models: https://authjs.dev/concepts/database-models
