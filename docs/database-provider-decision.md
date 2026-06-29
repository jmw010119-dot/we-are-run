# Database Provider Decision

WE ARE RUN의 실제 데이터베이스를 선택하기 위한 비교 문서입니다.

현재 단계에서는 DB에 연결하지 않습니다. 이 문서는 Neon PostgreSQL, Supabase PostgreSQL, Local PostgreSQL 중 어떤 선택지가 프로젝트에 가장 적합한지 결정하기 위한 기준만 정리합니다.

## 결론

추천 순위:

1. Neon PostgreSQL
2. Supabase PostgreSQL
3. Local PostgreSQL

WE ARE RUN의 1차 추천은 **Neon PostgreSQL**입니다.

이유:

- Vercel과 함께 쓰기 쉽습니다.
- Next.js 서버리스 배포 환경과 잘 맞습니다.
- PostgreSQL 기반이라 Prisma와 잘 맞습니다.
- 초기 비용 부담이 낮습니다.
- 초보자가 로컬 DB를 직접 설치하지 않아도 시작할 수 있습니다.

## 비교표

| 기준 | Neon PostgreSQL | Supabase PostgreSQL | Local PostgreSQL |
| --- | --- | --- | --- |
| Vercel 연동 난이도 | 쉬움 | 보통 | 어려움 |
| 무료 플랜 적합성 | 초기 MVP 검토에 적합 | 초기 MVP 검토에 적합 | 무료지만 직접 설치 필요 |
| Prisma 호환성 | 좋음 | 좋음 | 좋음 |
| 운영 난이도 | 낮음 | 보통 | 높음 |
| 초보자 친화도 | 높음 | 보통 | 낮음 |
| 확장성 | 좋음 | 좋음 | 배포용으로는 부족 |
| 백업/관리 편의성 | 관리형 서비스라 편함 | 관리형 서비스라 편함 | 직접 관리 필요 |
| Auth 연동 가능성 | 별도 Auth 도입 필요 | Supabase Auth 가능 | 별도 Auth 도입 필요 |
| 비용 | 최신 플랜 확인 필요 | 최신 플랜 확인 필요 | 로컬은 무료, 운영은 별도 필요 |
| 추천 여부 | 1순위 | 2순위 | 3순위 |

## Neon PostgreSQL

### 장점

- Vercel + Next.js 배포 흐름과 잘 맞습니다.
- 서버리스 PostgreSQL 환경에 적합합니다.
- Prisma 공식/제공자 문서에서 Neon 연결 방식을 안내합니다.
- pooled connection과 direct connection을 나누어 운영할 수 있습니다.

### 주의사항

- Prisma 7 기준 adapter/driver 설치가 필요할 수 있습니다.
- Neon에서는 애플리케이션용 pooled connection과 migration용 direct connection을 구분하는 전략을 검토해야 합니다.
- 무료 플랜 한도와 sleep/wake 정책은 가입 시 최신 정보를 확인해야 합니다.

### WE ARE RUN 적합도

WE ARE RUN은 Vercel 배포를 전제로 하는 Next.js 서비스이므로 Neon이 가장 단순한 선택입니다. 초기 MVP에서는 운영 부담이 낮고, 이후 규모가 커지면 플랜을 올리거나 connection 정책을 조정할 수 있습니다.

## Supabase PostgreSQL

### 장점

- PostgreSQL 기반이라 Prisma와 호환됩니다.
- Auth, Storage, Realtime 같은 부가 기능이 있습니다.
- 나중에 이미지 업로드나 커뮤니티 기능이 커질 때 확장 선택지가 많습니다.

### 주의사항

- Supabase는 Auth 기능도 제공하지만, WE ARE RUN은 현재 NextAuth/Auth.js 방향을 우선 검토하고 있으므로 Supabase는 DB만 사용할 수 있습니다.
- connection pooling과 direct connection을 구분해야 합니다.
- Vercel 환경변수 설정이 필요합니다.
- Supabase 부가 기능을 쓰지 않는다면 Neon보다 선택 이유가 약할 수 있습니다.

### WE ARE RUN 적합도

Supabase는 좋은 2순위입니다. DB뿐 아니라 Auth와 Storage까지 한 플랫폼에서 관리하고 싶다면 선택할 수 있습니다. 다만 현재 계획처럼 인증을 별도 라이브러리로 가져가려면, 초기에는 Neon이 더 단순합니다.

## Local PostgreSQL

### 장점

- 완전히 로컬에서 실험할 수 있습니다.
- 인터넷 연결 없이 개발 DB를 사용할 수 있습니다.
- 비용이 들지 않습니다.

### 주의사항

- 설치와 환경설정이 초보자에게 어렵습니다.
- Windows 환경에서 PostgreSQL 설치, 계정, 포트, 서비스 관리가 필요합니다.
- 배포 환경과 분리되어 있어 실제 운영 전에는 결국 Neon 또는 Supabase 같은 클라우드 DB가 필요합니다.
- 팀 협업 시 각자 환경 차이가 생길 수 있습니다.

### WE ARE RUN 적합도

로컬 PostgreSQL은 학습이나 실험에는 좋지만, 현재 WE ARE RUN의 목표인 배포 가능한 실제 서비스 준비에는 3순위입니다.

## Neon 선택 시 진행 순서

아래 순서는 다음 Sprint 이후 실제 DB 연결 단계에서 진행합니다.

1. Neon 가입
2. 새 Project 생성
3. PostgreSQL connection string 복사
4. 로컬 `.env.local`에 `DATABASE_URL` 추가
5. 필요하면 migration용 `DIRECT_URL`도 추가
6. Vercel 환경변수에 `DATABASE_URL` 추가
7. Prisma adapter/driver 설치
8. `npm run prisma:validate`
9. `npx prisma migrate dev --name init`
10. `npx prisma generate`
11. seed runner 설치
12. seed 실행
13. Vercel 재배포

## Supabase 선택 시 진행 순서

1. Supabase 가입
2. 새 Project 생성
3. Database connection string 확인
4. direct connection과 pooler connection 구분
5. 로컬 `.env.local`에 `DATABASE_URL` 추가
6. Vercel 환경변수에 `DATABASE_URL` 추가
7. Prisma adapter/driver 필요 여부 확인
8. Prisma migrate/generate/seed 진행

## Local PostgreSQL 선택 시 진행 순서

1. PostgreSQL 설치
2. 로컬 DB와 사용자 생성
3. 로컬 connection string 작성
4. `.env.local`에 `DATABASE_URL` 추가
5. Prisma migrate/generate/seed 진행
6. 배포 전 Neon 또는 Supabase로 재검증

## 최종 추천

WE ARE RUN은 **Neon PostgreSQL**로 시작하는 것을 추천합니다.

현재 프로젝트 상태에서는 프론트엔드 프로토타입, Prisma schema, seed 초안, 배포 문서가 준비되어 있습니다. 다음 단계에서 실제 DB를 연결한다면 Neon을 선택하고, Prisma 7 adapter/driver와 connection string 전략을 확정하는 흐름이 가장 자연스럽습니다.

## 참고 공식 문서

- Prisma Supported Databases: https://www.prisma.io/docs/orm/reference/supported-databases
- Neon Prisma Guide: https://neon.com/docs/guides/prisma
- Supabase Prisma Guide: https://supabase.com/docs/guides/database/prisma
