const CACHE_NAME = 'soundfx-v3';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/audio/yawn.mp3',
    '/audio/slow-clap.mp3',
    '/audio/rimshot.mp3',
    '/audio/sad-violin.mp3',
    '/audio/crickets.mp3',
    '/audio/baby-crying.mp3',
    '/icons/yawn.png',
    '/icons/slow-clap.png',
    '/icons/rimshot.png',
    '/icons/sad-violin.png',
    '/icons/crickets.png',
    '/icons/baby-crying.png'
];

// Install - cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - serve from cache, fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
