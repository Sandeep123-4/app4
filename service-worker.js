self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  // Precache assets here if needed
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/styles/dashboard.css',
        '/scripts/dashboard.js',
        // Add other assets you want to cache on install
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  // Perform any activation tasks if needed
});

self.addEventListener('fetch', (event) => {
  // Intercept requests and serve from cache if available, else fetch from network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve from cache if available
        return cachedResponse;
      }
      // Else fetch from network
      return fetch(event.request).catch((error) => {
        console.error('Failed to fetch:', event.request.url, error);
        return new Response('Network error', { status: 500 });
      });
    })
  );
});
