/**
 * assets/app-icon.png 원본에서 PWA / 홈 화면 아이콘 세트를 생성한다.
 * 사용법: node scripts/generate-icons.mjs
 * 의존성: sharp  (npm i -D sharp)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'assets/app-icon.png');
const out = resolve(root, 'public');
const bg = { r: 0x0b, g: 0x10, b: 0x14, alpha: 1 };

await sharp(src).resize(192, 192).png().toFile(`${out}/icons/icon-192.png`);
await sharp(src).resize(512, 512).png().toFile(`${out}/icons/icon-512.png`);
await sharp(src).resize(32, 32).png().toFile(`${out}/favicon-32.png`);
await sharp(src).resize(180, 180).flatten({ background: bg }).png().toFile(`${out}/icons/apple-touch-icon.png`);

// 마스커블: 안전 영역(80%) 안에 배치하고 배경색으로 패딩
for (const [size, inner] of [
  [192, 154],
  [512, 410],
]) {
  const fg = await sharp(src).resize(inner, inner, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: fg, gravity: 'center' }])
    .png()
    .toFile(`${out}/icons/icon-${size}-maskable.png`);
}

console.log('icons generated into', out);
