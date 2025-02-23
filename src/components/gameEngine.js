import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  STAR_COUNT,
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

const createStar = () => ({
  x: Math.random() * CANVAS_WIDTH,
  y: Math.random() * CANVAS_HEIGHT,
  size: Math.random() * 2 + 1,
  speed: Math.random() * 2 + 1,
});

const updateStar = (star) => ({
  ...star,
  y: star.y > CANVAS_HEIGHT ? 0 : star.y + star.speed,
  x: star.y > CANVAS_HEIGHT ? Math.random() * CANVAS_WIDTH : star.x,
});

const createInitialState = () => ({
  player: createPlayer(),
  stars: Array.from({ length: STAR_COUNT }, createStar),
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

  const newStars = state.stars.map(updateStar);
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
    stars: newStars,
    enemies: newEnemies,
    enemyBullets: updateBullets(newBullets),
    lastTime: now,
  };
};

const renderBackground = (ctx) => {
  ctx.fillStyle = '#000014';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const renderStar = (ctx, star) => {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  ctx.fill();
};

const renderGameState = (ctx, state) => {
  renderBackground(ctx);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  state.stars.forEach((star) => renderStar(ctx, star));

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
