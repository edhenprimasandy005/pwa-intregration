
// importScripts('https://assets.magicbell.io/web-push-notifications/sw.js');
self.importScripts('https://assets.magicbell.io/web-push-notifications/sw.js');


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/images/pwa/192.png',
        '/images/pwa/512.png',
        // Add other assets you want to cache
      ]);
    })
  );
});

// Fetch event - serve cached files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('push', function(event) {
//   const data = event.data ? event.data.text() : 'No payload';
//   self.registration.showNotification('Push Notification', {
//     body: data,
//     icon: '/images/pwa/192.png'
//   });
// });
// self.addEventListener('push', (event) => {
//   const data = event.data.json();
//   console.log('Push event received:', data);

//   self.registration.showNotification(data.title, {
//     body: data.body,
//     icon: data.icon,
//   });
// });

self.addEventListener('push', function(event) {
  const data = event.data.json();
  console.log('push', data)
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data?.badge,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});