import { CANVAS_WIDTH, CANVAS_HEIGHT, STAR_COUNT } from './gameConstants';

const createStarLayerImage = (opacity) => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  Array.from({ length: STAR_COUNT }).forEach(() => {
    const x = Math.random() * CANVAS_WIDTH;
    const y = Math.random() * CANVAS_HEIGHT;
    const size = Math.random() * 2 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
};

export const createStarfield = () => {
  const layers = [
    { image: createStarLayerImage(0.3), y: 0, speed: 0.5 }, // distant stars
    { image: createStarLayerImage(0.5), y: 0, speed: 1.0 }, // middle layer
    { image: createStarLayerImage(0.7), y: 0, speed: 1.5 }, // close stars
  ];
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
    // Draw the layer twice to create seamless scrolling
    ctx.drawImage(layer.image, 0, layer.y);
    ctx.drawImage(layer.image, 0, layer.y - CANVAS_HEIGHT);
  });
};
