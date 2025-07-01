self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => new Response("Offline")));
});