
var dataCacheName = 'rcfuniosunosogbo-v1';
var cacheName = 'rcfuniosunosogbo-final-1'; 

var filesToCache = [
  '/',
  '/javascripts/bootstrap.min.js',
  '/javascripts/jquery.countTo.js',  
  '/javascripts/jquery.easing.1.3.js',
  '/javascripts/jquery.flexslider-min.js',
  '/javascripts/jquery.magnific-popup.min.js',
  '/javascripts/jquery.min.js',
  '/javascripts/jquery.waypoints.min.js',
  '/javascripts/magnific-popup-options.js',
  '/javascripts/main.js',
  '/javascripts/modernizr-2.6.2.min.js',
  '/javascripts/owl.carousel.min.js',
  '/javascripts/respond.min.js',
  '/javascripts/sellect.js',
  '/stylesheets/animate',
  '/stylesheets/bootstrap.min.css',
  '/stylesheets/flexslider.css',
  '/stylesheets/icomoon.css',
  '/stylesheets/magnific-popup.css',
  '/stylesheets/owl.carousel.min.css',
  '/stylesheets/owl.theme.default.min.css',
  '/stylesheets/sellect',
  '/stylesheets/style.css',
];


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});
  
self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = '/';
    if (e.request.url.indexOf(dataUrl) > -1) {
      e.respondWith(
        caches.open(dataCacheName).then(function(cache) {
          return fetch(e.request).then(function(response){
            cache.put(e.request.url, response.clone());
            return response;
          });
        })
      );
    } else {
      e.respondWith(
        caches.match(e.request).then(function(response) {
          return response || fetch(e.request);
        })
      );
    }
});
  


// function addToHomeScreen() {  var a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
//   a2hsBtn.style.display = 'none';  // Show the prompt
//   deferredPrompt.prompt();  // Wait for the user to respond to the prompt
//   deferredPrompt.userChoice
//     .then(function(choiceResult){

//   if (choiceResult.outcome === 'accepted') {
//     console.log('User accepted the A2HS prompt');
//   } else {
//     console.log('User dismissed the A2HS prompt');
//   }

//   deferredPrompt = null;

// });}

//   addToHomeScreen();