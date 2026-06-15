/**
 * 군월급 PWA 서비스 워커.
 * 설치 가능(installable) 요건인 fetch 핸들러를 제공하고,
 * 네트워크 우선 + 캐시 폴백으로 기본적인 오프라인 동작을 지원한다.
 */
const CACHE = 'gunwolgup-v1';
const BASE = '/military/';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll([BASE, BASE + 'manifest.json']))
      .catch(() => {}),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match(BASE)),
      ),
  );
});
