import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ENEMY_COUNT,
  PLAYER_SHOT_DELAY,
} from './gameConstants';
import { Player } from './playerSystem';
import { Enemy } from './enemySystem';
import { Starfield } from './starSystem';

const createInitialState = () => ({
  player: Player.create(),
  starfield: Starfield.create(),
  enemies: Array.from({ length: ENEMY_COUNT }, Enemy.create),
  enemyBullets: [],
  playerBullets: [],
  keysPressed: { left: false, right: false, space: false },
  lastTime: 0,
  lastPlayerShot: 0,
});

const updateGameState = (state) => {
  const now = Date.now();
  const newVelocity = Player.updateVelocity(
    state.player.velocity,
    state.keysPressed
  );
  const newPlayerX = Player.updatePosition(state.player.x, newVelocity);

  const newPlayerBullets = [
    ...state.playerBullets,
    ...(state.keysPressed.space &&
    now - state.lastPlayerShot > PLAYER_SHOT_DELAY
      ? [Player.createBullet(state.player)]
      : []),
  ];

  // First check which enemies should shoot
  const shootingEnemies = state.enemies.filter(
    (enemy) => now - enemy.lastShot > enemy.shotDelay
  );

  // Create new bullets for shooting enemies
  const newEnemyBullets = [
    ...state.enemyBullets,
    ...shootingEnemies.map(Enemy.createBullet),
  ];

  // Then update enemy positions
  const newEnemies = state.enemies
    .map((enemy) => Enemy.update(enemy, now))
    .filter((enemy) => enemy.y < CANVAS_HEIGHT + 200);

  // Spawn new enemies if needed
  while (newEnemies.length < ENEMY_COUNT) {
    newEnemies.push(Enemy.create());
  }

  const updatedPlayerBullets = Player.updateBullets(newPlayerBullets);
  const updatedEnemyBullets = Enemy.updateBullets(newEnemyBullets);

  return {
    ...state,
    player: {
      ...state.player,
      x: newPlayerX,
      velocity: newVelocity,
    },
    starfield: Starfield.update(state.starfield),
    enemies: newEnemies,
    playerBullets: updatedPlayerBullets,
    enemyBullets: updatedEnemyBullets,
    lastTime: now,
    lastPlayerShot:
      state.keysPressed.space && now - state.lastPlayerShot > PLAYER_SHOT_DELAY
        ? now
        : state.lastPlayerShot,
  };
};

const renderBackground = (ctx) => {
  ctx.fillStyle = '#000014';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const renderGameState = (ctx, state) => {
  renderBackground(ctx);
  Starfield.render(ctx, state.starfield);
  Player.render(ctx, state.player);
  state.enemies.forEach((enemy) => Enemy.render(ctx, enemy));
  state.enemyBullets.forEach((bullet) => Enemy.renderBullet(ctx, bullet));
  state.playerBullets.forEach((bullet) => Player.renderBullet(ctx, bullet));
};

const handleKeyDown = (state, key) => ({
  ...state,
  keysPressed: {
    ...state.keysPressed,
    left: key === 'ArrowLeft' ? true : state.keysPressed.left,
    right: key === 'ArrowRight' ? true : state.keysPressed.right,
    space: key === ' ' ? true : state.keysPressed.space,
  },
});

const handleKeyUp = (state, key) => ({
  ...state,
  keysPressed: {
    ...state.keysPressed,
    left: key === 'ArrowLeft' ? false : state.keysPressed.left,
    right: key === 'ArrowRight' ? false : state.keysPressed.right,
    space: key === ' ' ? false : state.keysPressed.space,
  },
});

export const initGame = (canvas) => {
  if (!canvas) throw new Error('Canvas is required');

  const ctx = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let gameState = createInitialState();

  const keyDownHandler = (e) => {
    gameState = handleKeyDown(gameState, e.key);
  };

  const keyUpHandler = (e) => {
    gameState = handleKeyUp(gameState, e.key);
  };

  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  const animate = () => {
    gameState = updateGameState(gameState);
    renderGameState(ctx, gameState);
    requestAnimationFrame(animate);
  };

  animate();

  return () => {
    window.removeEventListener('keydown', keyDownHandler);
    window.removeEventListener('keyup', keyUpHandler);
  };
};
