import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ACCELERATION,
  DECELERATION,
  MAX_VELOCITY,
} from './gameConstants';

export const createPlayer = () => ({
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT - 100,
  velocity: 0,
});

export const updatePlayerVelocity = (velocity, keysPressed) => {
  let newVelocity = velocity;
  if (keysPressed.left) newVelocity -= ACCELERATION;
  if (keysPressed.right) newVelocity += ACCELERATION;
  if (!keysPressed.left && !keysPressed.right) newVelocity *= DECELERATION;
  return Math.max(Math.min(newVelocity, MAX_VELOCITY), -MAX_VELOCITY);
};

export const updatePlayerPosition = (x, velocity) =>
  Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_WIDTH, x + velocity));

export const renderPlayer = (ctx, player) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
};
