
const Mycache = 'kim-currency-conv-v1';

////FOR MY STATIC FILES
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