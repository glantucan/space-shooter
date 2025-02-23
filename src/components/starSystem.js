import { CANVAS_HEIGHT } from './gameConstants';

export const createStarfield = () => {
  const layers = [
    { 
      image: new Image(),
      y: 0,
      speed: 0.5
    },
    { 
      image: new Image(),
      y: 0,
      speed: 1.0
    },
    { 
      image: new Image(),
      y: 0,
      speed: 1.5
    }
  ];

  // Load the pre-generated images
  layers[0].image.src = '/assets/stars-far.png';
  layers[1].image.src = '/assets/stars-mid.png';
  layers[2].image.src = '/assets/stars-near.png';

  return { layers };
};

export const updateStarfield = (starfield) => ({
  layers: starfield.layers.map(layer => ({
    ...layer,
    y: (layer.y + layer.speed) % CANVAS_HEIGHT
  }))
});

export const renderStarfield = (ctx, starfield) => {
  starfield.layers.forEach(layer => {
    if (layer.image.complete) {
      ctx.drawImage(layer.image, 0, layer.y);
      ctx.drawImage(layer.image, 0, layer.y - CANVAS_HEIGHT);
    }
  });
};
