import { useEffect, useRef } from 'react';
import './SpaceShooter.css';
import { initGame } from './gamemodules/gameLoop';

// FIX: It's not responsive. width and height of the canvas should be based on the size of the view port

export default function SpaceShooter() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initGame(canvasRef.current);
      return cleanup;
    }
  }, []);

  return <canvas className="space-shooter" ref={canvasRef}></canvas>;
}
