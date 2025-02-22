import { useEffect, useRef, useState } from 'react';
import './SpaceShooter.css';

const SpaceShooter = () => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 385, y: 900 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 1024;

    let animationFrameId;
    
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          setPlayerPos(prev => ({
            ...prev,
            x: Math.max(0, prev.x - 10)
          }));
          break;
        case 'ArrowRight':
          setPlayerPos(prev => ({
            ...prev,
            x: Math.min(canvas.width - 30, prev.x + 10)
          }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw player ship
      ctx.fillStyle = 'blue';
      ctx.fillRect(playerPos.x, playerPos.y, 30, 30);

      // Draw enemy ship
      ctx.fillStyle = 'red';
      ctx.fillRect(700, 50, 30, 30);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [playerPos]);

  return <canvas className="space-shooter" ref={canvasRef}></canvas>;
};

export default SpaceShooter;
