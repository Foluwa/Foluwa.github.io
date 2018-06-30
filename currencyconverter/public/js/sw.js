
const Mycache = 'kim-currency-conv-v1';

var filesToCache = [
     '.',
     'app.js',
     'jquery.min.js',
     'popper.min.js',
     'bootstrap.bundle.min.js',
     '../converter.html',
     
  ];
  
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(Mycache).then( cache => {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(()=> {
        return caches.match('../converter.html');
      })
    );
  });








/*const staticCache = "staticCache-v8";
const staticAssets = [
  //js
  //"../index.html",
  //"/",
  //"./app.js",
  //css
  //"styles/main.css",
  //html
  //"index.html",
  //api
  "https://free.currencyconverterapi.com/api/v5/currencies"
];

self.addEventListener("install", event => {
  // Cache static resources
  event.waitUntil(
    caches.open(staticCache).then(cache => cache.addAll(staticAssets))
  );
});

self.addEventListener("activate", event => {
  // clean old SW
});

self.addEventListener("fetch", event => {
  // offline-first
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request);
    })
  );
});
*/