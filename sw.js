// Service worker offline-first (cache estatico)
// Regla: el nombre del cache es "geonotas-" seguido del APP_VER de index.html
// (el de esta app ya trae el "light-" adentro). Antes habia una "v" de mas que rompia
// esa correspondencia; no lo notaba nadie porque la light no tenia prueba de humo.
const CACHE='geonotas-light-19';
// Caches que ESTA app puede purgar al activarse. NO se borra "todo lo que no sea CACHE":
// la Cache API tiene alcance de ORIGEN, no de ruta, y las dos PWAs viven en el mismo
// cvenegas-sernageomin.github.io. Con el filtro viejo, activar esta app borraba la cache de
// la completa -- y tambien 'transformers-cache', que es donde Transformers.js guarda el
// modelo de voz de ~78 MB de ESTA misma app: bastaba abrir la completa una vez para quedarse
// sin dictado offline, imposible de recuperar sin señal. Medido el 2026-08-31 contra el sitio
// en vivo. Las dos listas son disjuntas: 'geonotas-light-10' no calza en las de la completa.
const MIAS=[/^geonotas-light-\d+$/, /^geoterreno-cdc-light-v\d+$/];  // la 2a: previa al renombre
const esMia=k=>MIAS.some(re=>re.test(k));
const ASSETS=['./','./index.html','./manifest.json','./guia_fields.js','./icons/icon-192.png','./icons/icon-512.png',
  './vendor/leaflet.css','./vendor/leaflet.js','./vendor/idb.js','./vendor/leaflet.offline.js',
  './vendor/georaster.browser.bundle.min.js','./vendor/georaster-layer-for-leaflet.min.js',
  './vendor/sql-wasm.js','./vendor/sql-wasm.wasm','./vendor/jszip.js',
  './vendor/images/marker-icon.png','./vendor/images/marker-icon-2x.png','./vendor/images/marker-shadow.png',
  './vendor/images/layers.png','./vendor/images/layers-2x.png'];
// vendor/gdal3.js + gdal3WebAssembly.{data,wasm} quedan FUERA de ASSETS a proposito: pesan
// ~39 MB entre los tres y el install del SW los bajaria en cada dispositivo aunque el geologo
// nunca exporte GDB. Igual quedan cacheados por la rama cache-first de abajo la primera vez
// que se usa la exportacion estando en linea. NO agregarlos aca "para completar la lista".
//
// vendor/voz/* (dictado offline) queda fuera por lo mismo: ~21 MB de runtime que solo hacen
// falta si el geologo dicta. La rama cache-first los captura la primera vez que toca el
// microfono -- que es cuando descarga el motor, con conexion. Excepcion: voz.js SI conviene
// que este a mano porque decide si mostrar el boton, pero pesa 15 KB y ya lo trae index.html
// como <script>, asi que entra por la misma rama cache-first sin ocupar lugar en el install.
// El modelo (~78 MB) no pasa por aca: vive en otro path del dominio, fuera del scope de este
// SW, y lo administra Transformers.js en la Cache API (con alcance de ORIGEN, asi que se
// comparte con las demas PWAs).
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&esMia(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const req=e.request;
  // Cross-origin (tiles satelitales/topo de Esri y OpenTopoMap, export de ArcGIS): NO se
  // cachea aca. Los tiles offline los administra leaflet.offline en IndexedDB con el boton
  // "Descargar tiles", que ademas deja elegir el area y el zoom. Cachearlos tambien aca
  // duplicaba el almacenamiento y crecia sin techo: este cache solo se limpia al subir de
  // version, asi que cada tile que el usuario mirara al pasar quedaba guardado para siempre.
  if(new URL(req.url).origin!==self.location.origin) return;
  const esDoc = req.mode==='navigate' || req.destination==='document' || req.url.endsWith('/') || req.url.endsWith('index.html');
  if(esDoc){   // network-first para el HTML: siempre la última versión estando en línea
    // solo se cachea si resp.ok: un 404 (ej. deploy a medio subir) quedaba cacheado para
    // siempre y la app seguía rota offline hasta la próxima versión de CACHE.
    e.respondWith(fetch(req).then(resp=>{if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return resp;})
      .catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  // cache-first para assets. Sin fallback a index.html: devolver el HTML cuando falla una
  // imagen o un .wasm no arregla nada y disfraza el error real de un fallo de red.
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(resp=>{
    // mismo criterio que la rama de documento: no cachear respuestas con error.
    if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return resp;
  })));});
