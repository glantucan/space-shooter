import createObjectPool from './objectPool';
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

const enemyInBounds = (enemy) => enemy.y < CANVAS_HEIGHT + 100;
const bulletInBounds = (bullet) => bullet.y < CANVAS_HEIGHT + 50;

// Factories for the object pools
const createEnemy = () => ({
  x: Math.random() * (CANVAS_WIDTH - PLAYER_WIDTH),
  y: 50 + Math.random() * 200,
  lastShot: 0,
  shotDelay: MIN_SHOT_DELAY + Math.random() * (MAX_SHOT_DELAY - MIN_SHOT_DELAY),
});

const createEnemyBullet = () => ({
  x: 0,
  y: 0,
  speed: BULLET_SPEED,
});

// Create pools for enemies and enmy bullets
const enemyPool = createObjectPool(createEnemy, enemyInBounds);
const enemyBulletPool = createObjectPool(createEnemyBullet, bulletInBounds);

export const Enemy = {
  create: () => enemyPool.acquire(),

  update: (enemy, now) => {
    enemyPool.checkBounds(enemy);
    const shouldShoot = now - enemy.lastShot > enemy.shotDelay;
    return {
      ...enemy,
      x: enemy.x + Math.sin(now / 1000),
      y: enemy.y + 0.2,
      lastShot: shouldShoot ? now : enemy.lastShot,
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
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  },

  renderBullet: (ctx, bullet) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
  },
};
