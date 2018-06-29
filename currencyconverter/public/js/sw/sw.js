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