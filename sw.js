/* Janggi launcher only: do not cache or proxy external Blogger game. */
const CACHE='bv-janggi-launcher-v1';
const ASSETS=['./','./index.html','./install.html','./launch.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',evt=>{evt.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',evt=>{evt.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',evt=>{if(evt.request.method!=='GET')return; const u=new URL(evt.request.url); if(u.origin!==self.location.origin)return;evt.respondWith(caches.match(evt.request).then(cached=>cached||fetch(evt.request)))});
