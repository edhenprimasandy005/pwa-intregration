// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('my-pwa-cache').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/manifest.json',
//         '/icon-192x192.png',
//         '/icon-512x512.png',
//         // Add other assets you want to cache
//       ]);
//     })
//   );
//   console.log('Service Worker installed');
// });

// self.addEventListener('activate', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
//   console.log('Service Worker activated');
// });