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

  render: (ctx, player) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  },

  createBullet: (player) => ({
    x: player.x + PLAYER_WIDTH / 2,
    y: player.y,
    speed: PLAYER_BULLET_SPEED,
  }),

  updateBullets: (bullets) =>
    bullets
      .filter((bullet) => bullet.y + PLAYER_BULLET_SIZE > 0)
      .map((bullet) => ({
        ...bullet,
        y: bullet.y + bullet.speed,
      })),

  renderBullet: (ctx, bullet) => {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, PLAYER_BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
  },
};
