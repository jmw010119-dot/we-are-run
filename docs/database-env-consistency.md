# Database Environment Consistency

로컬에서 실행하는 스크립트와 Vercel 배포 사이트가 같은 Neon PostgreSQL DB를 바라보는지 확인하는 가이드입니다.

## 왜 확인해야 하나요?

Vercel 배포 사이트에서 Google 로그인을 완료했는데, 로컬에서 `npm run admin:promote` 실행 시 해당 User를 찾지 못한다면 두 환경의 `DATABASE_URL`이 서로 다를 가능성이 큽니다.

## 로컬 확인

로컬에는 `.env.local` 파일에 아래 값이 있어야 합니다.

```env
DATABASE_URL="postgresql://..."
```

주의:

- `DATABASE_URL` 원문은 터미널, 문서, GitHub에 출력하지 않습니다.
- 확인할 때는 host와 database 이름 정도만 마스킹해서 비교합니다.

## Vercel 확인

Vercel에서 아래 경로로 이동합니다.

```text
Vercel -> we-are-run 프로젝트 -> Settings -> Environment Variables
```

확인할 값:

```text
DATABASE_URL
```

등록할 Environment:

```text
Production
Preview
Development
```

Vercel에 `DATABASE_URL`이 없거나 로컬과 다른 Neon 프로젝트를 보고 있다면, 로컬 `.env.local`의 `DATABASE_URL` 값을 Vercel에도 동일하게 등록합니다.

## 다시 배포하고 확인하는 순서

1. Vercel Environment Variables에 `DATABASE_URL` 저장
2. Deployments에서 최신 배포를 Redeploy
3. 배포 사이트에서 다시 Google 로그인

```text
https://we-are-run.vercel.app/login
```

4. 로컬에서 관리자 승격 실행

```bash
npm run admin:promote
```

5. 성공 후 `/admin` 접근 확인

## 체크 포인트

- Vercel 로그인으로 생성된 User는 Vercel의 `DATABASE_URL`이 가리키는 DB에 저장됩니다.
- 로컬 `admin:promote`는 로컬 `.env.local`의 `DATABASE_URL`이 가리키는 DB에서 User를 찾습니다.
- 두 값이 같아야 같은 User를 찾고 `ADMIN`으로 승격할 수 있습니다.
