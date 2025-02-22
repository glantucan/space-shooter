import { useEffect, useRef } from 'react';
import './SpaceShooter.css'; // Assuming a separate CSS file for this component

const SpaceShooter = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 1024;

    // Draw player ship
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 30, 30);

    // Draw enemy ship
    ctx.fillStyle = 'red';
    ctx.fillRect(700, 50, 30, 30);
  }, []);

  return <div className="space-shooter" ref={canvasRef}></div>;
};

export default SpaceShooter;
