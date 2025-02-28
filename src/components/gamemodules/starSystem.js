import { CANVAS_HEIGHT } from './gameConstants';
import gameAssets from './gameAssets';

export const Starfield = {
  create: () => {
    const layers = [
      { image: new Image(), y: 0, speed: 0.5 },
      { image: new Image(), y: 0, speed: 1.0 },
      { image: new Image(), y: 0, speed: 1.5 },
    ];

    layers[0].image.src = gameAssets.background.far;
    layers[1].image.src = gameAssets.background.mid;
    layers[2].image.src = gameAssets.background.near;

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
