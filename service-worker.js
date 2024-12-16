const CACHE_NAME = 'task-manager-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/icons/logo1.png',
  '/icons/logo2.png',
  '/app.js',
  'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
];

// installar service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// activar service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
        );
      })
  );
});

// fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request);
      })
  );
});