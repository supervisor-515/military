# 앱 아이콘

웹앱(PWA) 설치 아이콘은 이 폴더의 `app-icon.png` 한 장에서 생성됩니다.

- 파일 경로: `assets/app-icon.png`
- 권장 규격: 정사각형 PNG, **1024×1024**(최소 512×512)

`main` 브랜치로 푸시되면 GitHub Actions 가 이 원본에서 다음 크기를
자동으로 만들어 배포합니다.

- `icons/icon-192.png`, `icons/icon-512.png` (홈 화면 아이콘)
- `icons/icon-192-maskable.png`, `icons/icon-512-maskable.png` (마스커블)
- `icons/apple-touch-icon.png` (iOS)
- `favicon.ico`

`app-icon.png` 가 없으면 아이콘 생성 단계는 건너뛰고 배포는 정상 진행됩니다.
