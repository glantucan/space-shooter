import createObjectPool from './objectPool';
import { getAsset } from './gameAssets';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  BULLET_SPEED,
  BULLET_SIZE,
  MIN_SHOT_DELAY,
  MAX_SHOT_DELAY,
} from './gameConstants';

const enemyImage = getAsset('enemies.tier1');

const enemyInBounds = (enemy) => enemy.y < CANVAS_HEIGHT + 100;
const bulletInBounds = (bullet) => bullet.y < CANVAS_HEIGHT + 50;
const maxOffset = PLAYER_WIDTH * 4; // The maximum distance the enemy will move left/right

// Factories for the object pools
const enemyFactory = () => {
  // Calculate safe spawn zone considering maximum lateral movement
  const safeZoneStart = maxOffset; // Left margin
  const safeZoneEnd = CANVAS_WIDTH - PLAYER_WIDTH - maxOffset; // Right margin

  const x = safeZoneStart + Math.random() * (safeZoneEnd - safeZoneStart);

  return {
    x,
    y: 50 + Math.random() * 200,
    lastShot: 0,
    shotDelay:
      MIN_SHOT_DELAY + Math.random() * (MAX_SHOT_DELAY - MIN_SHOT_DELAY),
    initialX: x, // Store initial spawn position
    speed: 0.1 + Math.random() * 0.3, // Random speed between 0.1 and 0.4
  };
};

const enemyBulletFactory = () => ({
  x: 0,
  y: 0,
  speed: BULLET_SPEED,
});

// Create pools for enemies and enmy bullets
const enemyPool = createObjectPool(enemyFactory, enemyInBounds);
const enemyBulletPool = createObjectPool(enemyBulletFactory, bulletInBounds);

export const Enemy = {
  create: () => {
    const enemy = enemyPool.acquire();
    enemy.initialX = enemy.x; // Store the initial spawn position
    return enemy;
  },

  update: (enemy, now) => {
    enemyPool.checkBounds(enemy);
    const shouldShoot = now - enemy.lastShot > enemy.shotDelay;
    const newX = enemy.initialX + Math.sin(now / 1000) * maxOffset;
    return {
      ...enemy,
      x: newX,
      y: enemy.y + enemy.speed,
      lastShot: shouldShoot ? now : enemy.lastShot,
      initialX: enemy.initialX, // Preserve the initial position
    };
  },

  createBullet: (enemy) => {
    const bullet = enemyBulletPool.acquire();
    bullet.x = enemy.x + PLAYER_WIDTH / 2;
    bullet.y = enemy.y + PLAYER_HEIGHT;
    return bullet;
  },

  updateBullets: (bullets) => {
    bullets.forEach((bullet) => enemyBulletPool.checkBounds(bullet));
    return bullets.map((bullet) => ({
      ...bullet,
      y: bullet.y + bullet.speed,
    }));
  },

  release: (enemy) => enemyPool.release(enemy),
  releaseBullet: (bullet) => enemyBulletPool.release(bullet),

  render: (ctx, enemy) => {
    if (enemyImage.complete) {
      ctx.drawImage(enemyImage, enemy.x, enemy.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(enemy.x, enemy.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
  },

  renderBullet: (ctx, bullet) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
  },
};
