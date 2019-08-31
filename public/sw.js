// const staticCacheName = 'site-static';
// const dynamicCacheName = 'site-dynamic';
// const assets = [
//     '/',
//     '/index.html',
//     '/app.js',
//     '/fallback.html',
//     'https://source.unsplash.com/random/1600x1300'
// ];

// // cache size limit function
// const limitCacheSize = (name, size) => {
//     caches.open(name).then(cache => {
//         cache.keys().then(keys => {
//             if(keys.lenth > size){
//                 cache.delete(keys[0]).then(ret => {
//                     limitCacheSize(name, size)
//                 });
//             }
//         })
//     })
// }

// // install service worker
// self.addEventListener('install', evt => {
//     evt.waitUntil(
//         caches.open(staticCacheName).then(caches => {
//             caches.addAll(assets);
//         })
//     );
// });

// // activate event
// self.addEventListener('activate', evt => {
//     evt.waitUntil(
//         caches.keys().then(keys => {
//             return Promise.all(keys
//                 .filter(key => key !== staticCacheName && key !== dynamicCacheName))
//         })
//     )
// });

// // fetch event
// self.addEventListener('fetch', evt => {
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             return cacheRes || fetch(evt.request).then(fetchRes => {
//                 return caches.open(dynamicCacheName).then(cache => {
//                     cache.put(evt.request.url, fetchRes.clone());
//                     limitCacheSize(dynamicCacheName, 15);
//                     return fetchRes;
//                 })
//             });
//         }).catch(() => {
//             if(evt.request.url.indexOf('.html') > -1){
//                 return caches.match('/fallback.html');
//             }
//         })
//     );
// });
