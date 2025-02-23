import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to draw different ships
const drawShip = (ctx, type) => {
  switch (type) {
    case 'enemy01':
      drawEnemy01(ctx);
      break;
    case 'enemy02':
      drawEnemy02(ctx);
      break;
    case 'enemy03':
      drawEnemy03(ctx);
      break;
    default:
      break;
  }
};

const drawEnemy01 = (ctx) => {
  // Main body gradient - metallic red
  const bodyGradient = ctx.createLinearGradient(50, 25, 50, 75);
  bodyGradient.addColorStop(0, '#700');
  bodyGradient.addColorStop(0.4, '#a00');
  bodyGradient.addColorStop(0.6, '#c00');
  bodyGradient.addColorStop(1, '#800');

  // Main hull
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.moveTo(50, 5); // Top point
  ctx.lineTo(65, 35); // Right shoulder
  ctx.lineTo(85, 45); // Right wing tip
  ctx.lineTo(70, 55); // Right mid
  ctx.lineTo(60, 75); // Bottom right
  ctx.lineTo(50, 65); // Bottom center
  ctx.lineTo(40, 75); // Bottom left
  ctx.lineTo(30, 55); // Left mid
  ctx.lineTo(15, 45); // Left wing tip
  ctx.lineTo(35, 35); // Left shoulder
  ctx.closePath();
  ctx.fill();

  // Wing details - darker red
  const wingGradient = ctx.createLinearGradient(15, 45, 85, 45);
  wingGradient.addColorStop(0, '#600');
  wingGradient.addColorStop(0.5, '#800');
  wingGradient.addColorStop(1, '#600');

  // Left wing accent
  ctx.fillStyle = wingGradient;
  ctx.beginPath();
  ctx.moveTo(15, 45);
  ctx.lineTo(35, 40);
  ctx.lineTo(35, 50);
  ctx.closePath();
  ctx.fill();

  // Right wing accent
  ctx.beginPath();
  ctx.moveTo(85, 45);
  ctx.lineTo(65, 40);
  ctx.lineTo(65, 50);
  ctx.closePath();
  ctx.fill();

  // Metallic highlights
  ctx.strokeStyle = '#faa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(35, 35);
  ctx.lineTo(65, 35);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(30, 55);
  ctx.lineTo(70, 55);
  ctx.stroke();

  // Center cockpit - blue glow
  const cockpitGradient = ctx.createRadialGradient(50, 45, 0, 50, 45, 12);
  cockpitGradient.addColorStop(0, '#6af');
  cockpitGradient.addColorStop(0.5, '#168');
  cockpitGradient.addColorStop(1, '#024');
  
  ctx.fillStyle = cockpitGradient;
  ctx.beginPath();
  ctx.ellipse(50, 45, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Engine thrusters
  // Thruster housing - metallic dark red
  const thrusterGradient = ctx.createLinearGradient(50, 65, 50, 80);
  thrusterGradient.addColorStop(0, '#600');
  thrusterGradient.addColorStop(1, '#400');

  // Left thruster
  ctx.fillStyle = thrusterGradient;
  ctx.beginPath();
  ctx.moveTo(35, 65);
  ctx.lineTo(45, 65);
  ctx.lineTo(43, 75);
  ctx.lineTo(37, 75);
  ctx.closePath();
  ctx.fill();

  // Right thruster
  ctx.beginPath();
  ctx.moveTo(55, 65);
  ctx.lineTo(65, 65);
  ctx.lineTo(63, 75);
  ctx.lineTo(57, 75);
  ctx.closePath();
  ctx.fill();

};

// Function to draw enemy02 (wide ship with T-shaped wings)
const drawEnemy02 = (ctx) => {
  // Main body gradient - metallic red
  const bodyGradient = ctx.createLinearGradient(50, 35, 50, 65);
  bodyGradient.addColorStop(0, '#800');
  bodyGradient.addColorStop(0.5, '#b00');
  bodyGradient.addColorStop(1, '#800');

  // Main body - wider, flatter shape
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.moveTo(50, 35);  // Top center
  ctx.lineTo(75, 40);  // Right top corner
  ctx.lineTo(85, 50);  // Right wing tip
  ctx.lineTo(75, 60);  // Right bottom corner
  ctx.lineTo(50, 65);  // Bottom center
  ctx.lineTo(25, 60);  // Left bottom corner
  ctx.lineTo(15, 50);  // Left wing tip
  ctx.lineTo(25, 40);  // Left top corner
  ctx.closePath();
  ctx.fill();

  // Wing details - darker red
  const wingGradient = ctx.createLinearGradient(15, 50, 85, 50);
  wingGradient.addColorStop(0, '#600');
  wingGradient.addColorStop(0.5, '#800');
  wingGradient.addColorStop(1, '#600');

  // Left wing accent
  ctx.fillStyle = wingGradient;
  ctx.beginPath();
  ctx.moveTo(15, 50);
  ctx.lineTo(30, 45);
  ctx.lineTo(30, 55);
  ctx.closePath();
  ctx.fill();

  // Right wing accent
  ctx.beginPath();
  ctx.moveTo(85, 50);
  ctx.lineTo(70, 45);
  ctx.lineTo(70, 55);
  ctx.closePath();
  ctx.fill();

  // Center cockpit - metallic blue
  const cockpitGradient = ctx.createLinearGradient(50, 45, 50, 55);
  cockpitGradient.addColorStop(0, '#004');
  cockpitGradient.addColorStop(0.5, '#08f');
  cockpitGradient.addColorStop(1, '#004');
  
  ctx.fillStyle = cockpitGradient;
  ctx.beginPath();
  ctx.ellipse(50, 50, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Engine exhausts
  const exhaustGradient = ctx.createLinearGradient(50, 60, 50, 70);
  exhaustGradient.addColorStop(0, '#f40');
  exhaustGradient.addColorStop(1, '#800');

  // Left exhaust
  ctx.fillStyle = exhaustGradient;
  ctx.beginPath();
  ctx.moveTo(35, 60);
  ctx.lineTo(40, 70);
  ctx.lineTo(45, 60);
  ctx.fill();

  // Right exhaust
  ctx.beginPath();
  ctx.moveTo(55, 60);
  ctx.lineTo(60, 70);
  ctx.lineTo(65, 60);
  ctx.fill();

  // Detail lines
  ctx.strokeStyle = '#400';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(30, 45);
  ctx.lineTo(70, 45);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(30, 55);
  ctx.lineTo(70, 55);
  ctx.stroke();
};

// Function to draw enemy03 (complex ship with multiple segments)
const drawEnemy03 = (ctx) => {
  // Main body gradient
  const bodyGradient = ctx.createLinearGradient(30, 30, 70, 70);
  bodyGradient.addColorStop(0, '#8B0000');
  bodyGradient.addColorStop(1, '#FF0000');
  
  // Center body
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.moveTo(50, 30);
  ctx.lineTo(70, 50);
  ctx.lineTo(50, 70);
  ctx.lineTo(30, 50);
  ctx.closePath();
  ctx.fill();

  // Side segments
  const sideGradient = ctx.createLinearGradient(0, 40, 100, 40);
  sideGradient.addColorStop(0, '#8B0000');
  sideGradient.addColorStop(0.5, '#FF0000');
  sideGradient.addColorStop(1, '#8B0000');
  ctx.fillStyle = sideGradient;

  // Left segments
  ctx.beginPath();
  ctx.moveTo(30, 40);
  ctx.lineTo(10, 40);
  ctx.lineTo(10, 60);
  ctx.lineTo(30, 60);
  ctx.closePath();
  ctx.fill();

  // Right segments
  ctx.beginPath();
  ctx.moveTo(70, 40);
  ctx.lineTo(90, 40);
  ctx.lineTo(90, 60);
  ctx.lineTo(70, 60);
  ctx.closePath();
  ctx.fill();

  // Additional details
  ctx.fillStyle = '#FF4500';
  // Left detail
  ctx.beginPath();
  ctx.arc(20, 50, 5, 0, Math.PI * 2);
  ctx.fill();
  // Right detail
  ctx.beginPath();
  ctx.arc(80, 50, 5, 0, Math.PI * 2);
  ctx.fill();
  // Center detail
  ctx.beginPath();
  ctx.arc(50, 50, 8, 0, Math.PI * 2);
  ctx.fill();

  // Engine glow
  const glowGradient = ctx.createRadialGradient(50, 65, 2, 50, 65, 10);
  glowGradient.addColorStop(0, '#FFA500');
  glowGradient.addColorStop(1, 'rgba(255, 165, 0, 0)');
  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(50, 65, 10, 0, Math.PI * 2);
  ctx.fill();
};

// Generate and save the enemy ships
const assetsDir = path.join(projectRoot, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const enemiesDir = path.join(assetsDir, 'images/enemies');
if (!fs.existsSync(enemiesDir)) {
  fs.mkdirSync(enemiesDir, { recursive: true });
}

['enemy01', 'enemy02', 'enemy03'].forEach((name) => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Make the background transparent
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw the ship
  drawShip(ctx, name);

  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(enemiesDir, `${name}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${name}.png`);
});
