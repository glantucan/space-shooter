import { CANVAS_WIDTH, CANVAS_HEIGHT, ENEMY_COUNT } from './gameConstants';
import { Player } from './playerSystem';
import { Enemy } from './enemySystem';
import { Starfield } from './starSystem';

const createInitialState = () => ({
  player: Player.create(),
  starfield: Starfield.create(),
  enemies: Array.from({ length: ENEMY_COUNT }, Enemy.create),
  enemyBullets: [],
  keysPressed: { left: false, right: false },
  lastTime: 0,
});

const updateGameState = (state) => {
  const now = Date.now();
  const newVelocity = Player.updateVelocity(
    state.player.velocity,
    state.keysPressed
  );
  const newPlayerX = Player.updatePosition(state.player.x, newVelocity);

  const newStarfield = Starfield.update(state.starfield);
  const newEnemies = state.enemies.map((enemy) => Enemy.update(enemy, now));

  const newBullets = [
    ...state.enemyBullets,
    ...state.enemies
      .filter((enemy) => now - enemy.lastShot > enemy.shotDelay)
      .map(Enemy.createBullet),
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
    enemyBullets: Enemy.updateBullets(newBullets),
    lastTime: now,
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
