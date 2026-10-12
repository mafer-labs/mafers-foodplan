/* Versioned, complete app shell. Keep unrelated origin caches intact. */
const CACHE_NAME='plan-mafer-v3';
const LOCAL_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './styles.css','./kitchen.css','./core.js','./translations.js','./meal-data.js',
  './planning-data.js','./app.js','./kitchen.js','./bootstrap.js'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(LOCAL_SHELL)));
  // Activate after old tabs close: avoid mixing old HTML with new scripts.
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('plan-mafer-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  const shellURL=new URL('./index.html',self.registration.scope).href;
  if(event.request.mode==='navigate'){
    // The shell and scripts come from the same installed version.
    event.respondWith(caches.open(CACHE_NAME).then(async cache=>
      (await cache.match(shellURL)) || fetch(event.request)));
    return;
  }
  const shell=new Set(LOCAL_SHELL.map(file=>new URL(file,self.registration.scope).href));
  if(shell.has(url.href))event.respondWith(caches.open(CACHE_NAME).then(async cache=>
    (await cache.match(event.request)) || fetch(event.request)));
});
