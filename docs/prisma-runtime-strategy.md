# Prisma Runtime Strategy

WE ARE RUN은 Prisma 7 기준으로 PostgreSQL을 사용할 예정입니다. 현재 단계에서는 실제 DB에 연결하지 않고, 런타임 전략과 설치 후보만 문서화합니다.

## Prisma 7에서 prisma.config.ts를 사용하는 이유

Prisma 7에서는 DB 연결 URL을 `schema.prisma` 안에 직접 두지 않고 `prisma.config.ts`에서 관리합니다.

역할을 나누면 다음과 같습니다.

- `prisma/schema.prisma`: 모델, 관계, enum 같은 DB 구조 정의
- `prisma.config.ts`: schema 경로와 datasource URL 같은 Prisma 실행 설정
- `.env.local`: 로컬 개발용 비밀 환경변수
- Vercel Environment Variables: 배포 환경용 비밀 환경변수

이렇게 분리하면 schema는 구조 설계에 집중하고, 환경별 연결 정보는 설정 파일과 환경변수에서 관리할 수 있습니다.

## DATABASE_URL 관리 방식

`DATABASE_URL`은 서버 전용 비밀 값입니다.

- 로컬 개발: `.env.local`에 저장
- 배포 환경: Vercel Dashboard의 Environment Variables에 저장
- GitHub 업로드: `.env.local`은 업로드하지 않음
- 공개 변수 금지: `NEXT_PUBLIC_DATABASE_URL`처럼 만들지 않음

예시:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/wearerun?sslmode=require"
```

`NEXT_PUBLIC_SITE_URL`은 브라우저에 공개되어도 되는 사이트 주소이고, `DATABASE_URL`은 서버에서만 사용해야 하는 비밀 값입니다.

## Vercel 배포 환경 주의사항

- Vercel에는 `DATABASE_URL`을 반드시 환경변수로 등록합니다.
- Production, Preview, Development 환경 중 어디에 적용할지 확인합니다.
- 서버리스 환경에서는 DB 연결 수가 갑자기 늘 수 있으므로 연결 방식과 pooling 정책을 확인합니다.
- Prisma 7의 실제 DB 연결 방식은 선택한 PostgreSQL 서비스와 공식 adapter 지원 여부를 확인한 뒤 확정합니다.
- 실제 배포 전에는 Preview 환경에서 migration, generate, seed 순서를 따로 검증합니다.

## PostgreSQL 선택지

### Neon

- Vercel과 함께 쓰기 좋습니다.
- 서버리스 PostgreSQL 환경에 적합합니다.
- 초기 MVP에서는 운영 부담이 낮습니다.

### Supabase

- PostgreSQL 기반입니다.
- DB 외에도 Auth, Storage 같은 기능 확장 여지가 있습니다.
- WE ARE RUN이 나중에 인증과 이미지 업로드를 붙일 때 검토할 수 있습니다.

### Local PostgreSQL

- 로컬에서 빠르게 실험할 수 있습니다.
- 팀원이 각자 설치해야 하므로 초기 협업 단계에서는 설정 차이가 생길 수 있습니다.
- 배포 검증은 별도 클라우드 DB에서 다시 해야 합니다.

## 추천 조합

초기 추천 조합은 다음과 같습니다.

- Hosting: Vercel
- Database: Neon PostgreSQL
- ORM: Prisma 7
- Seed Runner: `tsx`

이 조합은 배포 환경과 DB 운영을 단순하게 유지하면서, MVP 이후 확장에도 무리가 적습니다.

## 추후 설치 후보

아래 패키지는 아직 설치하지 않습니다.

```bash
npm install @prisma/adapter-neon
```

또는 Prisma 7에서 선택한 PostgreSQL 서비스에 필요한 공식 adapter/driver를 설치합니다.

Seed 실행 도구 후보:

```bash
npm install -D tsx
```

대안:

```bash
npm install -D ts-node
```

WE ARE RUN에서는 seed runner로 `tsx`를 우선 검토합니다. 설정이 단순하고 TypeScript seed 파일 실행에 적합하기 때문입니다.

## 아직 설치하지 않는 이유

- 아직 실제 DB를 연결하지 않았습니다.
- 아직 migration을 실행하지 않습니다.
- Prisma Client generate를 실행하지 않습니다.
- adapter는 선택한 DB 서비스가 확정된 뒤 설치하는 편이 안전합니다.
- seed runner도 실제 seed 실행 Sprint에서 설치합니다.

## 다음 결정 사항

- Neon과 Supabase 중 실제 DB 서비스 선택
- Prisma 7 공식 adapter/driver 최종 확인
- DB connection pooling 전략
- seed runner `tsx` 설치 시점
- `prisma:seed` 스크립트 추가 시점
