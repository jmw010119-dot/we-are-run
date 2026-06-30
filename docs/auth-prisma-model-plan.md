# Auth Prisma Model Plan

Auth.js Prisma Adapter를 WE ARE RUN의 기존 `User` 모델과 연결하기 위한 DB 모델 설계 및 반영 상태입니다.

## 목적

- Google, Kakao, Naver OAuth 계정을 하나의 `User`와 연결할 수 있게 준비합니다.
- Auth.js Prisma Adapter가 요구하는 `Account`, `Session`, `VerificationToken` 모델을 제공합니다.
- 기존 서비스 도메인 관계를 유지하면서 Auth.js 호환 필드를 `User`에 추가합니다.
- 이번 단계에서는 DB 모델과 migration만 반영하고, `auth.ts`에 Prisma Adapter는 아직 연결하지 않습니다.

## 현재 반영 상태

완료:

- `@auth/prisma-adapter` 설치
- `User` 모델 Auth.js 호환 필드 추가
- `Account` 모델 추가
- `Session` 모델 추가
- `VerificationToken` 모델 추가
- migration `add_auth_models` 적용
- Prisma Client generate 완료

아직 미연결:

- `auth.ts`의 Prisma Adapter 연결
- Database Session 전략 전환
- 보호 라우트 적용
- middleware 적용
- Kakao/Naver Provider 연결

## User 모델

Auth.js 호환을 위해 `User`에 아래 필드를 반영했습니다.

| 필드 | 목적 |
| --- | --- |
| `id` | 사용자 고유 ID |
| `name` | OAuth Provider에서 받은 이름 |
| `email` | 로그인 이메일, unique |
| `emailVerified` | 이메일 인증 시각 |
| `image` | OAuth Provider 프로필 이미지 |
| `nickname` | WE ARE RUN 서비스 표시 이름 |
| `region` | 활동 지역 |
| `city` | 활동 도시 |
| `bio` | 소개 문구 |
| `avatarUrl` | 서비스 내부 아바타 확장용 |
| `role` | `UserRole` 기반 권한 |
| `level` | 러닝 레벨 |
| `createdAt` | 생성 시각 |
| `updatedAt` | 수정 시각 |

`email`, `nickname`은 OAuth 신규 사용자 생성 흐름을 고려해 nullable로 정리했습니다. 기존 seed 데이터는 두 값을 계속 제공합니다.

## Account 모델

OAuth 계정 연결용 모델입니다.

주요 필드:

- `userId`
- `type`
- `provider`
- `providerAccountId`
- `access_token`
- `refresh_token`
- `expires_at`
- `token_type`
- `scope`
- `id_token`
- `session_state`

관계:

```text
User 1:N Account
```

제약:

```text
@@id([provider, providerAccountId])
```

## Session 모델

Database Session 전환을 위한 모델입니다.

주요 필드:

- `sessionToken`
- `userId`
- `expires`

관계:

```text
User 1:N Session
```

현재 `auth.ts`는 아직 임시 `jwt` session strategy를 사용합니다. 다음 Sprint에서 Prisma Adapter 연결과 함께 Database Session 전환 여부를 결정합니다.

## VerificationToken 모델

Email Login 또는 이메일 인증 도입을 위한 모델입니다.

주요 필드:

- `identifier`
- `token`
- `expires`

제약:

```text
@@id([identifier, token])
```

## 기존 서비스 관계 유지

`User`는 기존 WE ARE RUN 도메인 관계를 그대로 유지합니다.

```text
User 1:N CommunityPost
User 1:N Comment
User 1:N Bookmark
User 1:N Like
User 1:N Review
User 1:N RunningRecord
User 1:N CrewMember
User 1:N AdminLog
```

## Seed 영향

기존 `prisma/seed.ts`는 `email`, `nickname`, `role`, `level`을 이미 제공하고 있습니다.

이번 schema 변경에서 추가된 `name`, `emailVerified`, `image`는 optional 필드이므로 seed 재실행 없이도 TypeScript와 build가 통과합니다.

이번 Sprint에서는 seed를 재실행하지 않았습니다.

## 다음 구현 순서

1. `auth.ts`에 Prisma Adapter 연결
2. Prisma Client singleton과 Auth Adapter 연결 방식 확정
3. session strategy를 `database`로 전환할지 결정
4. Google OAuth 실제 로그인 후 `User`, `Account`, `Session` 생성 확인
5. `/profile`에서 실제 session user id 기반 데이터 확인
6. `/admin` 보호 라우트와 권한 체크 설계

## 참고

- Auth.js Prisma Adapter: https://authjs.dev/getting-started/adapters/prisma
- Auth.js Database Models: https://authjs.dev/concepts/database-models
