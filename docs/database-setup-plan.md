# Database Setup Plan

이 문서는 WE ARE RUN을 실제 PostgreSQL 데이터베이스와 연결하기 전 준비 계획입니다.

현재 단계에서는 DB 연결, migrate, generate, seed 실행을 하지 않습니다.

## 추천 Provider

WE ARE RUN의 초기 추천 DB Provider는 **Neon PostgreSQL**입니다.

이유:

- Vercel과 연결하기 쉽습니다.
- Next.js 서버리스 배포 환경과 잘 맞습니다.
- PostgreSQL 기반이라 Prisma와 잘 맞습니다.
- 로컬 PostgreSQL 설치 없이 시작할 수 있어 초보자에게 더 적합합니다.

DB 제공자 비교와 선택 기준은 [Database Provider Decision](database-provider-decision.md) 문서를 기준으로 관리합니다.

Neon 실제 연결 전에는 반드시 [Neon Environment Checklist](neon-env-checklist.md)를 확인합니다.

## DATABASE_URL 전략

`DATABASE_URL`은 데이터베이스 접속 정보가 들어가는 서버 전용 비밀 값입니다.

- 로컬 개발 환경: `.env.local`
- Vercel 배포 환경: Vercel Dashboard의 Environment Variables
- GitHub 업로드: `.env.local` 업로드 금지
- 공개 접두사 금지: `NEXT_PUBLIC_`을 절대 붙이지 않습니다.

예시:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/wearerun?sslmode=require"
```

`NEXT_PUBLIC_SITE_URL`은 브라우저에 공개되어도 되는 값입니다. 반대로 `DATABASE_URL`은 서버에서만 사용해야 합니다.

## Prisma 7 기준 파일 역할

| 파일 | 역할 |
| --- | --- |
| `prisma/schema.prisma` | 모델, 관계, enum 정의 |
| `prisma.config.ts` | schema 경로와 datasource URL 설정 |
| `.env.local` | 로컬 개발용 실제 환경변수 |
| `.env.example` | 공유 가능한 환경변수 예시 |
| `docs/prisma-runtime-strategy.md` | Prisma 7 runtime, adapter, seed runner 전략 |
| `docs/neon-env-checklist.md` | Neon 연결 전 환경변수 체크리스트 |

Prisma 7에서는 `schema.prisma`에 DB URL을 직접 두지 않고 `prisma.config.ts`에서 `DATABASE_URL`을 읽습니다.

## Vercel 환경변수 설정

1. Vercel Dashboard에서 프로젝트 선택
2. Settings 이동
3. Environment Variables 선택
4. `NEXT_PUBLIC_SITE_URL` 추가
5. `DATABASE_URL` 추가
6. Production, Preview, Development 적용 범위 확인
7. 저장 후 재배포

주의:

- `DATABASE_URL`에는 `NEXT_PUBLIC_`을 붙이지 않습니다.
- 실제 DB 비밀번호를 README나 문서에 적지 않습니다.
- Preview와 Production DB를 분리하는 것이 안전합니다.

## DB 연결 후 실행 순서

실제 DB 연결 Sprint에서는 아래 순서로 진행합니다.

1. 환경변수 설정
2. Prisma 7 adapter/driver 설치
3. `npm run prisma:validate`
4. `npm run prisma:format`
5. `npx prisma migrate dev --name init`
6. `npx prisma generate`
7. seed runner 설치
8. `prisma:seed` 스크립트 추가
9. seed 실행
10. `npm run build`
11. Vercel 재배포

## 나중에 실행할 명령어

현재는 문서화만 하고 실행하지 않습니다.

```bash
npm install @prisma/adapter-neon
```

```bash
npm install -D tsx
```

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
```

```bash
npm run prisma:seed
```

## Prisma migrate 전 체크리스트

- [ ] Neon Project 생성
- [ ] `DATABASE_URL` 준비
- [ ] `.env.local`에 `DATABASE_URL` 추가
- [ ] Vercel 환경변수 등록
- [ ] `prisma/schema.prisma` 관계 검토
- [ ] `npm run prisma:validate` 통과
- [ ] `npm run prisma:format` 적용
- [ ] adapter/driver 설치 후보 확정
- [ ] seed 데이터 범위 결정
- [ ] 개발 DB인지 확인
- [ ] 운영 DB가 아닌지 확인

## Prisma generate 실행 시점

`prisma generate`는 DB 연결과 migration 전략이 정리된 뒤 실행합니다.

현재 단계에서는 `@prisma/client` 패키지만 설치되어 있고, 실제 Prisma Client 생성은 하지 않습니다.

## DB 백업/초기화 주의사항

- 운영 DB에서는 `migrate reset`을 실행하지 않습니다.
- seed는 개발 DB에서 먼저 검증합니다.
- 운영 DB 적용 전 migration 내용을 코드 리뷰합니다.
- Neon 콘솔에서 백업과 복구 옵션을 확인합니다.
- MVP 단계에서도 개발 DB와 운영 DB는 분리합니다.

## 아직 결정되지 않은 항목

- Prisma 7 공식 Neon adapter/driver 최종 선택
- connection pooling 정책
- migration용 direct connection 정책
- seed runner 설치 시점
- 이미지 저장소 선택
- 인증 도입 후 User 모델 확장 방식
