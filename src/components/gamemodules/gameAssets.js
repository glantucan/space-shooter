const createImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

let assetsCache = null;

export const loadAssets = () => {
  if (!assetsCache) {
    assetsCache = {
      player: createImage('/assets/images/player-ship/player.png'),
      enemies: {
        tier1: createImage('/assets/images/enemy-ships/enemy01.png'),
        tier2: createImage('/assets/images/enemy-ships/enemy02.png'),
        tier3: createImage('/assets/images/enemy-ships/enemy03.png'),
      },
      background: {
        far: createImage('/assets/images/backgrounds/stars-far.png'),
        mid: createImage('/assets/images/backgrounds/stars-mid.png'),
        near: createImage('/assets/images/backgrounds/stars-near.png'),
      },
    };
  }
  return assetsCache;
};

export const getAsset = (assetName) => {
  // Ensure the assets object is available.
  if (!assetsCache) {
    loadAssets();
  }
  // Support nested properties using dot notation.
  const keys = assetName.split('.');
  let asset = assetsCache;
  keys.forEach((key) => {
    console.log('Asset: ', key, asset);
    asset = asset[key];
    if (!asset) {
      throw new Error(`Asset not found: ${assetName}`);
    }
  });
  return asset;
};
