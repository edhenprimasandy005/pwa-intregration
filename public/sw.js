importScripts('https://assets.magicbell.io/web-push-notifications/sw.js');

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});