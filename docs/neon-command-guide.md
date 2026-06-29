# Neon Command Guide

Neon PostgreSQL을 실제로 연결할 때 사용자가 한 단계씩 따라 할 수 있는 명령어 가이드입니다.

현재 Sprint에서는 이 명령어를 실행하지 않습니다. Neon DB가 준비되고 실제 연결 Sprint가 시작된 뒤에만 실행합니다.

## 0. 전제 조건

- GitHub 업로드 완료
- Vercel 배포 완료
- Prisma 설치 완료
- `schema.prisma` validate 통과
- Neon 계정 준비
- 실제 connection string 준비

## 1. Neon에서 할 일

Neon 웹사이트에서 진행합니다.

1. Neon 로그인
2. New Project 선택
3. Project name 입력

```text
we-are-run
```

4. Database name 입력

```text
wearerun
```

5. Region 선택
6. Connection string 복사

주의:

- connection string에는 DB 비밀번호가 들어 있습니다.
- README, GitHub Issue, 문서에 실제 connection string을 붙여넣지 않습니다.
- pooled connection과 direct connection이 따로 제공되는지 확인합니다.

## 2. 로컬 .env.local 만들기

프로젝트 루트에 아래 파일을 만듭니다.

```text
.env.local
```

내용:

```env
DATABASE_URL="Neon에서 복사한 connection string"
NEXT_PUBLIC_SITE_URL="https://we-are-run.vercel.app"
```

주의:

- `.env.local`은 GitHub에 올리지 않습니다.
- `DATABASE_URL`에는 절대 `NEXT_PUBLIC_`을 붙이지 않습니다.
- 현재 프로젝트의 `.gitignore`에는 `.env.local`이 포함되어 있습니다.

## 3. Vercel 환경변수 등록

Vercel에서 아래 경로로 이동합니다.

```text
Vercel -> Project Settings -> Environment Variables
```

등록할 Key:

```text
DATABASE_URL
```

```text
NEXT_PUBLIC_SITE_URL
```

권장 Environment:

- Production
- Preview
- Development

예시 값:

```env
DATABASE_URL="Neon에서 복사한 connection string"
NEXT_PUBLIC_SITE_URL="https://we-are-run.vercel.app"
```

주의:

- `DATABASE_URL`은 Sensitive 값으로 설정할 수 있습니다.
- 환경변수를 등록하거나 수정한 뒤에는 Vercel 재배포가 필요할 수 있습니다.

## 4. 설치할 명령어

나중에 실제 연결 Sprint에서 실행합니다.

```bash
npm install @prisma/adapter-neon
```

```bash
npm install -D tsx
```

## 5. 검증 명령어

```bash
npm run prisma:validate
```

```bash
npm run prisma:format
```

## 6. Migration 명령어

처음 실행 전 `prisma/schema.prisma`를 최종 확인합니다.

```bash
npx prisma migrate dev --name init
```

주의:

- 운영 DB에서 바로 실행하지 않습니다.
- 먼저 개발 DB에서 실행합니다.
- 기존 데이터가 있는 DB라면 migration 전략을 다시 확인합니다.

## 7. Prisma Client 생성

```bash
npx prisma generate
```

주의:

- API 또는 Server Action에서 Prisma Client를 사용하기 전에 실행합니다.
- generate 전에는 schema와 migration 상태를 확인합니다.

## 8. Seed 실행

먼저 `package.json`에 아래 script를 추가해야 합니다.

```json
"prisma:seed": "tsx prisma/seed.ts"
```

그 다음 실행합니다.

```bash
npm run prisma:seed
```

주의:

- seed는 개발 DB에서 먼저 실행합니다.
- 중복 데이터가 생기지 않도록 `upsert` 전략을 확인합니다.
- 운영 DB에 seed를 넣기 전에는 반드시 데이터 범위를 검토합니다.

## 9. 빌드 확인

```bash
npm run build
```

## 10. GitHub push

```bash
git add .
```

```bash
git commit -m "Connect Prisma and Neon database"
```

```bash
git push
```

주의:

- `.env.local`이 commit에 포함되지 않았는지 확인합니다.
- 실제 DB 비밀번호가 문서나 코드에 들어가지 않았는지 확인합니다.

## 11. Vercel 재배포 확인

Vercel Dashboard에서 Deployments를 확인합니다.

배포 후 확인할 경로:

- `/robots.txt`
- `/sitemap.xml`
- `/courses`
- `/community`
- `/admin`

## 12. 문제 발생 시

### DATABASE_URL not found

확인할 것:

- `.env.local`에 `DATABASE_URL`이 있는지 확인
- Vercel Environment Variables에 `DATABASE_URL`이 있는지 확인
- `NEXT_PUBLIC_DATABASE_URL`처럼 잘못 입력하지 않았는지 확인

### Prisma adapter 오류

확인할 것:

- `@prisma/adapter-neon` 설치 여부 확인
- Prisma 7에서 요구하는 adapter 설정 방식 확인
- `prisma.config.ts`와 Prisma Client 생성 방식 확인

### Migration failed

확인할 것:

- 개발 DB인지 확인
- connection string이 올바른지 확인
- direct connection이 필요한 상황인지 확인
- 기존 테이블과 schema가 충돌하는지 확인

### SSL required

확인할 것:

- Neon에서 제공한 connection string을 그대로 사용했는지 확인
- `sslmode=require`가 필요한지 확인

### Vercel 환경변수 적용 안 됨

확인할 것:

- Production, Preview, Development 중 필요한 환경에 등록했는지 확인
- 환경변수 저장 후 재배포했는지 확인

### Seed 중 unique constraint 오류

확인할 것:

- 이미 같은 seed 데이터가 들어갔는지 확인
- `upsert` 기준이 올바른지 확인
- seed 전용 ID가 중복되지 않는지 확인

### Prisma Client not generated

확인할 것:

- `npx prisma generate`를 실행했는지 확인
- generate 후 개발 서버 또는 빌드를 다시 실행했는지 확인
