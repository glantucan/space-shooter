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

export const Enemy = {
  create: () => ({
    x: Math.random() * (CANVAS_WIDTH - PLAYER_WIDTH),
    y: 50 + Math.random() * 200,
    lastShot: 0,
    shotDelay: MIN_SHOT_DELAY + Math.random() * (MAX_SHOT_DELAY - MIN_SHOT_DELAY),
  }),

  update: (enemy, now) => {
    const shouldShoot = now - enemy.lastShot > enemy.shotDelay;
    return {
      ...enemy,
      x: enemy.x + Math.sin(now / 1000),
      y: enemy.y + 0.2,
      lastShot: shouldShoot ? now : enemy.lastShot,
    };
  },

  createBullet: (enemy) => ({
    x: enemy.x + PLAYER_WIDTH / 2,
    y: enemy.y + PLAYER_HEIGHT,
    speed: BULLET_SPEED,
  }),

  updateBullets: (bullets) =>
    bullets
      .filter((bullet) => bullet.y < CANVAS_HEIGHT)
      .map((bullet) => ({
        ...bullet,
        y: bullet.y + bullet.speed,
      })),

  render: (ctx, enemy) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  },

  renderBullet: (ctx, bullet) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
  }
};
