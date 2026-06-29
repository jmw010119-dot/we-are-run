# Neon Environment Checklist

Neon PostgreSQL을 실제로 연결하기 전에 확인해야 할 환경변수 체크리스트입니다.

현재 단계에서는 Neon 가입, DB 생성, DB 연결, migrate, generate, seed 실행을 하지 않습니다.

명령어 중심 가이드는 [Neon Command Guide](neon-command-guide.md)를 참고합니다.

## 1. Neon에서 준비할 것

- Neon 계정 생성
- 새 Project 생성
- Database 이름 결정
  - 예: `wearerun`
- Region 선택
  - 주요 사용자가 한국이라면 아시아와 가까운 Region을 우선 검토합니다.
  - Vercel 배포 Region과 DB Region이 너무 멀지 않게 맞추는 것이 좋습니다.
- PostgreSQL connection string 복사
- 애플리케이션용 pooled connection과 migration용 direct connection이 구분되는지 확인

## 2. 로컬 환경변수

로컬에서는 아래 파일을 사용합니다.

```text
.env.local
```

필수 값:

```env
DATABASE_URL="postgresql://..."
```

주의:

- `DATABASE_URL`에는 절대 `NEXT_PUBLIC_`을 붙이지 않습니다.
- `.env.local`은 GitHub에 올리지 않습니다.
- `.gitignore`에 `.env.local`이 포함되어 있는지 확인합니다.
- 실제 비밀번호가 들어간 connection string을 README나 문서에 적지 않습니다.

현재 프로젝트의 `.gitignore`에는 `.env.local`이 포함되어 있습니다.

## 3. Vercel 환경변수

Vercel에서 아래 경로로 이동합니다.

```text
Vercel Project Settings -> Environment Variables
```

등록할 값:

| 항목 | 값 |
| --- | --- |
| Key | `DATABASE_URL` |
| Value | Neon connection string |
| Environment | Production, Preview, Development |

주의:

- `NEXT_PUBLIC_SITE_URL`과 `DATABASE_URL`은 완전히 다른 값입니다.
- `NEXT_PUBLIC_SITE_URL`은 사이트 주소입니다.
- `DATABASE_URL`은 서버 전용 DB 접속 정보입니다.
- 가능하면 Vercel에서 Sensitive 값으로 설정합니다.
- 환경변수를 바꾼 뒤에는 재배포가 필요할 수 있습니다.

## 4. Prisma 7 체크

실제 연결 전 아래 항목을 확인합니다.

- `prisma.config.ts`가 `DATABASE_URL`을 읽는지 확인
- `prisma/schema.prisma`의 datasource provider가 `postgresql`인지 확인
- schema 검증:

```bash
npx prisma validate
```

- schema 포맷:

```bash
npx prisma format
```

현재 프로젝트에서는 아래 npm script를 사용할 수 있습니다.

```bash
npm run prisma:validate
```

```bash
npm run prisma:format
```

## 5. 실제 연결 후 실행 순서

아래 명령은 아직 실행하지 않습니다. 실제 Neon DB가 준비된 뒤 다음 순서로 진행합니다.

1. `npm install @prisma/adapter-neon`
2. `npm install -D tsx`
3. `npx prisma validate`
4. `npx prisma migrate dev --name init`
5. `npx prisma generate`
6. `npm run prisma:seed`
7. `npm run build`
8. Vercel redeploy

## 6. 흔한 오류와 대응

### DATABASE_URL not found

원인:

- `.env.local`에 `DATABASE_URL`이 없음
- Vercel 환경변수에 `DATABASE_URL`이 없음
- 변수 이름 오타

대응:

- Key가 정확히 `DATABASE_URL`인지 확인합니다.
- `NEXT_PUBLIC_DATABASE_URL`처럼 잘못 만들지 않았는지 확인합니다.
- Vercel에서는 환경변수 저장 후 재배포합니다.

### SSL 관련 오류

원인:

- Neon connection string에 SSL 옵션이 없거나 잘못됨
- DB 제공자가 요구하는 연결 방식과 Prisma 설정이 맞지 않음

대응:

- Neon에서 제공하는 connection string을 그대로 사용합니다.
- 필요한 경우 `sslmode=require` 포함 여부를 확인합니다.

### direct connection / pooled connection 혼동

원인:

- 애플리케이션 실행용 URL과 migration용 URL을 혼동함

대응:

- 앱 실행에는 pooled connection 사용을 우선 검토합니다.
- migration에는 direct connection이 필요한지 확인합니다.
- 최종 정책은 Prisma 7 adapter/driver 도입 Sprint에서 확정합니다.

### Vercel 환경변수 미적용

원인:

- Production, Preview, Development 중 필요한 환경에 체크하지 않음
- 환경변수 변경 후 재배포하지 않음

대응:

- 적용 범위를 다시 확인합니다.
- 프로젝트를 재배포합니다.

### schema validate 실패

원인:

- `schema.prisma` 문법 오류
- enum 또는 relation 정의 문제
- Prisma 7 설정 파일 문제

대응:

- `npm run prisma:validate` 결과를 확인합니다.
- `prisma.config.ts`와 `schema.prisma` 역할이 섞이지 않았는지 확인합니다.

### migration 실패

원인:

- DB 권한 부족
- 잘못된 connection string
- 기존 테이블과 schema 충돌
- direct connection이 필요한 상황에서 pooled connection을 사용함

대응:

- 개발 DB인지 먼저 확인합니다.
- connection string 종류를 확인합니다.
- 운영 DB에서는 reset 계열 명령을 실행하지 않습니다.
