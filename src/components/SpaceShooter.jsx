import { useEffect, useRef } from 'react';
import './SpaceShooter.css';
import { initGame } from './gameEngine';

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
