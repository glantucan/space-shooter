import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ENEMY_COUNT,
} from './gameConstants';

import {
  createPlayer,
  updatePlayerVelocity,
  updatePlayerPosition,
  renderPlayer,
} from './playerSystem';

import {
  createEnemy,
  updateEnemy,
  createBullet,
  updateBullets,
  renderEnemy,
  renderBullet,
} from './enemySystem';

import {
  createStarfield,
  updateStarfield,
  renderStarfield,
} from './starSystem';

const createInitialState = () => ({
  player: createPlayer(),
  starfield: createStarfield(),
  enemies: Array.from({ length: ENEMY_COUNT }, createEnemy),
  enemyBullets: [],
  keysPressed: { left: false, right: false },
  lastTime: 0,
});

const updateGameState = (state) => {
  const now = Date.now();
  const newVelocity = updatePlayerVelocity(
    state.player.velocity,
    state.keysPressed
  );
  const newPlayerX = updatePlayerPosition(state.player.x, newVelocity);

  const newStarfield = updateStarfield(state.starfield);
  const newEnemies = state.enemies.map((enemy) => updateEnemy(enemy, now));

  const newBullets = [
    ...state.enemyBullets,
    ...state.enemies
      .filter((enemy) => now - enemy.lastShot > enemy.shotDelay)
      .map(createBullet)
  ];

  return {
    ...state,
    player: {
      ...state.player,
      x: newPlayerX,
      velocity: newVelocity,
    },
    starfield: newStarfield,
    enemies: newEnemies,
    enemyBullets: updateBullets(newBullets),
    lastTime: now,
  };
};

const renderBackground = (ctx) => {
  ctx.fillStyle = '#000014';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const renderGameState = (ctx, state) => {
  renderBackground(ctx);
  renderStarfield(ctx, state.starfield);
  renderPlayer(ctx, state.player);
  state.enemies.forEach((enemy) => renderEnemy(ctx, enemy));
  state.enemyBullets.forEach((bullet) => renderBullet(ctx, bullet));
};

const handleKeyDown = (state, key) => ({
  ...state,
  keysPressed: {
    ...state.keysPressed,
    left: key === 'ArrowLeft' ? true : state.keysPressed.left,
    right: key === 'ArrowRight' ? true : state.keysPressed.right,
  },
});

const handleKeyUp = (state, key) => ({
  ...state,
  keysPressed: {
    ...state.keysPressed,
    left: key === 'ArrowLeft' ? false : state.keysPressed.left,
    right: key === 'ArrowRight' ? false : state.keysPressed.right,
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
