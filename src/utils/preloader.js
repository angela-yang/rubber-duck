import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cache = {};
const loader = new GLTFLoader();

export function preloadAllDucks(skins, onProgress) {
  let loaded = 0;
  const total = skins.length;

  const promises = skins.map((skin) =>
    new Promise((resolve) => {
      if (cache[skin.glbUrl]) {
        onProgress?.(++loaded, total);
        return resolve();
      }
      loader.load(
        skin.glbUrl,
        (gltf) => { cache[skin.glbUrl] = gltf; onProgress?.(++loaded, total); resolve(); },
        undefined,
        () => {onProgress?.(++loaded, total); resolve(); }
      );
    })
  );

  return Promise.all(promises);
}

export function loadDuck(glbUrl, onLoad) {
  const cached = getCachedDuck(glbUrl);
  if (cached) {
    onLoad(cached);
    return;
  }
  new GLTFLoader().load(glbUrl, (gltf) => {
    cache[glbUrl] = gltf;
    onLoad(gltf);
  });
}

export function getCachedDuck(glbUrl) {
  return cache[glbUrl] ?? null;
}