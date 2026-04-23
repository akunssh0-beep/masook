// SW Build v1.0.0 - it.adi.p Automator
const CACHE_NAME = 'my_awesome_app-v1776956472272';
const ASSETS = ["./","./index.html","./manifest.json","./daftarpetugas.html","./dasbodadmin.html","./profil.html","./rekapan.html","./scan.html","./setting.html"];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((k) => k !== CACHE_NAME && caches.delete(k))
        ))
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});