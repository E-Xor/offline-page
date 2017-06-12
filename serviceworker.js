var version = 'v1::';

self.addEventListener('install', function onInstall(event) {
  console.log('MAKSIM addEventListener install');
  event.waitUntil(
    caches.open(version + 'offline').then(function prefill(cache) {
      console.log('MAKSIM caches.open')
      return cache.addAll([
        '/offline.html',
        // etc
      ]);
    })
  );
});

self.addEventListener('fetch', function onFetch(event) {
  console.log('MAKSIM addEventListener fetch');
  var request = event.request;

  event.respondWith(
    fetch(request)
      .catch(function fallback() {
        console.log('MAKSIM fallback');
        // Return the offline page
        return caches.match("/offline.html");
      })
  );
});

