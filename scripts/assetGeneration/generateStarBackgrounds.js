import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;
const STAR_COUNT = 50;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

const generateStarLayer = (opacity) => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Set black background
  ctx.fillStyle = '#000014';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  Array.from({ length: STAR_COUNT }).forEach(() => {
    const x = Math.random() * CANVAS_WIDTH;
    const y = Math.random() * CANVAS_HEIGHT;
    const size = Math.random() * 2 + 1;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas.toBuffer();
};

// Ensure the assets directory exists
const assetsDir = path.join(projectRoot, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Generate and save the layers
const backgroundsDir = path.join(assetsDir, 'images/backgrounds');
if (!fs.existsSync(backgroundsDir)) {
  fs.mkdirSync(backgroundsDir, { recursive: true });
}
[
  { opacity: 0.3, name: 'stars-far' },
  { opacity: 0.5, name: 'stars-mid' },
  { opacity: 0.7, name: 'stars-near' },
].forEach((layer) => {
  const buffer = generateStarLayer(layer.opacity);
  const filePath = path.join(
    assetsDir,
    'images/backgrounds/',
    `${layer.name}.png`
  );
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${layer.name}.png`);
});
