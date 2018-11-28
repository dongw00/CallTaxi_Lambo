const appCacheFiles = ['/'],
  appCache = 'aws-amplify-v1';

addEventListener('install', event => {
  console.log('[Service Worker] Install Event', event);
  event.waitUntil(
    caches.open(appCache).then(cache => cache.addAll(appCacheFiles))
  );
});

addEventListener('activate', event => {
  console.log('[Service Worker] Activate Event', event);
});

addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch: ', event);
  let url = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request).then(resp => {
      return (
        resp ||
        fetch(event.request).then(response => {
          return caches.open(appCache).then(cache => {
            if (event.request.method === 'GET') {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      );
    })
  );
});

addEventListener('message', event => {
  console.log('[Service Worker] Message Event: ', event.data);
});

addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  if (!(self.Notification && self.Notification.permission === 'granted'))
    return;
})