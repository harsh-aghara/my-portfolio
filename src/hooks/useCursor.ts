import { useState, useEffect, useRef } from 'react';

export const useCursor = () => {
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState({ hexX: '00', hexY: '00' });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });
      
      // Calculate Hex coordinates for telemetry
      const hexX = Math.round((e.clientX / window.innerWidth) * 255).toString(16).toUpperCase().padStart(2, '0');
      const hexY = Math.round((e.clientY / window.innerHeight) * 255).toString(16).toUpperCase().padStart(2, '0');
      setTelemetry({ hexX, hexY });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return { dotPos, telemetry };
};
