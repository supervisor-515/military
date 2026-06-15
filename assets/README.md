# 앱 아이콘

- 원본: `assets/app-icon.png` (정사각형, 1024×1024)
- 배포에 실제로 사용되는 아이콘은 `public/icons/` 에 미리 생성해 커밋되어 있습니다.
  GitHub Pages 빌드는 `public/` 폴더를 그대로 복사하므로 별도 변환 도구가 필요 없습니다.

원본을 바꾼 뒤 아이콘을 다시 만들려면 (sharp 사용):

```bash
node scripts/generate-icons.mjs
```

생성물:

- `public/icons/icon-192.png`, `public/icons/icon-512.png` (홈 화면)
- `public/icons/icon-192-maskable.png`, `public/icons/icon-512-maskable.png` (마스커블)
- `public/icons/apple-touch-icon.png` (iOS)
- `public/favicon-32.png` (파비콘)
