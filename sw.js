const CACHE_NAME = 'hdm-canoe-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  // Images critiques
  '/assets/images/slider/xs/slider1.webp',
  '/assets/images/slider/sm/slider1.webp',
  '/assets/images/slider/md/slider1.webp',
  '/assets/images/home/smlogohdmcanoe.webp',
  '/assets/images/home/lglogohdmcanoe.webp',
  // Autres ressources importantes
  '/assets/docs/cgv hdm canoe vf.pdf',
  '/assets/docs/Contrat loc francais 2024.pdf',
  '/assets/docs/Contrat loc anglais 2019.pdf'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Stratégie de cache : Network First avec fallback sur le cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mise en cache de la nouvelle réponse
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // Si offline, on utilise le cache
        return caches.match(event.request);
      })
  );
});