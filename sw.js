/* Janggi launcher only. Preserve app ID and launch route. */
const CACHE='bv-janggi-launcher-v26';
const ASSETS=['./','./index.html','./install.html','./launch.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bv-janggi-launcher-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 const networkFirst=r.mode==='navigate'||/\.(?:html|webmanifest)$/.test(u.pathname);
 if(networkFirst){e.respondWith(fetch(r).catch(async()=>{const c=await caches.open(CACHE);return await c.match(r,{ignoreSearch:true})||Response.error();}));return;}
 e.respondWith(caches.open(CACHE).then(c=>c.match(r)).then(hit=>hit||fetch(r)));
});
