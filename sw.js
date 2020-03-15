var CACHE_NAME = 'tic-tac-toe-game-cache-v2';
var urlsToCache = [
  '/',
  'script.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
  'https://fonts.googleapis.com/css?family=VT323'
];


self.addEventListener('install', function (event) {
  console.log("installing")
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).then(function () {
        console.log('All resources have been fetched and cached.');
      });
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);

    })
  );

});

self.addEventListener('message', function (event) {
  this.console.log("message received " + event.data.action)
  if (event.data.action == "skipWaiting") {
    self.skipWaiting();
  }
})

self.addEventListener('activate', function (event) {
  let OLD_CACHE = "tic-tac-toe-game-cache-";
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.includes(OLD_CACHE) && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});