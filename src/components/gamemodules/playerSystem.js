import createObjectPool from './objectPool';
import gameAssets from './gameAssets';

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ACCELERATION,
  DECELERATION,
  MAX_VELOCITY,
  PLAYER_BULLET_SPEED,
  PLAYER_BULLET_SIZE,
} from './gameConstants';

const playerImage = new Image();
playerImage.src = gameAssets.player;

const bulletInBounds = (bullet) => bullet.y + PLAYER_BULLET_SIZE > 0;

const playerBulletFactory = () => ({
  x: 0,
  y: 0,
  speed: PLAYER_BULLET_SPEED,
});

const playerBulletPool = createObjectPool(playerBulletFactory, bulletInBounds);

export const Player = {
  create: () => ({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 100,
    velocity: 0,
  }),

  updateVelocity: (velocity, keysPressed) => {
    let newVelocity = velocity;
    if (keysPressed.left) newVelocity -= ACCELERATION;
    if (keysPressed.right) newVelocity += ACCELERATION;
    if (!keysPressed.left && !keysPressed.right) newVelocity *= DECELERATION;
    return Math.max(Math.min(newVelocity, MAX_VELOCITY), -MAX_VELOCITY);
  },

  updatePosition: (x, velocity) =>
    Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_WIDTH, x + velocity)),

  createBullet: (player) => {
    const bullet = playerBulletPool.acquire();
    bullet.x = player.x + PLAYER_WIDTH / 2;
    bullet.y = player.y;
    return bullet;
  },

  updateBullets: (bullets) => {
    bullets.forEach((bullet) => playerBulletPool.checkBounds(bullet));
    return bullets.map((bullet) => ({
      ...bullet,
      y: bullet.y + bullet.speed,
    }));
  },

  releaseBullet: (bullet) => playerBulletPool.release(bullet),

  render: (ctx, player) => {
    if (playerImage.complete) {
      ctx.drawImage(
        playerImage,
        player.x,
        player.y,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
      );
    } else {
      ctx.fillStyle = 'green';
      ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
  },

  renderBullet: (ctx, bullet) => {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, PLAYER_BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
  },
};
