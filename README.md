# WE ARE RUN

WE ARE RUN은 전국 러닝 코스, 러닝 시설, 러닝 크루, 장비 추천, 러닝 인증 커뮤니티를 제공하는 러닝 플랫폼입니다.

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Mock Data 기반 프론트 프로토타입

## 실행 방법

```bash
npm install
```

```bash
npm run dev
```

로컬 실행 주소:

```text
http://localhost:3000
```

## 빌드

```bash
npm run build
```

## 환경변수

`.env.example` 파일을 참고하세요.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

배포 시에는 실제 도메인으로 변경합니다.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 현재 구현된 페이지

- `/`
- `/courses`
- `/courses/[id]`
- `/facilities`
- `/facilities/[id]`
- `/crews`
- `/crews/[id]`
- `/equipment`
- `/equipment/[id]`
- `/community`
- `/community/[id]`
- `/profile`
- `/admin`

## 아직 구현하지 않은 것

- 로그인
- DB
- API
- 실제 지도
- 이미지 업로드
- 결제/구매 연동
- 실시간 알림

## 운영 준비 파일

- `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`
- `app/not-found.tsx`
- `app/icon.tsx`
- `lib/site.ts`

## 배포 준비 안내

GitHub에 업로드하기 전 `.env` 파일이 포함되지 않도록 확인하세요. 배포 환경에서는 `.env.example`을 참고해 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 설정합니다.

Vercel에 연결한 뒤 아래 경로를 확인하세요.

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/icon`
- 존재하지 않는 주소의 404 화면
