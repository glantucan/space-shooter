import { CANVAS_HEIGHT } from './gameConstants';
import { loadAssets } from './gameAssets';
const assets = loadAssets();

export const Starfield = {
  create: () => {
    const layers = [
      { image: assets.background.far, y: 0, speed: 0.5 },
      { image: assets.background.mid, y: 0, speed: 1.0 },
      { image: assets.background.near, y: 0, speed: 1.5 },
    ];

    return { layers };
  },

  update: (starfield) => ({
    layers: starfield.layers.map((layer) => ({
      ...layer,
      y: (layer.y + layer.speed) % CANVAS_HEIGHT,
    })),
  }),

  render: (ctx, starfield) => {
    starfield.layers.forEach((layer) => {
      if (layer.image.complete) {
        ctx.drawImage(layer.image, 0, layer.y);
        ctx.drawImage(layer.image, 0, layer.y - CANVAS_HEIGHT);
      }
    });
  },
};
