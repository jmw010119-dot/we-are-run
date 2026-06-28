# Deployment Checklist

WE ARE RUN 배포 전 확인할 항목입니다.

## Local Check

- [ ] `npm install` 실행
- [ ] `npm run build` 통과
- [ ] `.env` 파일 생성
- [ ] `NEXT_PUBLIC_SITE_URL` 설정
- [ ] `.env` 파일이 Git에 포함되지 않는지 확인

## GitHub Upload

- [ ] GitHub 새 저장소 생성
- [ ] 로컬 프로젝트 Git 초기화 여부 확인
- [ ] `.gitignore` 적용 확인
- [ ] README.md 내용 확인
- [ ] GitHub에 push

## Vercel Setup

- [ ] Vercel 프로젝트 연결
- [ ] Framework Preset이 Next.js인지 확인
- [ ] 환경변수 `NEXT_PUBLIC_SITE_URL` 등록
- [ ] `NEXT_PUBLIC_SITE_URL`을 실제 배포 도메인으로 설정
- [ ] Production 도메인 연결

## Site QA

- [ ] `/sitemap.xml` 확인
- [ ] `/robots.txt` 확인
- [ ] `/manifest.webmanifest` 확인
- [ ] `/icon` 확인
- [ ] 존재하지 않는 주소에서 404 페이지 확인
- [ ] 모바일 화면 확인
- [ ] Header 주요 링크 확인
- [ ] Home CTA 링크 확인
- [ ] 목록 페이지 상세보기 링크 확인
- [ ] 상세 페이지 CTA 링크 확인

## Not Implemented Yet

- [ ] 로그인/권한
- [ ] DB/API
- [ ] 실제 지도 API
- [ ] 이미지 업로드
- [ ] 결제/구매 연동
- [ ] 실시간 알림
