const cacheName = 'citas-medicas-v1';
const assets = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(assets))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
