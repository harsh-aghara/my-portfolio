import React, { useEffect, useState, useRef } from 'react';

const NetworkParticles: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; dir: 'h' | 'v' }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length > 15) return;

      const gridX = Math.floor(Math.random() * 20);
      const gridY = Math.floor(Math.random() * 20);
      const dir = Math.random() > 0.5 ? 'h' : 'v';

      setParticles(prev => [
        ...prev,
        { id: nextId.current++, x: gridX * 40, y: gridY * 40, dir }
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, [particles]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.dir === 'h' ? p.x + 1 : p.x,
        y: p.dir === 'v' ? p.y + 1 : p.y
      })).filter(p => p.x < window.innerWidth && p.y < window.innerHeight));
    }, 16);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-blue rounded-full shadow-[0_0_8px_#3b82f6]"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </div>
  );
};

export default NetworkParticles;
