const CACHE_NAME = 'trading-vault-v2';
const ASSETS =[
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',  // <-- Add the new icon to the offline cache
  './icon-512.png',  // <-- Add the new icon to the offline cache
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/flatpickr'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      // Failsafe for offline loading
      return new Response('Offline Mode');
    })
  );
});
