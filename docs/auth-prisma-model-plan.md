# Auth Prisma Model Plan

Auth.js Prisma Adapter를 WE ARE RUN의 기존 `User` 모델과 연결하기 위한 DB 모델 설계 문서입니다.

현재 단계에서는 `schema.prisma`를 수정하지 않습니다. 이 문서는 실제 Prisma schema 변경 전에 모델 구조와 관계를 먼저 확정하기 위한 설계안입니다.

## 목적

- Auth.js Prisma Adapter가 요구하는 모델을 WE ARE RUN 도메인과 자연스럽게 연결합니다.
- 기존 `User` 모델을 유지하면서 OAuth, Database Session, Email Login 확장 가능성을 확보합니다.
- Google, Kakao, Naver OAuth 계정을 하나의 User에 연결할 수 있게 설계합니다.
- Admin 권한과 기존 `UserRole` enum을 계속 활용합니다.

## 필요한 모델

Auth.js Prisma Adapter 도입 시 필요한 기본 모델은 아래와 같습니다.

- `User`
- `Account`
- `Session`
- `VerificationToken`

WE ARE RUN의 서비스 도메인 모델은 기존처럼 `User`와 연결됩니다.

## User 모델 확장 계획

현재 `User` 모델에 Auth.js Adapter 호환을 위해 검토할 필드입니다.

| 필드 | 목적 | 비고 |
| --- | --- | --- |
| `id` | 사용자 고유 ID | 기존 유지 |
| `name` | OAuth provider에서 받은 이름 | Auth.js 호환 필드 |
| `email` | 로그인 이메일 | unique 필요 |
| `emailVerified` | 이메일 인증 시각 | Email Login 대비 |
| `image` | OAuth profile image | 기존 `avatarUrl`과 역할 조정 필요 |
| `role` | 권한 | 기존 `UserRole` enum 연결 |
| `level` | 러닝 레벨 | 기존 `UserLevel` enum 연결 |
| `region` | 지역 | 기존 유지 |
| `bio` | 한 줄 소개 | 기존 유지 |
| `createdAt` | 생성 시각 | 기존 유지 |
| `updatedAt` | 수정 시각 | 기존 유지 |

추후 결정할 내용:

- `nickname`과 `name`을 둘 다 유지할지 결정
- `avatarUrl`과 `image`를 둘 다 유지할지 결정
- OAuth 최초 로그인 시 `nickname` 기본값 생성 규칙 결정

## Account 모델

`Account` 모델은 OAuth 계정 연결용입니다.

Google, Kakao, Naver 로그인은 모두 `Account` 모델을 통해 하나의 `User`와 연결됩니다.

필요 필드:

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

핵심 제약:

- `provider` + `providerAccountId` 조합은 unique여야 합니다.
- 한 명의 User는 여러 Account를 가질 수 있습니다.

예:

```text
User 1
├─ Google Account
├─ Kakao Account
└─ Naver Account
```

## Session 모델

`Session` 모델은 Database Session 관리를 위한 모델입니다.

필요 필드:

- `sessionToken`
- `userId`
- `expires`

관계:

- User 1:N Session

Database Session을 사용하면 서버에서 세션을 삭제하거나 관리하기 쉽습니다. WE ARE RUN은 Admin 권한, 계정 제재, 운영 관리 가능성을 고려해 Database Session을 우선 선택합니다.

## VerificationToken 모델

`VerificationToken`은 Email Login 또는 이메일 인증을 위한 모델입니다.

필요 필드:

- `identifier`
- `token`
- `expires`

초기 OAuth 구현에서는 바로 사용하지 않을 수 있습니다. 다만 Email Login을 나중에 도입할 수 있으므로 모델 계획에는 포함합니다.

## 관계

Auth 관련 관계:

```text
User 1:N Account
User 1:N Session
```

WE ARE RUN 서비스 관계:

```text
User 1:N CommunityPost
User 1:N Comment
User 1:N Bookmark
User 1:N Like
User 1:N Review
User 1:N RunningRecord
User 1:N CrewMember
```

Admin 관련 관계:

```text
User 1:N AdminLog
User 1:N Report as reporter
```

## UserRole 연결

WE ARE RUN의 권한은 기존 `UserRole` enum을 유지합니다.

예상 값:

- `USER`
- `ADMIN`
- `MODERATOR`

권한 매핑:

| 서비스 권한 | UserRole |
| --- | --- |
| Guest | DB User 없음 |
| Member | `USER` |
| Admin | `ADMIN` |
| Moderator | `MODERATOR` |

## OAuth Provider 연결 계획

초기 구현 순서:

1. Google
2. Kakao
3. Naver

모든 OAuth provider는 `Account` 모델에 저장합니다.

Provider별 예상 값:

- Google: `google`
- Kakao: `kakao`
- Naver: `naver`

실제 provider id는 Auth.js provider 설정 시 최종 확인합니다.

## Email Login 계획

Email Login은 초기 구현 범위에서 제외합니다.

나중에 도입할 때 필요한 것:

- `VerificationToken` 모델 사용
- 메일 발송 서비스
- 로그인 링크 만료 정책
- 이메일 인증 UX

## 주의사항

- Auth.js Adapter 모델명과 필드명은 공식 권장 구조를 최대한 유지합니다.
- 기존 `UserRole` enum과 연결합니다.
- `email`은 unique가 필요합니다.
- Google, Kakao, Naver OAuth는 모두 `Account` 모델로 연결합니다.
- Email Login은 나중에 `VerificationToken`을 사용합니다.
- 이번 Sprint에서는 `schema.prisma`를 수정하지 않습니다.
- 실제 migration은 DB 연결과 Auth.js 설치 이후 별도 Sprint에서 진행합니다.

## 다음 단계에서 할 일

- `schema.prisma`에 `Account`, `Session`, `VerificationToken` 모델 추가
- 기존 `User` 모델에 Auth.js 필드 추가
- Auth.js Prisma Adapter 설치
- Google OAuth부터 실제 연결
- `/profile`, `/admin` 보호 정책 적용

## 참고 공식 문서

- Auth.js Prisma Adapter: https://authjs.dev/getting-started/adapters/prisma
- Auth.js Database Models: https://authjs.dev/concepts/database-models
